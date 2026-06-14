export const profile = {
  name: 'Md. Mehedi Hasan Polash',
  role: 'MERN Stack Developer',
  tagline:
    'MERN Stack Developer at NEXOGS Systems Ltd, building full-stack apps with React, Node.js, ' +
    'Express & MongoDB — and a Cisco CCNA networking enthusiast.',
  about:
    'I am a Computer Science graduate working as a MERN Stack Developer at NEXOGS Systems Ltd, ' +
    'building and shipping full-stack web applications with React, Node.js, Express and MongoDB. ' +
    'I have built and deployed multiple end-to-end applications, and I have a strong passion for ' +
    'computer networking — routing, switching and IP subnetting (Cisco CCNA). I love turning ideas ' +
    'into clean, performant products.',
  location: 'Dhaka, Bangladesh',
  email: 'polashmehedi33@gmail.com',
  phone: '+880 1611 940 521',
  resumeUrl: '/mehedi_cv.pdf',
  photoUrl: '/m.png',
  socials: {
    github: 'https://github.com/mehedipolash',
    linkedin: 'https://www.linkedin.com/in/m-mehedi-hasan-polash',
  },
}

// Current & past roles. Newest first.
export const experience = [
  {
    role: 'MERN Stack Developer Intern',
    company: 'NEXOGS SYSTEMS LTD',
    period: 'Present',
    current: true,
    location: 'Dhaka, Bangladesh',
    summary:
      'Building and shipping full-stack features with the MERN stack (MongoDB, Express, React, Node.js) ' +
      'as part of the engineering team — developing REST APIs, responsive React interfaces and ' +
      'database-backed application logic in an Agile workflow.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'REST API'],
  },
]

// Skill groups rendered as a professional icon grid.
// `icon` is a Devicon slug (https://devicon.dev) loaded from the jsDelivr CDN.
export const skillGroups = [
  {
    label: 'Languages',
    skills: [
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Python', icon: 'python' },
      { name: 'Java', icon: 'java' },
      { name: 'C++', icon: 'cplusplus' },
      { name: 'PHP', icon: 'php' },
    ],
  },
  {
    label: 'Frontend',
    skills: [
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS3', icon: 'css3' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'Framer Motion', icon: 'framermotion' },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Nest.js', icon: 'nestjs' },
      { name: 'Express', icon: 'express' },
      { name: 'REST API', icon: 'fastapi' },
      { name: 'JWT Auth', icon: 'jsonwebtokens' },
    ],
  },
  {
    label: 'Tools & Databases',
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'Firebase', icon: 'firebase' },
      { name: 'Postman', icon: 'postman' },
      { name: 'Figma', icon: 'figma' },
      { name: 'Vercel', icon: 'vercel' },
    ],
  },
  {
    label: 'Networking',
    skills: [
      { name: 'Cisco Packet Tracer', icon: 'cisco' },
      { name: 'Routing & Switching', icon: 'cisco' },
      { name: 'VLSM Subnetting', icon: 'cisco' },
      { name: 'OSI / TCP-IP', icon: 'cisco' },
    ],
  },
]

// Fallback badges shown before/if the live Credly fetch returns nothing.
export const fallbackBadges = [
  {
    name: 'IT Essentials',
    issuer: 'Cisco Networking Academy',
    image: '',
    url: 'https://www.netacad.com/',
  },
]

export const projects = [
  {
    title: 'CareerCode — Job Portal',
    description:
      'A full-stack job portal where seekers browse remote jobs by category, apply with ' +
      'resume/LinkedIn/GitHub, and track application status (Pending → Interview → Hired), ' +
      'while recruiters post listings and review applicants. Google/Email auth, protected ' +
      'routes, light/dark toggle and a real-time stats dashboard.',
    tags: ['React 19', 'React Router v7', 'Framer Motion', 'Firebase', 'MongoDB'],
    image: '/projects/careercode.png',
    link: 'https://career-code-7eae1.web.app/',
    repo: 'https://github.com/mehedipolash/carrer-code-client',
  },
  {
    title: 'PassionLoop — Hobby Group Organizer',
    description:
      'A hobby-group community platform to discover, create, join and manage local groups ' +
      'around shared interests. Firebase auth, protected routes, live search & category ' +
      'filtering, animated cards and pagination. React client with a Node/Express + MongoDB API.',
    tags: ['React', 'Firebase', 'Node.js', 'Express', 'MongoDB'],
    image: '/projects/passionloop.png',
    link: 'https://passionloop-b71a5.web.app/',
    repo: 'https://github.com/mehedipolash/PASSIONLOOP-CLIENT',
  },
  {
    title: 'CareerFusion — Job Portal Web App',
    description:
      'A job portal to explore companies, browse job listings and manage a personal profile. ' +
      'Firebase Auth (Email/Password + Google), private routes, forgot-password and profile ' +
      'update, with an animated UI built on Framer Motion and Tailwind CSS + DaisyUI.',
    tags: ['React 19', 'Firebase', 'React Router', 'Framer Motion', 'DaisyUI'],
    image: '/projects/careerfusion.png',
    link: 'https://careerfusion-44fab.web.app/',
    repo: 'https://github.com/mehedipolash/CAREERFUSION',
  },
  {
    title: 'EventHub — Event Management Platform',
    description:
      'A modern full-stack event management platform for event discovery, registration and ' +
      'management. Next.js 14 App Router + TypeScript frontend with an SEO and accessibility ' +
      'focus, backed by a Nest.js + PostgreSQL API with role-based access control.',
    tags: ['Next.js 14', 'TypeScript', 'Nest.js', 'PostgreSQL'],
    link: '',
    repo: 'https://github.com/mehedipolash/Advanced-web-technology-Event-Hub-Management-Frontend',
  },
  {
    title: 'Coffee Management',
    description:
      'A full-stack coffee management app with Firebase authentication, full coffee CRUD and ' +
      'user management on a responsive Tailwind + DaisyUI UI. React 18 + Vite client with a ' +
      'Node/Express + MongoDB Atlas backend.',
    tags: ['React 18', 'Firebase', 'Express', 'MongoDB', 'DaisyUI'],
    image: '/projects/coffee.png',
    link: 'https://coffee-store-app-77cb4.web.app/',
    repo: 'https://github.com/mehedipolash/coffee-management-client',
  },
  {
    title: 'Medical Appointment System',
    description:
      'A React app for scheduling and managing doctor appointments — multiple pages, routing, ' +
      'localStorage persistence and chart-based visualizations of booking data.',
    tags: ['React', 'React Router', 'Charts', 'localStorage'],
    image: '/projects/medical.png',
    link: 'https://medical-appointment-system-using-reac.netlify.app/',
    repo: 'https://github.com/mehedipolash/Medical-Appointment-System',
  },
]

export const education = [
  {
    school: 'American International University–Bangladesh (AIUB)',
    detail: 'B.Sc. in Computer Science & Engineering · CGPA 3.73 / 4.00',
    period: 'Jan 2022 – 2025',
  },
  {
    school: 'Police Lines School & College, Rangpur',
    detail: 'HSC — Science · GPA 5.00',
    period: '2019',
  },
  {
    school: 'Birampur Pilot High School, Dinajpur',
    detail: 'SSC — Science · GPA 5.00',
    period: '2017',
  },
]

export const certifications = [
  'IT Essentials — Cisco Networking Academy',
  'Complete Web Development — Programming Hero',
]
