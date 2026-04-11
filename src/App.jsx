import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  X, 
  ArrowUpRight,
  ArrowRight
} from 'lucide-react';

const IMAGES = {
  hero: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1600",
  project1: "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?auto=compress&cs=tinysrgb&w=800",
  project2: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800",
  project3: "https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg?auto=compress&cs=tinysrgb&w=800",
  project4: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
  commercial1: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=800",
  commercial2: "https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg?auto=compress&cs=tinysrgb&w=800",
  land1: "https://images.pexels.com/photos/46160/field-clouds-sky-earth-46160.jpeg?auto=compress&cs=tinysrgb&w=800",
  land2: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800",
  agency: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200"
};

const PROPERTY_DATA = [
  { id: 1, category: 'Residential', title: "Charlotte Zenith Villa", price: "$2,450,000", img: IMAGES.project1, location: "Charlotte, NC", fullDesc: "A contemporary masterpiece in Myers Park featuring 20-foot ceilings and private vertical gardens." },
  { id: 2, category: 'Residential', title: "Raleigh Glass Estate", price: "$1,890,000", img: IMAGES.project2, location: "Raleigh, NC", fullDesc: "Industrial aesthetics with continuous glass walls that merge seamlessly with the Research Triangle nature." },
  { id: 3, category: 'Commercial', title: "Triangle Tech Hub", price: "$12,500,000", img: IMAGES.commercial1, location: "Durham, NC", fullDesc: "Grade A LEED Platinum complex featuring rooftop lounges and cutting-edge technology facilities." },
  { id: 4, category: 'Commercial', title: "The Meridian Office", price: "$8,200,000", img: IMAGES.commercial2, location: "Charlotte, NC", fullDesc: "Modular office spaces in the prime business district with 360-degree city skyline views." },
  { id: 5, category: 'Land', title: "Blue Ridge Sanctuary", price: "$3,100,000", img: IMAGES.land1, location: "Asheville, NC", fullDesc: "25 acres of exclusive mountain slope land, ideal for luxury resorts or private estates." },
  { id: 6, category: 'Land', title: "Coastal Horizon Lot", price: "$2,720,000", img: IMAGES.land2, location: "Wilmington, NC", fullDesc: "Prime beachfront lot in Wrightsville Beach with permits for an exclusive waterfront residential development." },
  { id: 7, category: 'Residential', title: "Asheville Cloud Retreat", price: "$3,100,000", img: IMAGES.project3, location: "Asheville, NC", fullDesc: "Sustainable living crafted from local natural materials with dramatic mountain vistas." },
  { id: 8, category: 'Residential', title: "Wilmington Azure View", price: "$2,720,000", img: IMAGES.project4, location: "Wilmington, NC", fullDesc: "Coastal luxury featuring expansive sun decks and private dock access for a maritime lifestyle." }
];

const LoadingScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-zinc-950 flex items-center justify-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white font-display text-3xl tracking-tighter font-light italic serif">
        Velmor<span className="text-blue-500 not-italic">.</span>
      </motion.div>
    </motion.div>
  );
};

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'py-3 bg-white/95 backdrop-blur-md border-b border-zinc-100' : 'py-6 md:py-8 bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex justify-between items-center">
        <button onClick={() => setCurrentPage('home')} className="text-xl md:text-2xl font-display font-medium tracking-tighter text-zinc-950 italic serif group">
          Velmor<span className="text-blue-500 not-italic group-hover:ml-1 transition-all">.</span>
        </button>
        <div className="flex gap-6 md:gap-10">
          {['home', 'projects', 'studio', 'contact'].map((id) => (
            <button key={id} onClick={() => setCurrentPage(id)} className={`text-[9px] md:text-[10px] uppercase tracking-[0.25em] font-semibold transition-all relative group ${currentPage === id ? 'text-blue-600' : 'text-zinc-400 hover:text-zinc-950'}`}>
              {id === 'projects' ? 'Catalog' : id === 'studio' ? 'Agency' : id}
              <motion.span className={`absolute -bottom-1 left-0 h-[1.5px] bg-blue-600 ${currentPage === id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

const HomePage = ({ setCurrentPage }) => (
  <div className="relative">
    <section className="h-[90vh] md:h-screen relative flex items-center justify-center overflow-hidden">
      <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2.5, ease: "easeOut" }} className="absolute inset-0">
        <img src={IMAGES.hero} className="w-full h-full object-cover" alt="Hero Luxury Home" />
        <div className="absolute inset-0 bg-black/5" />
      </motion.div>
      <div className="relative z-10 text-center px-6">
        <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-zinc-900 text-[9px] font-bold uppercase tracking-[0.5em] mb-6 block">North Carolina — 2026</motion.span>
        <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="text-4xl md:text-7xl lg:text-8xl font-display font-light text-zinc-950 tracking-tight leading-[1.1] mb-12 max-w-5xl mx-auto">
          The <span className="italic serif">New</span> Definition <br className="hidden md:block"/> Of <span className="italic serif">Timeless</span> Luxury.
        </motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => setCurrentPage('projects')} className="group px-10 py-5 bg-zinc-950 text-white rounded-full text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-xl flex items-center gap-3">
            Explore Catalog <ArrowRight size={14} />
          </button>
          <button onClick={() => setCurrentPage('studio')} className="px-10 py-5 bg-white/80 backdrop-blur border border-zinc-200 text-zinc-950 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-zinc-50 transition-all">
            About Velmor
          </button>
        </motion.div>
      </div>
    </section>

    <section className="py-24 md:py-40 px-6 md:px-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span className="text-blue-600 text-[9px] font-bold uppercase tracking-[0.4em] block mb-6">Ethos & Vision</span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-light text-zinc-950 leading-tight">Inspiration in <span className="italic serif text-zinc-400">every space</span>.</h2>
      </motion.div>
      <div className="space-y-6 text-zinc-500 font-light text-lg md:text-xl leading-relaxed">
        <p>We guide your transition toward a more meaningful lifestyle through precise and artistic property curation across North Carolina.</p>
        <button onClick={() => setCurrentPage('studio')} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-950 group border-b border-zinc-200 pb-1 w-fit">
          Discover Our Agency <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </section>
  </div>
);

const ProjectsPage = () => {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const filteredData = filter === 'All' ? PROPERTY_DATA : PROPERTY_DATA.filter(p => p.category === filter);

  return (
    <section className="pt-32 md:pt-40 pb-24 px-6 md:px-10 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-zinc-400 uppercase tracking-[0.3em] text-[9px] font-bold mb-3 block">Portfolio</span>
            <h2 className="text-4xl md:text-6xl font-display font-light text-zinc-950 italic serif">Property Catalog</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {['All', 'Residential', 'Commercial', 'Land'].map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-3 rounded-full text-[9px] uppercase tracking-widest font-bold border transition-all ${filter === cat ? 'bg-zinc-950 text-white border-zinc-950 shadow-lg' : 'bg-transparent text-zinc-400 border-zinc-100 hover:border-zinc-200'}`}>
                {cat}
              </button>
            ))}
          </div>
        </header>
        
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 md:gap-y-20">
          <AnimatePresence mode="popLayout">
            {filteredData.map((p) => (
              <motion.div 
                layout key={p.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.6 }}
                className="group cursor-pointer" onClick={() => setSelected(p)}
              >
                <div className="relative aspect-[16/10] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden mb-6 shadow-sm bg-zinc-100">
                  <motion.img src={p.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={p.title} />
                  <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/20 transition-colors duration-500" />
                </div>
                <div className="flex justify-between items-start px-2">
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">{p.location}</p>
                    <h3 className="text-2xl md:text-3xl font-display font-light text-zinc-950 italic serif group-hover:not-italic transition-all duration-500">{p.title}</h3>
                    <p className="text-lg md:text-xl font-display text-zinc-400 font-light">{p.price}</p>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 border border-zinc-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                    <ArrowUpRight size={18} strokeWidth={1.5} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/90 backdrop-blur-md p-4" onClick={() => setSelected(null)}>
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="bg-white w-full max-w-5xl max-h-[85vh] rounded-[3rem] overflow-hidden flex flex-col md:flex-row relative" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelected(null)} className="absolute top-6 right-6 z-30 p-3 bg-zinc-950 text-white rounded-full hover:bg-blue-600 transition-all"><X size={18} /></button>
              <div className="w-full md:w-1/2 h-56 md:h-auto"><img src={selected.img} className="w-full h-full object-cover" alt="" /></div>
              <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col overflow-y-auto">
                <span className="text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-4">{selected.category}</span>
                <h2 className="text-4xl font-display font-light text-zinc-950 mb-6 italic serif">{selected.title}</h2>
                <p className="text-zinc-500 font-light text-lg leading-relaxed mb-10">{selected.fullDesc}</p>
                <div className="pt-8 flex items-center justify-between border-t border-zinc-100 mt-auto">
                  <p className="text-3xl font-display font-light">{selected.price}</p>
                  <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-950 transition-colors">Inquiry</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const StudioPage = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} className="py-24 md:py-40 px-6 md:px-10 bg-zinc-50 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 md:gap-24">
        <div className="w-full lg:w-1/2 relative">
          <motion.div style={{ borderRadius: "10rem 2rem 10rem 2rem" }} className="aspect-[3/2] overflow-hidden shadow-xl relative bg-zinc-200">
            <motion.img src={IMAGES.agency} style={{ y }} className="w-full h-full object-cover scale-110" alt="Agency Color" />
          </motion.div>
          <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-xl border border-zinc-100 hidden sm:block">
            <p className="text-5xl md:text-6xl font-display font-light italic serif leading-none mb-1">98%</p>
            <p className="text-[9px] uppercase font-bold text-zinc-400 tracking-widest">Satisfaction Rate</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 space-y-8 md:space-y-10">
          <span className="text-blue-600 text-[10px] font-bold uppercase tracking-[0.4em]">Our Agency</span>
          <h2 className="text-4xl md:text-6xl font-display font-light leading-tight italic serif text-zinc-950">Visions <span className="not-italic">Beyond Borders</span>.</h2>
          <p className="text-zinc-500 text-lg md:text-xl font-light leading-relaxed">
            Velmor combines global data analytics with a personal touch to ensure every property is a strategic lifestyle investment.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-zinc-200">
            <div><p className="font-display text-2xl mb-1 italic serif">Curation</p><p className="text-sm text-zinc-400 font-light">Strict selection standards.</p></div>
            <div><p className="font-display text-2xl mb-1 italic serif">Privacy</p><p className="text-sm text-zinc-400 font-light">Absolute confidentiality.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactPage = () => (
  <section className="py-32 md:py-40 px-6 md:px-10 bg-white min-h-[80vh] flex items-center">
    <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
      <div className="flex flex-col justify-center">
        <span className="text-blue-600 text-[10px] font-bold uppercase tracking-[0.4em] mb-8 block">Contact Us</span>
        <h2 className="text-4xl md:text-7xl font-display font-light tracking-tighter leading-tight mb-12 italic serif text-zinc-950">Bring Your <span className="not-italic">Destination</span> To Life.</h2>
        <div className="space-y-10">
          <div><p className="text-[9px] uppercase text-zinc-400 font-bold tracking-widest mb-2">Address</p><p className="text-xl md:text-2xl font-display font-light text-zinc-950 italic serif">Charlotte, NC 28202</p></div>
          <div><p className="text-[9px] uppercase text-zinc-400 font-bold tracking-widest mb-2">Email</p><p className="text-xl md:text-2xl font-display font-light text-blue-600 border-b border-zinc-100 inline-block pb-1">hello@velmor.nc</p></div>
        </div>
      </div>
      <div className="bg-zinc-50 p-8 md:p-16 rounded-[3rem] md:rounded-[4rem] border border-zinc-100 shadow-sm">
        <form className="space-y-10" onSubmit={e => e.preventDefault()}>
          {['Name', 'Subject', 'Email'].map((f) => (
            <input key={f} type="text" className="w-full bg-transparent border-b border-zinc-200 py-4 text-xl font-light focus:outline-none focus:border-blue-600 transition-all placeholder:text-zinc-300" placeholder={f} />
          ))}
          <button className="w-full py-5 rounded-full bg-zinc-950 text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-blue-600 transition-all shadow-lg">Submit</button>
        </form>
      </div>
    </div>
  </section>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef(null);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [currentPage]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.19/bundled/lenis.min.js";
    script.async = true;
    script.onload = () => {
      const lenis = new Lenis({ 
        duration: 1.2, 
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2
      });
      lenisRef.current = lenis;
      function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div className="bg-white selection:bg-blue-600 selection:text-white antialiased font-sans text-zinc-950 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={currentPage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
            {currentPage === 'projects' && <ProjectsPage />}
            {currentPage === 'studio' && <StudioPage />}
            {currentPage === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="bg-white py-20 px-6 md:px-10 border-t border-zinc-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 text-zinc-400">
          <div className="max-w-xs space-y-4">
            <h4 className="font-display font-medium text-zinc-950 text-2xl italic serif text-zinc-950">Velmor<span className="text-blue-600 not-italic">.</span></h4>
            <p className="text-xs font-light">The new standard for North Carolina real estate.</p>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">© 2026 Velmor Agency. All rights reserved.</p>
        </div>
      </footer>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Cormorant+Garamond:ital,wght@1,300;1,400;1,500&family=Inter:wght@300;400;600&display=swap');
        .font-display { font-family: 'Bricolage Grotesque', sans-serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .serif { font-family: 'Cormorant Garamond', serif; }
        ::-webkit-scrollbar { width: 0px; }
        body { width: 100vw; overflow-x: hidden; scroll-behavior: auto !important; }
      `}</style>
    </div>
  );
}
