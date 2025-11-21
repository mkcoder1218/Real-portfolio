import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, Variants } from 'framer-motion';
import { 
  Menu, X, Github, Linkedin, ExternalLink, 
  Code, Terminal, ChevronRight, 
  MessageSquare, Send, Sparkles, Globe, Server, ArrowRight, 
  Cpu, Database, Layout, Smartphone, ChevronDown
} from 'lucide-react';
import { TRANSLATIONS, PROJECTS, SKILLS, EXPERIENCES } from './constants';
import { Language } from './types';
import { generateBotResponse } from './services/geminiService';

// --- CONTEXT ---
const LanguageContext = React.createContext<{
  lang: Language;
  toggleLang: () => void;
  t: typeof TRANSLATIONS['EN'];
}>({
  lang: 'EN',
  toggleLang: () => {},
  t: TRANSLATIONS['EN']
});

// --- UTILS & HOOKS ---

// Handles scrolling to section based on URL path
const useScrollToSection = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Slight delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Remove leading slash and get id
      const path = pathname.replace('/', '');
      const sectionId = path === '' ? 'home' : path;
      
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80; // Height of navbar
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);
};

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// --- UI COMPONENTS ---

const SectionWrapper = ({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) => (
  <section id={id} className={`min-h-screen flex flex-col justify-center py-20 px-6 md:px-12 lg:px-24 relative overflow-hidden ${className}`}>
    {children}
  </section>
);

const GlassCard = ({ children, className = "", hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) => (
  <motion.div 
    variants={fadeInUp}
    className={`
      bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 
      shadow-[0_0_15px_rgba(0,0,0,0.2)] 
      ${hover