import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import logoImg from "../assets/logo.png";
import omePestPosterImg from "../assets/ome_pest_poster.jpg";
import { IntroSplash } from "./components/IntroSplash";

// Import local service images
import termiteImg from "../assets/services/termite.png";
import cockroachImg from "../assets/services/coackroach.png";
import rodentImg from "../assets/services/rodent.png";
import bedBugImg from "../assets/services/bed_bug.png";
import mosquitoImg from "../assets/services/mosquito.png";
import fliesImg from "../assets/services/flies.png";
import woodBorerImg from "../assets/services/wood_borer.png";
import spiderImg from "../assets/services/spider.avif";
import snakeImg from "../assets/services/snake_repellent.png";
import birdImg from "../assets/services/bird_control.png";
import foodStorageImg from "../assets/services/food_storage.png";
import disinfectionImg from "../assets/services/disinfection.png";
import commercialAuditImg from "../assets/services/commercial_audit.png";
import waterproofingImg from "../assets/services/waterproofing.png";

// Import local general images
import heroBgImg from "../assets/general/hero_bg.png";
import founderImg from "../assets/general/founder.png";
import technologyImg from "../assets/general/technology.png";
import companyStoryImg from "../assets/general/company_story.png";
import aboutFounderImg from "../assets/general/about_founder.png";

// Import local before & after images
import kitchenBeforeImg from "../assets/before_after/kitchen_before.png";
import kitchenAfterImg from "../assets/before_after/kitchen_after.png";
import warehouseBeforeImg from "../assets/before_after/warehouse_before.png";
import warehouseAfterImg from "../assets/before_after/warehouse_after.png";
import villaBeforeImg from "../assets/before_after/villa_before.png";
import villaAfterImg from "../assets/before_after/villa_after.png";

// Import local testimonials images
import testimonialRajeshImg from "../assets/testimonials/rajesh.png";
import testimonialPriyaImg from "../assets/testimonials/priya.png";
import testimonialSrinivasImg from "../assets/testimonials/srinivas.png";

// Import local blog images
import blogMonsoonTermitesImg from "../assets/blog/monsoon_termites.png";
import blogHiddenTermitesImg from "../assets/blog/hidden_termites.png";
import blogPestPreventionImg from "../assets/blog/pest_prevention.png";
import blogWarehousePestImg from "../assets/blog/warehouse_pest.png";
import blogMosquitoMonsoonImg from "../assets/blog/mosquito_monsoon.png";
import blogProfessionalVsDiyImg from "../assets/blog/professional_vs_diy.png";
import blogRestaurantComplianceImg from "../assets/blog/restaurant_compliance.png";
import blogBirdControlImg from "../assets/blog/bird_control.png";

import {
  Shield, CheckCircle2, Award, Zap, Leaf, Star, Phone, Mail,
  MapPin, ArrowRight, ChevronDown, Menu, X, Building2, Home, Factory,
  Warehouse, Hotel, Utensils, MessageCircle, Clock, BadgeCheck,
  Quote, Droplets, FlaskConical, Target, HeartHandshake, Bug,
  ShoppingBag, GraduationCap, Calendar, Wind, Send, Newspaper,
  ChevronRight, Globe, Download, TrendingUp, Twitter, Facebook,
  Instagram, Linkedin, ChevronLeft, Eye, EyeOff, Sparkles, RefreshCw
} from "lucide-react";

// Classy Green, Red, and White SVG Logo Component
export function LogoSVG({ className = "w-full h-full object-contain" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Hexagonal Shield in Forest Green */}
      <polygon points="50,5 92,25 92,75 50,95 8,75 8,25" fill="#0C2D1C" stroke="#18A558" strokeWidth="6" strokeLinejoin="round" />
      {/* Inner dotted accent line in Crimson Red */}
      <polygon points="50,12 85,28 85,72 50,88 15,72 15,28" stroke="#D2143A" strokeWidth="2" strokeLinejoin="round" strokeDasharray="3 2" />
      {/* Dynamic White & Crimson Center Symbol */}
      <path d="M35 55 L47 65 L68 38" stroke="#D2143A" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M35 55 L47 65 L68 38" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", page: "home" },
  { label: "About", page: "about" },
  { label: "Services", page: "services" },
  { label: "Blog", page: "blog" },
  { label: "Contact", page: "contact" },
];

const WHY_CHOOSE = [
  { icon: BadgeCheck, title: "Government Licensed", desc: "Fully licensed and compliant with state and national regulations in A.P, T.S, ODISSA." },
  { icon: Award, title: "Certified Professionals", desc: "Government - Certified by NIPH Govt of India & Food safety implementation programme (urban pest management)." },
  { icon: Zap, title: "Latest Technologies", desc: "Concealed piping systems and no-drill methods for seamless, damage-free treatments." },
  { icon: FlaskConical, title: "Industry Approved Chemicals", desc: "Safe, odourless chemicals from Envu, Tata Rallis, and FMC — internationally trusted brands." },
  { icon: Target, title: "Affordable Pricing", desc: "Premium service at transparent, competitive rates with no hidden charges or surprise fees." },
  { icon: HeartHandshake, title: "Guaranteed Satisfaction", desc: "We stand behind every treatment with service warranty and comprehensive follow-up visits." },
];

const SERVICES = [
  { icon: Bug, label: "Termite Control", desc: "Advanced baiting and reticulation systems to eliminate termite colonies permanently without drilling." },
  { icon: Bug, label: "Cockroach Control", desc: "Gel-based and spray treatments targeting harborage areas for sustained, long-term control." },
  { icon: Bug, label: "Rodent Control", desc: "Humane trapping and exclusion methods to fully secure your property from rodent intrusion." },
  { icon: Droplets, label: "Mosquito Control", desc: "Fogging and larvicidal treatments dramatically reducing mosquito populations around your space." },
  { icon: Wind, label: "Bird Control", desc: "Humane deterrent systems protecting commercial and residential properties without harm to birds." },
  { icon: Bug, label: "Bed Bug Control", desc: "Heat treatments and targeted chemical applications for complete, lasting bed bug elimination." },
  { icon: Building2, label: "Commercial Pest Management", desc: "Comprehensive audit and scheduled management programs for businesses and industrial facilities." },
  { icon: FlaskConical, label: "Virus & Bacteria Disinfection", desc: "Hospital-grade disinfection using CIB-approved chemicals and professional-grade equipment." },
  { icon: Droplets, label: "Water Proofing & Leakage", desc: "Advanced water proofing and leakage services with modern technology for bathrooms, walls, and slabs.", highlight: true },
];

const PESTS = [
  {
    name: "Termites",
    image: termiteImg,
    risk: "High",
    riskColor: "#D2143A",
    riskText: "Structural integrity risk",
    damage: "Destruction of wooden frames, flooring, and furniture — often invisible until severe.",
    treatment: "Reticulation system, liquid termiticide, bait stations.",
  },
  {
    name: "Cockroaches",
    image: cockroachImg,
    risk: "High",
    riskColor: "#D2143A",
    riskText: "Disease & contamination risk",
    damage: "Food contamination, spread of E. coli and Salmonella, allergy triggers.",
    treatment: "Gel baiting, residual spray, harborage elimination.",
  },
  {
    name: "Rodents",
    image: rodentImg,
    risk: "High",
    riskColor: "#D2143A",
    riskText: "Fire & disease hazard",
    damage: "Gnawed wiring, disease transmission, contaminated food stores.",
    treatment: "Bait stations, live traps, entry-point exclusion.",
  },
  {
    name: "Mosquitoes",
    image: mosquitoImg,
    risk: "Critical",
    riskColor: "#D2143A",
    riskText: "Public health risk",
    damage: "Dengue, malaria, chikungunya, and Zika virus transmission.",
    treatment: "ULV cold fogging, larvicidal treatment, breeding-site elimination.",
  },
  {
    name: "Bed Bugs",
    image: bedBugImg,
    risk: "Medium",
    riskColor: "#f97316",
    riskText: "Comfort & health risk",
    damage: "Skin irritation, psychological distress, rapid property-wide spread.",
    treatment: "Heat treatment, targeted insecticide spray, mattress encasements.",
  },
  {
    name: "Wood Borers",
    image: woodBorerImg,
    risk: "High",
    riskColor: "#D2143A",
    riskText: "Structural timber risk",
    damage: "Tunnelling through timber framework, antique furniture, and roof trusses.",
    treatment: "Injection treatment, surface application.",
  },
  {
    name: "Spiders",
    image: spiderImg,
    risk: "Low",
    riskColor: "#eab308",
    riskText: "Nuisance & venom risk",
    damage: "Venomous bites in some species, web infestation, psychological distress.",
    treatment: "Residual spray, web removal, entry-point sealing.",
  },
  {
    name: "Birds",
    image: birdImg,
    risk: "Medium",
    riskColor: "#f97316",
    riskText: "Property & health risk",
    damage: "Droppings corrode surfaces, blocked drainage, disease in nesting material.",
    treatment: "Spikes, netting, optical & sonic deterrents — all humane.",
  },
  {
    name: "Flies",
    image: fliesImg,
    risk: "Medium",
    riskColor: "#f97316",
    riskText: "Food safety risk",
    damage: "Contamination of food preparation surfaces, spread of pathogens.",
    treatment: "UV fly traps, residual spray, exclusion, sanitation audit.",
  },
];

const INDUSTRIES = [
  { icon: Home, label: "Residential" },
  { icon: Hotel, label: "Hotels" },
  { icon: Utensils, label: "Restaurants" },
  { icon: Building2, label: "Hospitals" },
  { icon: Warehouse, label: "Warehouses" },
  { icon: Factory, label: "Factories" },
  { icon: Globe, label: "IT Parks" },
  { icon: ShoppingBag, label: "Shopping Malls" },
  { icon: Warehouse, label: "Rice Mills" },
  { icon: FlaskConical, label: "Chemical Industries" },
  { icon: FlaskConical, label: "Pharma Companies" },
  { icon: GraduationCap, label: "Educational Institutions" },
  { icon: Building2, label: "Commercial Buildings" },
];

const STATS = [
  { value: 5000, suffix: "+", label: "Homes Protected" },
  { value: 800, suffix: "+", label: "Businesses Served" },
  { value: 12000, suffix: "+", label: "Treatments Completed" },
  { value: 20, suffix: "+", label: "Years Experience" },
  { value: 8, suffix: "", label: "Gov. Certifications" },
];

