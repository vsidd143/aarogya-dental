export interface BranchInfo {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  timings: string;
  mapUrl: string;
}

export interface DoctorInfo {
  id: string;
  name: string;
  degree: string;
  specialization: string;
  experience: string;
  bio: string;
  image: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  image: string;
  thumb: string;
  subServices: { name: string; description: string }[];
}

export interface TechItem {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  treatment: string;
  rating: number;
  date: string;
  quote: string;
  verified: boolean;
}

export interface AssetRequirement {
  filename: string;
  folder: string;
  usedIn: string;
  recommendedSize: string;
  orientation: "landscape" | "portrait" | "square" | "panoramic" | "video";
  notes: string;
}

export const siteContent = {
  brand: {
    name: "Aarogya Dental Clinic",
    shortName: "Aarogya",
    badgeName: "AAROGYA DENTAL CLINIC",
    tagline: "Where Healthy Meets Beautiful.",
    foundedYear: 2008,
  },
  contact: {
    primaryPhone: "+91 98765 43210",
    primaryWhatsapp: "+91 98765 43210",
    primaryEmail: "concierge@aarogyadental.com",
    timings: "Mon - Sat: 10:00 AM – 8:00 PM · Sunday by Appointment",
    branches: [
      {
        id: "mumbai",
        name: "South Mumbai Clinic",
        city: "South Mumbai",
        address: "Suite 402, Sea View Chambers, Marine Drive, Nariman Point, Mumbai 400021",
        phone: "+91 22 2200 4321",
        whatsapp: "+91 98765 43210",
        email: "mumbai@aarogyadental.com",
        timings: "Mon - Sat: 10:00 AM – 8:00 PM",
        mapUrl: "https://maps.google.com/?q=Marine+Drive+Mumbai",
      },
      {
        id: "pune",
        name: "Koregaon Park Clinic",
        city: "Pune",
        address: "Floor 3, Koregaon Park Plaza, North Main Road, Lane 7, Pune 411001",
        phone: "+91 20 6600 4321",
        whatsapp: "+91 98765 43210",
        email: "pune@aarogyadental.com",
        timings: "Mon - Sat: 10:00 AM – 8:00 PM",
        mapUrl: "https://maps.google.com/?q=Koregaon+Park+Pune",
      },
      {
        id: "bengaluru",
        name: "Indiranagar Centre",
        city: "Bengaluru",
        address: "Villa 14, 100ft Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038",
        phone: "+91 80 4400 4321",
        whatsapp: "+91 98765 43210",
        email: "bengaluru@aarogyadental.com",
        timings: "Mon - Sat: 10:00 AM – 8:00 PM",
        mapUrl: "https://maps.google.com/?q=Indiranagar+Bengaluru",
      },
    ] as BranchInfo[],
    socials: {
      instagram: "https://instagram.com/aarogyadental",
      facebook: "https://facebook.com/aarogyadental",
      linkedin: "https://linkedin.com/company/aarogyadental",
      youtube: "https://youtube.com/@aarogyadental",
    },
  },
  hero: {
    badge: "AAROGYA DENTAL CLINIC",
    headlineLine1: "Premium Esthetic",
    headlineOverlayWord: "Dentistry",
    description:
      "Precision clinical dentistry meets natural facial aesthetics. Experience compassionate, world-class dental care designed around your smile.",
    locationBadge: "Based in: South Mumbai · Pune · Bengaluru",
    captions: [
      "Designing smiles that are as healthy as they are beautiful.",
      "We combine advanced science with an artist's touch.",
    ],
    parallaxScrollLine: "Your smile, effortlessly enhanced",
  },
  about: {
    heroStatement:
      "Our goal is to deliver world-class dental and aesthetic care through advanced techniques, customized treatments, and a bespoke level of service that makes every patient feel valued.",
    leadDoctorExcerpt:
      "Under the clinical guidance of Dr. Ananya Sharma and our specialist team, every procedure merges biological preservation with artistic precision.",
    subText:
      "From bespoke porcelain laminates to guided full-arch rehabilitation, our clinics in Mumbai, Pune, and Bengaluru combine hospital-grade sterilization with luxury hospitality.",
    stats: [
      { label: "Google Rating", value: "4.9/5", detail: "Over 1,200 verified reviews" },
      { label: "Patient Satisfaction", value: "99.2%", detail: "Consistent clinical outcomes" },
      { label: "Smiles Restored", value: "10,000+", detail: "Across 3 flagship locations" },
      { label: "Years of Care", value: "16+", detail: "Trusted since 2008" },
    ],
  },
  services: [
    {
      id: "esthetic",
      title: "Esthetic Dentistry",
      slug: "esthetic-dentistry",
      subtitle: "The Art of Natural Harmony",
      description:
        "Bespoke porcelain restorations and microscopic enamel contouring crafted to enhance your natural facial proportions.",
      image: "service-1.jpg",
      thumb: "service-thumb-1.jpg",
      subServices: [
        {
          name: "Teeth Whitening",
          description: "In-office LED power laser whitening delivering up to 8 shades brighter in 45 minutes.",
        },
        {
          name: "Porcelain Veneers",
          description: "Ultra-thin, hand-layered ceramic shells bonded to create flawless symmetry and vitality.",
        },
        {
          name: "Smile Makeover",
          description: "Comprehensive digital smile architectural design harmonized with facial aesthetics.",
        },
        {
          name: "Cosmetic Bonding",
          description: "Artistic direct composite sculpting to repair chips, gaps, and minor misalignments in a single visit.",
        },
      ],
    },
    {
      id: "restorative",
      title: "Restorative Dentistry",
      slug: "restorative-dentistry",
      subtitle: "Biomimetic Strength & Function",
      description:
        "Preserving natural tooth structure and rebuilding long-term masticatory strength with Swiss-grade biocompatible materials.",
      image: "service-2.jpg",
      thumb: "service-thumb-2.jpg",
      subServices: [
        {
          name: "Dental Implants",
          description: "Precision 3D computer-guided titanium & zirconia implants for lifelong natural tooth replacement.",
        },
        {
          name: "Crowns & Bridges",
          description: "Monolithic zirconia and lithium disilicate crowns engineered for strength and light translucency.",
        },
        {
          name: "Root Canal Therapy",
          description: "Microscope-enhanced rotary endodontics performed comfortably in a single gentle session.",
        },
        {
          name: "Full-Mouth Rehabilitation",
          description: "Holistic occlusal correction restoring collapsed bites, joint comfort, and chewing vitality.",
        },
      ],
    },
    {
      id: "beyond",
      title: "Beyond the Smile",
      slug: "beyond-the-smile",
      subtitle: "Holistic & Preventative Wellness",
      description:
        "Comprehensive preventive wellness, gentle airway-focused orthodontics, and anxiety-free pediatric care.",
      image: "service-3.jpg",
      thumb: "service-thumb-3.jpg",
      subServices: [
        {
          name: "Invisible Aligners",
          description: "Clear, customized orthodontic trays that straighten teeth discreetly without metal brackets.",
        },
        {
          name: "Pediatric Dentistry",
          description: "Playful, compassionate preventive care establishing lifelong positive dental habits for children.",
        },
        {
          name: "Gum & Preventive Care",
          description: "Ultrasonic piezo scaling, laser decontamination, and guided biofilm therapy for systemic health.",
        },
        {
          name: "Emergency Dental Care",
          description: "Same-day urgent relief for sudden dental pain, chipped teeth, and sports injuries.",
        },
      ],
    },
  ] as ServiceItem[],
  technology: [
    {
      id: "tech-1",
      number: "01",
      name: "Soft-Tissue Laser",
      tagline: "Minimally Invasive Bio-Laser",
      description:
        "Precise soft-tissue contouring and laser periodontal pocket sterilization with zero scalpel bleeding and immediate healing.",
      image: "tech-1.jpg",
    },
    {
      id: "tech-2",
      number: "02",
      name: "Intra-Oral Camera",
      tagline: "4K Diagnostic Magnification",
      description:
        "Crystal-clear live digital visualization on chairside displays allowing co-diagnosis and full transparency for your treatment plan.",
      image: "tech-2.jpg",
    },
    {
      id: "tech-3",
      number: "03",
      name: "Digital X-Ray (RVG)",
      tagline: "Ultra-Low Radiation Sensors",
      description:
        "90% reduced radiation compared to conventional film with instantaneous high-contrast sub-millimeter diagnostic rendering.",
      image: "tech-3.jpg",
    },
    {
      id: "tech-4",
      number: "04",
      name: "CAD/CAM Same-Day Crowns",
      tagline: "In-House Digital Ceramic Milling",
      description:
        "3D optical scanning and in-clinic robotic diamond milling of pristine ceramic crowns in under 60 minutes — no messy impressions.",
      image: "tech-4.jpg",
    },
    {
      id: "tech-5",
      number: "05",
      name: "3D CBCT Scan",
      tagline: "Sub-Millimeter Volumetric Imaging",
      description:
        "True 3D anatomical mapping of bone density, nerve paths, and maxillary sinuses for computer-guided implant planning.",
      image: "tech-5.jpg",
    },
  ] as TechItem[],
  team: {
    headline: "Our team is dedicated to providing exceptional results.",
    leadSubtitle:
      "Every doctor at Aarogya brings specialized postgraduate training, international fellowships, and an unwavering commitment to patient dignity.",
    groupPhoto: "team-group.jpg",
    doctors: [
      {
        id: "dr-ananya",
        name: "Dr. Ananya Sharma",
        degree: "BDS, MDS (Prosthodontics & Implantology)",
        specialization: "Chief Prosthodontist & Esthetic Director",
        experience: "15+ Years Clinical Experience",
        bio: "Specializing in digital smile architecture, minimal-prep porcelain veneers, and full-mouth biological rehabilitations.",
        image: "doctor-1.jpg",
      },
      {
        id: "dr-rohan",
        name: "Dr. Rohan Mehta",
        degree: "BDS, MDS (Oral & Maxillofacial Surgery)",
        specialization: "Senior Implantologist & Surgical Lead",
        experience: "16+ Years Clinical Experience",
        bio: "Fellow in computer-guided implant surgery and bone regeneration, having placed over 4,500 successful dental implants.",
        image: "doctor-2.jpg",
      },
      {
        id: "dr-priya",
        name: "Dr. Priya Kulkarni",
        degree: "BDS, MDS (Conservative Dentistry & Endodontics)",
        specialization: "Microscopic Endodontist & Pediatric Specialist",
        experience: "12+ Years Clinical Experience",
        bio: "Renowned for gentle, anxiety-free single-sitting root canals under surgical microscope magnification.",
        image: "doctor-3.jpg",
      },
    ] as DoctorInfo[],
  },
  signature: {
    preText: "We are",
    italic1: "here",
    midText: "to",
    italic2: "Enhance",
    postText: "Your Smile",
    subtext: "Precision clinical dentistry meets natural facial harmony.",
  },
  testimonials: {
    badge: "PATIENT EXPERIENCES",
    aggregateScore: "4.9/5",
    totalReviews: "1,200+ Verified Reviews",
    platform: "Google & Practo Verified",
    reviews: [
      {
        id: "rev-1",
        name: "Vikram Malhotra",
        treatment: "Porcelain Veneers & Smile Architecture",
        rating: 5,
        date: "2 weeks ago",
        quote:
          "The level of attention to detail at Aarogya is truly unmatched. Dr. Ananya designed my veneers with such subtlety that friends ask if I've simply been resting well. Truly artistic care.",
        verified: true,
      },
      {
        id: "rev-2",
        name: "Natasha Cooper",
        treatment: "Guided Dental Implants",
        rating: 5,
        date: "1 month ago",
        quote:
          "I traveled from Dubai specifically for full-arch guided implants with Dr. Rohan. The procedure was virtually painless and completed with robotic precision. The clinic feels more like a 5-star lounge.",
        verified: true,
      },
      {
        id: "rev-3",
        name: "Siddharth Verma",
        treatment: "Microscopic Root Canal Therapy",
        rating: 5,
        date: "2 months ago",
        quote:
          "I had extreme dental anxiety from a childhood trauma. Dr. Priya made my root canal completely pain-free and calm. Their 3D scanning and warm team changed my perception of dentistry.",
        verified: true,
      },
      {
        id: "rev-4",
        name: "Meera Sen",
        treatment: "Invisible Clear Aligners",
        rating: 5,
        date: "3 months ago",
        quote:
          "Straightened my teeth in 7 months without anybody noticing my trays during executive board presentations. The digital monitoring app made appointments effortless.",
        verified: true,
      },
      {
        id: "rev-5",
        name: "Aditya Singhania",
        treatment: "CAD/CAM Same-Day Ceramic Crown",
        rating: 5,
        date: "3 months ago",
        quote:
          "Chipped my molar before a flight. Walked in at 11 AM, had a custom 3D milled ceramic crown bonded by 12:15 PM, and caught my evening flight with zero discomfort. Outstanding tech.",
        verified: true,
      },
    ] as ReviewItem[],
  },
  cta: {
    leftHeading: "Your Perfect Smile",
    rightHeading: "Brought to Life",
    subheading: "Ready to transform your smile? Book a consultation.",
    description:
      "Connect with our clinical concierge to schedule your comprehensive 3D diagnostic scan and custom smile design session.",
    primaryButton: "Book Appointment",
    secondaryButton: "WhatsApp Us",
    smileImage: "cta-smile.jpg",
  },
  faq: [
    {
      question: "How long does a complete Smile Makeover or Porcelain Veneer procedure take?",
      answer:
        "Most smile transformations require only 2 to 3 appointments over a 7-10 day period. During appointment one, we capture 3D optical scans, facial photos, and design your digital smile mockup so you can test-drive your smile before preparation. Appointment two is minimal enamel prep and temporary placement, and appointment three is the final bonded delivery of hand-layered ceramic veneers.",
    },
    {
      question: "Are dental implants painful, and how long is the recovery time?",
      answer:
        "Thanks to computer-guided 3D surgical templates and gentle local anesthesia, our patients consistently report that dental implant placement is less traumatic than a standard tooth extraction. Most individuals return to work the next day with minimal over-the-counter pain management.",
    },
    {
      question: "What makes Aarogya Dental different from a conventional dental clinic?",
      answer:
        "Aarogya operates as a boutique dental clinic. We utilize hospital-grade Class-B sterilization, in-house CAD/CAM ceramic milling, sub-millimeter 3D CBCT imaging, and microscopic endodontics. Above all, we never double-book appointments: your scheduled time is exclusively dedicated to you in a tranquil, calming private suite.",
    },
    {
      question: "Do you offer emergency dental appointments for broken teeth or acute pain?",
      answer:
        "Yes, all three of our clinics in Mumbai, Pune, and Bengaluru maintain emergency reserve slots every day. Please call or WhatsApp our concierge line immediately, and our team will accommodate you on the same day.",
    },
    {
      question: "Can I choose my treatment location between Mumbai, Pune, and Bengaluru?",
      answer:
        "All our patient medical records, 3D scans, and treatment plans are securely synchronized across our cloud infrastructure. You can begin treatment in Mumbai, attend checkups in Pune, or wrap up in Bengaluru with seamless continuity under the same standard of clinical care.",
    },
  ],
  gallery: [
    { id: "g1", image: "gallery-1.jpg", caption: "Bespoke Minimal-Prep Porcelain Veneers (Case 104)" },
    { id: "g2", image: "gallery-2.jpg", caption: "Guided Immediate Zirconia Implant Placement" },
    { id: "g3", image: "gallery-3.jpg", caption: "Full Mouth Rehabilitation with Bio-Functional Harmony" },
    { id: "g4", image: "gallery-4.jpg", caption: "Clear Aligner Precision Alignment (8 Months)" },
    { id: "g5", image: "gallery-5.jpg", caption: "CAD/CAM Same-Day Monolithic Crown" },
    { id: "g6", image: "gallery-6.jpg", caption: "Laser Soft-Tissue Gingival Recontouring" },
    { id: "g7", image: "gallery-7.jpg", caption: "Cosmetic Enamel Micro-Bonding for Diastema Closure" },
    { id: "g8", image: "gallery-8.jpg", caption: "Child-Friendly Preventive Pit & Fissure Sealants" },
    { id: "g9", image: "gallery-9.jpg", caption: "Deep In-Office Laser Whitening (8 Shades)" },
    { id: "g10", image: "gallery-10.jpg", caption: "State-of-the-Art Digital Clinic Interior" },
  ],
};

