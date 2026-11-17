import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// In-memory rate limiting & duplicate submission tracker (per serverless instance)
const rateLimitMap = new Map<string, { count: number; firstRequestTime: number }>();
const recentSubmissions = new Map<string, number>();

// Clean up stale rate-limit entries every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of rateLimitMap.entries()) {
    if (now - val.firstRequestTime > 15 * 60 * 1000) {
      rateLimitMap.delete(key);
    }
  }
  for (const [hash, time] of recentSubmissions.entries()) {
    if (now - time > 5 * 60 * 1000) {
      recentSubmissions.delete(hash);
    }
  }
}, 15 * 60 * 1000);

// HTML sanitizer to prevent injection into notification emails
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction & Rate Limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "anonymous-client";

    const now = Date.now();
    const windowMs = 10 * 60 * 1000; // 10 minutes
    const maxRequests = 5;

    const rateEntry = rateLimitMap.get(ip);
    if (rateEntry) {
      if (now - rateEntry.firstRequestTime < windowMs) {
        if (rateEntry.count >= maxRequests) {
          return NextResponse.json(
            { error: "Too many reservation requests. Please call our clinic directly or try again in a few minutes." },
            { status: 429 }
          );
        }
        rateEntry.count++;
      } else {
        rateLimitMap.set(ip, { count: 1, firstRequestTime: now });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, firstRequestTime: now });
    }

    // 2. Body parsing
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
    }

    const { name, email, phone, address, treatment, message, website_trap } = body;

    // 3. Honeypot check (Spam bot detection)
    if (website_trap && typeof website_trap === "string" && website_trap.trim() !== "") {
      // Silently accept without sending email to thwart bot harvesters
      return NextResponse.json({ success: true, message: "Enquiry received." }, { status: 200 });
    }

    // 4. Input validation
    if (!name || typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json(
        { error: "Please provide a valid full name (2-100 characters)." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || email.trim().length > 150) {
      return NextResponse.json(
        { error: "Please provide a valid email address (e.g. name@example.com)." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string") {
      return NextResponse.json(
        { error: "Please provide a valid contact phone number." },
        { status: 400 }
      );
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, "");
    if (cleanPhone.length < 7 || cleanPhone.length > 16) {
      return NextResponse.json(
        { error: "Please enter a valid phone or WhatsApp number (7-15 digits)." },
        { status: 400 }
      );
    }

    if (!address || typeof address !== "string" || address.trim().length < 2 || address.trim().length > 200) {
      return NextResponse.json(
        { error: "Please provide your residential or preferred location (2-200 characters)." },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safePhone = escapeHtml(phone.trim());
    const safeAddress = escapeHtml(address.trim());
    const safeTreatment = escapeHtml(typeof treatment === "string" && treatment.trim() ? treatment.trim() : "General Consultation & Evaluation");
    const safeMessage = typeof message === "string" ? escapeHtml(message.trim().slice(0, 2000)) : "";

    // 5. Duplicate Submission Prevention (60s window)
    const submissionHash = `${safeName.toLowerCase()}_${safeEmail.toLowerCase()}_${cleanPhone}_${safeTreatment.toLowerCase()}`;
    const previousSubmissionTime = recentSubmissions.get(submissionHash);
    if (previousSubmissionTime && now - previousSubmissionTime < 60 * 1000) {
      return NextResponse.json(
        { error: "A reservation request with these details was just submitted. Our team will contact you shortly." },
        { status: 429 }
      );
    }
    recentSubmissions.set(submissionHash, now);

    // 6. Verify Server Environment
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { error: "Email notification service is temporarily unconfigured. Please connect directly via WhatsApp Concierge." },
        { status: 500 }
      );
    }

    const recipientEmail = process.env.CONTACT_EMAIL;
    if (!recipientEmail) {
      return NextResponse.json(
        { error: "Recipient clinic address is not configured. Please contact our front desk directly." },
        { status: 500 }
      );
    }

    // Dynamic sender resolution: supports verified domain or Resend sandbox default
    const senderEmail = process.env.RESEND_FROM_EMAIL || "Aarogya Dental Clinic <onboarding@resend.dev>";

    // Format IST Timestamp
    const submissionDate = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    // 7. Compose HTML Email
    const resend = new Resend(resendApiKey);

    const whatsappDirectLink = `https://wa.me/${cleanPhone.replace("+", "")}?text=${encodeURIComponent(
      `Hello ${safeName}, thank you for reaching out to Aarogya Dental Clinic regarding ${safeTreatment}. We would be delighted to assist you with your appointment.`
    )}`;

    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Patient Appointment Request</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f6fa; padding: 36px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 620px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(6, 22, 63, 0.08); border: 1px solid #e2e8f0;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #06163F; padding: 36px 32px; text-align: left; border-bottom: 3px solid #00C2CB;">
              <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #00C2CB; margin-bottom: 8px;">
                PRIORITY RESERVATION DESK
              </div>
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">
                Aarogya Dental Clinic
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 14px; color: #94a3b8;">
                New Patient Appointment Request
              </p>
            </td>
          </tr>

          <!-- Summary Alert Banner -->
          <tr>
            <td style="padding: 24px 32px 0 32px;">
              <div style="background-color: #ecfeff; border: 1px solid #a5f3fc; border-radius: 10px; padding: 14px 18px; color: #0e7490; font-size: 14px; line-height: 1.5;">
                <strong style="color: #083344;">Action Required:</strong> A new patient has requested an appointment reservation. Please review their details and respond promptly.
              </div>
            </td>
          </tr>

          <!-- Patient Details Table -->
          <tr>
            <td style="padding: 24px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                <tr>
                  <td colspan="2" style="padding-bottom: 12px; border-bottom: 2px solid #f1f5f9; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b;">
                    Patient Information
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b; width: 35%;">
                    Patient Name
                  </td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; font-size: 15px; font-weight: 600; color: #06163F;">
                    ${safeName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b;">
                    Email Address
                  </td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; font-size: 15px; font-weight: 600; color: #06163F;">
                    <a href="mailto:${safeEmail}" style="color: #0284c7; text-decoration: none;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b;">
                    Phone / WhatsApp
                  </td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; font-size: 15px; font-weight: 600; color: #06163F;">
                    <a href="tel:${cleanPhone}" style="color: #0284c7; text-decoration: none;">${safePhone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b;">
                    Patient Location / Area
                  </td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; font-size: 15px; font-weight: 600; color: #06163F;">
                    ${safeAddress}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b;">
                    Treatment Interest
                  </td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; font-size: 15px; font-weight: 600; color: #0e7490;">
                    ${safeTreatment}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b;">
                    Submitted On (IST)
                  </td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #475569;">
                    ${submissionDate}
                  </td>
                </tr>
                ${
                  safeMessage
                    ? `
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b; vertical-align: top;">
                    Special Notes
                  </td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #334155; line-height: 1.6;">
                    ${safeMessage}
                  </td>
                </tr>
                `
                    : ""
                }
              </table>
            </td>
          </tr>

          <!-- Quick Actions -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-top: 8px;">
                    <a href="${whatsappDirectLink}" target="_blank" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 13px 22px; border-radius: 8px; margin-right: 8px; margin-bottom: 8px;">
                      💬 Open WhatsApp Conversation
                    </a>
                    <a href="mailto:${safeEmail}?subject=${encodeURIComponent(`Appointment Confirmation - Aarogya Dental Clinic`)}" style="display: inline-block; background-color: #0284c7; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 13px 22px; border-radius: 8px; margin-right: 8px; margin-bottom: 8px;">
                      ✉️ Reply by Email
                    </a>
                    <a href="tel:${cleanPhone}" style="display: inline-block; background-color: #06163F; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 13px 22px; border-radius: 8px; margin-bottom: 8px;">
                      📞 Call Patient
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
                This transactional notification was automatically generated by the Aarogya Dental Clinic web portal.
                <br>Clinic Location: Mumbai, Maharashtra
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const { error: resendError } = await resend.emails.send({
      from: senderEmail,
      to: recipientEmail,
      replyTo: safeEmail,
      subject: `[New Appointment Request] ${safeName} - ${safeTreatment}`,
      html: htmlBody,
    });

    if (resendError) {
      return NextResponse.json(
        {
          error: "Failed to deliver email notification. Our team has recorded your details — you can also reach us directly via WhatsApp.",
          details: resendError.message,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your appointment request has been submitted successfully. Our clinical coordinator will contact you shortly.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request. Please try again or chat with us on WhatsApp." },
      { status: 500 }
    );
  }
}