const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    company: "Hotel Grand Vizag",
    rating: 5,
    review: "OME Pest Control transformed our hotel operations. Professional team, completely odourless treatments, and zero pest activity since service. Highly recommended for any hospitality business in Andhra Pradesh and Telangana.",
    image: testimonialRajeshImg,
  },
  {
    name: "Priya Sharma",
    company: "Residential, Visakhapatnam",
    rating: 5,
    review: "We had a severe termite infestation that two other companies couldn't solve. OME's reticulation system resolved it completely — without a single drill hole on our marble floors. Absolutely impressed.",
    image: testimonialPriyaImg,
  },
  {
    name: "Srinivas Rao",
    company: "Pharma Warehouse, Srikakulam",
    rating: 5,
    review: "Their commercial pest audit gave us full confidence in our regulatory compliance requirements. The team is punctual, thorough, and strictly uses only approved, certified chemicals.",
    image: testimonialSrinivasImg,
  },
];

const FAQS = [
  { q: "Are the chemicals used safe for children and pets?", a: "Yes. We use only CIB-approved, industry-certified chemicals that are proven safe for humans and pets when applied by trained professionals. Our treatments are completely odourless and dry within a few hours." },
  { q: "What is the reticulation system and why is it better?", a: "The reticulation system is a concealed pipeline network installed beneath flooring or within walls. It delivers termiticide without any drilling, fully preserving luxury flooring, marble tiles, and the overall aesthetics of premium properties." },
  { q: "How long does a treatment last?", a: "Our termite treatments last 5–10 years depending on the chosen method. General pest control treatments remain effective for 3–6 months. We offer comprehensive annual maintenance contracts for ongoing protection." },
  { q: "Do you serve commercial properties?", a: "Absolutely. We provide comprehensive commercial pest management for hotels, restaurants, hospitals, warehouses, factories, IT parks, pharmaceutical companies, and all major industrial sectors across Andhra Pradesh and Telangana." },
  { q: "How quickly can you respond for emergency pest situations?", a: "We offer same-day emergency services across Visakhapatnam, Vizianagaram, and Srikakulam. Call our emergency line and a certified technician will reach your location within 2–4 hours." },
];

const BLOG_POSTS = [
  { category: "Termites", title: "How to Protect Your Home from Termites During Monsoon Season", date: "July 18, 2024", read: "5 min read", image: blogMonsoonTermitesImg },
  { category: "Termites", title: "Signs of a Hidden Termite Infestation You Should Never Ignore", date: "July 14, 2024", read: "4 min read", image: blogHiddenTermitesImg },
  { category: "Home Care", title: "Top 10 Pest Prevention Tips Every Homeowner Should Know", date: "July 10, 2024", read: "6 min read", image: blogPestPreventionImg },
  { category: "Commercial", title: "Warehouse Pest Management: A Complete Best Practices Guide", date: "July 2, 2024", read: "8 min read", image: blogWarehousePestImg },
  { category: "Mosquitoes", title: "Effective Mosquito Control Strategies During Rainy Season", date: "June 25, 2024", read: "4 min read", image: blogMosquitoMonsoonImg },
  { category: "Health", title: "Why Professional Pest Control Is Always Better Than DIY", date: "June 14, 2024", read: "7 min read", image: blogProfessionalVsDiyImg },
  { category: "Commercial", title: "Keeping Restaurants Pest-Free: Compliance & Best Practices", date: "June 5, 2024", read: "5 min read", image: blogRestaurantComplianceImg },
  { category: "Commercial", title: "Bird Control Solutions for Commercial Buildings in Andhra Pradesh and Telangana", date: "May 28, 2024", read: "5 min read", image: blogBirdControlImg },
];

const BLOG_CATEGORIES = ["All", "Home Care", "Termites", "Mosquitoes", "Rodents", "Commercial", "Health", "Seasonal Tips", "Government Guidelines"];

const PROCESS_STEPS = [
  { step: "01", title: "Inspection", desc: "Thorough assessment of the property to identify pest activity, entry points, and risk zones." },
  { step: "02", title: "Identification", desc: "Expert identification of pest species, infestation severity, and behavioural patterns." },
  { step: "03", title: "Treatment Plan", desc: "A customised, targeted treatment strategy developed based on inspection findings." },
  { step: "04", title: "Execution", desc: "Professional application of approved treatments using advanced equipment and certified chemicals." },
  { step: "05", title: "Monitoring", desc: "Post-treatment monitoring to verify effectiveness and track any residual pest activity." },
  { step: "06", title: "Follow-up", desc: "Scheduled follow-up visits and maintenance plans to ensure long-term, lasting protection." },
];

const TIMELINE = [
  { year: "2009", title: "Company Founded", desc: "OME Pest Control established in Srikakulam with a commitment to professional, chemical-safe treatments." },
  { year: "2012", title: "Expanded to Vizianagaram", desc: "Growing client demand led to full operations across the Vizianagaram district." },
  { year: "2015", title: "First Commercial Contracts", desc: "Secured major contracts with hotels, restaurants, and industrial facilities across the region." },
  { year: "2018", title: "Government Certification", desc: "Achieved full government licensing and GST registration, formalising our compliance status." },
  { year: "2020", title: "Reticulation Technology Launch", desc: "Became one of the first companies in Andhra Pradesh and Telangana to offer no-drill reticulation treatment." },
  { year: "2022", title: "Visakhapatnam Expansion", desc: "Extended full-service operations to Visakhapatnam, serving hotels, IT parks, and hospitals." },
  { year: "2023", title: "National Rank #1 Award", desc: "Awarded National Rank 1 in pest management excellence — a recognition of 20+ years of quality." },
  { year: "2024", title: "5,000+ Homes Milestone", desc: "Surpassed 5,000 homes and 800 businesses served across Andhra Pradesh and Telangana." },
];

const BEFORE_AFTER = [
  {
    label: "Residential Kitchen",
    before: kitchenBeforeImg,
    after: kitchenAfterImg,
    beforeLabel: "Before Treatment",
    afterLabel: "After Treatment",
  },
  {
    label: "Commercial Warehouse",
    before: warehouseBeforeImg,
    after: warehouseAfterImg,
    beforeLabel: "Before Treatment",
    afterLabel: "After Treatment",
  },
  {
    label: "Luxury Villa",
    before: villaBeforeImg,
    after: villaAfterImg,
    beforeLabel: "Before Treatment",
    afterLabel: "After Treatment",
  },
];

// ─── Hooks ─────────────────────────────────────────────────────────────────────

function useCounter(end: number, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = end / (2000 / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [end, inView]);
  return count;
}

function useScrolled(threshold = 80) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

// ─── Shared Components ─────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

function SectionTag({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`inline-block font-semibold text-xs tracking-widest uppercase mb-3 ${light ? "text-[#18A558]" : "text-[#18A558]"}`} style={{ fontFamily: "Inter, sans-serif" }}>
      {children}
    </div>
  );
}

function SectionHeading({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 className={light ? "text-white" : "text-[#0C2D1C]"}
      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", lineHeight: 1.2 }}>
      {children}
    </h2>
  );
}

function PageHero({ title, subtitle, page }: { title: string; subtitle: string; page: string }) {
  return (
    <section className="relative bg-[#0C2D1C] pt-36 pb-24 overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(ellipse at 70% 50%, #18A558 0%, transparent 60%)" }} />
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "linear-gradient(#18A558 1px, transparent 1px), linear-gradient(90deg, #18A558 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-[#18A558] text-xs font-semibold tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-px bg-[#18A558]" />{page}
          </div>
          <h1 className="text-white mb-4" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.15 }}>{title}</h1>
          <p className="text-white/60 text-lg max-w-xl" style={{ fontFamily: "Inter, sans-serif" }}>{subtitle}</p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Nav ────────────────────────────────────────────────────────────────────────

function Nav({
  currentPage,
  onNavigate,
  onReplayIntro,
}: {
  currentPage: string;
  onNavigate: (p: string) => void;
  onReplayIntro?: () => void;
}) {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || currentPage !== "home" ? "bg-[#0C2D1C] shadow-2xl py-3" : "bg-gradient-to-b from-[#0C2D1C]/95 via-[#0C2D1C]/80 to-transparent py-3 md:py-4"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Logo & Highlighted Capital Title Container */}
        <button onClick={() => onNavigate("home")} className="flex items-center gap-2.5 md:gap-3 group text-left">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white border-2 border-[#18A558] rounded-xl flex items-center justify-center p-1 overflow-hidden shadow-xl group-hover:scale-105 transition-transform shrink-0">
            <img src={logoImg} alt="OME Logo" className="w-full h-full object-contain" />
          </div>
          {/* Highlighted Big Red & White Badge Title - 100% visible without text cut-off */}
          <div className="bg-white border-2 border-[#D2143A] text-[#D2143A] px-3.5 py-1.5 md:px-5 md:py-2 rounded-2xl shadow-xl font-black text-xs sm:text-sm md:text-sm lg:text-base uppercase tracking-wider flex items-center">
            <span className="font-black tracking-wider leading-tight text-left">
              OME PEST CONTROL SERVICES & WATER PROOFING SERVICES
            </span>
          </div>
        </button>

        {/* Navigation Links and Buttons */}
        <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button key={link.page} onClick={() => onNavigate(link.page)}
                className={`text-sm font-bold uppercase tracking-wider transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#18A558] after:transition-all after:duration-300 ${
                  currentPage === link.page ? "text-[#18A558] after:w-full font-black" : "text-white/90 hover:text-white after:w-0 hover:after:w-full"
                }`} style={{ fontFamily: "Inter, sans-serif" }}>
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                title="Replay Logo Intro Animation"
                className="hidden xl:flex items-center gap-1.5 bg-white text-[#D2143A] hover:bg-[#D2143A] hover:text-white border-2 border-[#D2143A] text-xs font-black px-3.5 py-2 rounded-full shadow-md transition-all hover:scale-105 cursor-pointer uppercase tracking-wider"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <RefreshCw size={13} className="animate-spin-slow" /> Replay Intro
              </button>
            )}

            <button onClick={() => onNavigate("contact")}
              className="hidden md:flex items-center gap-2 bg-[#D2143A] text-white text-xs md:text-sm font-black px-4 py-2.5 rounded-full hover:bg-[#b00f2e] transition-all hover:shadow-lg hover:shadow-[#D2143A]/30 uppercase tracking-wider">
              <Phone size={13} /> Book Inspection
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white p-2 bg-white/10 rounded-lg">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0C2D1C] border-t border-white/10 overflow-hidden">
            <div className="px-6 py-5 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <button key={link.page} onClick={() => { onNavigate(link.page); setMenuOpen(false); }}
                  className={`text-left text-sm font-bold uppercase tracking-wider ${currentPage === link.page ? "text-[#18A558] font-black" : "text-white/80"}`}>
                  {link.label}
                </button>
              ))}
              {onReplayIntro && (
                <button
                  onClick={() => {
                    onReplayIntro();
                    setMenuOpen(false);
                  }}
                  className="bg-white text-[#D2143A] border-2 border-[#D2143A] font-extrabold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <RefreshCw size={13} /> Replay Intro Animation
                </button>
              )}
              <button onClick={() => { onNavigate("contact"); setMenuOpen(false); }}
                className="bg-[#D2143A] text-white font-extrabold px-5 py-3 rounded-full text-sm hover:bg-[#b00f2e] uppercase tracking-wider">
                Book Free Inspection
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────────