export const requiredAssets: AssetRequirement[] = [
  {
    filename: "logo.svg",
    folder: "/public/images",
    usedIn: "Header, Footer, CTA dome crest, Favicon",
    recommendedSize: "400 x 100 px (Vector SVG)",
    orientation: "landscape",
    notes: "Transparent vector SVG with tooth monogram and refined serif Aarogya wordmark.",
  },
  {
    filename: "hero-1.jpg",
    folder: "/public/images",
    usedIn: "Home Section 1 (Hero Split Screen primary slide)",
    recommendedSize: "1920 x 1280 px (3:2 or 16:9)",
    orientation: "landscape",
    notes: "Editorial, high-fashion dental close-up or patient with radiant natural smile.",
  },
  {
    filename: "hero-2.jpg",
    folder: "/public/images",
    usedIn: "Home Section 1 (Hero scroll wipe slide 2)",
    recommendedSize: "1920 x 1080 px (16:9)",
    orientation: "landscape",
    notes: "Boutique clinic view or doctor examining digital 3D model.",
  },
  {
    filename: "hero-3.jpg",
    folder: "/public/images",
    usedIn: "Home Section 1 (Hero slide 3 with horizontal parallax marquee)",
    recommendedSize: "1920 x 1080 px (16:9)",
    orientation: "landscape",
    notes: "Cinematic joyful smile portrait with natural ambient light.",
  },
  {
    filename: "about-doctor.jpg",
    folder: "/public/images",
    usedIn: "Home Section 2 (About editorial inline wrap portrait)",
    recommendedSize: "600 x 750 px (4:5)",
    orientation: "portrait",
    notes: "Warm, professional portrait of the lead doctor in medical lab attire or neutral clothing.",
  },
  {
    filename: "avatar-1.jpg",
    folder: "/public/images",
    usedIn: "Home Section 2 (Doctor circular avatar 1)",
    recommendedSize: "300 x 300 px (1:1)",
    orientation: "square",
    notes: "Headshot of Dr. Ananya Sharma.",
  },
  {
    filename: "avatar-2.jpg",
    folder: "/public/images",
    usedIn: "Home Section 2 (Doctor circular avatar 2)",
    recommendedSize: "300 x 300 px (1:1)",
    orientation: "square",
    notes: "Headshot of Dr. Rohan Mehta.",
  },
  {
    filename: "avatar-3.jpg",
    folder: "/public/images",
    usedIn: "Home Section 2 (Doctor circular avatar 3)",
    recommendedSize: "300 x 300 px (1:1)",
    orientation: "square",
    notes: "Headshot of Dr. Priya Kulkarni.",
  },
  {
    filename: "service-1.jpg",
    folder: "/public/images",
    usedIn: "Home Section 3 (Services pinned slide 1: Esthetic Dentistry)",
    recommendedSize: "1200 x 1500 px (4:5)",
    orientation: "portrait",
    notes: "Artistic close-up of ceramic veneer shade matching or smile aesthetics.",
  },
  {
    filename: "service-2.jpg",
    folder: "/public/images",
    usedIn: "Home Section 3 (Services pinned slide 2: Restorative Dentistry)",
    recommendedSize: "1200 x 1500 px (4:5)",
    orientation: "portrait",
    notes: "Restorative model, precision implant abutment, or restorative procedure.",
  },
  {
    filename: "service-3.jpg",
    folder: "/public/images",
    usedIn: "Home Section 3 (Services pinned slide 3: Beyond the Smile)",
    recommendedSize: "1200 x 1500 px (4:5)",
    orientation: "portrait",
    notes: "Clear aligner tray in hand or gentle preventive wellness environment.",
  },
  {
    filename: "service-thumb-1.jpg",
    folder: "/public/images",
    usedIn: "Home Section 3 (Slide 1 right thumbnail card)",
    recommendedSize: "400 x 400 px (1:1)",
    orientation: "square",
    notes: "Veneer ceramic wafer detail.",
  },
  {
    filename: "service-thumb-2.jpg",
    folder: "/public/images",
    usedIn: "Home Section 3 (Slide 2 right thumbnail card)",
    recommendedSize: "400 x 400 px (1:1)",
    orientation: "square",
    notes: "Titanium implant component detail.",
  },
  {
    filename: "service-thumb-3.jpg",
    folder: "/public/images",
    usedIn: "Home Section 3 (Slide 3 right thumbnail card)",
    recommendedSize: "400 x 400 px (1:1)",
    orientation: "square",
    notes: "Clear aligner detail.",
  },
  {
    filename: "tech-1.jpg",
    folder: "/public/images",
    usedIn: "Home Section 4 (Technology card 1: Soft-Tissue Laser)",
    recommendedSize: "800 x 1000 px (4:5)",
    orientation: "portrait",
    notes: "Medical soft-tissue diode laser console and handpiece.",
  },
  {
    filename: "tech-2.jpg",
    folder: "/public/images",
    usedIn: "Home Section 4 (Technology card 2: Intra-Oral Camera)",
    recommendedSize: "800 x 1000 px (4:5)",
    orientation: "portrait",
    notes: "High-definition intra-oral optical wand with blue diagnostic illumination.",
  },
  {
    filename: "tech-3.jpg",
    folder: "/public/images",
    usedIn: "Home Section 4 (Technology card 3: Digital RVG X-Ray)",
    recommendedSize: "800 x 1000 px (4:5)",
    orientation: "portrait",
    notes: "Digital RVG sensor and monitor display showing high-contrast tooth roots.",
  },
  {
    filename: "tech-4.jpg",
    folder: "/public/images",
    usedIn: "Home Section 4 (Technology card 4: CAD/CAM Same-Day Crowns)",
    recommendedSize: "800 x 1000 px (4:5)",
    orientation: "portrait",
    notes: "Precision 5-axis robotic ceramic milling machine carving a tooth crown.",
  },
  {
    filename: "tech-5.jpg",
    folder: "/public/images",
    usedIn: "Home Section 4 (Technology card 5: 3D CBCT Scan)",
    recommendedSize: "800 x 1000 px (4:5)",
    orientation: "portrait",
    notes: "Volumetric cone-beam 3D scanner gantry or reconstructed jawbone visual.",
  },
  {
    filename: "team-group.jpg",
    folder: "/public/images",
    usedIn: "Home Section 5 (Team full-width cinematic group shot)",
    recommendedSize: "1920 x 1080 px (16:9)",
    orientation: "landscape",
    notes: "Editorial team portrait of doctors and clinical staff in modern navy/white attire.",
  },
  {
    filename: "doctor-1.jpg",
    folder: "/public/images",
    usedIn: "Doctors page / team cards: Dr. Ananya Sharma",
    recommendedSize: "800 x 1000 px (4:5)",
    orientation: "portrait",
    notes: "Studio portrait of Dr. Ananya Sharma.",
  },
  {
    filename: "doctor-2.jpg",
    folder: "/public/images",
    usedIn: "Doctors page / team cards: Dr. Rohan Mehta",
    recommendedSize: "800 x 1000 px (4:5)",
    orientation: "portrait",
    notes: "Studio portrait of Dr. Rohan Mehta.",
  },
  {
    filename: "doctor-3.jpg",
    folder: "/public/images",
    usedIn: "Doctors page / team cards: Dr. Priya Kulkarni",
    recommendedSize: "800 x 1000 px (4:5)",
    orientation: "portrait",
    notes: "Studio portrait of Dr. Priya Kulkarni.",
  },
  {
    filename: "cta-smile.jpg",
    folder: "/public/images",
    usedIn: "Home Section 8 (CTA arched dome central smile hero)",
    recommendedSize: "1000 x 1200 px (arched dome)",
    orientation: "portrait",
    notes: "Striking, high-fashion genuine smile showcasing healthy, white teeth.",
  },
  {
    filename: "gallery-1.jpg",
    folder: "/public/images",
    usedIn: "Gallery page (Item 1)",
    recommendedSize: "1200 x 800 px (3:2)",
    orientation: "landscape",
    notes: "Clinical result or clinic view 1.",
  },
  {
    filename: "gallery-2.jpg",
    folder: "/public/images",
    usedIn: "Gallery page (Item 2)",
    recommendedSize: "1200 x 800 px (3:2)",
    orientation: "landscape",
    notes: "Clinical result or clinic view 2.",
  },
  {
    filename: "gallery-3.jpg",
    folder: "/public/images",
    usedIn: "Gallery page (Item 3)",
    recommendedSize: "1200 x 800 px (3:2)",
    orientation: "landscape",
    notes: "Clinical result or clinic view 3.",
  },
  {
    filename: "gallery-4.jpg",
    folder: "/public/images",
    usedIn: "Gallery page (Item 4)",
    recommendedSize: "1200 x 800 px (3:2)",
    orientation: "landscape",
    notes: "Clinical result or clinic view 4.",
  },
  {
    filename: "gallery-5.jpg",
    folder: "/public/images",
    usedIn: "Gallery page (Item 5)",
    recommendedSize: "1200 x 800 px (3:2)",
    orientation: "landscape",
    notes: "Clinical result or clinic view 5.",
  },
  {
    filename: "gallery-6.jpg",
    folder: "/public/images",
    usedIn: "Gallery page (Item 6)",
    recommendedSize: "1200 x 800 px (3:2)",
    orientation: "landscape",
    notes: "Clinical result or clinic view 6.",
  },
  {
    filename: "gallery-7.jpg",
    folder: "/public/images",
    usedIn: "Gallery page (Item 7)",
    recommendedSize: "1200 x 800 px (3:2)",
    orientation: "landscape",
    notes: "Clinical result or clinic view 7.",
  },
  {
    filename: "gallery-8.jpg",
    folder: "/public/images",
    usedIn: "Gallery page (Item 8)",
    recommendedSize: "1200 x 800 px (3:2)",
    orientation: "landscape",
    notes: "Clinical result or clinic view 8.",
  },
  {
    filename: "gallery-9.jpg",
    folder: "/public/images",
    usedIn: "Gallery page (Item 9)",
    recommendedSize: "1200 x 800 px (3:2)",
    orientation: "landscape",
    notes: "Clinical result or clinic view 9.",
  },
  {
    filename: "gallery-10.jpg",
    folder: "/public/images",
    usedIn: "Gallery page (Item 10)",
    recommendedSize: "1200 x 800 px (3:2)",
    orientation: "landscape",
    notes: "Clinical result or clinic view 10.",
  },
  {
    filename: "hero-loop.mp4",
    folder: "/public/videos",
    usedIn: "Home Section 1 (Optional background ambient loop)",
    recommendedSize: "1920 x 1080 px (10-15s loop, <8MB, H.264, no audio)",
    orientation: "video",
    notes: "Soft cinematic b-roll of dental studio, gentle sunlight, aesthetic smile closeup.",
  },
];
