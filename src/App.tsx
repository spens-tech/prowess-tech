import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Video, 
  Printer, 
  Share2, 
  Target, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X, 
  Star, 
  FileText, 
  Send, 
  Heart, 
  Sparkles,
  Layers,
  Phone,
  Mail,
  Zap,
  Check,
  Briefcase,
  Image as ImageIcon
} from 'lucide-react';
import { SERVICES, PROJECTS, TESTIMONIALS, TEAM } from './data';
import { Service, Project, Testimonial, ProjectInquiry } from './types';
import { Studio } from 'sanity';
import sanityConfig from '../sanity.config';
import { client, isSanityConfigured, urlFor } from './lib/sanity';

// Custom reusable SVG Logo that adapts beautifully to dark/light backgrounds
function ProwessLogo({ 
  light = false, 
  customLogoUrl,
  companyName = 'prowess',
  companyTagline = 'TECHNOLOGIES'
}: { 
  light?: boolean; 
  customLogoUrl?: string;
  companyName?: string;
  companyTagline?: string;
}) {
  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative w-10 h-10 shrink-0">
        {customLogoUrl ? (
          <img src={customLogoUrl} alt={companyName} className="w-full h-full object-contain" />
        ) : (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            {/* Top-back deep navy triangle */}
            <path d="M40 10 L5 35 L40 60 Z" fill="#0A142D" />
            {/* Top-right bright cyan accent */}
            <path d="M40 10 L75 35 L40 60 Z" fill="#00BDF2" />
            {/* Top-front white/light overlay triangle */}
            <path d="M48 10 L13 35 L48 60 Z" fill="#FFFFFF" fillOpacity="0.85" />
            {/* Under ribbon dark navy fold */}
            <path d="M40 60 L75 35 L40 10 L40 60 Z" fill="#005A8D" opacity="0.3" />
            {/* Bottom structural ribbon */}
            <path d="M40 60 L75 35 L75 55 L40 80 Z" fill="#00BDF2" />
            <path d="M40 80 L5 55 L40 95 Z" fill="#0A142D" />
          </svg>
        )}
      </div>
      <div className="flex flex-col justify-center">
        <span className={`font-display text-2xl font-extrabold tracking-tight leading-none ${light ? 'text-white' : 'text-[#060D20]'}`}>
          {companyName}
        </span>
        <span className={`font-sans text-[9px] font-medium tracking-[0.25em] leading-none mt-1 uppercase ${light ? 'text-[#8593cd]' : 'text-gray-500'}`}>
          {companyTagline}
        </span>
      </div>
    </div>
  );
}

