import { Experience, Project, SkillCategory, Translation } from './types';
import { Code, Globe, Server, Terminal, Cpu, Database, Layout, Smartphone } from 'lucide-react';

export const TRANSLATIONS: Record<string, Translation> = {
  EN: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hello, I'm",
      role: 'Full-Stack React/Next.js Engineer',
      tagline: 'Building scalable systems and AI-powered interfaces.',
      cta: 'View My Work',
      location: 'Addis Ababa, Ethiopia',
    },
    about: {
      title: 'About Me',
      content: [
        "I am a self-taught developer driven by ambition and a passion for clean architecture. After leaving the traditional education system to pursue practical mastery, I've spent the last 3+ years building large-scale systems.",
        "My expertise lies in the React ecosystem, but my curiosity pushes me towards AI, Python automation, and DevOps. I don't just write code; I build modular, scalable solutions that solve real problems."
      ]
    },
    chat: {
      placeholder: 'Ask my AI assistant about my skills...',
      askMe: 'Ask AI about me',
      thinking: 'Thinking...',
    }
  },
  AM: {
    nav: {
      home: 'መነሻ',
      about: 'ስለ እኔ',
      skills: 'ክህሎቶች',
      projects: 'ፕሮጀክቶች',
      experience: 'ልምድ',
      contact: 'ያግኙኝ',
    },
    hero: {
      greeting: "ሰላም፣ እኔ",
      role: 'ፉል-ስታክ ሪአክት/ኔክስት.ጄኤስ ኢንጂነር',
      tagline: 'ስኬለብል ሲስተሞችን እና በኤአይ የተደገፉ ኢንተርፌሶችን እገነባለሁ።',
      cta: 'ሥራዎቼን ይመልከቱ',
      location: 'አዲስ አበባ፣ ኢትዮጵያ',
    },
    about: {
      title: 'ስለ እኔ',
      content: [
        "እኔ በራሴ የተማርኩ፣ ለንጹህ አርክቴክቸር ከፍተኛ ፍላጎት ያለኝ ዴቨሎፐር ነኝ። ከተለምዷዊ ትምህርት ይልቅ በተግባር መማርን መርጬ፣ ላለፉት 3 ዓመታት ትላልቅ ሲስተሞችን በመገንባት አሳልፌአለሁ።",
        "ዋና ክህሎቴ በሪአክት ኢኮሲስተም ላይ ቢሆንም፣ ፍላጎቴ ወደ ኤአይ፣ ፓይተን እና ዴቭኦፕስ ያመራል። ኮድ ብቻ አልጽፍም፤ ለተወሳሰቡ ችግሮች መፍትሄ የሚሆኑ ሞጁላር ሲስተሞችን እገነባለሁ።"
      ]
    },
    chat: {
      placeholder: 'ስለ ክህሎቶቼ AI ይጠይቁ...',
      askMe: 'AIን ስለእኔ ይጠይቁ',
      thinking: 'እያሰበ ነው...',
    }
  }
};

export const SKILLS: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'Framer Motion', 'React Query'],
  },
  {
    name: 'Backend & Data',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Prisma', 'REST APIs', 'GraphQL'],
  },
  {
    name: 'DevOps & Tools',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'Git', 'Linux', 'AWS (Basic)'],
  },
  {
    name: 'AI & Automation',
    skills: ['Web Scraping (Selenium/Playwright)', 'Gemini API', 'Python Scripting', 'LangChain Concepts'],
  },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Ethio-RealEstate Map',
    description: 'A high-performance real estate platform using Next.js and Google Maps. Features cluster rendering for thousands of markers, Algolia search integration, and Redux state management.',
    techStack: ['Next.js', 'Google Maps API', 'Supercluster', 'Redux', 'Algolia'],
    image: 'https://picsum.photos/800/450?random=1',
    category: 'Fullstack',
    demoLink: '#',
    repoLink: '#',
  },
  {
    id: '2',
    title: 'ProBet Platform',
    description: 'A professional betting application with real-time odds updates, user wallet management, and dynamic slip calculation. Built for speed and reliability under high load.',
    techStack: ['React', 'Node.js', 'Socket.io', 'Tailwind'],
    image: 'https://picsum.photos/800/450?random=2',
    category: 'Fullstack',
    demoLink: '#',
  },
  {
    id: '3',
    title: 'Enterprise Admin Dashboard',
    description: 'A multi-tenant admin panel featuring dynamic resizing modals, multi-language support (i18n), and complex data visualization using D3/Recharts.',
    techStack: ['React', 'TypeScript', 'Recharts', 'i18n'],
    image: 'https://picsum.photos/800/450?random=3',
    category: 'Frontend',
    repoLink: '#',
  },
  {
    id: '4',
    title: 'AutoScraper Suite',
    description: 'A collection of automated bots built with Python and Node.js for scraping market data and automating repetitive browser tasks.',
    techStack: ['Python', 'Selenium', 'Puppeteer', 'Cron'],
    image: 'https://picsum.photos/800/450?random=4',
    category: 'Automation',
    repoLink: '#',
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: '1',
    role: 'Senior Frontend Engineer',
    company: 'Tech Startup (Addis Ababa)',
    period: '2023 - Present',
    description: [
      'Leading the frontend migration from legacy code to Next.js 14.',
      'Implementing design systems and reusable component libraries.',
      'Mentoring junior developers on TypeScript best practices.'
    ],
  },
  {
    id: '2',
    role: 'Full-Stack Developer',
    company: 'Freelance / Contract',
    period: '2021 - 2023',
    description: [
      'Built the "ProBet" platform from scratch.',
      'Developed custom automation scripts for international clients.',
      'Collaborated with designers to implement pixel-perfect UIs.'
    ],
  },
];
