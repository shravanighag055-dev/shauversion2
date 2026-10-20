/* ==========================================================================
   SITE DATA — edit this file to update projects, certificates and contact info.
   Everything below comes from your resume and uploaded certificates.
   Leave a link as "" (empty) and its button is hidden automatically.
   ========================================================================== */

window.SITE = {
  name: "Shravani Ghag",
  email: "shravanighag055@gmail.com",
  github: "https://github.com/shravanighag055-dev",
  linkedin: "https://www.linkedin.com/in/shravani-ghag-b369a62b4/",
  resume: "assets/resume/Shravani_Ghag_Resume.pdf",
  // Optional: paste a Formspree (or similar) endpoint to send form messages
  // without opening the visitor's email app. Leave "" to use mailto.
  formEndpoint: ""
};

/* Project categories used by the filter bar */
window.PROJECTS = [
  {
    id: "expensetracker-pro-elite",
    title: "ExpenseTracker Pro Elite",
    category: "Web Development",
    kind: "Personal finance web app",
    period: "Apr 2026 – May 2026",
    problem: "Keeping track of income, expenses, savings and goals in one place.",
    summary: "A responsive finance app with analytics dashboards, transaction management and PDF reports.",
    tech: ["HTML5", "CSS3", "JavaScript", "Chart.js", "LocalStorage", "html2pdf.js"],
    contribution: [
      "Developed a responsive finance management application for income, expenses, savings and goals.",
      "Implemented interactive analytics dashboards, transaction management and PDF report generation.",
      "Designed a modern fintech-inspired interface with dark/light mode support.",
      "Used LocalStorage for persistent client-side data storage."
    ],
    github: "", demo: ""
  },
  {
    id: "resumeforge-ai",
    title: "ResumeForge AI",
    category: "Web Development",
    kind: "AI-powered resume builder",
    period: "May 2026 – Jun 2026",
    problem: "Making it simpler to create a clean, ATS-friendly resume.",
    summary: "An ATS-friendly resume builder with live preview, customizable templates, AI-assisted summaries and PDF export.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    contribution: [
      "Built an ATS-friendly resume builder with real-time preview and customizable templates.",
      "Integrated AI-assisted summary generation and PDF export.",
      "Designed a responsive multi-step workflow to simplify resume creation."
    ],
    github: "", demo: ""
  },
  {
    id: "hospital-management-system",
    title: "Hospital Management System",
    category: "Web Development",
    kind: "Web-based healthcare management",
    period: "Jul 2026 – Aug 2026",
    problem: "Organizing patients, doctors, appointments and billing in one system.",
    summary: "A web-based hospital management system with a responsive interface and database integration.",
    tech: ["HTML5", "CSS3", "JavaScript", "Oracle APEX", "SQL"],
    contribution: [
      "Developed a web-based system to manage patients, doctors, appointments and billing.",
      "Implemented a responsive interface with database integration for organized record management.",
      "Designed modules to streamline hospital operations and improve data accessibility."
    ],
    github: "", demo: ""
  },
  {
    id: "justicegrid",
    title: "JusticeGrid",
    category: "Web Development",
    kind: "Legal-technology platform",
    period: "2026",
    problem: "Improving access to legal and justice-related information.",
    summary: "A platform that presents legal information in an organized, user-friendly way, with AI-assisted discovery explored.",
    tech: ["HTML5", "CSS3", "JavaScript", "AI", "Web Technologies"],
    contribution: [
      "Developed a platform focused on improving access to legal and justice-related information.",
      "Designed an intuitive interface to organize and present legal information.",
      "Explored AI-assisted features to simplify information discovery.",
      "Implemented a responsive, accessible interface."
    ],
    github: "", demo: ""
  },
  {
    id: "tenderlens",
    title: "TenderLens",
    category: "Web Development",
    kind: "Tender analysis web application",
    period: "2026",
    problem: "Understanding important requirements buried in tender documents.",
    summary: "A web application for analyzing and organizing tender information into a clear, structured view.",
    tech: ["HTML5", "CSS3", "JavaScript", "AI", "Data Processing"],
    contribution: [
      "Developed a web-based application for analyzing and organizing tender information.",
      "Designed an interface to help users extract and understand key tender requirements.",
      "Implemented structured tender analysis features to simplify document-based processing."
    ],
    github: "", demo: ""
  },
  {
    id: "skill-gap-analyzer",
    title: "Skill Gap Analyzer",
    category: "Programming",
    kind: "Job skill analysis platform",
    period: "2026",
    problem: "Seeing which skills are missing for a chosen job role.",
    summary: "Compares a user's skills with those required for a selected role and highlights the gaps, with a web interface.",
    tech: ["C++", "OOP", "HTML5", "CSS3", "JavaScript"],
    contribution: [
      "Developed a system that compares user skills with the skills required for a job role.",
      "Implemented functionality to identify and present missing skills clearly.",
      "Applied OOP concepts including classes, member functions and friend functions.",
      "Built a web-based interface for a more interactive experience."
    ],
    github: "", demo: ""
  },
  {
    id: "chandrayaan-2-image-registration",
    title: "Chandrayaan-2 Lunar Image Registration",
    category: "AI & Data",
    kind: "AI-assisted image matching system",
    period: "2026",
    problem: "Registering and matching lunar surface images captured by Chandrayaan-2 instruments.",
    summary: "An image-processing pipeline with feature matching, RANSAC validation and a dashboard backed by FastAPI and Supabase.",
    tech: ["React.js", "Python", "FastAPI", "OpenCV", "Supabase", "Computer Vision"],
    contribution: [
      "Implemented a pipeline: preprocessing, feature detection, feature matching, Lowe ratio test, RANSAC validation and homography estimation.",
      "Integrated quality metrics such as RMSE and match confidence.",
      "Built a responsive dashboard with image previews, processing stages, results and registration history.",
      "Integrated a FastAPI backend with Supabase to store and retrieve registration records."
    ],
    github: "", demo: ""
  },
  {
    id: "customer-lifecycle-health-detector",
    title: "Customer Lifecycle Health Detector",
    category: "AI & Data",
    kind: "Customer analytics & classification",
    period: "2026",
    problem: "Judging the health of customers across their lifecycle from a large dataset.",
    summary: "A workflow from raw data to cleaning, segmentation, pattern detection, health classification and business insights.",
    tech: ["Altair AI Studio", "Data Analytics", "Machine Learning", "Data Preprocessing"],
    contribution: [
      "Developed an analytics workflow to evaluate customer lifecycle health on a large customer dataset.",
      "Implemented data cleaning and preprocessing.",
      "Performed customer segmentation and pattern detection.",
      "Classified customers by lifecycle health and generated business-oriented insights."
    ],
    github: "", demo: ""
  },
  {
    id: "library-management-system",
    title: "Library Management System",
    category: "Programming",
    kind: "Menu-driven C application",
    period: "Mar 2026 – Present",
    problem: "Managing books, student records and library transactions.",
    summary: "A menu-driven C program with search, issue, return and update features, using file handling for storage.",
    tech: ["C Programming", "File Handling"],
    contribution: [
      "Developed a menu-driven system for books, student records and library transactions.",
      "Implemented search, issue, return, update and record management.",
      "Applied file handling for efficient data storage and retrieval."
    ],
    github: "", demo: ""
  },
  {
    id: "hill-cipher-cryptography",
    title: "Hill Cipher Cryptography",
    category: "Programming",
    kind: "Encryption algorithm in C",
    period: "Sep 2025 – Oct 2025",
    problem: "Understanding how matrix-based ciphers secure communication.",
    summary: "An implementation of Hill Cipher encryption and decryption using matrix operations and modular arithmetic.",
    tech: ["C Programming", "Cryptography", "Matrix Operations"],
    contribution: [
      "Implemented Hill Cipher encryption and decryption using matrix operations.",
      "Applied modular arithmetic concepts to secure communication.",
      "Strengthened understanding of cryptography and algorithm design."
    ],
    github: "", demo: ""
  },
  {
    id: "guess-the-number-game",
    title: "Guess the Number Game",
    category: "Programming",
    kind: "Command-line game",
    period: "Feb 2025",
    problem: "Practising core programming logic through a simple interactive game.",
    summary: "A command-line number guessing game built in a Linux environment.",
    tech: ["Linux", "Programming Fundamentals"],
    contribution: [
      "Developed a command-line number guessing game in a Linux environment.",
      "Implemented user interaction, random number generation and logical decision-making."
    ],
    github: "", demo: ""
  },
  {
    id: "music-web-page",
    title: "Music Web Page",
    category: "Web Development",
    kind: "Responsive themed website",
    period: "Mar 2025",
    problem: "Practising responsive layouts and modern web design.",
    summary: "A responsive, music-themed website built with HTML and CSS.",
    tech: ["HTML5", "CSS3"],
    contribution: [
      "Designed and developed a responsive music-themed website.",
      "Applied modern web design principles and responsive layouts."
    ],
    github: "", demo: ""
  },
  {
    id: "led-bjt-transistor",
    title: "ON/OFF LED Using BJT Transistor",
    category: "Other",
    kind: "Electronics project",
    period: "Feb 2026 – Mar 2026",
    problem: "Learning how a transistor can act as an electronic switch.",
    summary: "A BC547 NPN transistor switching circuit built and tested on breadboard and PCB.",
    tech: ["Electronics", "PCB Design", "Circuit Assembly"],
    contribution: [
      "Designed and implemented a transistor-based switching circuit using a BC547 NPN transistor.",
      "Built and tested the circuit on breadboard and PCB platforms."
    ],
    github: "", demo: ""
  },
  {
    id: "series-parallel-analysis",
    title: "Series & Parallel Connection Analysis",
    category: "Other",
    kind: "Electrical circuits experiment",
    period: "Oct 2025 – Dec 2025",
    problem: "Comparing how series and parallel circuits behave in practice.",
    summary: "An experimental study of voltage, current, equivalent resistance and power, verified against theory.",
    tech: ["Circuit Analysis", "Electrical Engineering"],
    contribution: [
      "Conducted experimental analysis of series and parallel circuits.",
      "Evaluated voltage distribution, current flow, equivalent resistance and power consumption.",
      "Verified theoretical calculations through practical implementation."
    ],
    github: "", demo: ""
  }
];

