export type Language = 'EN' | 'AM';

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  demoLink?: string;
  repoLink?: string;
  category: 'Frontend' | 'Fullstack' | 'Automation' | 'AI';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Translation {
  nav: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    experience: string;
    contact: string;
  };
  hero: {
    greeting: string;
    role: string;
    tagline: string;
    cta: string;
    location: string;
  };
  about: {
    title: string;
    content: string[];
  };
  chat: {
    placeholder: string;
    askMe: string;
    thinking: string;
  }
}