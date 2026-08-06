export const portfolioData = {
  personal: {
    name: "Ankit Rana",
    title: "Full Stack Developer & DSA Specialist",
    email: "ankitrana210704@gmail.com",
    phone: "+91 8814073730",
    location: "Delhi NCR, India",
    roles: [
      "Full Stack Developer",
      "MERN Stack Engineer",
      "DSA Problem Solver",
      "Backend Architect"
    ],
    summary: "Computer Science undergraduate with expertise in Java, Data Structures & Algorithms, and MERN stack development. Solved 1500+ DSA problems across LeetCode and GeeksforGeeks. Experienced in building scalable full-stack applications using React.js, Node.js, Express.js, MongoDB, REST APIs, and JWT authentication."
  },

  stats: [
    { label: "DSA Problems Solved", value: 1500, suffix: "+" },
    { label: "LeetCode Solved", value: 1000, suffix: "+" },
    { label: "LeetCode Peak Rating", value: 1860, suffix: "" },
    { label: "B.Tech CGPA", value: 9.20, suffix: "/10", isDecimal: true }
  ],

  skills: [
    {
      category: "Languages",
      icon: "Code2",
      items: ["Java", "JavaScript", "Python", "SQL"]
    },
    {
      category: "Frontend",
      icon: "Layout",
      items: ["React.js", "HTML5", "CSS3", "Tailwind CSS"]
    },
    {
      category: "Backend",
      icon: "Server",
      items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "Clerk"]
    },
    {
      category: "Databases",
      icon: "Database",
      items: ["MongoDB", "MySQL"]
    },
    {
      category: "Tools & Libraries",
      icon: "Wrench",
      items: ["Git", "GitHub", "Postman", "Cloudinary", "MongoDB Atlas", "WebSockets", "Puppeteer", "Cheerio"]
    },
    {
      category: "Core Computer Science",
      icon: "Cpu",
      items: ["Data Structures & Algorithms", "Object-Oriented Programming (OOP)", "DBMS", "Operating Systems", "Computer Networks"]
    }
  ],

  experience: [
    {
      role: "Full Stack Developer Intern",
      company: "PropStory",
      location: "Gurgaon, Haryana",
      period: "May 2026 – July 2026",
      type: "Internship",
      description: [
        "Developed full-stack MERN web applications with responsive React.js frontends and scalable Node.js backends.",
        "Built secure REST APIs with JWT authentication, CRUD operations, and MongoDB database integration.",
        "Integrated third-party services and optimized backend functionality while collaborating using Git in an Agile environment."
      ],
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "REST APIs", "Git"]
    }
  ],

  projects: [
    {
      id: "intern-portal",
      title: "Intern Portal",
      tagline: "Automated MERN Internship Aggregation & Application Platform",
      featured: true,
      description: "Full-stack MERN platform for browsing, tracking, and applying to internships. Scrapes multiple job portals automatically to aggregate live opportunities with real-time candidate engagement.",
      features: [
        "Automated internship web scraping using Puppeteer and Cheerio from multiple job portals",
        "Secure JWT authentication & role-based access for applicants and recruiters",
        "Real-time chat and status updates using WebSockets",
        "Comprehensive dashboard for application tracking and applicant management"
      ],
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "WebSockets", "Puppeteer", "Cheerio"],
      github: "[YOUR_GITHUB_LINK]",
      live: "[YOUR_LIVE_DEMO_LINK]"
    },
    {
      id: "tripzy",
      title: "Tripzy — Travel Booking Platform",
      tagline: "End-to-End MERN Travel, Hotel & Reservation Platform",
      featured: true,
      description: "Full-stack MERN travel booking app allowing users to explore destinations, reserve hotels, book curated trips, make secure payments, and manage reservations via an intuitive dashboard.",
      features: [
        "Comprehensive destination discovery, hotel reservation, and trip booking flows",
        "Secure JWT auth, bcrypt password hashing, and protected route access",
        "Integrated Payment Gateway & real-time booking status confirmations",
        "Admin Dashboard to manage trips, hotel inventories, and user bookings",
        "Media asset uploads managed via Cloudinary and Multer"
      ],
      tech: ["React.js", "Vite", "React Router DOM", "Tailwind CSS", "Axios", "Zustand", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "bcrypt", "Cloudinary", "Multer"],
      github: "https://github.com/AnkitRana456/tripzy",
      live: "https://tripzy-xi.vercel.app/"
    },
    {
      id: "assetflow-erp",
      title: "AssetFlow ERP — Enterprise Asset & Resource Management System",
      tagline: "Enterprise Resource & Physical Asset Platform with AI Assistance",
      featured: false,
      description: "Enterprise-grade ERP platform built for the Odoo Hackathon to manage physical assets, shared resources, maintenance workflows, audit cycles, and executive analytics across organizations.",
      features: [
        "QR/Barcode generation for asset registration & audit verification workflows",
        "Resource booking (rooms/vehicles/equipment) with real-time conflict detection",
        "AI Assistant powered by Google Gemini for natural language search & maintenance prediction",
        "Real-time notifications via Socket.io and automated PDF/Excel report exports"
      ],
      tech: ["React 19", "TailwindCSS", "shadcn/ui", "Framer Motion", "TanStack Query", "Zustand", "Recharts", "Node.js", "Express.js", "MongoDB", "JWT", "Socket.io", "Google Gemini API", "Docker"],
      github: "https://github.com/AnkitRana456/AssetFlow-ERP",
      live: null
    },
    {
      id: "hotel-booking",
      title: "Hotel Booking Platform",
      tagline: "Full-Stack Hotel Management & Reservation System",
      featured: false,
      description: "Full-stack MERN hotel booking platform featuring hotel listings management, room reservations, user reviews, and administrative monitoring dashboards.",
      features: [
        "Seamless Clerk authentication integration for frictionless user login",
        "Cloudinary image management for hotel property and room showcases",
        "Interactive room availability scheduling & user review system",
        "Clean REST API architecture backed by MongoDB Atlas"
      ],
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Clerk", "Cloudinary", "Tailwind CSS"],
      github: "[YOUR_GITHUB_LINK]",
      live: "[YOUR_LIVE_DEMO_LINK]"
    }
  ],

  achievements: [
    {
      title: "1500+ DSA Problems Solved",
      subtitle: "LeetCode & GeeksforGeeks",
      description: "Demonstrated strong computational problem-solving and algorithmic mastery across arrays, trees, dynamic programming, and graphs.",
      badge: "1500+ DSA",
      color: "mint"
    },
    {
      title: "LeetCode Peak Rating 1860",
      subtitle: "Top Competitive Programmer",
      description: "Achieved a peak contest rating of 1860 with 1000+ problems solved on LeetCode.",
      badge: "Rating 1860",
      color: "amber"
    },
    {
      title: "National Hackathon Competitor",
      subtitle: "SIH, EY, Odoo & HackWithMAIT 5.0",
      description: "Participated in high-stakes national hackathons: Smart India Hackathon (SIH), EY Techathon, Odoo Hackathon, and HackWithMAIT 5.0.",
      badge: "Hackathons",
      color: "mint"
    }
  ],

  education: [
    {
      institution: "Maharaja Agrasen Institute of Technology (MAIT)",
      degree: "B.Tech in Computer Science and Technology",
      period: "Sep 2023 – June 2027",
      grade: "CGPA 9.20 / 10",
      location: "Delhi, India"
    },
    {
      institution: "Karnal International School",
      degree: "Senior Secondary (Class XII)",
      period: "2023",
      grade: "89.6%",
      location: "Karnal, Haryana"
    }
  ],

  socials: [
    { name: "GitHub", url: "https://github.com/AnkitRana456", icon: "Github" },
    { name: "LinkedIn", url: "https://linkedin.com/in/ankit-rana", icon: "Linkedin" },
    { name: "LeetCode", url: "https://leetcode.com/AnkitRana", icon: "Code" },
    { name: "GeeksforGeeks", url: "https://geeksforgeeks.org/user/ankitrana", icon: "Terminal" },
    { name: "CodeChef", url: "https://codechef.com/users/ankitrana", icon: "Award" },
    { name: "Email", url: "mailto:ankitrana210704@gmail.com", icon: "Mail" },
    { name: "Phone", url: "tel:8814073730", icon: "Phone" }
  ]
};