/* Certificates with files. "date" is shown only when printed on the certificate.
   file = original (opens in new tab); preview/thumb are generated images. */
window.CERTS = [
  { id: "datasprint-2026", title: "DataSprint 2026 — Analyze, Predict, Innovate", issuer: "Vidyalankar Polytechnic with Siemens", date: "5 Sep 2026", note: "State-level data science contest · 20 Jul–5 Sep 2026", category: "Data & AI", code: "", ext: "png", thumbExt: "png", previewExt: "png" },
  { id: "sih-internal-hackathon-2026", title: "SIH Internal Hackathon 2026", issuer: "Vidyalankar Polytechnic", date: "22 Aug 2026", note: "Team NovaForge · Internal Hackathon 2026", category: "Data & AI", code: "IH26-PAR-011", ext: "png", thumbExt: "png", previewExt: "png" },
  { id: "intro-cpp", title: "Introduction to C++", issuer: "Simplilearn SkillUp", date: "27 Sep 2026", category: "Programming", code: "10794165", ext: "pdf" },
  { id: "c-programming-basics", title: "C Programming Basics", issuer: "Simplilearn SkillUp", date: "19 Feb 2026", category: "Programming", code: "9865793", ext: "pdf" },
  { id: "database-fundamentals", title: "Introduction to the Fundamentals of Databases", issuer: "Simplilearn SkillUp", date: "3 Oct 2026", category: "Data & AI", code: "10830826", ext: "pdf" },
  { id: "master-data-management", title: "Master Data Management for Beginners", issuer: "TCS iON", date: "16 Oct 2026", category: "Data & AI", code: "71279-34231088-1016", ext: "pdf" },
  { id: "data-analytics-with-ai", title: "Data Analytics with AI", issuer: "Sololearn", date: "10 Jul 2026", category: "Data & AI", code: "CC-J4Z3K0V6", ext: "jpg" },
  { id: "deloitte-job-simulation", title: "Data Analytics Job Simulation", issuer: "Deloitte Australia (via Forage)", date: "31 Jul 2026", category: "Data & AI", code: "", ext: "png" },
  { id: "prompt-engineering", title: "Prompt Engineering", issuer: "Sololearn", date: "7 Jul 2026", category: "Data & AI", code: "CC-1ZFTAR1E", ext: "jpg" },
  { id: "content-led-seo", title: "Content-Led SEO with Brian Dean", issuer: "Semrush Academy", date: "", note: "Valid until 6 Jun 2027", category: "Digital Marketing", code: "fbb27c29eb", ext: "jpg" },
  { id: "mobile-seo", title: "How to Optimize for Mobile: The CRAFT of Mobile SEO", issuer: "Semrush Academy", date: "", note: "Valid until 6 Jun 2027", category: "Digital Marketing", code: "f128cd09a2", ext: "jpg" },
  { id: "on-page-seo", title: "On-Page SEO and AI Search Essentials", issuer: "Semrush Academy", date: "", note: "Valid until 6 Jun 2027", category: "Digital Marketing", code: "ed00dfec80", ext: "jpg" },
  { id: "ai-powered-marketer", title: "Become an AI-Powered Marketer", issuer: "Semrush Academy", date: "", note: "Valid until 6 Jun 2027", category: "Digital Marketing", code: "c047dad80d", ext: "jpg" },
  { id: "business-process-management", title: "Fundamentals of Business Process Management", issuer: "Simplilearn SkillUp", date: "10 Jun 2026", category: "Career & Business", code: "10331448", ext: "pdf" },
  { id: "interview-preparation", title: "Getting Started with Interview Preparation", issuer: "Simplilearn SkillUp", date: "17 Feb 2026", category: "Career & Business", code: "9855647", ext: "pdf" }
];

