import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  MapPin, 
  Phone, 
  Mail, 
  X,
  Menu,
  Layers,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Calendar,
  Clock,
  User,
  MessageSquare,
  Globe,
  Award,
  ShieldCheck
} from 'lucide-react';

const FontLoader = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap');
    
    :root {
      --font-display: 'Playfair Display', serif;
      --font-sans: 'Inter', sans-serif;
    }

    body {
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
      color: #064e3b;
      background-color: #ffffff;
    }

    .font-display { font-family: var(--font-display); }
    .font-sans { font-family: var(--font-sans); }

    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  `}} />
);

const PROPERTY_DATA = [
  { id: 1, category: 'Residential', title: "The Zenith Canopy", price: "$2,450,000", img: "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?auto=compress&cs=tinysrgb&w=800", location: "Charlotte, NC", fullDesc: "Located at the peak of Myers Park, The Zenith Canopy is an architectural achievement that combines exposed concrete with warm walnut panels.", features: ["4 Bedrooms", "Infinity Pool", "Smart Glass"] },
  { id: 2, category: 'Residential', title: "Obsidian Glass House", price: "$1,890,000", img: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800", location: "Raleigh, NC", fullDesc: "The Obsidian Glass House offers uncompromising privacy through thin gold layered one way glass.", features: ["Minimalist Design", "Solar Power", "Private Gallery"] },
  { id: 3, category: 'Commercial', title: "The Monolith Center", price: "$12,500,000", img: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=800", location: "Durham, NC", fullDesc: "As the center of business gravity in Durham, The Monolith Center redefines the post 2025 workspace.", features: ["Tech Hub", "Co working Spaces", "Zero Carbon Emission"] },
  { id: 4, category: 'Land', title: "Blue Ridge Sanctuary", price: "$3,100,000", img: "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=1200", location: "Asheville, NC", fullDesc: "20 acres of pristine land on the slopes of the Blue Ridge Mountains.", features: ["360 Mountain Views", "Private Spring", "Development Permit"] },
  { id: 5, category: 'Land', title: "Outer Banks Horizon", price: "$1,450,000", img: "https://images.pexels.com/photos/1035010/pexels-photo-1035010.jpeg?auto=compress&cs=tinysrgb&w=1200", location: "Wilmington, NC", fullDesc: "Exclusive vacant lot directly facing the Atlantic Ocean.", features: ["Direct Beachfront", "Flat Topography", "Private Dock Access"] },
  { id: 6, category: 'Commercial', title: "Vortex Tech Plaza", price: "$8,200,000", img: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800", location: "Cary, NC", fullDesc: "A futuristic office complex in the heart of the Research Triangle.", features: ["Research Lab", "Event Hall", "Heliport"] }
];

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'agency', label: 'Agency' },
    { id: 'contact', label: 'Contact' }
  ];

  const isDarkText = isScrolled || (currentPage !== 'home' && currentPage !== 'contact');

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled 
        ? 'bg-white/95 backdrop-blur-md py-4 border-b border-emerald-900/10 shadow-sm' 
        : 'bg-transparent py-6 md:py-8'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button 
            onClick={() => setCurrentPage('home')} 
            className={`text-xl md:text-2xl font-display font-bold transition-colors ${
              isDarkText ? 'text-emerald-950' : 'text-white'
            }`}
          >
            Velmor<span className="text-emerald-500 italic">.</span>
          </button>

          <div className="hidden md:flex items-center gap-10">
            {menuItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => setCurrentPage(item.id)} 
                className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all relative group ${
                  isDarkText
                  ? (currentPage === item.id ? 'text-emerald-950' : 'text-zinc-400 hover:text-emerald-950') 
                  : (currentPage === item.id ? 'text-emerald-400' : 'text-white/70 hover:text-white')
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-[1.5px] bg-emerald-500 transition-all duration-300 ${
                  currentPage === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentPage('consultation')}
              className={`hidden sm:block px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                isDarkText 
                ? 'bg-emerald-950 text-white hover:bg-emerald-800' 
                : 'bg-white text-emerald-950 hover:bg-emerald-50'
              }`}
            >
              Consultation
            </button>
            
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isDarkText ? 'text-emerald-950 bg-emerald-950/5' : 'text-white bg-white/10 backdrop-blur-sm'
              }`}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-emerald-950/60 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl flex flex-col p-8"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-display font-bold text-emerald-950">Velmor<span className="text-emerald-500 italic">.</span></span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-emerald-950 hover:bg-emerald-50 rounded-full">
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <button 
                    key={item.id} 
                    onClick={() => { setCurrentPage(item.id); setIsMobileMenuOpen(false); }}
                    className={`flex items-center justify-between py-5 border-b border-emerald-50 text-left transition-all ${
                      currentPage === item.id ? 'text-emerald-600' : 'text-emerald-950'
                    }`}
                  >
                    <span className="text-2xl font-display font-bold">{item.label}</span>
                    {currentPage === item.id && <ChevronRight size={20} />}
                  </button>
                ))}
              </div>
              <div className="mt-auto pt-10">
                <button 
                  onClick={() => { setCurrentPage('consultation'); setIsMobileMenuOpen(false); }}
                  className="w-full py-5 bg-emerald-950 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-xl"
                >
                  Book Consultation
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const PropertyModal = ({ property, onClose }) => (
  <AnimatePresence>
    {property && (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-10 bg-emerald-950/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl relative flex flex-col md:flex-row"
          onClick={e => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-emerald-950 shadow-md">
            <X size={20} />
          </button>
          <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
            <img src={property.img} className="w-full h-full object-cover" alt={property.title} />
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col">
            <span className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <MapPin size={12}/> {property.location}
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-emerald-950 mb-4 leading-tight">{property.title}</h2>
            <div className="text-2xl font-display text-emerald-900 italic mb-6">{property.price}</div>
            <p className="text-zinc-500 text-sm leading-relaxed mb-8 font-sans">{property.fullDesc}</p>
            <div className="space-y-3 mb-10">
              {property.features?.map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-emerald-950">
                  <CheckCircle2 size={14} className="text-emerald-500"/> {f}
                </div>
              ))}
            </div>
            <button className="mt-auto w-full py-4 bg-emerald-950 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg">
              Inquire Now
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const HomePage = ({ setCurrentPage }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <section className="relative h-[100svh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1600" className="w-full h-full object-cover" alt="Hero" />
        <div className="absolute inset-0 bg-emerald-950/40" />
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-emerald-400 text-[10px] uppercase tracking-[0.5em] font-bold mb-6 block">Elite Real Estate</motion.span>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-8xl font-display text-white mb-10 leading-tight">Crafting Modern <br/><span className="italic font-light text-emerald-50">Masterpieces.</span></motion.h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button onClick={() => setCurrentPage('projects')} className="bg-white text-emerald-950 px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-2xl active:scale-95">Browse Properties</motion.button>
          <motion.button onClick={() => setCurrentPage('consultation')} className="bg-emerald-950/30 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-emerald-950 transition-all active:scale-95">Book Consultation</motion.button>
        </div>
      </div>
    </section>

    <section className="py-24 md:py-40 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
        <div className="space-y-10 order-2 md:order-1">
          <div className="space-y-4">
            <span className="text-emerald-700 text-[10px] font-bold uppercase tracking-widest italic">The Philosophy</span>
            <h2 className="text-4xl md:text-6xl font-display text-emerald-950 leading-tight">Architecture is the bridge between human and nature.</h2>
          </div>
          <p className="text-zinc-500 text-lg leading-relaxed font-sans font-light max-w-xl">
            We don't just sell structures; we curate sanctuaries. Every Velmor property is hand selected based on its architectural integrity, sustainable footprint, and its ability to inspire the soul.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-6">
            <div>
              <p className="text-3xl font-display text-emerald-950 mb-2 italic">150+</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Curated Units</p>
            </div>
            <div>
              <p className="text-3xl font-display text-emerald-950 mb-2 italic">12yrs</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Excellence</p>
            </div>
          </div>
        </div>
        <div className="relative group order-1 md:order-2">
          <div className="absolute -inset-4 bg-emerald-50 rounded-[3rem] -z-10 rotate-3" />
          <div className="rounded-3xl overflow-hidden shadow-2xl relative">
            <img src="https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1200" className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105" alt="Elite Living" />
          </div>
        </div>
      </div>
    </section>
  </motion.div>
);

const ProjectsPage = ({ onSelectProperty }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const categories = ['All', 'Residential', 'Commercial', 'Land'];

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-24 px-6 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="max-w-xl">
            <span className="text-emerald-700 text-[10px] font-bold uppercase tracking-widest block mb-4 italic">Available Inventory</span>
            <h2 className="text-5xl md:text-7xl font-display text-emerald-950 italic mb-6">The Catalog.</h2>
            <p className="text-zinc-400 text-sm font-light">A curated selection of the most sought after properties in the region.</p>
          </div>
          
          {/* PERBAIKAN: Container kategori agar tidak kepotong */}
          <div className="w-full lg:w-auto">
            <div className="flex items-center gap-6 md:gap-10 overflow-x-auto scrollbar-hide border-b border-zinc-200 pb-2 px-1">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveFilter(cat)} 
                  className={`text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all relative py-3 ${
                    activeFilter === cat ? 'text-emerald-950' : 'text-zinc-400 hover:text-emerald-950'
                  }`}
                >
                  {cat}
                  {activeFilter === cat && (
                    <motion.div 
                      layoutId="activeTab" 
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-600" 
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROPERTY_DATA.filter(p => activeFilter === 'All' || p.category === activeFilter).map((p) => (
            <motion.div layout key={p.id} onClick={() => onSelectProperty(p)} className="group cursor-pointer">
              <div className="aspect-square overflow-hidden rounded-2xl mb-6 relative shadow-md">
                <img src={p.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={p.title} />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[8px] font-bold text-emerald-950 uppercase tracking-widest border border-emerald-950/10">
                  {p.category}
                </div>
              </div>
              <div className="px-1">
                <h3 className="text-xl font-display text-emerald-950 mb-1 group-hover:text-emerald-600 transition-colors italic">{p.title}</h3>
                <div className="flex justify-between items-center">
                  <p className="text-zinc-400 text-[8px] uppercase tracking-widest font-bold flex items-center gap-1.5"><MapPin size={8} className="text-emerald-500"/> {p.location}</p>
                  <div className="text-emerald-900 font-bold font-display text-sm italic">{p.price}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const AgencyPage = () => (
  <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-40 pb-24 px-6 bg-white min-h-screen">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div className="order-2 lg:order-1 relative px-6 md:px-0">
        <div className="absolute -top-10 -left-6 text-[12rem] font-display text-emerald-50 opacity-50 select-none -z-10 italic">12</div>
        <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200" className="w-full rounded-[3rem] shadow-2xl" alt="Office" />
      </div>
      <div className="order-1 lg:order-2 space-y-10">
        <div className="space-y-4">
          <span className="text-emerald-700 text-[10px] font-bold uppercase tracking-widest italic">The Institution</span>
          <h2 className="text-5xl md:text-7xl font-display text-emerald-950 italic leading-tight">Elevating Expectations Since 2014.</h2>
        </div>
        <p className="text-zinc-500 text-lg font-sans font-light leading-relaxed">
          Velmor began as a small architectural collective with one vision: to bridge the gap between high design architecture and the traditional real estate market.
        </p>
      </div>
    </div>
  </motion.section>
);

const ContactPage = () => (
  <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative pt-40 pb-24 px-6 min-h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img src="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1600" className="w-full h-full object-cover" alt="Contact Bg" />
      <div className="absolute inset-0 bg-emerald-950/85 backdrop-blur-sm" />
    </div>

    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
      <div className="text-white space-y-12">
        <div className="space-y-4">
          <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest italic">Global Concierge</span>
          <h2 className="text-6xl md:text-8xl font-display italic leading-tight">Connect with <br/><span className="text-emerald-400 not-italic">Velmor.</span></h2>
        </div>
        <div className="space-y-8 pt-8 border-t border-white/10">
          <div className="flex items-center gap-6">
             <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-emerald-400"><Phone size={20}/></div>
             <div><p className="text-[10px] uppercase tracking-widest text-emerald-400 mb-1">Direct Line</p><p className="text-2xl font-display italic">+1 (919) 444-2026</p></div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-white/10">
        <form className="space-y-8" onSubmit={e => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <input type="text" placeholder="Name" className="w-full bg-zinc-50 border-b border-zinc-100 p-4 focus:outline-none focus:border-emerald-500 text-sm" />
            <input type="email" placeholder="Email" className="w-full bg-zinc-50 border-b border-zinc-100 p-4 focus:outline-none focus:border-emerald-500 text-sm" />
          </div>
          <textarea rows="4" placeholder="Message" className="w-full bg-zinc-50 border-b border-zinc-100 p-4 focus:outline-none focus:border-emerald-500 text-sm resize-none"></textarea>
          <button className="w-full py-6 bg-emerald-950 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-xl">Send Message</button>
        </form>
      </div>
    </div>
  </motion.section>
);

const ConsultationPage = () => (
  <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative pt-40 pb-24 px-6 min-h-screen bg-zinc-50 flex items-center">
    <div className="max-w-7xl mx-auto w-full">
      <div className="text-center mb-20 max-w-2xl mx-auto">
        <span className="text-emerald-700 text-[10px] font-bold uppercase tracking-widest mb-4 block italic">Portfolio Management</span>
        <h2 className="text-5xl md:text-7xl font-display text-emerald-950 italic mb-6 leading-tight">Private Advisory.</h2>
      </div>

      <div className="bg-white rounded-[3rem] shadow-2xl border border-zinc-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-w-6xl mx-auto">
        <div className="lg:col-span-5 bg-emerald-950 p-12 md:p-16 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <Calendar className="text-emerald-400 mb-10" size={32} />
            <h3 className="text-3xl font-display mb-6 italic">Strategy Consultation</h3>
            <p className="text-emerald-200/50 leading-relaxed font-sans font-light mb-10 text-sm">A comprehensive evaluation of your investment objectives.</p>
          </div>
        </div>

        <div className="lg:col-span-7 p-12 md:p-16">
          <form className="space-y-10" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <input type="text" placeholder="Full Name" className="w-full border-b border-zinc-100 py-3 focus:outline-none focus:border-emerald-500 text-sm" />
              <input type="email" placeholder="Email" className="w-full border-b border-zinc-100 py-3 focus:outline-none focus:border-emerald-500 text-sm" />
              <input type="date" className="w-full border-b border-zinc-100 py-3 focus:outline-none focus:border-emerald-500 text-sm" />
              <select className="w-full border-b border-zinc-100 py-3 focus:outline-none focus:border-emerald-500 text-sm bg-transparent">
                <option>Residential Acquisition</option>
                <option>Commercial Portfolio</option>
                <option>Land Development</option>
              </select>
            </div>
            <button className="w-full py-6 bg-emerald-950 text-white rounded-full font-bold uppercase tracking-widest text-[10px] shadow-xl">Book Now</button>
          </form>
        </div>
      </div>
    </div>
  </motion.section>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="bg-white selection:bg-emerald-950 selection:text-white min-h-screen">
      <FontLoader />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      
      <main className="overflow-hidden">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && <HomePage key="home" setCurrentPage={setCurrentPage} />}
          {currentPage === 'projects' && <ProjectsPage key="projects" onSelectProperty={setSelectedProperty} />}
          {currentPage === 'agency' && <AgencyPage key="agency" />}
          {currentPage === 'contact' && <ContactPage key="contact" />}
          {currentPage === 'consultation' && <ConsultationPage key="consultation" />}
        </AnimatePresence>
      </main>

      <footer className="bg-zinc-50 py-24 px-6 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-3xl font-display font-bold text-emerald-950 cursor-pointer" onClick={() => setCurrentPage('home')}>Velmor<span className="text-emerald-500">.</span></div>
          <div className="text-zinc-300 text-[8px] font-bold tracking-widest uppercase text-center">© 2026 Velmor Real Estate Group. All Rights Reserved.</div>
          <div className="flex gap-10 text-[8px] font-bold tracking-widest uppercase text-zinc-300">
             <a href="#" className="hover:text-emerald-950">Privacy</a>
             <a href="#" className="hover:text-emerald-950">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
