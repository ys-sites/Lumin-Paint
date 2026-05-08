/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle, Star, Phone, Mail, MapPin, ChevronDown, Instagram, Clock, ShieldCheck, Sparkles, Facebook, Quote, ChevronLeft, ChevronRight, Globe, Image as ImageIcon } from "lucide-react";
import { translations } from "./translations";
import ShinyText from "./components/ShinyText";


// Error Boundary Component
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4 text-center">
          <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-neutral-200">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Something went wrong</h2>
            <p className="text-neutral-600 mb-6">The application encountered an unexpected error. Please try refreshing the page.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              Refresh Page
            </button>
            {import.meta.env.DEV && (
              <pre className="mt-6 p-4 bg-neutral-100 rounded text-left text-xs overflow-auto max-h-40">
                {this.state.error?.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}



// Detect mobile for animation optimization
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: isMobile ? 0.5 : 0.7, delay: isMobile ? 0 : delay, ease: "easeOut" }}
      className={className}
      style={{ transform: "translateZ(0)" }}
    >
      {children}
    </motion.div>
  );
};

const Section = ({ children, className = "", innerClassName = "", id, delay = 0 }: { children: React.ReactNode; className?: string; innerClassName?: string; id?: string; delay?: number }) => {
  const isMobile = useIsMobile();
  
  return (
    <section id={id} className={`py-20 px-6 ${className}`}>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0 : delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`max-w-6xl mx-auto ${innerClassName}`}
        style={{ transform: "translateZ(0)" }}
      >
        {children}
      </motion.div>
    </section>
  );
};


const Logo = ({ className = "" }: { className?: string }) => (
  <img 
    src="/images/Lumin Paint pro.png" 
    alt="Lumin Paint Pro logo" 
    className={`${className} object-contain`} 
    decoding="async"
  />
);



const Card = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number; key?: React.Key }) => {
  const isMobile = useIsMobile();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: isMobile ? 0.5 : 0.7, delay: isMobile ? 0 : delay }}
      whileHover={!isMobile ? { y: -10, boxShadow: "0px 15px 30px rgba(0,0,0,0.08)" } : {}}
      className={`p-8 bg-white border border-neutral-200 shadow-sm rounded-2xl transition-all ${className}`}
      style={{ transform: "translateZ(0)" }}
    >
      {children}
    </motion.div>
  );
};

const BeforeAfterCard = ({ title, category, beforeSrc, afterSrc }: { title: string; category: string; beforeSrc: string; afterSrc: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="rounded-[32px] overflow-hidden bg-white border border-neutral-100 shadow-2xl shadow-neutral-200/50 flex flex-col h-full"
      style={{ transform: "translateZ(0)" }}
    >
      <div className="p-6 md:p-8 text-center border-b border-neutral-50 bg-neutral-50/30">
        <div className="flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-3">
          <ShinyText text={category} color="#b91c1c" shineColor="#D4AF37" speed={4} />
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900">{title}</h3>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4 md:p-5 bg-neutral-50/50 flex-grow">
        <div className="relative rounded-2xl overflow-hidden bg-white border border-neutral-100 shadow-sm p-2 flex flex-col hover:shadow-md transition-shadow group/img h-full">
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-white/90 backdrop-blur-md text-neutral-900 border border-neutral-200 shadow-sm text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em] py-1 px-2.5 rounded-full">Before</span>
          </div>
          <img src={beforeSrc} alt={`${category} before`} className="w-full aspect-[4/5] sm:aspect-square object-cover rounded-xl group-hover/img:scale-[1.02] transition-transform duration-500" loading="lazy" decoding="async" />
        </div>
        
        <div className="relative rounded-2xl overflow-hidden bg-white border border-neutral-100 shadow-sm p-2 flex flex-col hover:shadow-md transition-shadow group/img h-full">
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-primary/95 backdrop-blur-md text-white border border-primary/20 shadow-sm text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em] py-1 px-2.5 rounded-full">After</span>
          </div>
          <img src={afterSrc} alt={`${category} after`} className="w-full aspect-[4/5] sm:aspect-square object-cover rounded-xl group-hover/img:scale-[1.02] transition-transform duration-500" loading="lazy" decoding="async" />
        </div>
      </div>
    </motion.div>
  );
};

