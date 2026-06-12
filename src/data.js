export const profile = {
  name: 'Md. Mehedi Hasan Polash',
  role: 'Aspiring Web Developer',
  tagline:
    'Web Developer & CCNA student building full-stack apps with React, Node.js & Nest.js — ' +
    'with a growing passion for computer networking.',
  about:
    'I am a Computer Science graduate and CCNA student skilled in full-stack web development ' +
    'with React, Firebase, Node.js and Nest.js. I have built and deployed multiple end-to-end ' +
    'applications, and I am growing a passion for computer networking — routing, switching ' +
    'and IP subnetting. I am eager to contribute as a frontend, full-stack or networking intern.',
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

// Real data: primary language across 60 public GitHub repos (mehedipolash).
// Computed via the GitHub API — this is repository share, not a self-rated skill level.
export const languages = [
  { name: 'JavaScript', level: 40 },
  { name: 'HTML', level: 38 },
  { name: 'CSS', level: 8 },
  { name: 'PHP', level: 7 },
  { name: 'TypeScript', level: 2 },
  { name: 'Java · C# · C++', level: 5 },
]

// From CV Technical Skills + the stacks actually used across the projects above.
export const stack = {
  Frontend: ['React', 'Next.js', 'React Router', 'Tailwind CSS', 'DaisyUI', 'Framer Motion'],
  Backend: ['Node.js', 'Nest.js', 'Express', 'REST API', 'JWT Auth'],
  'Tools & DB': ['Git', 'Firebase', 'MongoDB', 'PostgreSQL', 'MySQL', 'Vercel', 'Figma'],
  Networking: ['Subnetting (VLSM)', 'Routing & Switching', 'OSI / TCP-IP', 'Cisco Packet Tracer'],
}

export const projects = [
  {
    title: 'CareerCode — Job Portal',
    description:
      'A full-stack job portal where seekers browse remote jobs by category, apply with ' +
      'resume/LinkedIn/GitHub, and track application status (Pending → Interview → Hired), ' +
      'while recruiters post listings and review applicants. Google/Email auth, protected ' +
      'routes, light/dark toggle and a real-time stats dashboard.',
    tags: ['React 19', 'React Router v7', 'Framer Motion', 'Firebase', 'MongoDB'],
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
    link: 'https://coffee-store-app-77cb4.web.app/',
    repo: 'https://github.com/mehedipolash/coffee-management-client',
  },
  {
    title: 'Medical Appointment System',
    description:
      'A React app for scheduling and managing doctor appointments — multiple pages, routing, ' +
      'localStorage persistence and chart-based visualizations of booking data.',
    tags: ['React', 'React Router', 'Charts', 'localStorage'],
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
