import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Menu, X, Github, Linkedin, ExternalLink, 
  Code, Terminal, ChevronRight, 
  MessageSquare, Send, Sparkles, Globe, Server, ArrowRight
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

// --- UTILS ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- REUSABLE UI COMPONENTS ---

const PageContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
    className={`min-h-screen pt-24 px-6 md:px-12 lg:px-24 pb-20 ${className}`}
  >
    {children}
  </motion.div>
);

const GlassCard = ({ children, className = "", hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) => (
  <div className={`
    bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 
    shadow-[0_0_15px_rgba(0,0,0,0.2)] 
    ${hover ? 'hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300' : ''}
    ${className}
  `}>
    {children}
  </div>
);

const GradientText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 ${className}`}>
    {children}
  </span>
);

// --- LAYOUT COMPONENTS ---

const Navbar = () => {
  const { lang, toggleLang, t } = React.useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.skills, path: '/skills' },
    { name: t.nav.projects, path: '/projects' },
    { name: t.nav.contact, path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-lg border-b border-white/5 py-4' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-display font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-mono text-lg">M</span>
          </div>
          <span className="text-slate-100">Mikeyas<span className="text-cyan-400">.Tech</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-sm font-medium transition-colors relative group ${isActive(link.path) ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.div layoutId="underline" className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-400 rounded-full" />
              )}
            </Link>
          ))}
          <button 
            onClick={toggleLang}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-cyan-500/50 transition-colors text-xs font-mono text-cyan-300"
          >
            <Globe size={14} />
            {lang === 'EN' ? 'AM' : 'EN'}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
            <button 
                onClick={toggleLang}
                className="flex items-center gap-1 text-xs font-mono text-cyan-300"
            >
                {lang === 'EN' ? 'AM' : 'EN'}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-200">
                {isOpen ? <X /> : <Menu />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-white/10 md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium ${isActive(link.path) ? 'text-cyan-400' : 'text-slate-300'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- PAGE COMPONENTS ---

const HomePage = () => {
  const { t } = React.useContext(LanguageContext);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-6">
      {/* Animated Background Elements */}
      <motion.div style={{ y: y1 }} className="absolute top-20 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
      <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px] -z-10" />

      <div className="max-w-4xl mx-auto text-center z-10 mt-10 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-xs font-mono text-slate-300">{t.hero.location}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
            {t.hero.greeting} <br />
            <GradientText>Mikeyas</GradientText>
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-slate-400 font-light mb-8">
            {t.hero.role}
          </h2>
          
          <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
            {t.hero.tagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/projects"
              className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center gap-2"
            >
              {t.hero.cta} <ArrowRight size={18} />
            </Link>
            <div className="flex gap-4">
              <SocialLink icon={<Github size={20} />} href="#" />
              <SocialLink icon={<Linkedin size={20} />} href="#" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const SocialLink = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-slate-800/50 border border-white/10 hover:bg-white/10 hover:text-cyan-400 transition-all">
    {icon}
  </a>
);

const AboutPage = () => {
  const { t } = React.useContext(LanguageContext);
  
  return (
    <PageContainer>
       <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-display font-bold mb-4"><GradientText>{t.nav.about}</GradientText></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full mb-8"></div>
          
          <div className="grid gap-6 text-slate-300 leading-relaxed text-lg">
             {t.about.content.map((paragraph, idx) => (
               <p key={idx}>{paragraph}</p>
             ))}
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold text-slate-100 mb-8 flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center text-cyan-400">
              <Terminal size={18} />
            </div>
            {t.nav.experience}
          </h3>
          
          <div className="relative border-l border-white/10 ml-3 md:ml-4 space-y-12">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="relative pl-8 md:pl-12">
                {/* Dot */}
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                
                <GlassCard className="relative">
                  <span className="text-sm font-mono text-cyan-400 mb-2 block">{exp.period}</span>
                  <h3 className="text-xl font-bold text-slate-100">{exp.role}</h3>
                  <h4 className="text-lg text-slate-400 mb-4">{exp.company}</h4>
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                        <ChevronRight size={16} className="mt-0.5 text-purple-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

const SkillsPage = () => {
  const { t } = React.useContext(LanguageContext);
  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12">
          <h2 className="text-4xl font-display font-bold mb-4"><GradientText>{t.nav.skills}</GradientText></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILLS.map((category, idx) => (
            <GlassCard key={idx} className="h-full">
              <div className="mb-4 p-3 bg-cyan-500/10 rounded-lg w-fit">
                {category.name.includes('Frontend') && <Code className="text-cyan-400" />}
                {category.name.includes('Backend') && <Server className="text-purple-400" />}
                {category.name.includes('DevOps') && <Terminal className="text-green-400" />}
                {category.name.includes('AI') && <Sparkles className="text-yellow-400" />}
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-200">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 text-xs font-mono rounded-md bg-white/5 border border-white/5 text-slate-400">
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

const ProjectsPage = () => {
  const { t } = React.useContext(LanguageContext);
  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <h2 className="text-4xl font-display font-bold mb-4"><GradientText>{t.nav.projects}</GradientText></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <GlassCard key={project.id} className="group overflow-hidden p-0">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-950/60 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-4">
                    {project.demoLink && (
                      <a href={project.demoLink} className="p-3 bg-cyan-600 rounded-full text-white hover:scale-110 transition-transform">
                        <ExternalLink size={20} />
                      </a>
                    )}
                    {project.repoLink && (
                      <a href={project.repoLink} className="p-3 bg-slate-800 rounded-full text-white hover:scale-110 transition-transform">
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-mono text-cyan-400 border border-cyan-500/30">
                  {project.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-slate-100">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-xs text-slate-500">#{tech}</span>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

const ContactPage = () => {
  const { t } = React.useContext(LanguageContext);
  return (
    <PageContainer>
       <div className="max-w-3xl mx-auto text-center mt-10">
        <h2 className="text-4xl font-display font-bold mb-4"><GradientText>{t.nav.contact}</GradientText></h2>
        <p className="text-slate-400 mb-12">
          Interested in building something futuristic? Let's talk.
        </p>

        <GlassCard className="text-left">
          <form className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Email</label>
              <input type="email" className="w-full bg-slate-950/50 border border-white/10 rounded-lg p-3 text-slate-200 focus:border-cyan-500 outline-none" placeholder="you@example.com" />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Message</label>
              <textarea rows={5} className="w-full bg-slate-950/50 border border-white/10 rounded-lg p-3 text-slate-200 focus:border-cyan-500 outline-none" placeholder="Hello Mikeyas..." />
            </div>
            <button type="button" className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white font-bold hover:opacity-90 transition-opacity">
              Send Message
            </button>
          </form>
        </GlassCard>

        <div className="mt-12 flex justify-center gap-8 text-slate-500">
          <a href="#" className="hover:text-cyan-400 transition-colors">GitHub</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a>
        </div>
        <p className="mt-8 text-xs text-slate-700">© 2024 Mikeyas.Tech. Built with React & Gemini.</p>
      </div>
    </PageContainer>
  );
};

const ChatBot = () => {
  const { t } = React.useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Hi! I'm Mikeyas's AI assistant. Ask me anything about his skills or projects." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await generateBotResponse(userMsg);
    
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-110 transition-transform"
      >
        {isOpen ? <X /> : <MessageSquare />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[350px] h-[500px] z-50 flex flex-col"
          >
            <GlassCard className="h-full flex flex-col p-0 overflow-hidden bg-slate-950/90">
              {/* Header */}
              <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-100">AI Assistant</h3>
                  <p className="text-xs text-slate-400">Powered by Gemini</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-cyan-600 text-white rounded-tr-none' 
                        : 'bg-slate-800 text-slate-200 border border-white/10 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none text-xs text-slate-400 animate-pulse">
                      {t.chat.thinking}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10 bg-white/5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={t.chat.placeholder}
                    className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={loading}
                    className="p-2 bg-cyan-600 rounded-lg text-white hover:bg-cyan-500 disabled:opacity-50"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- MAIN APP COMPONENT ---

function App() {
  const [lang, setLang] = useState<Language>('EN');

  const toggleLang = () => {
    setLang(prev => prev === 'EN' ? 'AM' : 'EN');
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t: TRANSLATIONS[lang] }}>
      <Router>
        <ScrollToTop />
        <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200 font-sans">
          <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
          
          <Navbar />
          <main className="relative z-10">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          
          <ChatBot />
        </div>
      </Router>
    </LanguageContext.Provider>
  );
}

export default App;