const interiorImagesModules = import.meta.glob('/public/images/INT*.jpeg', { eager: true });
const intImagesSource = Object.keys(interiorImagesModules).map(path => path.replace('/public', ''));

const InteriorImages = () => {
  // Use dynamically loaded interior images. If none found, fallback to placeholder array.
  const images = intImagesSource.length > 0 ? intImagesSource : [
    "/images/INT1.jpeg",
    "/images/INT2.jpeg",
    "/images/INT3.jpeg",
    "/images/INT4.jpeg",
    "/images/INT5.jpeg",
    "/images/INT6.jpeg",
    "/images/INT7.jpeg",
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((img, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.5 }}
          className="rounded-2xl overflow-hidden aspect-square shadow-md"
          style={{ transform: "translateZ(0)" }}
        >
          <img src={img} alt={`Interior ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
        </motion.div>
      ))}
    </div>
  );
};

const exteriorImagesModules = import.meta.glob('/public/images/EXT*.jpeg', { eager: true });
const extImagesSource = Object.keys(exteriorImagesModules).map(path => path.replace('/public', ''));

const ExteriorImages = () => {
  const images = extImagesSource.length > 0 ? extImagesSource : [
    "/images/EXT1.jpeg",
    "/images/EXT2.jpeg",
    "/images/EXT3.jpeg",
    "/images/EXT4.jpeg"
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((img, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.5 }}
          className="rounded-2xl overflow-hidden aspect-square shadow-md"
          style={{ transform: "translateZ(0)" }}
        >
          <img src={img} alt={`Exterior ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
        </motion.div>
      ))}
    </div>
  );
};

