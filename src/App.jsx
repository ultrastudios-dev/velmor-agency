import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  X, 
  Menu,
  ArrowRight,
  Instagram,
  Linkedin,
  MapPin,
  Plus,
  Phone,
  ArrowUpRight,
  CheckCircle2,
  Calendar
} from 'lucide-react';

const IMAGES = {
  hero: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1600",
  project1: "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?auto=compress&cs=tinysrgb&w=800",
  project2: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800",
  project3: "https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg?auto=compress&cs=tinysrgb&w=800",
  project4: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
  agency: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200"
};

const PROPERTY_DATA = [
  { 
    id: 1,
    title: "Charlotte Zenith Villa", 
    price: "$2,450,000", 
    img: IMAGES.project1,
    location: "Charlotte, NC",
    fullDesc: "Located in Charlotte's elite district, Zenith Villa represents the new standard for post-2025 living. This property features integrated transparent solar panels and a HEPA 14 air filtration system for all rooms. The interior embraces the 'Eco Modernist' concept with sustainably processed local cedar wood. It boasts 5 spacious bedrooms, an infinity pool with skyline views, and the latest generation of biometric security systems."
  },
  { 
    id: 2,
    title: "Raleigh Glass Estate", 
    price: "$1,890,000", 
    img: IMAGES.project2,
    location: "Raleigh, NC",
    fullDesc: "A masterpiece of minimalist architecture on the outskirts of Raleigh. This estate utilizes adaptive glass that changes opacity based on solar intensity, reducing energy costs by up to 40%. The open concept interior design provides a sense of space, seamlessly merging with a central zen garden. Perfect for tech professionals seeking tranquility near the Research Triangle Park."
  },
  { 
    id: 3,
    title: "Asheville Cloud Retreat", 
    price: "$3,100,000", 
    img: IMAGES.project3,
    location: "Asheville, NC",
    fullDesc: "Nestled in the Blue Ridge Mountains, Cloud Retreat offers absolute privacy amidst North Carolina's wilderness. Built with earthquake and extreme weather resistant structures, this home is a fortress of comfort. Amenities include a private spa, a temperature controlled underground wine cellar, and a 360 degree observation deck. This property is a long term investment for those valuing spiritual peace and pure mountain air."
  },
  { 
    id: 4,
    title: "Wilmington Azure View", 
    price: "$2,720,000", 
    img: IMAGES.project4,
    location: "Wilmington, NC",
    fullDesc: "A waterfront residence defining coastal luxury. Azure View is designed to withstand rising sea levels with advanced hydraulic foundations and salt corrosion resistant materials. It features direct access to a private beach and a yacht pier. The nautical modern interior features white marble floors and smart lighting that adjusts to the residents' circadian rhythms."
  }
];