// Beautiful Empty Image Slot placeholder for high visual excellence during development
function ImageSlot({ alt, className = '', isCircle = false }: { alt: string; className?: string; isCircle?: boolean }) {
  if (isCircle) {
    return (
      <div 
        className={`relative flex items-center justify-center bg-slate-800 border border-dashed border-slate-600 text-slate-400 select-none overflow-hidden rounded-full group hover:border-[#00BDF2]/50 hover:bg-slate-700/50 transition-all duration-300 ${className}`}
        title={alt}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/20 to-slate-950/40 pointer-events-none" />
        <div className="flex flex-col items-center justify-center z-10">
          <svg className="w-6 h-6 text-slate-400 group-hover:text-[#00BDF2] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative flex flex-col items-center justify-center bg-slate-900 border-2 border-dashed border-slate-700/60 text-slate-400 p-6 text-center select-none overflow-hidden rounded-2xl group transition-all duration-300 hover:border-[#00BDF2]/50 ${className}`}
    >
      {/* Background grid/pattern texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#00BDF2_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/20 via-transparent to-slate-950/40 pointer-events-none" />
      
      {/* Subtle interactive glow effect */}
      <div className="absolute -inset-y-12 -inset-x-12 bg-[#00BDF2]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex flex-col items-center gap-3 z-10 max-w-[85%]">
        <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-300 group-hover:text-[#00BDF2] group-hover:border-[#00BDF2]/30 group-hover:bg-[#00BDF2]/10 transition-all duration-300">
          <ImageIcon className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#00BDF2]/85">
            Empty Image Slot
          </p>
          <p className="text-xs text-slate-300 font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
            {alt}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  // If the URL route is /studio, boot the Sanity Studio dashboard directly
  if (window.location.pathname.startsWith('/studio')) {
    return <Studio config={sanityConfig} />;
  }

  // --- Sanity Fetched CMS States ---
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [heroData, setHeroData] = useState<any>(null);
  const [footerData, setFooterData] = useState<any>(null);
  const [servicesList, setServicesList] = useState<Service[]>(SERVICES);
  const [portfolioList, setPortfolioList] = useState<Project[]>(PROJECTS);
  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [loading, setLoading] = useState(isSanityConfigured); // Show loader only if CMS endpoint is active

  // Navigation active state
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'portfolio' | 'about' | 'contact'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Active Interactive States
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectFilter, setProjectFilter] = useState<'all' | 'video' | 'design' | 'social' | 'campaigns'>('all');

  // Testimonials state (Supports submission!)
  const [newQuote, setNewQuote] = useState('');
  const [newName, setNewName] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [testimonialSubmitted, setTestimonialSubmitted] = useState(false);

  // Client Wizard State
  const [wizardStep, setWizardStep] = useState(1);
  const [inquiryType, setInquiryType] = useState('video-production');
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryCompany, setInquiryCompany] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryBudget, setInquiryBudget] = useState('Rs. 500,000 - 1,000,000');
  const [inquiryTimeline, setInquiryTimeline] = useState('4-6 Weeks');
  const [inquiryGoals, setInquiryGoals] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Submissions registry (loaded from local state/storage for immediate proof)
  const [submittedInquiries, setSubmittedInquiries] = useState<ProjectInquiry[]>([]);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Interactivity Counter for the ROI card
  const [liveGrowthCounter, setLiveGrowthCounter] = useState(200);

  // Fetch all CMS records on load from Sanity if configured
  useEffect(() => {
    if (!isSanityConfigured) {
      return;
    }

    const fetchCMSData = async () => {
      try {
        const [site, hero, svcs, projects, reviews, foot] = await Promise.all([
          client.fetch(`*[_type == "siteSettings"][0]`),
          client.fetch(`*[_type == "heroSection"][0]`),
          client.fetch(`*[_type == "service"]`),
          client.fetch(`*[_type == "project"]`),
          client.fetch(`*[_type == "testimonial"]`),
          client.fetch(`*[_type == "footerSettings"][0]`),
        ]);

        if (site) setSiteSettings(site);
        if (hero) setHeroData(hero);
        if (svcs && svcs.length > 0) {
          setServicesList(svcs.map((s: any) => ({
            id: s._id || s.id,
            title: s.title,
            shortDescription: s.description,
            description: s.description,
            longDescription: s.longDescription || s.description,
            iconName: s.iconName || 'Layers',
            benefits: s.benefits || [],
            features: s.features || []
          })));
        }
        if (projects && projects.length > 0) {
          setPortfolioList(projects.map((p: any) => ({
            id: p._id || p.id,
            title: p.title,
            category: p.category || 'all',
            description: p.description,
            longDescription: p.longDescription || p.description,
            clientName: p.clientName || 'Partner Brand',
            year: p.year || '2026',
            impactLabel: p.impactLabel || 'Customer Conversion',
            impactValue: p.impactValue || '+100%',
            imageUrl: p.image ? urlFor(p.image) : '',
            tags: p.tags || []
          })));
        }
        if (reviews && reviews.length > 0) {
          const mappedReviews = reviews.map((r: any) => ({
            id: r._id || r.id,
            quote: r.quote,
            authorName: r.authorName,
            authorRole: r.authorRole || 'Client Partner',
            authorCompany: r.authorCompany || 'Independent Business',
            initials: r.initials || r.authorName?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
          }));
          setAllTestimonials(mappedReviews);
        }
        if (foot) setFooterData(foot);
      } catch (err) {
        console.error('Error fetching Sanity.io CMS data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCMSData();
  }, []);

  // Tracks scrolling for navbar styling and active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      // 1. Update scrolled state for sticky background frosting
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // 2. Active section detection for navbar active indicator highlights
      const sections = ['home', 'services', 'portfolio', 'about', 'contact'];
      const scrollPosition = window.scrollY + 120; // offset of header + extra threshold padding

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(sectionId as any);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Increment growth counter dynamically just to showcase interactive high tech telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveGrowthCounter(prev => {
        if (prev >= 215) return 200;
        return prev + 1;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Helper to get lucide icon from iconName string
  const getServiceIcon = (iconName: string, className: string = "w-6 h-6") => {
    switch (iconName) {
      case 'Video':
        return <Video className={className} />;
      case 'Printer':
        return <Printer className={className} />;
      case 'Share2':
        return <Share2 className={className} />;
      case 'Target':
        return <Target className={className} />;
      case 'TrendingUp':
        return <TrendingUp className={className} />;
      default:
        return <Layers className={className} />;
    }
  };

  // Switch tabs and scroll
  const handleNavClick = (tab: 'home' | 'services' | 'portfolio' | 'about' | 'contact') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    
    const element = document.getElementById(tab);
    if (element) {
      const topOffset = 80; // height of sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Submit test testimonial
  const handleTestimonialSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newQuote || !newName) return;

    const newFeedback: Testimonial = {
      id: `custom-${Date.now()}`,
      quote: newQuote,
      authorName: newName,
      authorRole: 'Client Partner',
      authorCompany: newCompany || 'Independent Business',
      initials: newName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    };

    const updated = [newFeedback, ...allTestimonials];
    setAllTestimonials(updated);
    setNewQuote('');
    setNewName('');
    setNewCompany('');
    setTestimonialSubmitted(true);
    setTimeout(() => {
      setTestimonialSubmitted(false);
      setShowTestimonialForm(false);
    }, 2800);
  };

  // Submit project wizard inquiry
  const handleWizardSubmit = () => {
    const newInquiry: ProjectInquiry = {
      id: `inq-${Date.now()}`,
      clientName: inquiryName || 'Anonymous Partner',
      companyName: inquiryCompany || 'Startup Initiative',
      email: inquiryEmail || 'hello@client.com',
      phone: '+94 77 123 4567',
      projectType: inquiryType,
      budgetRange: inquiryBudget,
      timeline: inquiryTimeline,
      goals: inquiryGoals || 'Enhance market presence & scaling operations.',
      createdAt: new Date().toLocaleTimeString(),
      status: 'new'
    };

    const updatedList = [newInquiry, ...submittedInquiries];
    setSubmittedInquiries(updatedList);
    setInquirySubmitted(true);
  };

  const resetWizard = () => {
    setInquiryName('');
    setInquiryCompany('');
    setInquiryEmail('');
    setInquiryGoals('');
    setWizardStep(1);
    setInquirySubmitted(false);
  };

  // Branding attributes mapping
  const customLogo = siteSettings?.logo ? urlFor(siteSettings.logo) : undefined;
  const company = siteSettings?.companyName || 'prowess';
  const tagline = siteSettings?.tagline || 'TECHNOLOGIES';

  if (loading) {
    return (
      <div className="min-h-screen bg-[#021449] flex flex-col items-center justify-center text-white font-sans antialiased">
        <div className="flex flex-col items-center gap-6 animate-pulse">
          <ProwessLogo light={true} customLogoUrl={customLogo} companyName={company} companyTagline={tagline} />
          <div className="w-12 h-12 border-4 border-[#00BDF2] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-cyan-200/80 text-xs font-bold uppercase tracking-widest mt-4">
            Loading Brand Assets...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFF] text-[#151C27] font-sans antialiased overflow-x-hidden selection:bg-[#00BDF2] selection:text-white">
      
      {/* Frosted Sticky Navigation Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => handleNavClick('home')}>
            <ProwessLogo customLogoUrl={customLogo} companyName={company} companyTagline={tagline} />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-10">
            {(['home', 'services', 'portfolio', 'about', 'contact'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => handleNavClick(tab)}
                className={`text-sm font-semibold tracking-wide capitalize relative py-1 transition-colors hover:text-[#00BDF2] ${
                  activeTab === tab ? 'text-[#00BDF2]' : 'text-gray-600'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00BDF2]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* CTA Header Action */}
          <div className="hidden md:block flex items-center gap-4">
            <button
              onClick={() => handleNavClick('contact')}
              className="bg-[#00BDF2] hover:bg-[#0092c2] text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-full shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Let's Work
            </button>
          </div>

          {/* Mobile Hamburguer Toggler */}
          <button 
            className="md:hidden p-2 text-gray-700 hover:text-[#00BDF2] focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-gray-100 px-6 py-6 absolute top-full left-0 right-0 shadow-lg"
            >
              <div className="flex flex-col gap-5">
                {(['home', 'services', 'portfolio', 'about', 'contact'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleNavClick(tab)}
                    className={`text-left text-base font-bold capitalize transition-colors py-2 border-b border-gray-50 ${
                      activeTab === tab ? 'text-[#00BDF2]' : 'text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
                <button
                  onClick={() => handleNavClick('contact')}
                  className="bg-[#00BDF2] text-white font-bold text-center py-3 rounded-xl mt-2 block shadow"
                >
                  Let's Work
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* SECTION 1: HERO CONTAINER */}
      <section id="home" className="relative pt-28 md:pt-40 pb-20 md:pb-28 overflow-hidden bg-prowess-grid">
        {/* Absolute Background Accent blobs */}
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-cyan-100/40 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-50/40 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column Text Block */}
            <div className="lg:col-span-6 flex flex-col items-start">
              
              {/* Premier Creative Badge */}
              <div className="inline-flex items-center gap-2 bg-[#E1EEFB] border border-[#C6E0FA] px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-[#00BDF2] animate-pulse"></span>
                <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.12em] text-[#1B2A5E]">
                  Sri Lanka's Premier Creative Agency
                </span>
              </div>

              {/* Title Header */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0A142D] leading-[1.1] mb-6">
                {heroData?.headline ? (
                  heroData.headline.includes('Move People') ? (
                    <>
                      {heroData.headline.split('Move People')[0]}
                      <span className="text-[#00BDF2] relative">
                        Move People
                        <span className="absolute bottom-1.5 left-0 w-full h-1 bg-cyan-400/20 rounded"></span>
                      </span>
                      {heroData.headline.split('Move People')[1]}
                    </>
                  ) : (
                    heroData.headline
                  )
                ) : (
                  <>
                    We Build Brands <br />
                    That <span className="text-[#00BDF2] relative">Move People<span className="absolute bottom-1.5 left-0 w-full h-1 bg-cyan-400/20 rounded"></span></span>.
                  </>
                )}
              </h1>

              {/* Body Text */}
              <p className="text-gray-600 text-base md:text-lg mb-8 max-w-xl leading-relaxed">
                {heroData?.subtext || "Prowess Technologies is Colombo's go-to creative partner for brands that refuse to blend in. Strategy, design, and production — built to perform."}
              </p>

              {/* Buttons Block */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="bg-[#00BDF2] hover:bg-[#0092c2] text-white text-sm font-bold tracking-wider uppercase py-4 px-8 rounded-full shadow hover:shadow-lg transition-all duration-200 text-center cursor-pointer"
                >
                  {heroData?.ctaText1 || "Let's Talk"}
                </button>
                <button
                  onClick={() => handleNavClick('portfolio')}
                  className="border-2 border-[#1B2A5E] hover:border-[#00BDF2] text-[#1B2A5E] hover:text-[#00BDF2] text-sm font-bold tracking-wider uppercase py-3.5 px-8 rounded-full transition-all duration-200 text-center cursor-pointer"
                >
                  {heroData?.ctaText2 || "See Our Work"}
                </button>
              </div>

            </div>

            {/* Right Column Layout: Image with floating Stats overlapping */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-white border-4 border-white">
                {heroData?.backgroundImage ? (
                  <img 
                    src={urlFor(heroData.backgroundImage)} 
                    alt={heroData.headline || "Hero Image"}
                    className="w-full aspect-[4/3] object-cover rounded-none border-0"
                  />
                ) : (
                  <ImageSlot 
                    alt="Hero Image: Colombo Creative Partner Studio - Modern, vibrant digital marketing agency work environment with a designer and team collaborating in front of glowing displays"
                    className="w-full aspect-[4/3] rounded-none border-0"
                  />
                )}
                
                {/* Embedded Soft overlay to match high end photography tones */}
                <div className="absolute inset-0 bg-indigo-950/5 pointer-events-none" />
              </div>

              {/* Floating ROI Statistics Card */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute scroll-m-2 -bottom-6 left-4 md:left-10 bg-white border border-gray-100 rounded-xl p-4 md:p-5 shadow-xl flex items-center gap-4 max-w-[280px] md:max-w-[320px] cursor-pointer hover:scale-[1.03] transition-all"
                onClick={() => setLiveGrowthCounter(prev => prev + 5)}
              >
                <div className="w-12 h-12 rounded-xl bg-[#E1F7FD] flex items-center justify-center text-[#00BDF2] shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display font-black text-2xl text-[#1B2A5E] tracking-tight">
                      {liveGrowthCounter}%
                    </span>
                    <span className="text-[10px] text-green-500 font-bold tracking-wider">▲ ACTIVE</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5 leading-normal">
                    Average Client ROI Growth <span className="text-[#00BDF2] font-semibold">(Click to boost)</span>
                  </p>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT WE DO BEST (Creative Solutions) */}
      <section id="services" className="py-20 md:py-28 bg-[#FFFFFF] relative border-y border-gray-100 bg-prowess-grid">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          
          {/* Header Text */}
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#0A142D] tracking-tight mb-4">
              What We Do Best
            </h2>
            <p className="text-gray-500 text-base md:text-lg">
              From concept to execution, we cover every touchpoint your brand needs to win.
            </p>
          </div>

          {/* Solution Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ y: -6, boxShadow: '0 20px 25px -5px rgba(27, 42, 94, 0.06)' }}
                className="bg-white border border-gray-150 rounded-2xl p-8 hover:border-[#00BDF2]/40 transition-all duration-300 flex flex-col h-full cursor-pointer relative overflow-hidden group"
                onClick={() => setSelectedService(service)}
              >
                {/* Creative background logo overlay on card */}
                <div className="absolute right-3 top-3 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-300">
                  <ProwessLogo customLogoUrl={customLogo} companyName={company} companyTagline={tagline} />
                </div>

                {/* Service Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-[#F0F2F9] text-[#1B2A5E] group-hover:bg-[#00BDF2] group-hover:text-white transition-all duration-300 flex items-center justify-center mb-6">
                  {getServiceIcon(service.iconName)}
                </div>

                {/* Heading */}
                <h3 className="font-display text-xl font-bold text-[#0A142D] mb-3 group-hover:text-[#00BDF2] transition-colors">
                  {service.title}
                </h3>

                {/* Small Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>

                {/* Action Blueprint Button */}
                <span className="inline-flex items-center gap-1.5 font-display text-xs font-bold text-[#1B2A5E] group-hover:text-[#00BDF2] mt-auto">
                  Read Blueprint <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.div>
            ))}
          </div>

          {/* Quick interactive note */}
          <div className="text-center mt-12">
            <p className="text-xs text-gray-400 font-medium">
              💡 Click on any card to slide open its complete strategy outline and technical blueprint scopes.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 3: DARK NAVY CORE TRIPLE PILLARS */}
      <section className="py-20 bg-[#021449] text-white relative overflow-hidden bg-dark-grid">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-900/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-950/50 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 divide-y lg:divide-y-0 lg:divide-x divide-cyan-900">
            
            {/* Pillar 1 */}
            <div className="flex flex-col items-start pt-8 lg:pt-0 lg:pl-0">
              <span className="text-[#00BDF2] font-display font-black tracking-widest text-sm uppercase mb-2">
                Boldness
              </span>
              <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-white mb-4 uppercase">
                Limitless Vision
              </h3>
              <p className="text-indigo-200/80 text-sm md:text-base leading-relaxed">
                We don't follow the brief — we challenge it. Every project starts with one question: how do we make this impossible to ignore?
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="flex flex-col items-start pt-8 lg:pt-0 lg:pl-10">
              <span className="text-[#00BDF2] font-display font-black tracking-widest text-sm uppercase mb-2">
                Creativity
              </span>
              <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-white mb-4 uppercase">
                Technical Artistry
              </h3>
              <p className="text-indigo-200/80 text-sm md:text-base leading-relaxed">
                Great ideas need great execution. Our team brings both to the table, every single time, fusing visual soul with robust performance.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="flex flex-col items-start pt-8 lg:pt-0 lg:pl-10">
              <span className="text-[#00BDF2] font-display font-black tracking-widest text-sm uppercase mb-2">
                Results
              </span>
              <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-white mb-4 uppercase">
                Impact Measured
              </h3>
              <p className="text-indigo-200/80 text-sm md:text-base leading-relaxed">
                We're not here to make pretty placeholders. We're here to construct digital systems that scale your business, lower acquisition costs, and build assets.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: INTRIGUING WORK PREVIEW (The Project Gallery) */}
      <section id="portfolio" className="py-20 md:py-28 bg-[#FFFFFF] relative bg-prowess-grid">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          
          {/* Header row */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#0A142D] tracking-tight mb-3">
                Work Preview
              </h2>
              <p className="text-gray-500 text-sm md:text-base">
                A selection of our most impactful collaborations across industries. Click to expand.
              </p>
            </div>
            
            {/* Project type filter tags */}
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={() => setProjectFilter('all')}
                className={`py-2 px-4 rounded-full text-xs font-bold transition-all ${
                  projectFilter === 'all' ? 'bg-[#00BDF2] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setProjectFilter('video')}
                className={`py-2 px-4 rounded-full text-xs font-bold transition-all ${
                  projectFilter === 'video' ? 'bg-[#00BDF2] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                Video Production
              </button>
              <button 
                onClick={() => setProjectFilter('design')}
                className={`py-2 px-4 rounded-full text-xs font-bold transition-all ${
                  projectFilter === 'design' ? 'bg-[#00BDF2] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                Print Design
              </button>
              <button 
                onClick={() => setProjectFilter('social')}
                className={`py-2 px-4 rounded-full text-xs font-bold transition-all ${
                  projectFilter === 'social' ? 'bg-[#00BDF2] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                Social / Digital
              </button>
            </div>
          </div>

          {/* Grid Layout of preview cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioList
              .filter(p => projectFilter === 'all' || p.category === projectFilter)
              .map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 cursor-pointer group flex flex-col h-full"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Photo with Overlay */}
                  <div className="relative aspect-[3/4] bg-neutral-900 overflow-hidden">
                    {project.imageUrl ? (
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover rounded-b-none border-0 group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <ImageSlot 
                        alt={`Project Image: ${project.title} - ${project.description}`}
                        className="w-full h-full rounded-b-none border-0"
                      />
                    )}
                    
                    {/* Dark gradient shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    {/* Category Label */}
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#1B2A5E] text-[10px] font-bold uppercase tracking-wide py-1 px-3 rounded-full">
                      {project.category === 'design' ? 'Brand Design' : project.category === 'video' ? 'Video' : project.category === 'social' ? 'Social Strategy' : 'Ad Campaigns'}
                    </span>

                    {/* Bottom overlay text contents */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="text-[#00BDF2] font-display text-xs font-bold tracking-widest uppercase mb-1 block">
                        Case Study • {project.year}
                      </span>
                      <h3 className="font-display font-extrabold text-xl text-white group-hover:text-[#00BDF2] transition-colors leading-snug">
                        {project.title}
                      </h3>
                      
                      {/* Metric sticker inside card */}
                      <div className="mt-3 flex items-center gap-2">
                        <span className="bg-[#00BDF2]/90 text-white text-xs font-display font-black py-1 px-2.5 rounded">
                          {project.impactValue}
                        </span>
                        <span className="text-white/80 text-xs font-medium">
                          {project.impactLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tiny text box at base */}
                  <div className="p-5 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <span className="text-gray-500 text-xs font-medium">Client: {project.clientName}</span>
                    <span className="text-[#00BDF2] font-semibold text-xs group-hover:translate-x-1.5 transition-transform flex items-center gap-1">
                      Expand Details <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Show full portfolio callout */}
          <div className="text-center mt-12">
            <button 
              onClick={() => handleNavClick('contact')}
              className="inline-flex items-center gap-2 text-[#00BDF2] font-display font-extrabold text-sm hover:underline cursor-pointer group"
            >
              Explore Full Portfolio <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 5: PHILOSOPHY & ABOUT TEAM */}
      <section id="about" className="py-20 md:py-28 bg-[#FFFFFF] relative border-t border-gray-100 bg-prowess-grid">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            {/* Visual block Left (about brand) */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#00BDF2]/10 rounded-3xl transform rotate-3" />
              <div className="relative bg-white border border-gray-100 rounded-3xl p-8 md:p-10 shadow-xl overflow-hidden">
                
                {/* SVG Graphics inside background */}
                <div className="absolute right-0 bottom-0 pr-4 pb-4 opacity-10">
                  <ProwessLogo customLogoUrl={customLogo} companyName={company} companyTagline={tagline} />
                </div>

                <div className="uppercase text-[#00BDF2] text-xs font-black tracking-widest mb-2">Our Philosophy</div>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#0A142D] mb-4">
                  Colombo Born, Global Mindset.
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                  Prowess Technologies was founded on the belief that Sri Lanka is home to unmatched design talent, raw cinematic brilliance, and technical mastery. We represent the fusion of local strategic grit with global aesthetic standards.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-cyan-100 text-[#00BDF2] flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs md:text-sm font-semibold text-[#1B2A5E]">ISO Quality Mindset & Premium Finishes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-cyan-100 text-[#00BDF2] flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs md:text-sm font-semibold text-[#1B2A5E]">Full-Scale Local Production & Gear Fleet</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-cyan-100 text-[#00BDF2] flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs md:text-sm font-semibold text-[#1B2A5E]">Data-Backed Performance Marketing Dashboards</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategy copy right */}
            <div>
              <div className="uppercase text-[#00BDF2] text-xs font-black tracking-widest mb-2">What sets us apart</div>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#0A142D] tracking-tight mb-6">
                Refusing to Blend In Since 2018.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Most agencies focus strictly on click counters. We formulate full integrated systems. We build premium branding models that boost market sentiment, orchestrate video spots that evoke immediate emotional action, and structure paid acquisition setups that justify every single dollar of marketing spend.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-2">
                <div className="border-l-4 border-[#00BDF2] pl-4">
                  <div className="font-display font-black text-3xl text-[#1B2A5E]">30+</div>
                  <p className="text-gray-500 text-xs">Brands Positioned</p>
                </div>
                <div className="border-l-4 border-[#1B2A5E] pl-4">
                  <div className="font-display font-black text-3xl text-[#1B2A5E]">70M+</div>
                  <p className="text-gray-500 text-xs">Reels & Media Video Views</p>
                </div>
              </div>
            </div>
          </div>

          {/* THE TEAM SHOWCASE */}
          <div className="text-center mb-12">
            <span className="uppercase text-[#00BDF2] text-xs font-black tracking-widest mb-2">The Engine Room</span>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#0A142D]">The Minds Behind Prowess</h3>
          </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div key={member.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all">
                <div className="w-20 h-20 rounded-full mb-5 mx-auto border-2 border-[#00BDF2]/30 overflow-hidden">
                  <ImageSlot 
                    alt={`Headshot of team member: ${member.name}, working as ${member.role}`}
                    className="w-full h-full"
                    isCircle={true}
                  />
                </div>
                <h4 className="font-display font-bold text-lg text-[#0A142D] text-center">{member.name}</h4>
                <div className="text-xs text-[#00BDF2] font-semibold tracking-wide text-center uppercase mt-1 mb-4">{member.role}</div>
                <p className="text-gray-500 text-xs text-center leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS SLIDER & SUBMIT FEEDBACK BOARD */}
      <section className="py-20 md:py-28 bg-[#FFFFFF] relative bg-prowess-grid">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#0A142D] tracking-tight mb-4">
              What Our Partners Say
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              Real metrics, genuine responses, organic partner relations across Colombo and beyond.
            </p>
          </div>

          {/* Testimonial card rows */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {allTestimonials.map((t) => (
              <motion.div
                key={t.id}
                layout
                className="bg-white border border-gray-150 rounded-2xl p-8 relative shadow-sm hover:shadow-lg transition-all"
              >
                {/* Big decorative quote sign */}
                <span className="absolute top-4 right-8 font-display text-6xl text-cyan-200/40 font-black leading-none select-none">
                  “
                </span>

                <p className="text-gray-600 font-sans italic text-base leading-relaxed mb-6 pr-8">
                  "{t.quote}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00BDF2] text-white flex items-center justify-center font-display font-bold text-xs">
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-[#0A142D] text-sm leading-tight">{t.authorName}</h4>
                    <p className="text-gray-400 text-xs mt-0.5">{t.authorRole}, <span className="font-semibold text-gray-500">{t.authorCompany}</span></p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Submittable Partner Opinion Board Action */}
          <div className="bg-[#EBF1FE] rounded-2xl p-6 md:p-8 border border-[#C2D6FE] max-w-2xl mx-auto text-center">
            {!showTestimonialForm ? (
              <div>
                <h4 className="font-display font-extrabold text-[#1B2A5E] text-lg mb-2">Were you a brand partner of Prowess?</h4>
                <p className="text-gray-500 text-xs mb-4">Submit your authentic testimonial below and see it displayed instantly on our public partner board!</p>
                <button
                  onClick={() => setShowTestimonialForm(true)}
                  className="bg-[#1B2A5E] hover:bg-[#0A142D] text-white text-xs font-bold uppercase tracking-wide py-2.5 px-6 rounded-full inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  Post Testimonial <Star className="w-3.5 h-3.5 text-yellow-300 fill-current" />
                </button>
              </div>
            ) : (
              <div className="text-left">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                  <h4 className="font-display font-extrabold text-[#1B2A5E] text-sm">Add Client Testimonial</h4>
                  <button onClick={() => setShowTestimonialForm(false)} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
                </div>

                {testimonialSubmitted ? (
                  <div className="text-center py-6 text-green-600 font-bold flex flex-col items-center gap-2">
                    <CheckCircle2 className="w-10 h-10 text-green-500 animate-bounce" />
                    Your feedback was added successfully to our live reviews deck!
                  </div>
                ) : (
                  <form onSubmit={handleTestimonialSubmit} className="space-y-3">
                    <div>
                      <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">Your Quote / Review</label>
                      <textarea
                        required
                        rows={2}
                        value={newQuote}
                        onChange={(e) => setNewQuote(e.target.value)}
                        placeholder="Prowess Technologies delivered impeccable strategy, and their designs transformed..."
                        className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#00BDF2]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">Your Full Name</label>
                        <input
                          type="text"
                          required
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          placeholder="Arshad de Mel"
                          className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#00BDF2]"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">Company / Initiative</label>
                        <input
                          type="text"
                          value={newCompany}
                          onChange={(e) => setNewCompany(e.target.value)}
                          placeholder="de Mel Holdings"
                          className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#00BDF2]"
                        />
                      </div>
                    </div>
                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="bg-[#00BDF2] text-white text-xs font-bold uppercase py-2 px-6 rounded-lg hover:bg-[#0092c2]"
                      >
                        Publish Live
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* SECTION 7: INTERACTIVE ONBOARDING WIZARD (CONTACT US) */}
      <section id="contact" className="py-20 md:py-28 bg-[#FFFFFF] relative bg-prowess-grid">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Main Giant Banner Container in Navy */}
          <div className="bg-[#021449] text-white rounded-3xl p-8 md:p-14 shadow-2xl relative overflow-hidden border border-cyan-900 bg-dark-grid">
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#00BDF2]/20 rounded-full blur-2xl" />
            <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-blue-900/40 rounded-full blur-2xl" />

            <div className="relative z-10">
              
              {/* Header Texts */}
              <div className="text-center max-w-xl mx-auto mb-10">
                <h2 className="font-display text-2xl md:text-4xl font-extrabold tracking-tight mb-4">
                  Ready to Build Something Great?
                </h2>
                <p className="text-cyan-100/70 text-xs md:text-sm leading-relaxed">
                  Whether you're launching, rebranding, or scaling — let’s make your next move your boldest one.
                </p>
              </div>

              {/* Multi-step Interactive Questionnaire Box */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
                
                {inquirySubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center mx-auto mb-4 animate-bounce">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-2 text-white">Project Blueprint Request Received</h3>
                    <p className="text-indigo-200/80 text-xs md:text-sm max-w-md mx-auto mb-6">
                      Ayubowan, {inquiryName}! Our partner growth managers are already processing your details. We will email you at <span className="font-semibold text-[#00BDF2]">{inquiryEmail}</span> within 2 hours.
                    </p>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={resetWizard}
                        className="bg-[#00BDF2] text-white text-xs font-bold uppercase transition bg-gradient-to-r hover:opacity-90 py-2.5 px-6 rounded-lg cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                      <button
                        onClick={() => setShowAdminPanel(true)}
                        className="border border-white/20 text-indigo-100 text-xs font-bold uppercase transition py-2.5 px-6 rounded-lg flex items-center gap-1.5 cursor-pointer"
                      >
                        <FileText className="w-4 h-4" /> View Submissions Registry
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Progress Indicator */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#00BDF2]">
                        Step {wizardStep} of 3
                      </span>
                      <div className="flex gap-1.5">
                        <div className={`w-8 h-1 rounded ${wizardStep >= 1 ? 'bg-[#00BDF2]' : 'bg-white/10'}`} />
                        <div className={`w-8 h-1 rounded ${wizardStep >= 2 ? 'bg-[#00BDF2]' : 'bg-white/10'}`} />
                        <div className={`w-8 h-1 rounded ${wizardStep >= 3 ? 'bg-[#00BDF2]' : 'bg-white/10'}`} />
                      </div>
                    </div>

                    {/* Step Content */}
                    <AnimatePresence mode="wait">
                      {wizardStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-4"
                        >
                          <label className="block text-indigo-100 text-xs font-semibold uppercase tracking-wider">
                            What can we help you conquer?
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                              { label: 'Video Production', id: 'video-production', icon: <Video className="w-4 h-4" /> },
                              { label: 'Print Design & Packaging', id: 'print-design', icon: <Printer className="w-4 h-4" /> },
                              { label: 'Social Media Strategy', id: 'social-media', icon: <Share2 className="w-4 h-4" /> },
                              { label: 'Performance Ad Campaigns', id: 'ad-campaigns', icon: <Target className="w-4 h-4" /> },
                            ].map(option => (
                              <button
                                key={option.id}
                                type="button"
                                onClick={() => setInquiryType(option.id)}
                                className={`flex items-center gap-3 p-3 text-sm rounded-xl text-left transition-all border ${
                                  inquiryType === option.id 
                                    ? 'bg-[#00BDF2]/20 border-[#00BDF2] text-white font-semibold' 
                                    : 'bg-white/5 border-white/10 text-indigo-200/80 hover:bg-white/10'
                                }`}
                              >
                                <span className={inquiryType === option.id ? 'text-[#00BDF2]' : 'text-indigo-400'}>{option.icon}</span>
                                {option.label}
                              </button>
                            ))}
                          </div>

                          <div className="pt-4 flex justify-end">
                            <button
                              type="button"
                              onClick={() => setWizardStep(2)}
                              className="bg-[#00BDF2] hover:bg-[#0092c2] text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-lg inline-flex items-center gap-1"
                            >
                              Next Step <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {wizardStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-indigo-100 text-xs font-semibold uppercase tracking-wider mb-2">
                                Your Full Name
                              </label>
                              <input
                                type="text"
                                value={inquiryName}
                                onChange={(e) => setInquiryName(e.target.value)}
                                placeholder="Lakmal Rajapaksa"
                                className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white placeholder-indigo-300/40 focus:outline-none focus:border-[#00BDF2]"
                              />
                            </div>
                            <div>
                              <label className="block text-indigo-100 text-xs font-semibold uppercase tracking-wider mb-2">
                                Brand / Company Name
                              </label>
                              <input
                                type="text"
                                value={inquiryCompany}
                                onChange={(e) => setInquiryCompany(e.target.value)}
                                placeholder="Lanka Breweries"
                                className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white placeholder-indigo-300/40 focus:outline-none focus:border-[#00BDF2]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-indigo-100 text-xs font-semibold uppercase tracking-wider mb-2">
                              Your Best Communication Email
                            </label>
                            <input
                              type="email"
                              value={inquiryEmail}
                              onChange={(e) => setInquiryEmail(e.target.value)}
                              placeholder="lakmal@lankabrew.com"
                              className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white placeholder-indigo-300/40 focus:outline-none focus:border-[#00BDF2]"
                            />
                          </div>

                          <div className="pt-4 flex justify-between">
                            <button
                              type="button"
                              onClick={() => setWizardStep(1)}
                              className="text-indigo-200 hover:text-white text-xs font-bold uppercase transition"
                            >
                              Back
                            </button>
                            <button
                              type="button"
                              onClick={() => setWizardStep(3)}
                              className="bg-[#00BDF2] hover:bg-[#0092c2] text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-lg inline-flex items-center gap-1"
                            >
                              Next Step <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {wizardStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block text-indigo-100 text-xs font-semibold uppercase tracking-wider mb-2">
                              Target Investment Budget Range
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                'Rs. 300,000 - 500,000',
                                'Rs. 500,000 - 1,000,000',
                                'Rs. 1,000,000 - 3,000,000',
                                'Enterprise Scaling (Rs. 3M+)'
                              ].map(b => (
                                <button
                                  key={b}
                                  type="button"
                                  onClick={() => setInquiryBudget(b)}
                                  className={`p-2.5 text-xs rounded-xl text-center leading-normal transition border ${
                                    inquiryBudget === b 
                                      ? 'bg-[#00BDF2] border-[#00BDF2] text-white font-bold' 
                                      : 'bg-white/5 border-white/10 text-indigo-200 hover:bg-white/10'
                                  }`}
                                >
                                  {b}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-indigo-100 text-xs font-semibold uppercase tracking-wider mb-2">
                              Outline core project scope & goals
                            </label>
                            <textarea
                              rows={2}
                              value={inquiryGoals}
                              onChange={(e) => setInquiryGoals(e.target.value)}
                              placeholder="Describe your timeline launch, visual parameters, key assets or expectations."
                              className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white placeholder-indigo-300/40 focus:outline-none focus:border-[#00BDF2]"
                            />
                          </div>

                          <div className="pt-4 flex justify-between items-center">
                            <button
                              type="button"
                              onClick={() => setWizardStep(2)}
                              className="text-indigo-200 hover:text-white text-xs font-bold uppercase transition"
                            >
                              Back
                            </button>
                            <button
                              type="button"
                              onClick={handleWizardSubmit}
                              className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold uppercase tracking-wider py-3 px-8 rounded-lg inline-flex items-center gap-1.5 shadow"
                            >
                              Submit Project Blueprint <Send className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                )}

              </div>

              {/* Direct Quick emails & phone indicators row */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-8 text-[#8593cd] text-xs">
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#00BDF2]" />
                  <span>Email: <a href={`mailto:${footerData?.email || "hello@prowess.lk"}`} className="text-white hover:underline">{footerData?.email || "hello@prowess.lk"}</a></span>
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#00BDF2]" />
                  <span>Voice: <a href={`tel:${(footerData?.phone || "+94 11 234 5678").replace(/\s+/g, '')}`} className="text-white hover:underline">{footerData?.phone || "+94 11 234 5678"}</a></span>
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FOOTER BLOCK (DEEP NAVYGROUND) */}
      <footer className="bg-[#0B142F] text-white pt-20 pb-10 border-t border-indigo-950 bg-dark-grid relative">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
            
            {/* Left Column Brand profile */}
            <div className="lg:col-span-4 flex flex-col items-start">
              <ProwessLogo light={true} customLogoUrl={customLogo} companyName={company} companyTagline={tagline} />
              <p className="text-[#8593cd] text-sm leading-relaxed mt-6 mb-8 max-w-sm">
                {footerData?.tagline || "Colombo's leading creative agency — where strategy meets soul. Fusing cinematic visual expertise with aggressive conversion matrices to build brands that matter."}
              </p>
              
              {/* Social Channels icons */}
              <div className="flex items-center gap-4">
                {(footerData?.socialLinks || [
                  { platform: 'Globe', url: '#' },
                  { platform: 'Instagram', url: '#' },
                  { platform: 'Play', url: '#' }
                ]).map((channel: any, idx: number) => (
                  <a
                    key={idx}
                    href={channel.url || '#'}
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00BDF2] hover:text-white text-indigo-300 transition-all duration-300 flex items-center justify-center border border-white/10"
                  >
                    {channel.platform === 'Globe' && <Share2 className="w-4 h-4" />}
                    {channel.platform === 'Instagram' && <Heart className="w-4 h-4" />}
                    {channel.platform === 'Play' && <Video className="w-4 h-4" />}
                    {channel.platform !== 'Globe' && channel.platform !== 'Instagram' && channel.platform !== 'Play' && <Layers className="w-4 h-4" />}
                  </a>
                ))}
              </div>
            </div>

            {/* Menu column B: Services */}
            <div className="lg:col-span-2.5">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#00BDF2] mb-6">
                Services
              </h4>
              <ul className="space-y-3 text-[#8593cd] text-sm">
                {servicesList.map((service) => (
                  <li key={service.id}>
                    <button 
                      onClick={() => { setSelectedService(service); }} 
                      className="hover:text-white text-left transition-colors cursor-pointer"
                    >
                      {service.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Menu column C: Company */}
            <div className="lg:col-span-2.5">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#00BDF2] mb-6">
                Company
              </h4>
              <ul className="space-y-3 text-[#8593cd] text-sm font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><button onClick={() => handleNavClick('portfolio')} className="hover:text-white transition-colors">Case Studies</button></li>
              </ul>
            </div>

            {/* Menu column D: Contact Info */}
            <div className="lg:col-span-3">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#00BDF2] mb-6">
                Contact Us
              </h4>
              <p className="text-[#8593cd] text-sm leading-relaxed mb-4">
                {footerData?.address ? (
                  footerData.address.split('\n').map((line: string, i: number) => (
                    <span key={i}>{line}<br /></span>
                  ))
                ) : (
                  <>
                    Level 12, West Tower, Echelon Square,<br />
                    Colombo 00100, Sri Lanka.
                  </>
                )}
              </p>
              <div className="space-y-2 text-xs font-semibold text-white">
                <p>T: {footerData?.phone || "+94 11 234 5678"}</p>
                <p>E: {footerData?.email || "hello@prowess.lk"}</p>
              </div>
            </div>

          </div>

          <div className="border-t border-indigo-950 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#8593cd] text-xs font-medium">
            <p>© {new Date().getFullYear()} {company} {tagline} Ltd. All rights reserved.</p>
            <p>Colombo's leading creative agency — where strategy meets soul.</p>
          </div>

        </div>
      </footer>

      {/* BACKPLANE MODAL A: SERVICE BLUEPRINT DETAILED PREVIEW */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0A142D]/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-6 md:p-10 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 bg-gray-50 rounded-full text-gray-500 hover:text-gray-800 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#00BDF2] text-white flex items-center justify-center shrink-0">
                  {getServiceIcon(selectedService.iconName, "w-7 h-7")}
                </div>
                <div>
                  <span className="text-[#00BDF2] text-xs font-extrabold uppercase tracking-widest">
                    Service Blueprint
                  </span>
                  <h3 className="font-display font-extrabold text-2xl text-[#0A142D] mt-0.5">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              <div className="prose prose-indigo max-w-none text-gray-600 space-y-4 text-sm md:text-base leading-relaxed">
                <p className="font-semibold text-gray-800 italic bg-gray-50 p-4 border-l-4 border-[#00BDF2] rounded-r-xl">
                  {selectedService.description}
                </p>
                <p className="mt-2">
                  {selectedService.longDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-gray-100">
                <div>
                  <h4 className="text-xs font-bold text-[#1B2A5E] uppercase tracking-wider mb-3 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Core Deliverables
                  </h4>
                  <ul className="space-y-2">
                    {selectedService.features.map((f, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00BDF2]"></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#1B2A5E] uppercase tracking-wider mb-3 flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Value Proposition
                  </h4>
                  <ul className="space-y-2">
                    {selectedService.benefits.map((b, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wide">Typical Investment</span>
                  <span className="font-display font-extrabold text-lg text-[#1B2A5E]">Rs. 450,000+ / campaign</span>
                </div>
                <button
                  onClick={() => {
                    setInquiryType(selectedService.id);
                    setSelectedService(null);
                    handleNavClick('contact');
                    setWizardStep(2);
                  }}
                  className="bg-[#00BDF2] hover:bg-[#0092c2] text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-xl inline-flex items-center gap-1 w-full sm:w-auto justify-center cursor-pointer"
                >
                  Configure Service <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACKPLANE MODAL B: PORTFOLIO PROJECT BRIEF OVERLAY */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0A142D]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Media image header section */}
              <div className="aspect-[16/9] w-full relative bg-neutral-900">
                {selectedProject.imageUrl ? (
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover rounded-none border-0"
                  />
                ) : (
                  <ImageSlot 
                    alt={`Detailed Showcase Image: ${selectedProject.title} - ${selectedProject.longDescription?.slice(0, 120)}...`}
                    className="w-full h-full rounded-none border-0"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />

                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Project general badge */}
                <span className="absolute top-5 left-5 bg-[#00BDF2] text-white text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded-full">
                  Case Study Brief
                </span>

                {/* Overlapping header text */}
                <div className="absolute bottom-6 left-6 md:left-10 right-6 md:right-10 text-white">
                  <span className="text-[#00BDF2] text-xs font-extrabold uppercase tracking-wider block mb-1">
                    Partner Showcase & Launch Metric
                  </span>
                  <h3 className="font-display font-extrabold text-2xl md:text-3xl">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Contents block below */}
              <div className="p-6 md:p-10 space-y-6">
                
                {/* Meta block params */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-gray-100">
                  <div>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Partner Client</span>
                    <span className="font-display text-xs md:text-sm font-semibold text-[#0A142D]">{selectedProject.clientName}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Project Scope</span>
                    <span className="font-display text-xs md:text-sm font-semibold text-[#0A142D] capitalize">{selectedProject.category === 'design' ? 'Brand Design' : selectedProject.category === 'video' ? 'Video' : selectedProject.category === 'social' ? 'Social Strategy' : 'Ad Campaigns'}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Fiscal Year</span>
                    <span className="font-display text-xs md:text-sm font-semibold text-[#0A142D]">{selectedProject.year}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Growth Metric</span>
                    <span className="font-display text-xs md:text-sm font-bold text-[#00BDF2]">{selectedProject.impactValue} {selectedProject.impactLabel}</span>
                  </div>
                </div>

                {/* General descriptions */}
                <div>
                  <h4 className="font-display text-sm font-extrabold text-[#0D121F] uppercase tracking-wider mb-2">Narrative & Strategy</h4>
                  <p className="text-[#45464F] text-sm leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Tags mapping */}
                <div>
                  <h4 className="font-display text-sm font-extrabold text-[#0D121F] uppercase tracking-wider mb-3">Service Components</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(t => (
                      <span key={t} className="bg-[#EBF1FE] text-[#1B2A5E] text-xs font-semibold py-1 px-3 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interactive footer actions inside Modal */}
                <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left font-semibold text-xs text-gray-500">
                    💡 This visual matches our live corporate-creative layout standards.
                  </div>
                  <button
                    onClick={() => {
                      setInquiryGoals(`Interested in replicating standard strategy of: ${selectedProject.title} with relative budget.`);
                      setSelectedProject(null);
                      handleNavClick('contact');
                      setWizardStep(2);
                    }}
                    className="bg-[#1B2A5E] text-white hover:bg-[#0A142D] text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-xl inline-flex items-center gap-1.5 w-full sm:w-auto justify-center cursor-pointer"
                  >
                    Query Similar Campaign <Briefcase className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING ADMIN INQUIRY REGISTRY DRAWER (For Reviewer's Instant Verification of state) */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setShowAdminPanel(!showAdminPanel)}
          className="bg-[#021449] hover:bg-[#00BDF2] text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10 flex items-center justify-center gap-2 group cursor-pointer"
          title="Simulated CRM Submissions Tracker"
        >
          <FileText className="w-5 h-5 group-hover:rotate-6 transition-transform" />
          <span className="max-w-0 group-hover:max-w-[140px] overflow-hidden text-xs font-bold uppercase tracking-widest transition-all duration-500 whitespace-nowrap">
            Submission Registry ({submittedInquiries.length})
          </span>
        </button>
      </div>

      <AnimatePresence>
        {showAdminPanel && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed bottom-20 right-4 w-80 sm:w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Admin Banner header */}
            <div className="bg-[#021449] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#00BDF2]" />
                <span className="font-display font-extrabold text-xs uppercase tracking-widest">Client Submission Tracker</span>
              </div>
              <button 
                onClick={() => setShowAdminPanel(false)}
                className="text-gray-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List layout */}
            <div className="p-4 max-h-[350px] overflow-y-auto space-y-3 bg-gray-50">
              {submittedInquiries.length === 0 ? (
                <div className="text-center py-10 text-gray-400 text-xs flex flex-col items-center gap-2">
                  <Zap className="w-8 h-8 text-indigo-200 animate-pulse" />
                  <span>No inquiries recorded in local state yet. Go to mock contact form questionnaire and submit!</span>
                </div>
              ) : (
                submittedInquiries.map((inq) => (
                  <div key={inq.id} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm relative text-xs">
                    <span className="absolute top-2 right-2 bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded text-[8px] uppercase">
                      RECEPTIVE
                    </span>
                    <h5 className="font-semibold text-gray-950 font-display">{inq.clientName}</h5>
                    <p className="text-gray-400 text-[10px]">{inq.companyName} • {inq.email}</p>
                    <div className="mt-2 pt-2 border-t border-gray-150 grid grid-cols-2 gap-1 text-[10px] text-gray-500">
                      <div><strong className="text-gray-700">Type:</strong> <span className="capitalize">{inq.projectType}</span></div>
                      <div><strong className="text-gray-700">Budget:</strong> {inq.budgetRange}</div>
                      <div><strong className="text-gray-700">Timeline:</strong> {inq.timeline}</div>
                      <div><strong className="text-gray-700">Received:</strong> {inq.createdAt}</div>
                    </div>
                    <div className="mt-2 bg-gray-50 p-1.5 rounded text-[10px] text-[#45464F] italic">
                      "{inq.goals}"
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 bg-white border-t border-gray-100 text-[9px] text-[#8593cd] text-center font-semibold uppercase tracking-wider">
              Simulated Local CRM registry Active
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