const FullPortfolio = () => {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-neutral-900">
          Our Complete Portfolio
        </h1>
        <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
          Browse through our extensive collection of completed residential and commercial painting projects.
        </p>
      </div>

      <div className="space-y-24">
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold border-b-[3px] border-gold pb-3 inline-block px-4">
              <ShinyText text="Exterior Painting" color="#171717" shineColor="#D4AF37" speed={4} />
            </h3>
          </div>
          <ExteriorImages />
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold border-b-[3px] border-gold pb-3 inline-block px-4">
              <ShinyText text="Interior Painting" color="#171717" shineColor="#D4AF37" speed={4} />
            </h3>
          </div>
          <InteriorImages />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

function AppContent() {
  const [lang, setLang] = React.useState<'en' | 'fr'>('en');
  const t = translations[lang];

  const [formData, setFormData] = React.useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    service: '',
    details: ''
  });
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [activePage, setActivePage] = React.useState<'home' | 'portfolio'>('home');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      /*
      // Original Webhook Logic (Commented out as requested)
      const response = await fetch('https://services.leadconnectorhq.com/hooks/o7aUwpKbtkP4AOP0pEjC/webhook-trigger/37f87a0e-bdb3-4e64-92d2-9a15eb22b56c', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      */

      // Send email via FormSubmit AJAX API — no backend required
      // On first submission, FormSubmit sends a one-time confirmation to sharafath2001@hotmail.com
      const response = await fetch('https://formsubmit.co/ajax/sharafath2001@hotmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: 'New Lead Notification – Lumin Paint Pro',
          // FormSubmit uses the field values below as the email body
          'Full Name': formData.fullName,
          'Phone Number': formData.phone,
          'Email Address': formData.email,
          'City': formData.city,
          'Service Requested': formData.service,
          'Additional Details': formData.details || '—',
          // Disable captcha redirect
          _captcha: 'false',
          _template: 'table',
        }),
      });

      const result = await response.json();

      if (result.success === 'true' || result.success === true) {
        setStatus('success');
        setFormData({ fullName: '', phone: '', email: '', city: '', service: '', details: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <main className="bg-white text-neutral-900 min-h-screen selection:bg-primary selection:text-white scroll-smooth">
      {/* Navbar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-2 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50"
      >
        <nav className="bg-white border border-neutral-200/50 rounded-full px-3 py-1 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          <div className="flex items-center gap-6">
            <a href="#" className="pl-3 flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Logo className="w-16 h-16" />
            </a>
            
            <div className="hidden lg:flex items-center bg-neutral-100/50 rounded-full p-1 gap-2">
              <button 
                onClick={() => { setActivePage('home'); window.scrollTo(0,0); }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activePage === 'home' ? 'bg-[#F4E3A1] text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-900 font-medium'}`}
              >
                {t.nav.home}
              </button>
              <a 
                href={activePage === 'home' ? "#services" : "#"}
                onClick={(e) => { if (activePage !== 'home') { e.preventDefault(); setActivePage('home'); setTimeout(() => window.location.hash = 'services', 100); } }}
                className="px-4 py-1.5 rounded-full text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-all"
              >
                {t.nav.services}
              </a>
              <button 
                onClick={() => { setActivePage('portfolio'); window.scrollTo(0,0); }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activePage === 'portfolio' ? 'bg-[#F4E3A1] text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-900 font-medium'}`}
              >
                {t.nav.portfolio}
              </button>
              <a 
                href="#testimonials" 
                className="px-4 py-1.5 rounded-full text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-all"
              >
                {t.nav.reviews}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-neutral-100/50 rounded-full p-1 mr-2">
              <button 
                onClick={() => setLang('en')} 
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${lang === 'en' ? 'bg-white text-primary shadow-sm' : 'text-neutral-400 hover:text-neutral-600'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('fr')} 
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${lang === 'fr' ? 'bg-white text-primary shadow-sm' : 'text-neutral-400 hover:text-neutral-600'}`}
              >
                FR
              </button>
            </div>
            
            <a href="#contact" className="hidden sm:flex bg-primary text-white px-6 py-2.5 rounded-full font-bold hover:bg-gold/90 transition-all text-sm items-center gap-2 shadow-lg shadow-primary/20">
              {t.nav.getQuote} <ArrowRight size={16} />
            </a>
          </div>
        </nav>
      </motion.div>

      {activePage === 'home' ? (
        <>
          {/* Hero - Attention & Intent */}
      <Section id="hero" className="pt-32 pb-24 relative overflow-hidden min-h-[85vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="w-full h-full"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
            style={{
              backgroundImage: `url('/images/INT1.jpeg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: "translateZ(0)",
            }}
          />
          <div className="absolute inset-0 bg-black/40" style={{ transform: "translateZ(0)" }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" style={{ transform: "translateZ(0)" }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full mt-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Text */}
            <div className="text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 text-white font-medium text-xs sm:text-sm mb-6 sm:mb-8 backdrop-blur-md border border-gold/40"
                style={{ transform: "translateZ(0)" }}
              >
                <Sparkles size={14} className="text-gold" /> {t.hero.badge}
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-8 text-white drop-shadow-2xl leading-[1.1]"
                style={{ transform: "translateZ(0)" }}
              >
                <ShinyText text={t.hero.title} color="#ffffff" shineColor="#D4AF37" speed={4} />
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-12 font-medium drop-shadow-lg leading-relaxed max-w-xl"
                style={{ transform: "translateZ(0)" }}
              >
                {t.hero.subtitle}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                style={{ transform: "translateZ(0)" }}
              >
                <p className="text-xs sm:text-sm text-white/80 font-semibold flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-full backdrop-blur-md border border-white/20 shadow-sm">
                  <Clock size={16} /> {t.hero.consultation}
                </p>
              </motion.div>
            </div>

            {/* Right Column: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-full max-w-md mx-auto lg:ml-auto"
            >
              <Card className="!p-6 md:!p-8 shadow-2xl border-none bg-white/95 backdrop-blur-md">
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-neutral-900">Get a Free Quote</h3>
                  <p className="text-sm text-neutral-600">from Lumin Paint Pro</p>
                </div>
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{t.contact.form.success.title}</h3>
                    <p className="text-neutral-600 mb-8 text-sm md:text-base">{t.contact.form.success.desc}</p>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="text-primary font-bold hover:underline"
                    >
                      {t.contact.form.success.button}
                    </button>
                  </motion.div>
                ) : (
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-xs font-bold mb-1.5 text-neutral-900">{t.contact.form.name} *</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm" 
                        placeholder="Jean Francois" 
                        required 
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1.5 text-neutral-900">{t.contact.form.phone} *</label>
                      <input 
                        type="tel" 
                        className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm" 
                        placeholder="(438) 406-2726" 
                        required 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1.5 text-neutral-900">{t.contact.form.email} *</label>
                      <input 
                        type="email" 
                        className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm" 
                        placeholder="jean@example.com" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold mb-1.5 text-neutral-900">{t.contact.form.serviceLabel} *</label>
                      <select 
                        className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white appearance-none text-sm" 
                        required 
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      >
                        <option value="" disabled>{t.contact.form.servicePlaceholder}</option>
                        {t.contact.services.map((option, i) => (
                          <option key={i}>{option}</option>
                        ))}
                      </select>
                    </div>
                    
                    {status === 'error' && (
                      <p className="text-red-500 text-xs font-medium">{t.contact.form.error}</p>
                    )}

                    <button 
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-primary text-white font-bold text-sm py-3.5 rounded-xl hover:bg-rose-700 transition-all mt-2 flex justify-center items-center gap-2 shadow-lg shadow-primary/20 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? t.contact.form.sending : t.contact.form.submit} <ArrowRight size={16} />
                    </button>
                    <p className="text-center text-[10px] text-neutral-500 mt-2 flex items-center justify-center gap-1.5">
                      <ShieldCheck size={12} /> {t.contact.form.secure}
                    </p>
                  </form>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </Section>



      {/* Services */}
      <Section id="services">
        <FadeIn className="text-center mb-8 sm:mb-12 px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 tracking-tight">
            <ShinyText text={t.services.title} color="#171717" shineColor="#D4AF37" speed={4} />
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-sm sm:text-base">{t.services.subtitle}</p>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-2 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-neutral-100 hover:border-primary/30 transition-colors group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
            <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Sparkles size={80} sm-size={120} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 relative z-10">
              <ShinyText text={t.services.exterior.title} color="#171717" shineColor="#D4AF37" speed={5} />
            </h3>
            <p className="text-neutral-600 text-base sm:text-lg max-w-md relative z-10">{t.services.exterior.desc}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-neutral-50 rounded-3xl p-6 sm:p-8 border border-neutral-100 hover:border-primary/30 transition-colors group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 relative z-10">
              <ShinyText text={t.services.interior.title} color="#171717" shineColor="#D4AF37" speed={5} />
            </h3>
            <p className="text-neutral-600 text-xs sm:text-sm relative z-10">{t.services.interior.desc}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-neutral-50 rounded-3xl p-6 sm:p-8 border border-neutral-100 hover:border-primary/30 transition-colors group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 relative z-10">
              <ShinyText text={t.services.dye.title} color="#171717" shineColor="#D4AF37" speed={5} />
            </h3>
            <p className="text-neutral-600 text-xs sm:text-sm relative z-10">{t.services.dye.desc}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="md:col-span-2 bg-primary text-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center items-start relative overflow-hidden"
          >
            <div className="absolute -right-10 -bottom-10 opacity-10">
              <ShieldCheck size={150} sm-size={200} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2">
              <ShinyText text={t.services.cta.title} color="#ffffff" shineColor="#FFF8D6" speed={4} />
            </h3>
            <p className="text-white/80 mb-5 sm:mb-6 max-w-md text-sm sm:text-base">{t.services.cta.subtitle}</p>
            <a href="#contact" className="bg-white text-primary px-5 sm:px-6 py-3 sm:py-3 rounded-full font-bold text-xs sm:text-sm hover:bg-neutral-50 transition-colors flex items-center gap-2">
              {t.services.cta.button} <ArrowRight size={14} sm-size={16} />
            </a>
          </motion.div>
        </div>

        {/* Social Proof */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-neutral-100 flex flex-col md:flex-row items-center justify-center gap-8 opacity-80"
        >
          <p className="text-neutral-500 font-medium text-sm uppercase tracking-widest">{t.services.socialProof}</p>
          <div className="flex -space-x-3">
            {[
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
            ].map((img, i) => (
              <img loading="lazy" key={i} src={img} alt="Client" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-600">
              +50
            </div>
          </div>
          <div className="flex items-center gap-2 text-neutral-600 font-medium">
            <div className="flex gap-1">
              {[...Array(5)].map((_, j) => <Star key={j} size={18} className="fill-gold text-gold" />)}
            </div>
            <span className="text-lg">5.0</span>
          </div>
        </motion.div>
      </Section>


      {/* Portfolio */}
      <Section id="portfolio" className="bg-neutral-50/50 border-y border-neutral-100">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            <ShinyText text="Our Work Portfolio" color="#171717" shineColor="#D4AF37" speed={4} />
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg font-medium">
            <ShinyText text="Explore the real transformation with our before and after photos." color="#525252" shineColor="#D4AF37" speed={5} />
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Exterior Section */}
          <div className="flex flex-col h-full space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold border-b-[3px] border-gold pb-3 inline-block px-4">
                <ShinyText text="Exterior Painting" color="#171717" shineColor="#D4AF37" speed={4} />
              </h3>
            </div>
            <BeforeAfterCard
              title="Elegant Exterior Painting"
              category="Exterior Painting"
              beforeSrc="/images/EXT6.jpeg"
              afterSrc="/images/EXT4.jpeg"
            />
          </div>
          
          {/* Interior Section */}
          <div className="flex flex-col h-full space-y-8">
             <div className="text-center">
              <h3 className="text-3xl font-bold border-b-[3px] border-gold pb-3 inline-block px-4">
                <ShinyText text="Interior Painting" color="#171717" shineColor="#D4AF37" speed={4} />
              </h3>
            </div>
            <BeforeAfterCard
              title="Interior Color Renewal"
              category="Interior Painting"
              beforeSrc="/images/INT7.jpeg"
              afterSrc="/images/INT5.jpeg"
            />
          </div>
        </div>

        <div className="mt-20 text-center">
          <button 
            onClick={() => { setActivePage('portfolio'); window.scrollTo(0,0); }}
            className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gold/90 transition-all inline-flex items-center gap-2 shadow-lg hover:-translate-y-1 cursor-pointer"
          >
            <ShinyText text="View Full Portfolio" color="#ffffff" shineColor="#FFF8D6" speed={3} />
            <ArrowRight size={18} />
          </button>
        </div>
      </Section>



      {/* Proof - Validating the Outcome */}
      <Section id="testimonials" className="overflow-hidden">
        <FadeIn>
          <h2 className="text-4xl font-bold mb-4 text-center tracking-tight">
            <ShinyText text={t.testimonials.title} color="#171717" shineColor="#D4AF37" speed={4} />
          </h2>
          <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">{t.testimonials.subtitle}</p>
        </FadeIn>
        
        <FadeIn delay={0.2} className="relative w-full py-4">
          <motion.div 
            className="flex gap-6 w-max infinite-scroll"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
            style={{ transform: "translateZ(0)", willChange: "transform" }}
          >
            {t.testimonials.items.map((testimonial, i) => (
              <div key={i} className="w-[350px] md:w-[400px] shrink-0" style={{ transform: "translateZ(0)" }}>
                <Card className="h-full flex flex-col justify-between bg-neutral-50 border-none !p-8 relative">
                  <div className="absolute bottom-6 right-6 text-primary/10 font-serif text-8xl leading-none select-none pointer-events-none">
                    <Quote size={80} className="text-primary/10" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, j) => <Star key={j} size={18} className="fill-gold text-gold" />)}
                    </div>
                    <p className="text-neutral-700 italic mb-8 leading-relaxed text-lg">"{testimonial.text}"</p>
                  </div>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 bg-neutral-200 rounded-full overflow-hidden flex items-center justify-center shrink-0">
                      <svg className="w-8 h-8 text-neutral-400 mt-2" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </div>
                    <div>
                      <p className="font-bold text-neutral-900">{testimonial.name}</p>
                      <p className="text-sm text-neutral-500">{testimonial.role}</p>
                    </div>
                  </div>
                 </Card>
              </div>
            ))}
          </motion.div>
        </FadeIn>
      </Section>

        </>
      ) : (
        <FullPortfolio />
      )}

      {/* Footer */}
      <footer className="bg-neutral-950 text-neutral-400 py-10 border-t border-neutral-900">
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-center gap-x-12 gap-y-10 items-center"
          style={{ transform: "translateZ(0)" }}
        >
          <div className="flex flex-col items-start gap-4 shrink-0 md:w-1/3">
            <div className="text-white flex items-center gap-4">
              <Logo className="w-32 h-auto bg-white p-2 md:p-3 rounded-2xl" />
            </div>
          </div>
          
          <div className="max-w-xs text-center md:text-left md:w-1/3">
            <p className="leading-relaxed text-neutral-300 text-sm">{t.footer.desc}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-10 md:gap-12 text-center md:text-left md:w-1/3 justify-end">
            <div>
              <h4 className="text-white font-bold mb-6">{t.footer.links}</h4>
              <ul className="space-y-3">
                <li><a onClick={(e) => { if (activePage !== 'home') { e.preventDefault(); setActivePage('home'); setTimeout(() => window.location.hash = 'services', 100); } }} href="#services" className="hover:text-primary transition-colors cursor-pointer">{t.nav.services}</a></li>
                <li><a onClick={(e) => { e.preventDefault(); setActivePage('portfolio'); window.scrollTo(0,0); }} href="#portfolio" className="hover:text-primary transition-colors cursor-pointer">{t.nav.portfolio}</a></li>
                <li><a onClick={(e) => { if (activePage !== 'home') { e.preventDefault(); setActivePage('home'); setTimeout(() => window.location.hash = 'testimonials', 100); } }} href="#testimonials" className="hover:text-primary transition-colors cursor-pointer">{t.nav.reviews}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">{t.footer.contact}</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><Phone size={16} className="text-primary" /> (438) 406-2726</li>
                <li className="flex items-center gap-3"><Mail size={16} className="text-primary" /> {t.footer.email}</li>
                <li className="flex items-center gap-3"><MapPin size={16} className="text-primary" /> {t.footer.location}</li>
              </ul>
            </div>
          </div>
        </motion.div>
        <div className="max-w-6xl mx-auto px-6 mt-16 pt-8 border-t border-neutral-900 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>{t.footer.rights}</p>
        </div>
      </footer>

      {/* Floating Call Button */}
      <motion.a
        href="tel:4384062726"
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-4 right-4 z-50 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-gold transition-colors group"
        aria-label="Call Lumin Paint Pro"
        style={{ transform: "translateZ(0)" }}
      >
        <Phone size={24} className="group-hover:animate-bounce" />
        <span className="absolute right-full mr-4 bg-white text-neutral-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-neutral-100 hidden sm:block">
          {t.hero.consultation.split('•')[0]} (438) 406-2726
        </span>
      </motion.a>
    </main>
  );
}