const Reveal = ({ children, delay = 0.2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative w-full">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const PropertyModal = ({ property, onClose }) => {
  if (!property) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white w-full max-w-5xl h-fit max-h-[95vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col md:flex-row relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-900 bg-white/80 backdrop-blur rounded-full p-2 hover:bg-zinc-100 transition-all z-[110] shadow-md"
        >
          <X size={20} />
        </button>

        <div className="w-full md:w-1/2 h-64 md:h-auto shrink-0 overflow-hidden bg-zinc-100">
          <img src={property.img} className="w-full h-full object-cover" alt={property.title} />
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-12 overflow-y-auto flex flex-col">
          <div className="flex items-center gap-2 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-3">
            <MapPin size={12} /> {property.location}
          </div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-zinc-900 mb-6 leading-[1.2] py-1">
            {property.title}
          </h2>
          
          <div className="text-zinc-500 text-sm md:text-base leading-relaxed space-y-4 mb-8 font-light flex-grow">
            <p>{property.fullDesc}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t border-zinc-100 pt-6 mt-auto">
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-bold mb-1">Investment Value</p>
              <p className="text-xl font-serif text-zinc-900">{property.price}</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-bold mb-1">Availability</p>
              <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                <CheckCircle2 size={14} /> Ready 2026
              </div>
            </div>
          </div>

          <button className="mt-10 w-full bg-zinc-900 text-white px-6 py-4 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all group rounded-lg shrink-0">
            Consult with Expert <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Catalogue', id: 'projects' },
    { name: 'Agency', id: 'studio' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md py-3 shadow-sm border-b border-zinc-100' : 'bg-transparent py-5'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <button 
          onClick={() => setCurrentPage('home')}
          className="text-lg md:text-xl font-serif tracking-tighter text-zinc-900 flex items-center gap-1"
        >
          VELMOR<span className="text-blue-600 font-black">.</span>
        </button>
        
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setCurrentPage(link.id)}
              className={`text-[9px] uppercase tracking-[0.2em] transition-colors ${
                currentPage === link.id ? 'text-zinc-900 font-bold' : 'text-zinc-400 hover:text-zinc-900'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        <button 
          className="md:hidden text-zinc-900"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white border-b border-zinc-100 p-6 md:hidden shadow-lg overflow-hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setCurrentPage(link.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left text-sm font-medium tracking-wide ${currentPage === link.id ? 'text-zinc-900' : 'text-zinc-400'}`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HomePage = ({ setCurrentPage }) => (
  <div className="bg-white">
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMAGES.hero} className="w-full h-full object-cover" alt="Luxury NC Home" />
        <div className="absolute inset-0 bg-white/20"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto w-full px-6 text-center">
        <Reveal>
          <span className="text-zinc-900 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">North Carolina — Est. 2026</span>
        </Reveal>
        <Reveal delay={0.4}>
          <h1 className="text-4xl md:text-6xl font-serif text-zinc-900 mb-8 tracking-tight leading-[1.1]">
            New Standard <br/> <span className="italic font-light">Future Living.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.6}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setCurrentPage('projects')}
              className="w-full sm:w-auto bg-zinc-900 text-white px-8 py-3.5 uppercase tracking-widest text-[9px] font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 rounded-lg"
            >
              View Catalogue <ArrowRight size={12} />
            </button>
            <button 
              onClick={() => setCurrentPage('studio')}
              className="w-full sm:w-auto border border-zinc-200 bg-white/50 backdrop-blur text-zinc-900 px-8 py-3.5 uppercase tracking-widest text-[9px] font-bold hover:bg-zinc-50 transition-all rounded-lg"
            >
              About Velmor
            </button>
          </div>
        </Reveal>
      </div>
    </section>

    <section className="py-20 md:py-28 px-6 max-w-4xl mx-auto text-center">
      <Reveal>
        <h2 className="text-2xl md:text-3xl font-serif leading-snug text-zinc-900 mb-8">
          Why North Carolina in 2026?
        </h2>
      </Reveal>
      <Reveal delay={0.3}>
        <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-light mb-6">
          With the rapid growth of the tech sector in Research Triangle Park and the financial expansion in Charlotte, North Carolina has become the primary intersection between suburban comfort and global career opportunities. At Velmor, we understand this demographic shift.
        </p>
        <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-light">
          The year 2026 marks the era of The Great Balance, where a home is no longer just a place to live, but an energy hub, an integrated private office, and a regenerative space. We curate every property with standards of sustainable technology and timeless aesthetics.
        </p>
      </Reveal>
    </section>
  </div>
);

const ProjectsPage = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section className="pt-24 pb-20 px-6 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 border-b border-zinc-100 pb-8">
          <div>
            <Reveal><span className="text-zinc-400 uppercase tracking-widest text-[9px] mb-2 block font-bold">Exclusive Portfolio</span></Reveal>
            <Reveal delay={0.3}><h1 className="text-3xl md:text-4xl font-serif text-zinc-900">2026 Property Curation</h1></Reveal>
          </div>
          <div className="flex items-center gap-2 text-zinc-400 text-[10px] uppercase tracking-wider">
            <Calendar size={14} /> Last updated: March 2026
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {PROPERTY_DATA.map((p) => (
            <motion.div 
              key={p.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setSelected(p)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-50 mb-4 rounded-xl shadow-sm">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={p.img} 
                  className="w-full h-full object-cover transition-all"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 text-[9px] font-bold tracking-widest uppercase shadow-sm rounded-lg">
                  Starting {p.price}
                </div>
              </div>
              <div className="flex justify-between items-start px-1">
                <div>
                  <h3 className="text-lg md:text-xl font-serif text-zinc-900 group-hover:text-blue-600 transition-colors">{p.title}</h3>
                  <div className="flex items-center gap-1 text-zinc-400 text-[10px] uppercase tracking-widest mt-1">
                    <MapPin size={10} /> {p.location}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-all">
                  <Plus size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <PropertyModal property={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
};

const StudioPage = () => (
  <section className="pt-24 pb-20 px-6 bg-zinc-50 min-h-screen">
    <div className="max-w-6xl mx-auto px-4 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl mx-auto aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl relative"
        >
          <img src={IMAGES.agency} className="w-full h-full object-cover" alt="Velmor Office" />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
        </motion.div>
        
        <div className="max-w-xl">
          <Reveal><span className="text-blue-600 uppercase tracking-widest text-[9px] font-bold mb-3 block">Agency Profile</span></Reveal>
          <Reveal delay={0.2}><h1 className="text-3xl md:text-4xl font-serif text-zinc-900 mb-6 leading-tight">Velmor Agency: <br/> Navigating the NC Property Market.</h1></Reveal>
          <div className="space-y-4 text-zinc-600 text-sm md:text-base font-light leading-relaxed">
            <p>Since 2020, Velmor has transformed from a local property boutique into a leading consulting agency in North Carolina. We focus on properties that combine visual luxury with technical functionality.</p>
            <p>Our team consists of real estate market experts, sustainability data analysts, and interior curators dedicated to providing a turn key experience for every client.</p>
            <p>In this year of 2026, we are proud to have helped over 500 families find the place they call the Home of the Future.</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-zinc-200">
            <div>
              <h4 className="text-xl font-serif text-zinc-900">20+</h4>
              <p className="text-[7px] uppercase text-zinc-400 tracking-widest font-black mt-1">Exclusive Properties</p>
            </div>
            <div>
              <h4 className="text-xl font-serif text-zinc-900">$200M+</h4>
              <p className="text-[7px] uppercase text-zinc-400 tracking-widest font-black mt-1">Total Sales</p>
            </div>
            <div>
              <h4 className="text-xl font-serif text-zinc-900">Charlotte</h4>
              <p className="text-[7px] uppercase text-zinc-400 tracking-widest font-black mt-1">Headquarters</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ContactPage = () => (
  <section className="pt-24 pb-20 px-6 bg-white min-h-screen">
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/5">
          <Reveal><h1 className="text-4xl font-serif text-zinc-900 mb-8 tracking-tight">Start Your Consultation.</h1></Reveal>
          <div className="space-y-8">
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-zinc-50 rounded-lg"><Phone className="text-zinc-400" size={16} /></div>
              <div>
                <h4 className="text-[8px] uppercase tracking-widest text-zinc-400 font-black mb-1">WhatsApp Office</h4>
                <p className="text-lg text-zinc-900">+1 (704) 563-4532</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-zinc-50 rounded-lg"><MapPin className="text-zinc-400" size={16} /></div>
              <div>
                <h4 className="text-[8px] uppercase tracking-widest text-zinc-400 font-black mb-1">Our Location</h4>
                <p className="text-sm text-zinc-900 leading-relaxed font-light">302 South Tryon Street, <br/>Charlotte, NC 28320</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Instagram size={18} className="text-zinc-300 hover:text-zinc-900 transition-colors cursor-pointer" />
              <Linkedin size={18} className="text-zinc-300 hover:text-zinc-900 transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
        
        <div className="lg:w-3/5 bg-zinc-900 p-8 rounded-2xl shadow-xl">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[7px] uppercase font-black text-zinc-500 tracking-widest">Full Name</label>
                <input type="text" className="w-full bg-zinc-800/50 border border-zinc-800 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-zinc-600 transition-all text-sm" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-[7px] uppercase font-black text-zinc-500 tracking-widest">Email Address</label>
                <input type="email" className="w-full bg-zinc-800/50 border border-zinc-800 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-zinc-600 transition-all text-sm" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[7px] uppercase font-black text-zinc-500 tracking-widest">Message / Specific Interests</label>
              <textarea rows="3" className="w-full bg-zinc-800/50 border border-zinc-800 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-zinc-600 transition-all text-sm resize-none" placeholder="Tell us about the property type you are looking for..."></textarea>
            </div>
            <button className="w-full flex items-center justify-center bg-white text-zinc-900 px-6 py-3.5 font-bold uppercase tracking-widest text-[9px] hover:bg-zinc-200 transition-colors gap-3 rounded-lg">
              Send Consultation Schedule <ArrowRight size={12} />
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white border-t border-zinc-100 py-12 px-6">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-center md:text-left">
        <span className="text-lg font-serif tracking-tighter text-zinc-900 italic">Velmor Agency.</span>
        <p className="text-[8px] text-zinc-400 tracking-widest uppercase mt-1">North Carolina Premier Real Estate</p>
      </div>
      <div className="text-zinc-300 text-[10px] tracking-widest uppercase font-medium">
        © 2026 Velmor Agency - Member of NC Realtor Association
      </div>
    </div>
  </footer>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.19/bundled/lenis.min.js";
    script.async = true;
    script.onload = () => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="bg-white selection:bg-zinc-900 selection:text-white antialiased font-sans">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
            {currentPage === 'projects' && <ProjectsPage />}
            {currentPage === 'studio' && <StudioPage />}
            {currentPage === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:italic@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;800&display=swap');
        
        html.lenis { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto; }
        .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
        .lenis.lenis-stopped { overflow: hidden; }
        .lenis.lenis-scrolling iframe { pointer-events: none; }

        .font-serif { font-family: 'Instrument Serif', serif; }
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #fdfdfd; }
        ::-webkit-scrollbar-thumb { background: #d4d4d8; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #a1a1aa; }

        @media (max-width: 640px) {
          .text-4xl { font-size: 2.1rem !important; }
        }
      `}</style>
    </div>
  );
}