function HeroSection({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0C2D1C] pt-28 md:pt-36">
      <div className="absolute inset-0">
        <img src={heroBgImg}
          alt="Modern protected building" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C2D1C] via-[#0C2D1C]/85 to-[#0C2D1C]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C2D1C] via-transparent to-transparent" />
      </div>
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-10"
        style={{ backgroundImage: "radial-gradient(ellipse at 80% 40%, #18A558 0%, transparent 65%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-12 gap-10 items-center w-full">
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex flex-wrap items-center gap-2 bg-white border-2 border-[#D2143A] text-[#D2143A] text-xs md:text-sm font-extrabold px-4.5 py-2.5 rounded-full mb-6 shadow-2xl">
            <BadgeCheck size={16} className="text-[#D2143A] shrink-0" /> Government Licensed · Rank 1 Pest Management Excellence
          </motion.div>

          {/* Bold Header Line specified by user */}
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-white mb-6 leading-tight"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3.8vw, 3.2rem)" }}>
            <span className="font-extrabold text-white block mb-2">Protecting Domestic & Commercial food and Pharma & hospitality</span>{" "}
            <span className="inline-block bg-white text-[#D2143A] px-3.5 py-1 rounded-xl shadow-md border border-red-100 font-extrabold my-1">
              Advanced Pest Management & Waterproofing
            </span>{" "}
            <span className="text-[#18A558]">Solutions</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-base mb-7 leading-relaxed max-w-2xl font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
            Protecting: People's food communities, residential buildings, commercial food & pharmaceuticals, industries, IT & ITES, hospital & hospitalities across <strong>A.P, T.S, ODISSA</strong>.
          </motion.p>

          {/* New Add-Ons Badges */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="bg-white/10 border border-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl backdrop-blur-md flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#18A558] shrink-0" />
              Governement - Certified by NIPH Govt of India.
            </div>
            <div className="bg-white/10 border border-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl backdrop-blur-md flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D2143A] shrink-0" />
              Food safety implementation programme (urban pest management)
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-9">
            <button onClick={() => onNavigate("contact")}
              className="flex items-center gap-2 bg-[#D2143A] text-white font-extrabold px-7 py-4 rounded-full hover:bg-[#b00f2e] transition-all hover:shadow-2xl hover:shadow-[#D2143A]/30 hover:-translate-y-0.5"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Book a Free Inspection <ArrowRight size={17} />
            </button>
            <a href="tel:+919492081706"
              className="flex items-center gap-2 bg-white text-[#0C2D1C] hover:bg-[#18A558] hover:text-white border-2 border-white font-extrabold px-6 py-4 rounded-full transition-all shadow-lg text-sm"
              style={{ fontFamily: "Inter, sans-serif" }}>
              <Phone size={17} /> Call: 9492081706
            </a>
            <a href="tel:+919704246709"
              className="flex items-center gap-2 bg-[#18A558] text-white hover:bg-[#15934d] font-extrabold px-6 py-4 rounded-full transition-all shadow-lg text-sm"
              style={{ fontFamily: "Inter, sans-serif" }}>
              <Phone size={17} /> Call: 9704246709
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-x-6 gap-y-2.5">
            {["Government Licensed", "Certified by NIPH", "A.P, T.S, ODISSA Coverage", "Eco-Friendly Treatments", "Odourless Solutions"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-white/90 text-sm font-semibold">
                <CheckCircle2 size={15} className="text-[#18A558] shrink-0" />
                <span style={{ fontFamily: "Inter, sans-serif" }}>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Featured Showcase Container with Chemical Partners Dashboard */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
          className="lg:col-span-5">
          <div className="bg-white/8 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-2xl">
            <p className="text-white/60 text-xs font-bold tracking-widest uppercase mb-5" style={{ fontFamily: "Inter, sans-serif" }}>Why A.P, T.S, ODISSA Trusts OME Pest</p>
            <div className="grid grid-cols-2 gap-3.5 mb-6">
              {[{ v: "5,000+", l: "Homes Protected" }, { v: "800+", l: "Businesses Served" }, { v: "20+", l: "Years Experience" }, { v: "Rank #1", l: "National Award" }].map((s) => (
                <div key={s.l} className="bg-white/10 rounded-2xl p-4 text-center border border-white/10">
                  <div className="text-[#18A558] font-extrabold text-xl md:text-2xl mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>{s.v}</div>
                  <div className="text-white/80 text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-5">
              <p className="text-white/50 text-xs text-center mb-3 font-semibold">Authorised chemical partners</p>
              <div className="flex justify-center gap-8 text-white/80 text-sm font-extrabold tracking-widest">
                <span>ENVU</span><span>TATA RALLIS</span><span>FMC</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40">
        <span className="text-[10px] tracking-widest uppercase font-bold" style={{ fontFamily: "Inter, sans-serif" }}>Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ChevronDown size={16} />
        </motion.div>
      </div>
    </section>
  );
}

// ─── About Snapshot ─────────────────────────────────────────────────────────────

function AboutSnapshot({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <section className="py-28 bg-gradient-premium-light tech-grid bg-mesh-glow">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <FadeIn>
          <div className="relative max-w-md mx-auto lg:max-w-none">
            {/* Outer container matches the photo's exact 1:1 square dimensions */}
            <div className="aspect-square rounded-3xl overflow-hidden bg-white shadow-2xl border-4 border-[#18A558] p-2 flex items-center justify-center">
              <img src={omePestPosterImg}
                alt="OME Pest Control Services & Water Proofing Services" className="w-full h-full object-contain rounded-2xl shadow-sm" />
            </div>
            {/* White Container with Red text badge for National Award */}
            <div className="absolute -right-3 -top-3 md:-right-5 md:top-6 bg-white border-2 border-[#D2143A] text-[#D2143A] rounded-2xl p-4 md:p-5 shadow-2xl z-20">
              <div className="bg-white text-[#D2143A] text-[10px] md:text-[11px] font-extrabold tracking-widest uppercase mb-1 flex items-center gap-1">
                🏆 National Award
              </div>
              <div className="text-[#D2143A] font-extrabold text-xl md:text-2xl leading-none mb-0.5" style={{ fontFamily: "Poppins, sans-serif" }}>
                Rank #1
              </div>
              <div className="text-[#0C2D1C] font-semibold text-xs">Pest Management Excellence</div>
            </div>
            <div className="absolute -left-3 -bottom-3 md:-left-5 md:bottom-6 bg-[#18A558] text-white rounded-2xl p-4 md:p-5 shadow-2xl z-20">
              <div className="text-white/80 text-[10px] font-bold uppercase tracking-wider mb-1">Experience</div>
              <div className="text-white font-extrabold text-2xl md:text-3xl leading-none" style={{ fontFamily: "Poppins, sans-serif" }}>20+</div>
              <div className="text-white/90 text-xs font-semibold">Years of Expertise</div>
            </div>
          </div>
        </FadeIn>

        <div>
          <FadeIn delay={0.1}><SectionTag>Who Is OME Pest?</SectionTag><SectionHeading>{"A.P, T.S, ODISSA's Most Trusted Pest Management & Waterproofing Leader"}</SectionHeading></FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-gray-600 mt-5 mb-4 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              Founded by <strong className="text-[#0C2D1C]">T.K.C Dev & Venkateshwarulu</strong> — <strong>OME PEST CONTROL SERVICES & WATER PROOFING SERVICES</strong> is the most trusted management leader, continuing its Rank 1 status across various pest management services. Our company was built on a single premise: every home, business, and institution deserves world-class protection without compromise.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              With over 20+ years of hands-on expertise, government licensing, <strong>Government - Certified by NIPH Govt of India</strong>, and <strong>Food safety implementation programme (urban pest management)</strong>, we are the benchmark for professional pest management across <strong>A.P, T.S, ODISSA</strong>.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 gap-4 mb-9">
              {[
                { label: "Mission", text: "Protecting human health, properties, and businesses using environmentally responsible solutions across A.P, T.S, ODISSA." },
                { label: "Vision", text: "Innovation technology, waterproofing solutions, and safe certified chemicals." },
              ].map((item) => (
                <div key={item.label} className="bg-[#F8FAFB] rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="text-[#18A558] font-bold text-sm mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>{item.label}</div>
                  <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{item.text}</p>
                </div>
              ))}
            </div>
            <button onClick={() => onNavigate("about")}
              className="flex items-center gap-2 text-[#0C2D1C] font-extrabold hover:text-[#18A558] transition-colors group"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Read More About Us <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose ─────────────────────────────────────────────────────────────────

function WhyChooseSection() {
  return (
    <section className="py-28 bg-gradient-premium-light tech-grid bg-mesh-glow">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <SectionTag>Our Advantage</SectionTag>
          <SectionHeading>Why Choose OME?</SectionHeading>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Six pillars that define why OME is A.P, T.S, ODISSA's most recommended pest management and waterproofing authority.
          </p>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.08}>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
                <div className="w-14 h-14 bg-[#18A558]/8 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#18A558] transition-colors duration-300">
                  <item.icon size={22} className="text-[#18A558] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-[#081B33] font-bold text-lg mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services Overview ──────────────────────────────────────────────────────────

function ServicesOverview({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <section className="py-28 bg-gradient-premium-light tech-grid bg-mesh-glow">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <SectionTag>What We Do</SectionTag>
          <SectionHeading>Our Services</SectionHeading>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Comprehensive pest management and waterproofing solutions for every environment — across A.P, T.S, ODISSA.
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((svc, i) => (
            <FadeIn key={svc.label} delay={i * 0.06}>
              <button onClick={() => onNavigate("services")}
                className="group relative w-full text-left bg-white border border-gray-100 rounded-3xl p-6 hover:bg-[#081B33] hover:border-[#081B33] hover:shadow-2xl transition-all duration-350 overflow-hidden">
                <div className="w-12 h-12 bg-[#18A558]/8 group-hover:bg-[#18A558] rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300">
                  <svc.icon size={20} className="text-[#18A558] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[#081B33] group-hover:text-white font-bold mb-2 text-sm transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>{svc.label}</h3>
                <p className="text-gray-400 group-hover:text-white/55 text-xs leading-relaxed transition-colors mb-4" style={{ fontFamily: "Inter, sans-serif" }}>{svc.desc}</p>
                <div className="flex items-center gap-1 text-[#18A558] text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                  Explore <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Technology Section ─────────────────────────────────────────────────────────

function TechnologySection() {
  return (
    <section className="relative bg-[#0C2D1C] overflow-hidden py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <FadeIn>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#0d2540] border border-white/10 shadow-2xl">
            <img src={technologyImg}
              alt="Modern luxury building" className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C2D1C]/80 to-transparent" />
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.65">
                <line x1="0" y1="260" x2="400" y2="260" stroke="#18A558" strokeWidth="2" strokeDasharray="10 5" />
                {[60, 160, 260, 360].map((x, i) => (
                  <g key={x}>
                    <line x1={x} y1="260" x2={x} y2={[200, 175, 190, 205][i]} stroke="#18A558" strokeWidth="1.5" strokeDasharray="6 4" />
                    <circle cx={x} cy={[200, 175, 190, 205][i]} r="5" fill="#18A558" opacity="0.9" />
                    <circle cx={x} cy={[200, 175, 190, 205][i]} r="12" fill="none" stroke="#18A558" strokeWidth="1" opacity="0.3" />
                  </g>
                ))}
              </g>
            </svg>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/8 backdrop-blur-md border border-white/10 rounded-2xl p-4">
                <p className="text-white/80 text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                  Concealed technology system — zero surface damage, complete subsurface & waterproofing protection
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <div>
          <FadeIn delay={0.1}><SectionTag>Premium Technology</SectionTag><SectionHeading light>Advanced Technology</SectionHeading></FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-white/70 mt-5 mb-4 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              Traditional pest control requires drilling holes into your premium flooring and tiles — permanently damaging the aesthetic of luxury homes and commercial spaces. We eliminated that compromise entirely.
            </p>
            <p className="text-white/70 mb-9 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              Our concealed advanced technology system installs within structural layers, delivering precise treatment through hidden pipelines — not a single drill mark on your property.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="space-y-3">
              {[
                { icon: "⚡", label: "No Drilling Required", desc: "Zero damage to luxury marble, tiles, or hardwood floors" },
                { icon: "🌬️", label: "Completely Odourless", desc: "Safe for occupied spaces — no evacuation needed" },
                { icon: "🛡️", label: "Long-term Protection", desc: "5–10 years of certified protection & warranty guaranteed" },
                { icon: "🏛️", label: "Luxury-Property Friendly", desc: "Designed for premium residences and high-end commercial buildings" },
                { icon: "👨‍👩‍👧", label: "Safe for Families", desc: "CIB-approved chemicals, no risk to children or pets" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 bg-white/4 rounded-2xl p-4 border border-white/8 hover:border-[#18A558]/40 transition-colors">
                  <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <div className="text-white font-semibold text-sm mb-0.5" style={{ fontFamily: "Poppins, sans-serif" }}>{item.label}</div>
                    <div className="text-white/40 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Pest Awareness Section ─────────────────────────────────────────────────────

function PestAwarenessSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="py-28 bg-gradient-premium-light tech-grid bg-mesh-glow overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-4">
          <SectionTag>Know Your Risks</SectionTag>
          <SectionHeading>Pest Awareness Guide</SectionHeading>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-14 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Understanding the pests that threaten your property is the first step to protecting it. Each card reveals risk level, damage potential, and our treatment approach.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PESTS.map((pest, i) => (
            <FadeIn key={pest.name} delay={i * 0.06}>
              <div
                className={`group relative rounded-3xl overflow-hidden border cursor-pointer transition-all duration-400 ${
                  active === i ? "shadow-2xl -translate-y-1 border-[#18A558]/30" : "border-gray-100 hover:-translate-y-1 hover:shadow-xl"
                }`}
                onClick={() => setActive(active === i ? null : i)}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-gray-100">
                  <img src={pest.image} alt={pest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C2D1C]/70 via-[#0C2D1C]/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <h3 className="text-white font-extrabold text-xl" style={{ fontFamily: "Poppins, sans-serif" }}>{pest.name}</h3>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white border border-white/30 backdrop-blur-sm"
                      style={{ backgroundColor: pest.riskColor + "99", fontFamily: "Inter, sans-serif" }}>
                      {pest.risk} Risk
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="bg-white p-5">
                  <p className="text-[#18A558] text-xs font-semibold mb-3" style={{ fontFamily: "Inter, sans-serif" }}>{pest.riskText}</p>
                  <div className="space-y-2.5">
                    <div>
                      <span className="text-[#0C2D1C] text-xs font-bold uppercase tracking-wide" style={{ fontFamily: "Inter, sans-serif" }}>Damage: </span>
                      <span className="text-gray-500 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{pest.damage}</span>
                    </div>
                    <AnimatePresence>
                      {active === i && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }} className="overflow-hidden">
                          <div className="pt-2 border-t border-gray-100 mt-2">
                            <span className="text-[#18A558] text-xs font-bold uppercase tracking-wide" style={{ fontFamily: "Inter, sans-serif" }}>Treatment: </span>
                            <span className="text-gray-500 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{pest.treatment}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="mt-3 text-xs text-gray-400 flex items-center gap-1" style={{ fontFamily: "Inter, sans-serif" }}>
                    {active === i ? <><EyeOff size={11} /> Hide treatment</> : <><Eye size={11} /> View treatment</>}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Before / After Gallery ─────────────────────────────────────────────────────

function BeforeAfterSection() {
  const [activeCase, setActiveCase] = useState(0);
  const [showAfter, setShowAfter] = useState(false);

  const current = BEFORE_AFTER[activeCase];

  return (
    <section className="py-28 bg-gradient-premium-light tech-grid bg-mesh-glow">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <SectionTag>Real Results</SectionTag>
          <SectionHeading>Before & After Treatment</SectionHeading>
          <p className="text-gray-400 mt-4 max-w-md mx-auto text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            See the visible difference our treatments make. Click to reveal the transformation.
          </p>
        </FadeIn>

        <FadeIn>
          {/* Case tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {BEFORE_AFTER.map((b, i) => (
              <button key={b.label} onClick={() => { setActiveCase(i); setShowAfter(false); }}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${activeCase === i ? "bg-[#0C2D1C] text-white border-[#0C2D1C]" : "bg-white text-gray-500 border-gray-200 hover:border-[#0C2D1C]/40"}`}
                style={{ fontFamily: "Inter, sans-serif" }}>
                {b.label}
              </button>
            ))}
          </div>

          {/* Image switcher */}
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
            <AnimatePresence mode="wait">
              <motion.img key={showAfter ? "after" : "before"}
                src={showAfter ? current.after : current.before}
                alt={showAfter ? current.afterLabel : current.beforeLabel}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover" />
            </AnimatePresence>

            {/* Label badge */}
            <div className={`absolute top-5 left-5 flex items-center gap-2 text-white text-sm font-bold px-4 py-2 rounded-full backdrop-blur-sm ${showAfter ? "bg-[#18A558]/90" : "bg-[#0C2D1C]/80"}`}
              style={{ fontFamily: "Poppins, sans-serif" }}>
              {showAfter ? <CheckCircle2 size={15} /> : <Bug size={15} />}
              {showAfter ? current.afterLabel : current.beforeLabel}
            </div>

            {/* Toggle button */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <button onClick={() => setShowAfter(!showAfter)}
                className="flex items-center gap-3 bg-white text-[#0C2D1C] font-bold px-7 py-3.5 rounded-full shadow-2xl hover:shadow-3xl hover:-translate-y-0.5 transition-all text-sm"
                style={{ fontFamily: "Inter, sans-serif" }}>
                {showAfter ? <><ChevronLeft size={16} /> Show Before</> : <>Show After <ChevronRight size={16} /></>}
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Industries ─────────────────────────────────────────────────────────────────

function IndustriesSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <SectionTag>Who We Serve</SectionTag>
          <SectionHeading>Industries We Serve</SectionHeading>
          <p className="text-gray-400 mt-4 max-w-md mx-auto text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            Tailored pest management programs for every sector — from homes to large-scale industrial operations.
          </p>
        </FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {INDUSTRIES.map((ind, i) => (
            <FadeIn key={ind.label} delay={i * 0.04}>
              <div onMouseEnter={() => setHovered(ind.label)} onMouseLeave={() => setHovered(null)}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-300 cursor-default select-none ${
                  hovered === ind.label ? "bg-[#0C2D1C] border-[#0C2D1C] shadow-xl -translate-y-1" : "bg-[#F8FAFB] border-gray-100"
                }`}>
                <ind.icon size={26} className={`transition-colors duration-300 ${hovered === ind.label ? "text-[#18A558]" : "text-[#0C2D1C]/70"}`} />
                <span className={`text-sm font-semibold text-center transition-colors duration-300 ${hovered === ind.label ? "text-white" : "text-[#0C2D1C]"}`}
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {ind.label}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Chemical Partners ──────────────────────────────────────────────────────────

// ─── Chemical Partners ──────────────────────────────────────────────────────────

function PartnersSection() {
  return (
    <section className="py-20 bg-[#F8FAFB] border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <FadeIn>
          <p className="text-gray-400 text-sm mb-8 max-w-xl mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
            We use internationally trusted pest management products that are safe, effective, and approved for professional applications.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {["ENVU", "TATA RALLIS", "FMC"].map((brand) => (
              <div key={brand} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#18A558]" />
                <span className="text-[#0C2D1C] font-bold text-xl tracking-widest" style={{ fontFamily: "Poppins, sans-serif" }}>{brand}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Stats ──────────────────────────────────────────────────────────────────────

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCounter(value, inView);
  return (
    <div ref={ref} className="text-center">
      <div className="text-[#18A558] font-extrabold mb-2" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2.2rem, 4vw, 3.2rem)" }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-white/50 text-sm font-medium" style={{ fontFamily: "Inter, sans-serif" }}>{label}</div>
    </div>
  );
}

function StatsSection() {
  return (
    <section className="py-24 bg-[#0C2D1C]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16"><SectionHeading light>Numbers That Define Our Excellence</SectionHeading></FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10">
          {STATS.map((s) => <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ───────────────────────────────────────────────────────────────

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-28 bg-[#F8FAFB]">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <SectionTag>Client Stories</SectionTag>
          <SectionHeading>What Our Clients Say</SectionHeading>
        </FadeIn>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm text-center">
              <Quote size={36} className="text-[#18A558]/25 mx-auto mb-6" />
              <p className="text-gray-600 text-lg leading-relaxed mb-8 italic" style={{ fontFamily: "Inter, sans-serif" }}>"{TESTIMONIALS[active].review}"</p>
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: TESTIMONIALS[active].rating }).map((_, i) => (
                  <Star key={i} size={15} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border-2 border-[#18A558]/20">
                  <img src={TESTIMONIALS[active].image} alt={TESTIMONIALS[active].name} className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <div className="text-[#0C2D1C] font-bold text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>{TESTIMONIALS[active].name}</div>
                  <div className="text-gray-400 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{TESTIMONIALS[active].company}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${i === active ? "bg-[#18A558] w-8 h-2" : "bg-gray-300 w-2 h-2"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Awards ─────────────────────────────────────────────────────────────────────

function AwardsSection() {
  const awards = [
    { icon: "🏆", title: "Rank 1 continues in various pest management services", subtitle: "Pest Management Excellence 2023", year: "2023", cert: "National-Award-2023.pdf" },
    { icon: "📜", title: "Government License", subtitle: "State Pest Control Authority — Active", year: "Active", cert: "Government-License.pdf" },
    { icon: "📋", title: "GST Registration", subtitle: "Verified Business Entity", year: "Active", cert: "GST-Certificate.pdf" },
    { icon: "⚗️", title: "Certified Chemicals", subtitle: "Industry Approved — CIB Compliant", year: "Active", cert: "Chemical-Certification.pdf" },
  ];
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <SectionTag>Recognition</SectionTag>
          <SectionHeading>Awards & Certifications</SectionHeading>
          <p className="text-gray-400 mt-4 max-w-md mx-auto text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            Our credentials reflect an unwavering commitment to safety, quality, and professional excellence.
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {awards.map((award, i) => (
            <FadeIn key={award.title} delay={i * 0.1}>
              <div className="bg-white border border-[#d4af37]/20 rounded-3xl p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col">
                <div className="text-5xl mb-5">{award.icon}</div>
                <div className="text-[#d4af37] text-[10px] font-bold tracking-widest uppercase mb-2">{award.year}</div>
                <h3 className="text-[#0C2D1C] font-bold mb-1.5 text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>{award.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-5 flex-1" style={{ fontFamily: "Inter, sans-serif" }}>{award.subtitle}</p>
                <button className="flex items-center justify-center gap-2 text-xs font-semibold text-[#0C2D1C] hover:text-[#18A558] border border-gray-200 hover:border-[#18A558]/30 rounded-xl py-2.5 px-4 transition-all group-hover:border-[#d4af37]/40"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  <Download size={12} /> Download Certificate
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ────────────────────────────────────────────────────────────────────────

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-28 bg-[#F8FAFB]">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <SectionTag>FAQs</SectionTag>
          <SectionHeading>Frequently Asked Questions</SectionHeading>
        </FadeIn>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left hover:bg-gray-50 transition-colors">
                  <span className="text-[#0C2D1C] font-semibold text-sm leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>{faq.q}</span>
                  <ChevronDown size={17} className={`text-[#18A558] flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="px-7 pb-6 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4" style={{ fontFamily: "Inter, sans-serif" }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ──────────────────────────────────────────────────────────────────

function FinalCTA({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <section className="py-28 bg-[#0C2D1C] relative overflow-hidden">
      <div className="absolute inset-0"
        style={{ backgroundImage: "radial-gradient(circle at 15% 50%, rgba(24,165,88,0.15) 0%, transparent 50%), radial-gradient(circle at 85% 50%, rgba(24,165,88,0.1) 0%, transparent 50%)" }} />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 bg-[#18A558]/15 border border-[#18A558]/25 text-[#18A558] text-xs font-semibold px-4 py-2 rounded-full mb-8">
            <Shield size={13} /> 100% Satisfaction Guaranteed
          </div>
          <SectionHeading light>Ready to Protect Your Property?</SectionHeading>
          <p className="text-white/70 mt-4 mb-10 text-lg leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Join over 5,000 homes and 800 businesses that trust <strong>OME PEST CONTROL SERVICES & WATER PROOFING SERVICES</strong> across <strong>A.P, T.S, ODISSA</strong>.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => onNavigate("contact")}
              className="flex items-center gap-2 bg-[#D2143A] text-white font-bold px-9 py-4 rounded-full hover:bg-[#b00f2e] transition-all hover:shadow-2xl hover:shadow-[#D2143A]/30 hover:-translate-y-0.5"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Book a Free Inspection <ArrowRight size={17} />
            </button>
            <a href="tel:+919492081706"
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-7 py-4 rounded-full hover:bg-white/20 transition-all"
              style={{ fontFamily: "Inter, sans-serif" }}>
              <Phone size={17} /> Call: 9492081706
            </a>
            <a href="tel:+919704246709"
              className="flex items-center gap-2 bg-[#18A558] border border-[#18A558] text-white font-semibold px-7 py-4 rounded-full hover:bg-[#15934d] transition-all"
              style={{ fontFamily: "Inter, sans-serif" }}>
              <Phone size={17} /> Call: 9704246709
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────────────

function Footer({
  onNavigate,
  onReplayIntro,
}: {
  onNavigate: (p: string) => void;
  onReplayIntro?: () => void;
}) {
  return (
    <footer className="bg-[#050F1D] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-white border-2 border-[#18A558] rounded-xl flex items-center justify-center p-1 overflow-hidden shadow-md shrink-0">
                <img src={logoImg} alt="OME Logo" className="w-full h-full object-contain" />
              </div>
              <div className="bg-white border-2 border-[#D2143A] text-[#D2143A] px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-md">
                OME PEST CONTROL SERVICES & WATER PROOFING SERVICES
              </div>
            </div>
            <p className="text-white/60 text-xs leading-relaxed mb-5" style={{ fontFamily: "Inter, sans-serif" }}>
              {"A.P, T.S, ODISSA's most trusted, government-licensed pest management & waterproofing company."}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Govt License", "NIPH Certified", "Food Safety Program", "A.P, T.S, ODISSA"].map((b) => (
                <span key={b} className="text-[10px] bg-white text-[#D2143A] font-extrabold px-2.5 py-1 rounded-full border border-red-200 shadow-sm">{b}</span>
              ))}
            </div>
            {/* Social Media */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-8.5 h-8.5 bg-white/8 border border-white/10 rounded-lg flex items-center justify-center hover:bg-[#18A558] hover:border-[#18A558] transition-all">
                  <Icon size={14} className="text-white/70 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-5 text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.page}>
                  <button onClick={() => onNavigate(l.page)}
                    className="text-white/50 hover:text-[#18A558] transition-colors text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-5 text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>Services</h4>
            <ul className="space-y-3">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.label}>
                  <button onClick={() => onNavigate("services")}
                    className="text-white/50 hover:text-[#18A558] transition-colors text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-5 text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[#18A558] mt-0.5 flex-shrink-0" />
                <span className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>Serving A.P, T.S, ODISSA</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-[#18A558] mt-0.5 flex-shrink-0" />
                <span className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>+91 9492081706 / +91 9704246709</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-[#18A558] mt-0.5 flex-shrink-0" />
                <span className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>omepestcontrol@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={15} className="text-[#18A558] mt-0.5 flex-shrink-0" />
                <span className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>Mon–Sat · 9:00 AM – 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
            © 2024 OME PEST CONTROL SERVICES & WATER PROOFING SERVICES. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="bg-white text-[#D2143A] hover:bg-[#D2143A] hover:text-white border border-[#D2143A] font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-sm transition-all flex items-center gap-1.5 uppercase tracking-wider"
              >
                <RefreshCw size={12} /> Replay Intro
              </button>
            )}
            <button className="text-white/40 hover:text-white/80 text-xs transition-colors">Privacy Policy</button>
            <button className="text-white/40 hover:text-white/80 text-xs transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating Buttons ───────────────────────────────────────────────────────────

function FloatingButtons({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a href="https://wa.me/919492081706" target="_blank" rel="noopener noreferrer" title="WhatsApp"
        className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 hover:scale-110 transition-transform">
        <MessageCircle size={21} className="text-white" />
      </a>
      <a href="tel:+919492081706" title="Call Now"
        className="w-12 h-12 bg-[#18A558] rounded-full flex items-center justify-center shadow-2xl shadow-[#18A558]/30 hover:scale-110 transition-transform">
        <Phone size={19} className="text-white" />
      </a>
      <button onClick={() => onNavigate("contact")} title="Book Inspection"
        className="w-12 h-12 bg-[#0C2D1C] border border-white/10 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
        <Calendar size={19} className="text-white" />
      </button>
    </div>
  );
}

// ─── Home Page ──────────────────────────────────────────────────────────────────

function HomePage({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <>
      <HeroSection onNavigate={onNavigate} />
      <AboutSnapshot onNavigate={onNavigate} />
      <WhyChooseSection />
      <ServicesOverview onNavigate={onNavigate} />
      <TechnologySection />
      <PestAwarenessSection />
      <BeforeAfterSection />
      <IndustriesSection />
      <PartnersSection />
      <StatsSection />
      <TestimonialsSection />
      <AwardsSection />
      <FAQSection />
      <FinalCTA onNavigate={onNavigate} />
    </>
  );
}

// ─── About Page ─────────────────────────────────────────────────────────────────

function AboutPage({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <>
      <PageHero page="About Us" title="Built on Trust, Driven by Excellence"
        subtitle="The story behind Andhra Pradesh and Telangana's most recognised pest management company and the leaders who built it." />

      {/* Company Story */}
      <section className="py-24 bg-gradient-premium-light tech-grid bg-mesh-glow">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <FadeIn>
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100">
              <img src={companyStoryImg}
                alt="OME team at work" className="w-full h-full object-cover" />
            </div>
          </FadeIn>
          <div>
            <FadeIn delay={0.1}><SectionTag>Our Story</SectionTag><SectionHeading>From a Vision to Andhra Pradesh and Telangana's Benchmark</SectionHeading></FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-gray-500 mt-5 mb-4 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                OME Pest Control Services was founded with a clear purpose: to bring world-class pest management to the homes, businesses, and communities of Andhra Pradesh and Telangana — with the professionalism, safety standards, and technological sophistication that residents and industries deserve.
              </p>
              <p className="text-gray-500 mb-4 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                What began as a single-minded commitment to quality has grown into a nationally recognised operation. Today, OME holds government licensing, GST registration, and the industry's highest certifications — and our work continues its Rank 1 status across various pest management services.
              </p>
              <p className="text-gray-500 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                Across Srikakulam, Vizianagaram, Visakhapatnam, and state-wide networks, we've completed over 12,000 treatments and protected thousands of families and businesses — not just from pests, but from the disruption and damage they cause.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Founders Leadership Matter */}
      <section className="py-20 bg-gradient-premium-light tech-grid bg-mesh-glow">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="text-center mb-8">
            <SectionTag>Leadership & Management</SectionTag>
            <SectionHeading>T.K.C Dev & Venkateshwarulu</SectionHeading>
            <div className="flex flex-wrap gap-3 justify-center mt-4 mb-2">
              {["Top Operations Managers", "Rank #1 in Pest Management", "20+ Years Experience", "NIPH Certified"].map((badge) => (
                <span key={badge} className="text-xs bg-white text-[#D2143A] font-extrabold px-4 py-1.5 rounded-full border border-red-200 shadow-sm">{badge}</span>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-lg space-y-5">
              <p className="text-gray-600 text-base leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                <strong>T.K.C Dev & Venkateshwarulu</strong> bring over 20+ years of deep expertise in pest management operations, team leadership, and customer-first service delivery. Their philosophy is simple: every client deserves the same precision, care, and professionalism — whether they're a family in a one-bedroom apartment or the manager of a 50-room hotel or pharmaceutical facility.
              </p>
              <p className="text-gray-600 text-base leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                Their recognition as Rank 1 pest management leaders isn't just personal achievement — it's a reflection of the rigorous quality standards they have built into every aspect of OME's operations, from chemical selection to technician training to post-treatment follow-up and waterproofing excellence.
              </p>
              <p className="text-gray-600 text-base leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                Under their leadership, OME became one of the first companies in A.P, T.S, ODISSA to offer no-drill advanced technology and certified urban pest management — a commitment to innovation that defines the company's future.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-24 bg-[#0C2D1C]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-14"><SectionHeading light>Mission, Vision & Core Values</SectionHeading></FadeIn>
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {[
              { label: "Mission", text: "Protecting human health, properties, and businesses across Andhra Pradesh and Telangana using environmentally responsible, scientifically backed pest management solutions." },
              { label: "Vision", text: "To become Andhra Pradesh and Telangana's most trusted pest management company through innovation, advanced technology, rigorous safety standards, and outstanding customer satisfaction." },
              { label: "Commitment", text: "We never compromise on chemical safety, treatment quality, or post-service care. Every client receives warranty-backed service and dedicated follow-up." },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.1}>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                  <div className="text-[#18A558] font-bold mb-3 text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>{item.label}</div>
                  <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {["Integrity", "Safety", "Innovation", "Professionalism", "Trust", "Transparency"].map((v, i) => (
              <FadeIn key={v} delay={i * 0.05}>
                <div className="text-center bg-white/5 border border-white/10 rounded-2xl py-5 px-3">
                  <div className="w-8 h-8 bg-[#18A558]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 size={16} className="text-[#18A558]" />
                  </div>
                  <div className="text-white text-sm font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>{v}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-gradient-premium-light tech-grid bg-mesh-glow">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-14">
            <SectionTag>Our Credentials</SectionTag>
            <SectionHeading>Certifications & Compliance</SectionHeading>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "📜", title: "Government License", desc: "Issued by the State Pest Control Authority — fully active and renewed annually." },
              { icon: "📋", title: "GST Registration", desc: "Registered and compliant under Goods and Services Tax as a verified business entity." },
              { icon: "⚗️", title: "Authorised Chemicals", desc: "All chemicals certified and approved under the Insecticides Act by authorised bodies." },
              { icon: "🏭", title: "Industry Compliance", desc: "Adherent to HACCP protocols, CIB guidelines, and FSSAI pest control standards." },
            ].map((cert, i) => (
              <FadeIn key={cert.title} delay={i * 0.08}>
                <div className="bg-[#F8FAFB] border border-gray-100 rounded-3xl p-7 hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{cert.icon}</div>
                  <h3 className="text-[#0C2D1C] font-bold mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>{cert.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{cert.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-gradient-premium-light tech-grid bg-mesh-glow">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <SectionTag>Our Journey</SectionTag>
            <SectionHeading>Company Timeline</SectionHeading>
            <p className="text-gray-400 mt-4 max-w-md mx-auto text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
              20+ years of growth, milestones, and an unwavering commitment to excellence across Andhra Pradesh and Telangana.
            </p>
          </FadeIn>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#18A558] via-[#18A558]/40 to-transparent" />

            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <FadeIn key={item.year} delay={i * 0.07}>
                  <div className={`relative flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} pl-16 md:pl-0`}>
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 top-4 -translate-x-1/2 w-4 h-4 rounded-full bg-[#18A558] border-4 border-white shadow-lg z-10" />

                    {/* Card */}
                    <div className={`md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:ml-auto md:mr-8" : "md:mr-auto md:ml-8"}`}>
                      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-[#18A558] font-extrabold text-lg mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>{item.year}</div>
                        <h3 className="text-[#0C2D1C] font-bold mb-2 text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>{item.title}</h3>
                        <p className="text-gray-400 text-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-gradient-premium-light tech-grid bg-mesh-glow">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <SectionTag>How We Work</SectionTag>
            <SectionHeading>Our 6-Step Process</SectionHeading>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.08}>
                <div className="bg-[#F8FAFB] rounded-3xl p-7 border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="text-[#18A558]/25 font-extrabold text-4xl mb-4 leading-none" style={{ fontFamily: "Poppins, sans-serif" }}>{step.step}</div>
                  <h3 className="text-[#0C2D1C] font-bold mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA onNavigate={onNavigate} />
    </>
  );
}

// ─── Comparison Table ───────────────────────────────────────────────────────────

function ComparisonTable() {
  const rows = [
    { feature: "Drilling required", traditional: { value: "Yes — multiple holes per room", bad: true }, modern: { value: "None whatsoever", bad: false } },
    { feature: "Damage to flooring", traditional: { value: "Permanent — marble, tiles, hardwood", bad: true }, modern: { value: "Zero surface impact", bad: false } },
    { feature: "Odour during treatment", traditional: { value: "Strong chemical smell — 24–48 hrs", bad: true }, modern: { value: "Completely odourless", bad: false } },
    { feature: "Protection duration", traditional: { value: "3–5 years", bad: true }, modern: { value: "5–10 years guaranteed", bad: false } },
    { feature: "Disruption to occupants", traditional: { value: "High — property must be vacated", bad: true }, modern: { value: "Minimal — occupied spaces safe", bad: false } },
    { feature: "Suitable for luxury properties", traditional: { value: "Not recommended", bad: true }, modern: { value: "Specifically designed for premium spaces", bad: false } },
    { feature: "Re-treatment access", traditional: { value: "New drilling holes each time", bad: true }, modern: { value: "Via existing concealed pipeline", bad: false } },
    { feature: "Chemical safety", traditional: { value: "Standard exposure risk", bad: true }, modern: { value: "CIB-approved, enclosed delivery", bad: false } },
  ];

  return (
    <section className="py-28 bg-gradient-premium-light tech-grid bg-mesh-glow">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <SectionTag>Technology Comparison</SectionTag>
          <SectionHeading>Traditional vs Modern Reticulation</SectionHeading>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            See why our no-drill reticulation system is the clear choice for premium residential and commercial properties.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-3 bg-[#0C2D1C]">
              <div className="p-5 text-white/50 text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "Inter, sans-serif" }}>Feature</div>
              <div className="p-5 text-center border-l border-white/10">
                <div className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Traditional</div>
                <div className="text-red-400 text-xs">Drilling Method</div>
              </div>
              <div className="p-5 text-center border-l border-white/10 bg-[#18A558]/10">
                <div className="text-[#18A558] text-xs font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Modern (OME)</div>
                <div className="text-[#18A558]/60 text-xs">Reticulation System</div>
              </div>
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 border-t border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-[#F8FAFB]"}`}>
                <div className="p-5 text-[#0C2D1C] text-sm font-medium" style={{ fontFamily: "Inter, sans-serif" }}>{row.feature}</div>
                <div className="p-5 border-l border-gray-100 flex items-start gap-2">
                  <X size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-500 text-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{row.traditional.value}</span>
                </div>
                <div className="p-5 border-l border-gray-100 flex items-start gap-2 bg-[#18A558]/4">
                  <CheckCircle2 size={14} className="text-[#18A558] mt-0.5 flex-shrink-0" />
                  <span className="text-[#0C2D1C] text-xs leading-relaxed font-medium" style={{ fontFamily: "Inter, sans-serif" }}>{row.modern.value}</span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Services Page ──────────────────────────────────────────────────────────────

function ServicesPage({ onNavigate }: { onNavigate: (p: string) => void }) {
  const allServices = [
    { 
      label: "Termite Management", 
      icon: Bug, 
      img: termiteImg, 
      problem: "Termites cause structural damage worth lakhs before they are even detected. They feed silently on wood, cellulose, paper, and cloth materials.", 
      signs: ["Hollow-sounding wood when tapped", "Mud tubes along walls or foundations", "Discarded wings near windows and doors", "Buckling paint or wrapped walls"], 
      risks: "Structural weakening of buildings, destruction of furniture and woodwork, extremely costly repairs if untreated for extended periods.", 
      treatment: "1. Drill fill treatment (liquid termicide soil treatment) 2. Termite baiting system 3. Reticulation piping system with warranties", 
      frequency: "Single treatment · 1-year, 5-year, or 10-year warranty options" 
    },
    { 
      label: "Cockroach Management", 
      icon: Bug, 
      img: cockroachImg, 
      problem: "Cockroaches spread bacteria, contaminate food, and trigger allergies. They breed rapidly and are notoriously difficult to control without professional treatment.", 
      signs: ["Droppings in cupboards and drawers", "Musty, oily odour in enclosed spaces", "Egg cases behind appliances", "Nocturnal sightings in kitchen areas"], 
      risks: "Food contamination, spread of Salmonella and E. coli, allergy and asthma triggers, regulatory failure in food businesses.", 
      treatment: "Gel baiting at harborage sites, targeted residual spray in concealed areas, and sanitation recommendations.", 
      frequency: "Every 3–6 months" 
    },
    { 
      label: "Rodent Management", 
      icon: Bug, 
      img: rodentImg, 
      problem: "Rats and mice gnaw through wiring, contaminate stored goods, and carry serious diseases including leptospirosis and hantavirus.", 
      signs: ["Gnaw marks on cables or packaging", "Droppings along walls and skirting", "Grease trails on surfaces", "Scratching sounds in walls at night"], 
      risks: "Electrical fire hazards, food contamination, disease transmission, destruction of insulation and stored materials.", 
      treatment: "Bait stations, live traps, exclusion sealing of entry points, and full sanitation audit.", 
      frequency: "Monthly (commercial) · Quarterly (residential)" 
    },
    { 
      label: "Bed Bug Management", 
      icon: Bug, 
      img: bedBugImg, 
      problem: "Bed bugs are flat, elusive insects that feed on blood. They spread rapidly through luggage, furniture, and bedding — a growing concern in hotels and households.", 
      signs: ["Rust-coloured spots on mattress seams", "Bites in lines or clusters on skin", "Live insects in mattress folds", "Sweet, musty odour in affected rooms"], 
      risks: "Skin rash, psychological distress, difficulty sleeping, rapid property-wide spread if untreated.", 
      treatment: "Heat treatment (most effective), targeted insecticide spray, mattress encasements, and post-treatment monitoring.", 
      frequency: "Treatment as needed · Quarterly inspections for hotels" 
    },
    { 
      label: "Mosquito Management", 
      icon: Droplets, 
      img: mosquitoImg, 
      problem: "Mosquitoes are vectors for dengue, malaria, chikungunya, and Zika — all significant health threats in Andhra Pradesh and Telangana, particularly during monsoon.", 
      signs: ["Biting activity at dawn and dusk", "Stagnant water on the property", "Larvae visible in still water containers"], 
      risks: "Dengue, malaria, chikungunya, West Nile virus, severe allergic reactions.", 
      treatment: "Residual spray, ULV cold fogging, and larvicidal treatment to eliminate all breeding sites.", 
      frequency: "Monthly during monsoon · Every 2 months otherwise" 
    },
    { 
      label: "Flies Management", 
      icon: Wind, 
      img: fliesImg, 
      problem: "House flies and drain flies are major food contamination risks in kitchens, restaurants, and food storage areas, carrying over 100 known pathogens.", 
      signs: ["Visible flies congregating near food areas", "Maggots in bins or drains", "House fly, blue bottle fly, drain fly, fruit fly, filter fly, blow fly sightings"], 
      risks: "Contamination of food preparation surfaces, spread of typhoid, cholera, and dysentery pathogens.", 
      treatment: "UV fly trap installation, residual spray, drain treatment, exclusion screens, and full sanitation audit.", 
      frequency: "Monthly service (commercial kitchens) · Quarterly (residential)" 
    },
    { 
      label: "Wood Borer Management", 
      icon: Zap, 
      img: woodBorerImg, 
      problem: "Wood borers tunnel through timber framework, antique furniture, and roof trusses containing cellulose. They infest species like house longhorn beetle and powder post beetle.", 
      signs: ["Small round exit holes in wood surfaces", "Fine powdery wood dust (frass) below furniture", "Weakened or crumbling wood", "Pinholes in plywood or timber structures"], 
      risks: "Structural weakening of timber frames, destruction of valuable furniture, roof truss damage.", 
      treatment: "1. Syringe injection of chemical termicide 2. Chemical surface spraying (preservative treatment) 3. Wood preservation treatment (solvent-based/water-based/gel based) with warranty", 
      frequency: "Every 3–6 months for high-activity areas · Annual/seasonal inspections" 
    },
    { 
      label: "Spider Management", 
      icon: Target, 
      img: spiderImg, 
      problem: "While most spiders are harmless, some species carry venom. Heavy infestations create an unwelcoming environment in homes, offices, and hospitality spaces.", 
      signs: ["Webs in corners, rafters, and storage", "Egg sacs in sheltered spots", "Sightings of large or numerous spiders", "Webs near lighting fixtures"], 
      risks: "Venomous bites from certain species, customer and guest complaints in hospitality, psychological distress.", 
      treatment: "Targeted residual spray, web removal, de-webbing of premises, and entry-point sealing.", 
      frequency: "Every 3–6 months" 
    },
    { 
      label: "Snake Management", 
      icon: Shield, 
      img: snakeImg, 
      problem: "Snakes entering residential or industrial properties pose serious safety risks. Effective management involves safe removal and long-term prevention.", 
      signs: ["Direct sightings on the property", "Shed skin found in corners or under objects", "Rodent activity (which attracts snakes)", "Gaps or holes in foundations and walls"], 
      risks: "Venomous bites, psychological distress, risk to children and pets, particularly in agricultural and industrial areas.", 
      treatment: "Safe professional removal, property inspection, sealing of entry points, and rodent control to remove attractants.", 
      frequency: "As needed · Annual property inspection recommended" 
    },
    { 
      label: "Bird Control Solutions", 
      icon: Wind, 
      img: birdImg, 
      problem: "Birds nesting on commercial buildings cause structural damage, block drainage, create health hazards from droppings, and damage brand perception.", 
      signs: ["Droppings on building facades and ledges", "Nesting material in vents and gutters", "Bird congregations on rooftops"], 
      risks: "Health risks from droppings, blocked drainage causing flooding, equipment and signage damage.", 
      treatment: "Bird spikes, netting, optical deterrents, and exclusion systems — all humane and non-lethal methods.", 
      frequency: "Annual inspection · Deterrent maintenance as required" 
    },
    { 
      label: "Food Storage Pest Management", 
      icon: Warehouse, 
      img: foodStorageImg, 
      problem: "Food storage facilities face unique risks from weevils, grain beetles, moths, and rodents — all of which can devastate stored inventory and trigger regulatory failures.", 
      signs: ["Visible insects or larvae in stored goods", "Webbing on grain or flour sacks", "Damaged packaging", "Musty odours from stored produce"], 
      risks: "Total inventory loss, regulatory non-compliance, FSSAI violations, significant financial loss.", 
      treatment: "Fumigation, residual spray, pheromone traps, HACCP-compliant monitoring programs, and staff hygiene training.", 
      frequency: "Monthly inspections · Fumigation as needed" 
    },
    { 
      label: "Virus & Bacteria Disinfection", 
      icon: FlaskConical, 
      img: disinfectionImg, 
      problem: "In post-pandemic environments, disinfection is critical for healthcare facilities, food businesses, schools, and high-contact public spaces.", 
      signs: ["Post-outbreak requirement", "High-risk facility type", "Regulatory requirement for sanitation certification"], 
      risks: "Spread of infectious disease, regulatory non-compliance, staff and customer health risks.", 
      treatment: "Electrostatic or ULV spraying using CIB-approved disinfectants effective against bacteria, viruses, and fungi.", 
      frequency: "Weekly to monthly depending on facility type" 
    },
    { 
      label: "Commercial Pest Audit", 
      icon: Building2, 
      img: commercialAuditImg, 
      problem: "Commercial properties face unique pest risks tied to food storage, high footfall, complex layouts, and regulatory compliance requirements from FSSAI and local authorities.", 
      signs: ["Any pest activity in food-prep zones", "Regulatory compliance concerns", "Customer or staff complaints"], 
      risks: "Regulatory fines, reputational damage, food safety failures, operational disruption.", 
      treatment: "Full site audit, HACCP-compliant treatment program, documentation, and monthly monitoring visits.", 
      frequency: "Monthly service contracts recommended" 
    },
    {
      label: "Water Proof & Leakage Services",
      icon: Shield,
      img: waterproofingImg,
      problem: "Water leakage and seepage cause severe structural deterioration, damp walls, mold growth, and paint peeling, damaging luxury interiors and concrete slabs.",
      signs: ["Damp patches or wet stains on walls/ceilings", "Efflorescence (white salt deposits) on brickwork", "Peeling paint or blistering wallpaper", "Water pooling on roofs, slabs, or bathrooms", "Musty odors and mold growth"],
      risks: "Weakening of structural concrete and rebar, health hazards from mold spores, damage to premium interior finishes, electrical hazards from wiring contact.",
      treatment: "Polyester/polyurethane membrane coatings, pressure grouting for cracks, crystalline waterproofing for concrete, and bathroom joint sealing without tiling removal.",
      frequency: "Typically a single long-term treatment with 5-year or 10-year warranty options"
    }
  ];

  const [active, setActive] = useState(0);
  const svc = allServices[active];

  return (
    <>
      <PageHero page="Services" title="Advanced Pest Management Solutions"
        subtitle="14 specialist treatment programs covering every pest and waterproofing requirement — for residences, luxury properties, and large-scale commercial facilities." />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Service Selector */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {allServices.map((s, i) => (
              <button key={s.label} onClick={() => setActive(i)}
                className={`text-sm font-medium px-4 py-2 rounded-full border transition-all ${active === i ? "bg-[#0C2D1C] text-white border-[#0C2D1C]" : "bg-white text-gray-500 border-gray-200 hover:border-[#0C2D1C]/40"}`}
                style={{ fontFamily: "Inter, sans-serif" }}>
                {s.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }} className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100">
                <img src={svc.img}
                  alt={svc.label} className="w-full h-full object-cover" />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-[#18A558]/10 rounded-2xl flex items-center justify-center">
                    <svc.icon size={22} className="text-[#18A558]" />
                  </div>
                  <h2 className="text-[#0C2D1C] font-extrabold text-2xl" style={{ fontFamily: "Poppins, sans-serif" }}>{svc.label}</h2>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#F8FAFB] rounded-2xl p-5">
                    <div className="text-[#0C2D1C] font-bold text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>The Problem</div>
                    <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{svc.problem}</p>
                  </div>
                  <div className="bg-[#F8FAFB] rounded-2xl p-5">
                    <div className="text-[#0C2D1C] font-bold text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>Signs of Infestation</div>
                    <ul className="space-y-2">
                      {svc.signs.map((sign) => (
                        <li key={sign} className="flex items-start gap-2 text-gray-500 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                          <CheckCircle2 size={13} className="text-[#18A558] mt-0.5 flex-shrink-0" /> {sign}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#F8FAFB] rounded-2xl p-5">
                      <div className="text-[#0C2D1C] font-bold text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>Risks</div>
                      <p className="text-gray-500 text-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{svc.risks}</p>
                    </div>
                    <div className="bg-[#F8FAFB] rounded-2xl p-5">
                      <div className="text-[#0C2D1C] font-bold text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>Treatment</div>
                      <p className="text-gray-500 text-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{svc.treatment}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-[#18A558]/8 border border-[#18A558]/20 rounded-2xl p-4">
                    <Clock size={15} className="text-[#18A558]" />
                    <span className="text-[#0C2D1C] text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                      <strong>Frequency:</strong> {svc.frequency}
                    </span>
                  </div>
                </div>

                <button onClick={() => onNavigate("contact")}
                  className="mt-6 flex items-center gap-2 bg-[#0C2D1C] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#18A558] transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  Book an Inspection <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <TechnologySection />
      <ComparisonTable />
      <FinalCTA onNavigate={onNavigate} />
    </>
  );
}

// ─── Blog Page ──────────────────────────────────────────────────────────────────

function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const filtered = activeCategory === "All" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === activeCategory);

  return (
    <>
      <PageHero page="Knowledge Center" title="Expert Insights & Pest Control Guides"
        subtitle="Practical advice, seasonal tips, and professional knowledge to help protect your home and business." />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 mb-12">
            {BLOG_CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`text-sm px-4 py-2 rounded-full border font-medium transition-all ${activeCategory === cat ? "bg-[#0C2D1C] text-white border-[#0C2D1C]" : "bg-white text-gray-500 border-gray-200 hover:border-[#0C2D1C]/30"}`}
                style={{ fontFamily: "Inter, sans-serif" }}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((post, i) => (
              <FadeIn key={post.title} delay={i * 0.06}>
                <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                  <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[#18A558] bg-[#18A558]/8 text-xs font-semibold px-2.5 py-1 rounded-full border border-[#18A558]/15">{post.category}</span>
                      <span className="text-gray-400 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{post.read}</span>
                    </div>
                    <h3 className="text-[#0C2D1C] font-bold text-sm leading-snug mb-2 group-hover:text-[#18A558] transition-colors" style={{ fontFamily: "Poppins, sans-serif" }}>{post.title}</h3>
                    <div className="text-gray-400 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{post.date}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="mt-20 bg-[#0C2D1C] rounded-3xl p-10 text-center">
              <Newspaper size={36} className="text-[#18A558]/60 mx-auto mb-4" />
              <h3 className="text-white font-extrabold text-2xl mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>Stay Updated</h3>
              <p className="text-white/50 mb-7 max-w-md mx-auto text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                Subscribe to receive expert pest control insights, seasonal tips, and government guideline updates — straight to your inbox.
              </p>
              <div className="flex max-w-md mx-auto gap-3">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address"
                  className="flex-1 bg-white/8 border border-white/15 text-white placeholder-white/30 rounded-full px-5 py-3 text-sm outline-none focus:border-[#18A558]/50 transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }} />
                <button className="bg-[#18A558] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#15934d] transition-colors flex items-center gap-2">
                  <Send size={14} /> Subscribe
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

// ─── Contact Page ───────────────────────────────────────────────────────────────

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", propertyType: "", service: "", location: "", date: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <>
      <PageHero page="Contact Us" title="Let's Protect Your Property Together"
        subtitle="Get a free inspection quote or speak with our certified experts. We respond within 2 hours." />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <FadeIn>
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
              <h3 className="text-[#0C2D1C] font-extrabold text-xl mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>Book a Free Inspection</h3>
              {submitted ? (
                <div className="text-center py-14">
                  <CheckCircle2 size={52} className="text-[#18A558] mx-auto mb-4" />
                  <h4 className="text-[#0C2D1C] font-bold text-lg mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>Request Received!</h4>
                  <p className="text-gray-400 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                    Thank you. Our team will contact you within 2 hours to confirm your inspection appointment.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[{ key: "name", label: "Full Name", type: "text", placeholder: "Rajesh Kumar" }, { key: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210" }].map((field) => (
                      <div key={field.key}>
                        <label className="text-[#0C2D1C] text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ fontFamily: "Inter, sans-serif" }}>{field.label}</label>
                        <input type={field.type} placeholder={field.placeholder} value={(form as Record<string, string>)[field.key]}
                          onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                          className="w-full bg-[#F8FAFB] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0C2D1C] placeholder-gray-400 outline-none focus:border-[#18A558] transition-colors"
                          style={{ fontFamily: "Inter, sans-serif" }} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="text-[#0C2D1C] text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ fontFamily: "Inter, sans-serif" }}>Email Address</label>
                    <input type="email" placeholder="rajesh@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#F8FAFB] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0C2D1C] placeholder-gray-400 outline-none focus:border-[#18A558] transition-colors"
                      style={{ fontFamily: "Inter, sans-serif" }} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[#0C2D1C] text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ fontFamily: "Inter, sans-serif" }}>Property Type</label>
                      <select value={form.propertyType} onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
                        className="w-full bg-[#F8FAFB] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0C2D1C] outline-none focus:border-[#18A558] transition-colors"
                        style={{ fontFamily: "Inter, sans-serif" }}>
                        <option value="">Select type</option>
                        {["Residential", "Commercial", "Industrial", "Hotel / Hospitality", "Restaurant", "Hospital", "Warehouse", "Other"].map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-[#0C2D1C] text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ fontFamily: "Inter, sans-serif" }}>Service Needed</label>
                      <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full bg-[#F8FAFB] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0C2D1C] outline-none focus:border-[#18A558] transition-colors"
                        style={{ fontFamily: "Inter, sans-serif" }}>
                        <option value="">Select service</option>
                        {["Termite Management", "Cockroach Management", "Rodent Management", "Bed Bug Management", "Mosquito Management", "Flies Management", "Wood Borer Management", "Spider Management", "Snake Management", "Bird Control", "Food Storage Management", "Disinfection", "Commercial Pest Audit", "Water Proof & Leakage Services", "General Pest Control"].map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[#0C2D1C] text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ fontFamily: "Inter, sans-serif" }}>Location</label>
                      <input type="text" placeholder="Visakhapatnam" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                        className="w-full bg-[#F8FAFB] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0C2D1C] placeholder-gray-400 outline-none focus:border-[#18A558] transition-colors"
                        style={{ fontFamily: "Inter, sans-serif" }} />
                    </div>
                    <div>
                      <label className="text-[#0C2D1C] text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ fontFamily: "Inter, sans-serif" }}>Preferred Date</label>
                      <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full bg-[#F8FAFB] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0C2D1C] outline-none focus:border-[#18A558] transition-colors"
                        style={{ fontFamily: "Inter, sans-serif" }} />
                    </div>
                  </div>
                  <div>
                    <label className="text-[#0C2D1C] text-xs font-semibold uppercase tracking-wide mb-1.5 block" style={{ fontFamily: "Inter, sans-serif" }}>Message (Optional)</label>
                    <textarea rows={3} placeholder="Describe your pest situation or any specific concerns..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#F8FAFB] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0C2D1C] placeholder-gray-400 outline-none focus:border-[#18A558] transition-colors resize-none"
                      style={{ fontFamily: "Inter, sans-serif" }} />
                  </div>
                  <button type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-[#18A558] text-white font-bold py-4 rounded-xl hover:bg-[#15934d] transition-all hover:shadow-lg hover:shadow-[#18A558]/25"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    Submit Inspection Request <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </FadeIn>

          {/* Info column */}
          <div className="space-y-5">
            <FadeIn delay={0.1}>
              <div className="bg-[#0C2D1C] rounded-3xl p-8 text-white">
                <h3 className="font-extrabold text-xl mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>Contact Information</h3>
                <div className="space-y-5">
                  {[
                    { icon: MapPin, label: "Address", value: "A.P, T.S, ODISSA State-wide Networks" },
                    { icon: Phone, label: "Primary Phone", value: "+91 94920 81706" },
                    { icon: Phone, label: "Secondary Phone", value: "+91 97042 46709" },
                    { icon: Mail, label: "Email", value: "omepestcontrol@gmail.com" },
                    { icon: Clock, label: "Business Hours", value: "Monday – Saturday · 9:00 AM – 6:00 PM" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-9 h-9 bg-white/8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                        <item.icon size={15} className="text-[#18A558]" />
                      </div>
                      <div>
                        <div className="text-white/40 text-xs uppercase tracking-wide mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>{item.label}</div>
                        <div className="text-white/85 text-sm font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-7 pt-6 border-t border-white/10 flex flex-wrap gap-3">
                  <a href="https://wa.me/919492081706" target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-3 rounded-xl text-sm hover:brightness-110 transition-all min-w-[120px]">
                    <MessageCircle size={15} /> WhatsApp
                  </a>
                  <a href="tel:+919492081706"
                    className="flex-1 flex items-center justify-center gap-2 bg-[#18A558] text-white font-semibold py-3 rounded-xl text-sm hover:bg-[#15934d] transition-all min-w-[120px]">
                    <Phone size={15} /> 9492081706
                  </a>
                  <a href="tel:+919704246709"
                    className="flex-1 flex items-center justify-center gap-2 bg-[#D2143A] text-white font-semibold py-3 rounded-xl text-sm hover:bg-[#b00f2e] transition-all min-w-[120px]">
                    <Phone size={15} /> 9704246709
                  </a>
                  <a href="mailto:omepestcontrol@gmail.com"
                    className="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white font-semibold py-3 rounded-xl text-sm hover:bg-white/20 transition-all min-w-[120px]">
                    <Mail size={15} /> Email Us
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Quick contact cards */}
            <FadeIn delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Calendar, label: "Book Inspection", sub: "Free consultation" },
                  { icon: Zap, label: "Emergency Service", sub: "Same-day response" },
                  { icon: Building2, label: "Commercial Enquiry", sub: "Bulk & contracts" },
                  { icon: Home, label: "Residential Service", sub: "Home protection" },
                ].map((card) => (
                  <div key={card.label} className="bg-[#F8FAFB] border border-gray-100 rounded-2xl p-5 hover:border-[#18A558]/30 hover:shadow-md transition-all">
                    <card.icon size={20} className="text-[#18A558] mb-3" />
                    <div className="text-[#0C2D1C] font-bold text-sm mb-0.5" style={{ fontFamily: "Poppins, sans-serif" }}>{card.label}</div>
                    <div className="text-gray-400 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{card.sub}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Map placeholder */}
            <FadeIn delay={0.2}>
              <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                <div className="bg-[#F8FAFB] h-48 flex flex-col items-center justify-center gap-3 relative">
                  <div className="w-14 h-14 bg-[#18A558]/10 rounded-2xl flex items-center justify-center">
                    <MapPin size={24} className="text-[#18A558]" />
                  </div>
                  <div className="text-center">
                    <div className="text-[#0C2D1C] font-bold text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>Find Us on Google Maps</div>
                    <p className="text-gray-400 text-xs mt-1" style={{ fontFamily: "Inter, sans-serif" }}>Serving Andhra Pradesh and Telangana</p>
                  </div>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                    className="text-xs text-[#18A558] font-semibold flex items-center gap-1 hover:underline">
                    Open in Google Maps <ChevronRight size={12} />
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Coverage Areas */}
            <FadeIn delay={0.25}>
              <div className="bg-[#F8FAFB] border border-gray-100 rounded-3xl p-6">
                <h4 className="text-[#0C2D1C] font-bold mb-4 text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>Coverage Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {["Srikakulam", "Vizianagaram", "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati", "Hyderabad", "Warangal", "Gajuwaka"].map((area) => (
                    <span key={area} className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <MapPin size={10} className="text-[#18A558]" />{area}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── App ────────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");
  const [showIntro, setShowIntro] = useState(true);

  const navigate = (p: string) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  return (
    <div className="bg-background text-foreground min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Animated Insect Dispersion & Logo Splash Screen */}
      <AnimatePresence>
        {showIntro && (
          <IntroSplash onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <Nav currentPage={page} onNavigate={navigate} onReplayIntro={handleReplayIntro} />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          {page === "home" && <HomePage onNavigate={navigate} />}
          {page === "about" && <AboutPage onNavigate={navigate} />}
          {page === "services" && <ServicesPage onNavigate={navigate} />}
          {page === "blog" && <BlogPage />}
          {page === "contact" && <ContactPage />}
          <Footer onNavigate={navigate} onReplayIntro={handleReplayIntro} />
        </motion.div>
      </AnimatePresence>
      <FloatingButtons onNavigate={navigate} />
    </div>
  );
}
