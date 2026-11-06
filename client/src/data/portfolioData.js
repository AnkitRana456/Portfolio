export const portfolioData = {
  personal: {
    name: "Ankit Rana",
    title: "Full Stack Developer",
    email: "ankitrana210704@gmail.com",
    phone: "+91 8814073730",
    location: "Haryana, India",
    roles: [
      "Software Development Engineer",
      "Full Stack Developer",
      "AI SaaS Builder",
      "DSA Problem Solver"
    ],
    tagline: "Final-year CS undergrad shipping production MERN apps. Scroll, and watch the pipeline run from first commit to deploy.",
    summary: "Final-year CS undergraduate (CGPA 9.20) with 1500+ DSA problems solved (LeetCode peak rating 1860) and hands-on full-stack experience from a 3-month internship. Built and shipped production MERN web applications with authentication, real-time features and third-party integrations. Seeking Software Development Engineer roles."
  },

  // Page order. Drives the pipeline rail, stage numbers and the footer count.
  stages: [
    { id: "about", name: "init" },
    { id: "activity", name: "commit" },
    { id: "experience", name: "branch" },
    { id: "skills", name: "build" },
    { id: "projects", name: "ship" },
    { id: "log", name: "log" },
    { id: "contact", name: "connect" }
  ],

  stats: [
    { label: "DSA Problems Solved", value: 1500, suffix: "+" },
    { label: "LeetCode Solved", value: 1000, suffix: "+" },
    { label: "LeetCode Peak Rating", value: 1860, suffix: "" },
    { label: "B.Tech CGPA", value: 9.20, suffix: "/10", isDecimal: true }
  ],

  skills: [
    { category: "Languages", icon: "Code2", items: ["Java", "JavaScript", "TypeScript", "Python", "SQL"] },
    { category: "Frontend", icon: "Layout", items: ["React.js", "HTML5", "CSS3", "Tailwind CSS"] },
    { category: "Backend", icon: "Server", items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "Clerk", "Socket.IO", "Razorpay", "BullMQ", "OAuth 2.0", "Nodemailer"] },
    { category: "Databases", icon: "Database", items: ["MongoDB", "PostgreSQL", "pgvector", "Redis", "MySQL"] },
    { category: "Tools", icon: "Wrench", items: ["Git", "GitHub", "GitHub Actions", "Postman", "Cloudinary", "Puppeteer", "Gemini API"] },
    { category: "Core CS", icon: "Cpu", items: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks"] }
  ],

  experience: [
    {
      role: "Full Stack Developer Intern",
      company: "PropStory",
      location: "Gurgaon, Haryana",
      period: "May 2026 – July 2026",
      type: "Internship",
      description: [
        "Developed and shipped responsive, production real-estate project websites for clients (Sattva Songbird, Amolik, Embassy Verde, GuruKrupa Realcon) using React.js, Node.js, Express.js and MongoDB.",
        "Built and maintained backend REST APIs with JWT authentication, CRUD operations and MongoDB schemas for lead capture and project data.",
        "Debugged and resolved frontend, backend and database issues across live projects, improving stability and page responsiveness.",
        "Integrated third-party services and worked in an Agile team using Git/GitHub for version control and code reviews.",
        "Building PropBot Pro, an AI-powered real-estate CRM and lead-management SaaS for agencies."
      ],
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "REST APIs", "Git"]
    }
  ],

  projects: [
    {
      id: "propbot-pro",
      title: "PropBot Pro",
      tagline: "AI Real Estate CRM & Lead Management SaaS",
      image: "/proj-propbot.png",
      featured: true,
      org: "PropStory",
      flow: ["Buyer chat", "RAG pgvector", "Lead dedupe", "BullMQ", "CRM + email"],
      description: "Multi-tenant CRM for real-estate companies with role-based access (admin, sales manager, agent) and JWT authentication.",
      features: [
        "AI chatbot with RAG (pgvector) answers buyer property queries from uploaded knowledge-base documents",
        "Automated lead pipeline with deduplication through a BullMQ delivery-jobs queue, plus batched email automation with an env kill-switch",
        "WhatsApp Business API for inbound buyer chats with AI auto-replies and human handoff",
        "Google Calendar OAuth 2.0 sync for automatic appointment creation"
      ],
      tech: ["Node.js", "TypeScript", "React", "PostgreSQL", "pgvector", "BullMQ", "Redis"],
      github: null,
      live: null
    },
    {
      id: "intern-portal",
      title: "Intern Portal",
      tagline: "Full-Stack Internship Aggregator",
      image: "/proj-internportal.png",
      featured: false,
      flow: ["Puppeteer", "Gemini parse", "Normalize", "MongoDB", "React + chat"],
      description: "Internship aggregator with 23 REST endpoints, 5 Mongoose models and 14 responsive pages, covering auth, job discovery, saved jobs, profiles and resume upload.",
      features: [
        "Scrapes Internshala and Unstop (up to 50 pages per run) with Puppeteer and node-cron every 12 hours, merged with live JSearch API jobs",
        "Gemini 2.5 Flash extraction with a strict JSON schema, retry with backoff on 429s, and a guard that keeps existing data on empty runs",
        "JWT in httpOnly cookies, bcrypt-hashed passwords, expiring OTPs and email verification via Nodemailer",
        "Real-time Socket.IO chat with rooms and live online-user count, persisted in MongoDB"
      ],
      tech: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "Puppeteer", "Gemini AI"],
      github: "https://github.com/AnkitRana456/Intern-Portal",
      live: "https://intern-portal-o3th.vercel.app/"
    },
    {
      id: "quickstay",
      title: "QuickStay",
      tagline: "Hotel Booking Platform",
      image: "/proj-quickstay.webp",
      featured: false,
      flow: ["Search", "Overlap check", "Razorpay", "HMAC verify", "Booked"],
      description: "MERN booking platform with 39 REST APIs across guest and hotel-owner flows, with role-based access control for 3 roles (user, hotel owner, admin).",
      features: [
        "Date-overlap availability checks with an optimistic recheck to prevent double bookings, plus a cron job that expires unpaid bookings after 15 minutes",
        "Razorpay (test mode) with order creation, HMAC signature verification and refunds on cancellation",
        "JWT access and refresh-token rotation with reuse detection, rate limiting, input sanitization and Helmet; found and fixed an auth bypass and a privilege-escalation issue in a self-audit",
        "Automated tests with a GitHub Actions CI pipeline, and a frontend bundle of ~134 KB gzipped"
      ],
      tech: ["React", "Node.js", "Express", "MongoDB", "Clerk", "Razorpay", "Cloudinary"],
      github: "https://github.com/AnkitRana456/hotel-booking",
      live: "https://hotel-booking123-three.vercel.app/"
    },
    {
      id: "tripzy",
      title: "Tripzy",
      tagline: "Travel Booking Platform",
      more: true,
      flow: ["Explore", "Reserve", "Pay", "Confirm", "Dashboard"],
      description: "Full-stack MERN travel booking app to explore destinations, reserve hotels, book curated trips and manage reservations.",
      features: [
        "Destination discovery, hotel reservation and trip booking flows",
        "JWT auth, bcrypt password hashing and protected routes",
        "Admin dashboard for trips, hotel inventory and bookings"
      ],
      tech: ["React.js", "Tailwind CSS", "Zustand", "Node.js", "Express.js", "MongoDB", "Cloudinary"],
      github: "https://github.com/AnkitRana456/tripzy",
      live: "https://tripzy-xi.vercel.app/"
    },
    {
      id: "assetflow-erp",
      title: "AssetFlow ERP",
      tagline: "Enterprise Asset & Resource Management",
      more: true,
      flow: ["QR scan", "Register", "Book", "Gemini", "Reports"],
      description: "ERP platform built for the Odoo Hackathon to manage physical assets, shared resources, maintenance workflows and audit cycles.",
      features: [
        "QR/barcode generation for asset registration and audit verification",
        "Resource booking with real-time conflict detection",
        "Google Gemini assistant for natural-language search"
      ],
      tech: ["React 19", "TailwindCSS", "Node.js", "Express.js", "MongoDB", "Socket.io", "Gemini API", "Docker"],
      github: "https://github.com/AnkitRana456/AssetFlow-ERP",
      live: null
    }
  ],

  achievements: [
    {
      title: "1500+ DSA Problems Solved",
      subtitle: "LeetCode & GeeksforGeeks",
      description: "Solved 1500+ DSA problems across LeetCode (1000+) and GeeksforGeeks."
    },
    {
      title: "LeetCode Peak Rating 1860",
      subtitle: "Contest rating",
      description: "Peak contest rating of 1860 on LeetCode.",
      ring: true
    },
    {
      title: "National-Level Hackathons",
      subtitle: "SIH, EY Techathon, Odoo, HackWithMAIT 5.0",
      description: "Participated in Smart India Hackathon (SIH), EY Techathon, Odoo Hackathon and HackWithMAIT 5.0."
    }
  ],

  education: [
    {
      institution: "Maharaja Agrasen Institute of Technology (MAIT)",
      degree: "B.Tech in Computer Science and Technology",
      period: "Sep 2023 – June 2027 (Expected)",
      grade: "CGPA 9.20 / 10"
    },
    {
      institution: "Karnal International School",
      degree: "Senior Secondary (Class XII)",
      period: "2023",
      grade: "89.6%"
    },
    {
      institution: "Arya Senior Secondary School",
      degree: "Secondary (Class X)",
      period: "2021",
      grade: "97.4%"
    }
  ],

  socials: [
    { name: "GitHub", url: "https://github.com/AnkitRana456", icon: "Github" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/ankit2107/", icon: "Linkedin" },
    { name: "LeetCode", url: "https://leetcode.com/u/Ankit_010804/", icon: "Code" },
    { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/profile/ankitranhtr3?tab=activity", icon: "Terminal" },
    { name: "CodeChef", url: "https://www.codechef.com/users/ankit_rana_123", icon: "Award" }
  ]
};
