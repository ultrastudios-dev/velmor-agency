import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  LayoutGrid,
  Home,
  Building2,
  TreePine,
  CheckCircle2,
  ChevronRight,
  X,
  Maximize2,
  Layers,
  Sparkles,
  Menu
} from 'lucide-react';

const PROPERTY_DATA = [
  { 
    id: 1, 
    category: 'Residential', 
    title: "The Zenith Canopy", 
    price: "$2,450,000", 
    img: "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?auto=compress&cs=tinysrgb&w=800", 
    location: "Charlotte, NC", 
    fullDesc: "Located at the peak of Myers Park, The Zenith Canopy is an architectural achievement that combines exposed concrete with warm walnut panels. It features a sophisticated natural ventilation system.",
    features: ["4 Bedrooms", "Infinity Pool", "Smart Glass"]
  },
  { 
    id: 2, 
    category: 'Residential', 
    title: "Obsidian Glass House", 
    price: "$1,890,000", 
    img: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800", 
    location: "Raleigh, NC", 
    fullDesc: "The Obsidian Glass House offers uncompromising privacy through thin gold layered one way glass that reflects the landscape while maintaining interior luminosity.",
    features: ["Minimalist Design", "Solar Power", "Private Gallery"]
  },
  { 
    id: 3, 
    category: 'Commercial', 
    title: "The Monolith Center", 
    price: "$12,500,000", 
    img: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=800", 
    location: "Durham, NC", 
    fullDesc: "As the center of business gravity in Durham, The Monolith Center redefines the post 2026 workspace with AI integration on every floor.",
    features: ["Tech Hub", "Co-working Spaces", "Zero Carbon Emission"]
  },
  { 
    id: 4, 
    category: 'Land', 
    title: "Blue Ridge Sanctuary", 
    price: "$3,100,000", 
    img: "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=1200", 
    location: "Asheville, NC", 
    fullDesc: "20 acres of pristine land on the slopes of the Blue Ridge Mountains. Untouched terrain offering native vegetation and private spring water sources.",
    features: ["360 Mountain Views", "Private Spring", "Development Permit"]
  },
  { 
    id: 5, 
    category: 'Land', 
    title: "Outer Banks Horizon", 
    price: "$1,450,000", 
    img: "https://images.pexels.com/photos/1035010/pexels-photo-1035010.jpeg?auto=compress&cs=tinysrgb&w=1200", 
    location: "Wilmington, NC", 
    fullDesc: "Exclusive vacant lot directly facing the Atlantic Ocean. No structures obstructing the view, ideal for a luxury residential home.",
    features: ["Direct Beachfront", "Flat Topography", "Private Dock Access"]
  },
  { 
    id: 6, 
    category: 'Commercial', 
    title: "Vortex Tech Plaza", 
    price: "$8,200,000", 
    img: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800", 
    location: "Cary, NC", 
    fullDesc: "A futuristic office complex in the heart of the Research Triangle. Specifically designed for high level technology companies.",
    features: ["Research Lab", "Event Hall", "Heliport"]
  }
];