/* Listed on the resume, but no certificate file was uploaded.
   They appear as text only (no preview) until a file is added. */
window.OTHER_RECOGNITION = [
  "Data Science Exam Certificate — StudyGyaan (2026)",
  "Nexus: Where Prompts Become Products — Unstop (participation)",
  "Brain Blitz 2026, National Level Online Quiz — Unstop (participation)",
  "AI Prompt Art — Nehru Science Center, Worli",
  "SkillQuest Generative AI Literacy"
];

/* Skills grouped by category. No proficiency levels — only skills from the resume/projects. */
window.SKILLS = [
  { group: "Programming Languages", icon: "{ }", items: ["C", "C++", "Python", "JavaScript"] },
  { group: "Web Development", icon: "</>", items: ["HTML5", "CSS3", "JavaScript", "React.js", "FastAPI", "Chart.js", "Responsive Design", "SEO"] },
  { group: "Database Technologies", icon: "DB", items: ["SQL", "Oracle APEX", "Supabase", "LocalStorage"] },
  { group: "Tools & Platforms", icon: "⚙", items: ["Microsoft Excel", "Linux", "GitHub", "OpenCV", "Altair AI Studio", "html2pdf.js"] },
  { group: "Data Science & AI", icon: "AI", items: ["Data Analysis", "Data Preprocessing", "Machine Learning", "Computer Vision", "Prompt Engineering"] },
  { group: "Professional Skills", icon: "★", items: ["Problem Solving", "Communication", "Research & Documentation", "English", "Marathi", "Hindi"] }
];

window.SERVICES = [
  { title: "Personal portfolio websites", text: "A clean, fast site that presents your work, skills and story clearly.", icon: "◐" },
  { title: "Student resume websites", text: "Turn your resume, projects and certificates into a shareable online profile.", icon: "▤" },
  { title: "Landing pages", text: "Focused one-page sites for an event, product, service or campaign.", icon: "▭" },
  { title: "Small business websites", text: "Simple, mobile-friendly websites that explain what you offer and how to reach you.", icon: "⌂" },
  { title: "Basic frontend projects", text: "HTML, CSS and JavaScript pieces such as forms, calculators and interactive pages.", icon: "◇" },
  { title: "Website redesigns", text: "Refresh an existing site's layout, readability and mobile experience.", icon: "↻" }
];