const Navbar = ({ currentPage, setCurrentPage, setShowInquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Properties' },
    { id: 'agency', label: 'Agency' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id) => {
    setCurrentPage(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="fixed top-6 left-0 w-full z-[100] px-6 flex justify-center pointer-events-none">
        <motion.nav 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`pointer-events-auto flex items-center justify-between gap-8 px-8 py-3.5 rounded-full transition-all duration-700 border ${
            isScrolled 
            ? 'bg-white/80 backdrop-blur-xl border-zinc-200/50 shadow-2xl w-full max-w-4xl' 
            : 'bg-emerald-950/20 backdrop-blur-sm border-white/10 w-full max-w-6xl'
          }`}
        >
          <button onClick={() => setCurrentPage('home')} className={`text-xl font-display font-medium italic serif transition-colors ${isScrolled ? 'text-emerald-950' : 'text-white'}`}>
            Velmor<span className="text-emerald-500 not-italic">.</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => setCurrentPage(item.id)} 
                className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all relative group ${
                  isScrolled 
                  ? (currentPage === item.id ? 'text-emerald-700' : 'text-zinc-400 hover:text-emerald-950') 
                  : (currentPage === item.id ? 'text-emerald-300' : 'text-white/60 hover:text-white')
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-[1.5px] bg-emerald-500 transition-all duration-500 ${currentPage === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowInquiry(true)}
              className={`px-6 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all active:scale-95 ${
              isScrolled 
              ? 'bg-emerald-900 text-white hover:bg-emerald-700' 
              : 'bg-white text-emerald-950 hover:bg-emerald-50 shadow-lg'
            }`}>
              Services
            </button>
            
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className={`md:hidden p-2 rounded-full transition-colors ${isScrolled ? 'text-emerald-950 hover:bg-zinc-100' : 'text-white hover:bg-white/10'}`}
            >
              <Menu size={20} />
            </button>
          </div>
        </motion.nav>
      </div>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-emerald-950 flex flex-col items-center justify-center p-8"
          >
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors p-2"
            >
              <X size={32} />
            </button>

            <div className="flex flex-col items-center gap-8">
              {menuItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-4xl font-display italic ${currentPage === item.id ? 'text-emerald-400' : 'text-white'}`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <div className="absolute bottom-12 flex flex-col items-center gap-4 text-white/40">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold">Velmor Luxury Estates</p>
              <div className="flex gap-6">
                <Mail size={16} />
                <Phone size={16} />
                <Globe size={16} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const PropertyDetailModal = ({ property, onClose }) => (
  <AnimatePresence>
    {property && (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white w-full max-w-6xl max-h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl relative flex flex-col md:flex-row"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/20 hover:bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-zinc-900 transition-all shadow-xl border border-white/20"
          >
            <X size={24} />
          </button>

          <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
            <img src={property.img} className="w-full h-full object-cover" alt={property.title} />
          </div>

          <div className="w-full md:w-1/2 p-10 md:p-16 overflow-y-auto bg-white flex flex-col">
            <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-bold uppercase tracking-widest mb-6">
              <MapPin size={12}/> {property.location}
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display italic serif text-emerald-950 mb-6 leading-tight">
              {property.title}
            </h2>

            <div className="text-3xl font-display font-light text-emerald-900 italic serif mb-10 pb-6 border-b border-zinc-100">
              {property.price}
            </div>

            <p className="text-zinc-500 text-lg leading-relaxed font-light mb-10 italic">
              "{property.fullDesc}"
            </p>

            <div className="space-y-4 mb-12">
              <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">Premium Features</p>
              <div className="grid grid-cols-2 gap-4">
                {property.features?.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-emerald-950 font-medium">
                    <CheckCircle2 size={16} className="text-emerald-500"/> {f}
                  </div>
                ))}
              </div>
            </div>

            <button 
              className="mt-auto w-full py-5 bg-emerald-950 text-white rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95"
              onClick={onClose}
            >
              Contact Agent <ArrowUpRight size={18}/>
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const InquiryModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-emerald-950/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl relative"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 text-zinc-400 hover:text-emerald-900 transition-colors"
          >
            <X size={24} />
          </button>

          <h3 className="text-3xl font-display italic text-emerald-950 mb-2">Service Inquiry</h3>
          <p className="text-zinc-500 text-sm mb-8 italic">Get our exclusive brochure and professional property assessment.</p>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[8px] uppercase font-bold text-zinc-400 tracking-widest ml-1">Full Name</label>
              <input type="text" placeholder="Enter your full name" className="w-full bg-zinc-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-[8px] uppercase font-bold text-zinc-400 tracking-widest ml-1">Email Address</label>
              <input type="email" placeholder="you@domain.com" className="w-full bg-zinc-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-[8px] uppercase font-bold text-zinc-400 tracking-widest ml-1">Interest</label>
              <select className="w-full bg-zinc-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm bg-transparent">
                <option>Residential Portfolio</option>
                <option>Commercial Acquisition</option>
                <option>Asset Management</option>
              </select>
            </div>
            <button className="w-full bg-emerald-900 text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest mt-6 hover:bg-emerald-700 transition-all shadow-lg active:scale-95">Submit Request</button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const HomePage = ({ setCurrentPage }) => {
  return (
    <div className="w-full overflow-hidden">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img src="https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1600" className="w-full h-full object-cover" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/60 via-transparent to-emerald-950/80" />
        </motion.div>
        <div className="relative z-10 text-center px-6">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-emerald-300 text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">Exclusive Realty - North Carolina</motion.span>
          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }} className="text-5xl md:text-8xl font-display font-light text-white italic serif mb-10 leading-[0.9]">
            Architectural <br/><span className="not-italic text-white">Legacy.</span>
          </motion.h1>
          <motion.button 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            onClick={() => setCurrentPage('projects')} 
            className="bg-white text-emerald-950 px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-xl active:scale-95"
          >
            View Collection
          </motion.button>
        </div>
      </section>

      <section className="py-32 px-6 bg-white reveal-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display italic serif text-emerald-950 mb-12">The Velmor Advantage</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left mt-20">
            <div className="space-y-4 group">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:bg-emerald-900 group-hover:text-white transition-all duration-500"><Globe size={24}/></div>
              <h4 className="text-lg font-display font-bold text-emerald-950">Global Network</h4>
              <p className="text-sm text-zinc-500 leading-relaxed font-light italic">Access to off-market properties and international investors through our verified channels.</p>
            </div>
            <div className="space-y-4 group">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:bg-emerald-900 group-hover:text-white transition-all duration-500"><CheckCircle2 size={24}/></div>
              <h4 className="text-lg font-display font-bold text-emerald-950">Curated Quality</h4>
              <p className="text-sm text-zinc-500 leading-relaxed font-light italic">Every listing undergoes a rigorous 50-point inspection for structural and aesthetic excellence.</p>
            </div>
            <div className="space-y-4 group">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:bg-emerald-900 group-hover:text-white transition-all duration-500"><Building2 size={24}/></div>
              <h4 className="text-lg font-display font-bold text-emerald-950">Market Intelligence</h4>
              <p className="text-sm text-zinc-500 leading-relaxed font-light italic">Data-driven insights ensuring your investment appreciates at an optimal annual rate.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProjectsPage = ({ onSelectProperty }) => {
  const [filter, setFilter] = useState('All');
  const categories = [
    { id: 'All', icon: <LayoutGrid size={14}/> },
    { id: 'Residential', icon: <Home size={14}/> },
    { id: 'Commercial', icon: <Building2 size={14}/> },
    { id: 'Land', icon: <TreePine size={14}/> }
  ];

  const filteredData = filter === 'All' ? PROPERTY_DATA : PROPERTY_DATA.filter(p => p.category === filter);

  return (
    <section className="pt-40 pb-24 px-6 bg-zinc-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-emerald-700 text-[10px] font-bold uppercase tracking-widest block mb-4 italic">Available Listings</span>
            <h2 className="text-5xl font-display italic text-emerald-950 leading-tight">Masterpieces of <br/>Architecture.</h2>
          </div>
          
          <div className="flex flex-wrap gap-3 p-1.5 bg-zinc-200/50 rounded-2xl backdrop-blur-sm border border-zinc-300/30">
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${filter === cat.id ? 'bg-emerald-900 text-white shadow-lg' : 'text-zinc-500 hover:bg-white'}`}
              >
                {cat.icon} {cat.id}
              </button>
            ))}
          </div>
        </header>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredData.map((p, idx) => (
              <motion.div 
                key={p.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                onClick={() => onSelectProperty(p)}
                className="bg-white rounded-[2.5rem] overflow-hidden border border-zinc-100 group shadow-sm hover:shadow-2xl transition-all duration-700 cursor-pointer flex flex-col h-full"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={p.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={p.title} />
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur rounded-full text-[8px] font-black uppercase tracking-tighter text-emerald-900 shadow-sm border border-emerald-950/5">
                    {p.category}
                  </div>
                  <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/90 p-4 rounded-full text-emerald-950 shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500">
                        <Maximize2 size={20} />
                    </div>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-zinc-400 text-[9px] uppercase tracking-widest mb-3">
                    <MapPin size={10} className="text-emerald-500"/> {p.location}
                  </div>
                  <h3 className="text-2xl font-display text-emerald-950 mb-6 group-hover:text-emerald-700 transition-colors flex-grow italic serif">{p.title}</h3>
                  <div className="flex justify-between items-center pt-6 border-t border-zinc-50">
                    <span className="text-emerald-900 font-bold italic text-xl">{p.price}</span>
                    <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-emerald-950 group-hover:text-white transition-all shadow-sm group-hover:rotate-45 duration-500">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const AgencyPage = () => {
  return (
    <section className="pt-40 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200" className="w-full aspect-[4/5] object-cover rounded-[3rem] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]" alt="Agency" />
            <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-emerald-600 rounded-[2.5rem] flex items-center justify-center p-8 text-white hidden md:flex shadow-2xl border-8 border-white hover:rotate-6 transition-transform duration-500">
              <p className="text-xl font-display font-bold italic leading-tight">Driven by Design & Discipline.</p>
            </div>
          </motion.div>
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest mb-4 block italic">Our Philosophy</span>
              <h2 className="text-5xl md:text-6xl font-display italic text-emerald-950 mb-8 leading-tight">Defining Standards for Elite NC Properties.</h2>
              <p className="text-lg text-zinc-500 font-light leading-relaxed italic">
                "We represent a standard of living where every detail matters. Velmor exists to connect visionary individuals with extraordinary spaces."
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 gap-6">
               <motion.div 
                 whileHover={{ x: 10 }}
                 className="flex gap-4 p-6 bg-zinc-50 rounded-3xl hover:bg-emerald-50 transition-colors border border-zinc-100"
                >
                  <div className="text-emerald-600"><Layers size={24}/></div>
                  <div>
                    <h4 className="font-bold text-emerald-950 mb-1 italic">Seamless Transactions</h4>
                    <p className="text-sm text-zinc-500 font-light">White-glove service covering legal, structural, and financial aspects of your acquisition.</p>
                  </div>
               </motion.div>
               <motion.div 
                 whileHover={{ x: 10 }}
                 className="flex gap-4 p-6 bg-zinc-50 rounded-3xl hover:bg-emerald-50 transition-colors border border-zinc-100"
                >
                  <div className="text-emerald-600"><Sparkles size={24}/></div>
                  <div>
                    <h4 className="font-bold text-emerald-950 mb-1 italic">Sustainable Luxury</h4>
                    <p className="text-sm text-zinc-500 font-light">Prioritizing eco-conscious designs that don't compromise on comfort or grandeur.</p>
                  </div>
               </motion.div>
            </div> 

            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-zinc-100">
              <div>
                <h4 className="text-3xl font-display font-bold text-emerald-900 mb-1 italic">850+</h4>
                <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">Successful Closings</p>
              </div>
              <div>
                <h4 className="text-3xl font-display font-bold text-emerald-900 mb-1 italic">15+</h4>
                <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">Design Awards</p>
              </div>
              <div>
                <h4 className="text-3xl font-display font-bold text-emerald-900 mb-1 italic">Top 1%</h4>
                <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">Agency Ranking</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactPage = () => (
  <section className="pt-40 pb-24 px-6 bg-emerald-950 min-h-screen">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="text-white space-y-12">
          <h2 className="text-5xl md:text-7xl font-display italic leading-none">Your journey starts <span className="text-emerald-400">here.</span></h2>
          <div className="space-y-8 pt-6">
            <div className="flex gap-6 items-start group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10 shadow-lg group-hover:bg-emerald-400 group-hover:text-emerald-950 transition-all duration-500"><Phone size={22}/></div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold mb-1 italic">Direct Line</p>
                <p className="text-2xl font-light tracking-tight">+1 (919) 444-2026</p>
              </div>
            </div>
            <div className="flex gap-6 items-start group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10 shadow-lg group-hover:bg-emerald-400 group-hover:text-emerald-950 transition-all duration-500"><Mail size={22}/></div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold mb-1 italic">Inquiries</p>
                <p className="text-2xl font-light tracking-tight">concierge@velmor.com</p>
              </div>
            </div>
            <div className="flex gap-6 items-start group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10 shadow-lg group-hover:bg-emerald-400 group-hover:text-emerald-950 transition-all duration-500"><MapPin size={22}/></div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold mb-1 italic">Presence</p>
                <p className="text-xl font-light leading-relaxed">Executive Tower, Charlotte, NC 28202</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl self-center">
          <h3 className="text-3xl font-display italic text-emerald-950 mb-10">Private Inquiry</h3>
          <form className="space-y-8" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[8px] uppercase font-bold text-zinc-400 tracking-widest ml-1">Your Name</label>
                <input type="text" placeholder="Johnathan Doe" className="w-full bg-zinc-50 rounded-xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm italic" />
              </div>
              <div className="space-y-2">
                <label className="text-[8px] uppercase font-bold text-zinc-400 tracking-widest ml-1">Email</label>
                <input type="email" placeholder="john@domain.com" className="w-full bg-zinc-50 rounded-xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm italic" />
              </div>
            </div>
            <div className="space-y-2">
                <label className="text-[8px] uppercase font-bold text-zinc-400 tracking-widest ml-1">How can we assist?</label>
                <textarea placeholder="Describe your specific requirements..." rows="4" className="w-full bg-zinc-50 rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm resize-none italic"></textarea>
            </div>
            <button className="w-full py-6 bg-emerald-900 text-white rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 shadow-xl group active:scale-[0.98]">
              Send Inquiry <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform"/>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showInquiry, setShowInquiry] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="bg-white selection:bg-emerald-900 selection:text-white antialiased overflow-x-hidden">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} setShowInquiry={() => setShowInquiry(true)} />
      
      <AnimatePresence>
        {showInquiry && <InquiryModal isOpen={showInquiry} onClose={() => setShowInquiry(false)} />}
      </AnimatePresence>

      <PropertyDetailModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentPage} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
            {currentPage === 'projects' && <ProjectsPage onSelectProperty={setSelectedProperty} />}
            {currentPage === 'agency' && <AgencyPage />}
            {currentPage === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-zinc-950 py-24 px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-white text-3xl font-display italic serif">
              Velmor<span className="text-emerald-500 not-italic">.</span>
            </div>
            <div className="flex gap-8 text-[10px] uppercase font-bold tracking-widest text-zinc-500">
              <a href="#" className="hover:text-emerald-400 transition-colors">Instagram</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Twitter</a>
            </div>
            <div className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest">
              © 2026 Velmor Agency. Registered Real Estate.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
