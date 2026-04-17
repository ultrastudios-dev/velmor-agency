import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUpRight, 
  MapPin, 
  Phone, 
  Mail, 
  X,
  Menu,
  ChevronRight,
  CheckCircle,
  Heart,
  Clock,
  ShieldCheck,
  Maximize2,
  ExternalLink,
  ArrowLeft,
  TrendingUp,
  Wallet,
  BarChart3,
  ShieldAlert
} from 'lucide-react';

const PROPERTY_DATA = [
  { 
    id: 1, 
    category: 'Residential', 
    title: "The Zenith Canopy", 
    price: "$2,450,000", 
    numericPrice: 2450000,
    img: "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?auto=compress&cs=tinysrgb&w=800", 
    gallery: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    location: "Charlotte, NC", 
    area: "4,200 sqft", 
    rooms: "4 Beds / 5 Baths",
    desc: "A masterpiece of modern concrete and glass architecture. Features a living roof and private wellness wing." 
  },
  { 
    id: 2, 
    category: 'Residential', 
    title: "Obsidian Glass House", 
    price: "$1,890,000", 
    numericPrice: 1890000,
    img: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800", 
    gallery: [
      "https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/312407/pexels-photo-312407.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    location: "Raleigh, NC", 
    area: "3,100 sqft", 
    rooms: "3 Beds / 3 Baths",
    desc: "Minimalist living with gold layered privacy glass. The structure blends seamlessly into the surrounding pine forest." 
  },
  { 
    id: 3, 
    category: 'Commercial', 
    title: "The Monolith Center", 
    price: "$12,500,000", 
    numericPrice: 12500000,
    img: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=800", 
    gallery: [
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3182811/pexels-photo-3182811.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    location: "Durham, NC", 
    area: "25,000 sqft", 
    rooms: "15 Suites",
    desc: "A state of the art corporate HQ designed with bio-adaptive lighting and modular floor plans." 
  },
  { 
    id: 4, 
    category: 'Land', 
    title: "Emerald Ridge Estate", 
    price: "$950,000", 
    numericPrice: 950000,
    img: "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=800", 
    gallery: [
      "https://images.pexels.com/photos/460695/pexels-photo-460695.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/210158/pexels-photo-210158.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    location: "Asheville, NC", 
    area: "12 Acres", 
    rooms: "Unbuilt",
    desc: "Prime elevated acreage with panoramic views of the Blue Ridge Mountains. Pre permitted for a luxury villa." 
  }
];

const VelmorLogo = ({ className = "w-8 h-8", light = false }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="80" height="80" stroke={light ? "white" : "#10b981"} strokeWidth="2" opacity="0.3" />
    <path d="M50 15L85 30V70L50 85L15 70V30L50 15Z" stroke={light ? "white" : "#10b981"} strokeWidth="3" />
    <path d="M30 40L50 70L70 40" stroke={light ? "white" : "#10b981"} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function App() {
  const [activePage, setPage] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  const [propertyValue, setPropertyValue] = useState(2450000);
  const [appreciation, setAppreciation] = useState(7);
  const [years, setYears] = useState(10);
  const [futureValue, setFutureValue] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsMenuOpen(false); // Close menu if transition occurs
  }, [activePage]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const val = propertyValue * Math.pow(1 + (appreciation / 100), years);
    setFutureValue(val);
  }, [propertyValue, appreciation, years]);

  const openGalleryModal = (item) => {
    setSelectedItem(item);
    setActiveImgIndex(0);
  };

  const toggleWishlist = (e, id) => {
    e.stopPropagation();
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleInquiry = () => {
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 3000);
  };

  const renderLegal = (title, content) => (
    <section className="pt-40 pb-40 px-6 max-w-4xl mx-auto min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={() => setPage('home')} 
        className="flex items-center gap-2 text-zinc-400 hover:text-emerald-600 transition-all mb-12 text-[10px] uppercase tracking-widest font-bold"
      >
        <ArrowLeft size={16}/> Back to home
      </button>
      <h1 className="text-5xl md:text-7xl font-serif italic mb-12">{title}</h1>
      <div className="prose prose-zinc max-w-none space-y-8 text-zinc-500 leading-loose text-lg font-light">
        {content}
      </div>
    </section>
  );

  return (
    <div className="bg-white min-h-screen font-sans text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || activePage !== 'home' ? 'bg-white/95 backdrop-blur-xl py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setPage('home')}>
            <VelmorLogo className="w-10 h-10 transition-transform group-hover:scale-110" light={!scrolled && activePage === 'home'} />
            <span className={`tracking-[0.3em] font-serif font-bold text-lg ${scrolled || activePage !== 'home' ? 'text-zinc-900' : 'text-white'}`}>VELMOR</span>
          </div>

          <div className="hidden md:flex gap-10">
            {['home', 'gallery', 'planner', 'contact'].map(link => (
              <button
                key={link}
                onClick={() => setPage(link)}
                className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-emerald-500 after:transition-all hover:after:w-full ${
                  activePage === link 
                    ? (scrolled || activePage !== 'home' ? 'text-emerald-600 after:w-full' : 'text-white after:w-full')
                    : (scrolled || activePage !== 'home' ? 'text-zinc-400 hover:text-zinc-900' : 'text-white/60 hover:text-white')
                }`}
              >
                {link}
              </button>
            ))}
          </div>

          <button 
            className={`md:hidden p-2 rounded-full transition-colors ${scrolled || activePage !== 'home' ? 'text-zinc-900 bg-zinc-100' : 'text-white bg-white/10'}`}
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 bg-zinc-950 z-[200] transition-transform duration-700 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-3 text-white">
            <VelmorLogo className="w-8 h-8" light />
            <span className="tracking-widest">VELMOR</span>
          </div>
          <button onClick={() => setIsMenuOpen(false)} className="text-white p-2 border border-white/10 rounded-full hover:bg-white/5"><X size={24} /></button>
        </div>
        <div className="flex flex-col p-12 gap-8 text-center mt-10">
          {['home', 'gallery', 'planner', 'contact'].map((link, idx) => (
            <button 
              key={link} 
              onClick={() => setPage(link)} 
              className={`text-4xl font-serif italic transform transition-all delay-[${idx * 100}ms] ${activePage === link ? 'text-emerald-500 translate-x-4' : 'text-zinc-400 hover:text-white'}`}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <main>
        {activePage === 'home' && (
          <>

            <section className="h-screen relative flex items-center justify-center text-center px-6">
              <div className="absolute inset-0 z-0">
                <img src="https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1600" className="w-full h-full object-cover" alt="Elite Estate" />
                <div className="absolute inset-0 bg-zinc-950/75 backdrop-blur-[1px]" />
              </div>
              <div className="relative z-10 max-w-4xl animate-in fade-in zoom-in duration-1000">
                <p className="text-[10px] uppercase font-bold tracking-[0.6em] text-emerald-500 mb-8">The 2026 Collection</p>
                <h1 className="text-5xl md:text-8xl font-serif italic text-white mb-12 tracking-tight leading-none">
                  Architectural <br/> Sovereignity.
                </h1>
                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={() => setPage('gallery')} className="px-10 py-5 bg-white text-zinc-900 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-xl">Explore Portfolio</button>
                  <button onClick={() => setPage('contact')} className="px-10 py-5 border border-white/20 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all transform hover:-translate-y-1">Private Consult</button>
                </div>
              </div>
            </section>

            <section className="py-32 px-6 bg-zinc-50 overflow-hidden">
              <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="relative">
                  <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl group">
                    <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Office Culture" />
                  </div>
                  <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-3xl shadow-xl hidden md:block max-w-xs border border-zinc-100 animate-bounce-subtle">
                    <p className="text-emerald-600 font-bold mb-2">Verified Authority</p>
                    <p className="text-xs text-zinc-400 leading-relaxed italic">"Velmor doesn't just list properties. we curate legacies for the next generation."</p>
                  </div>
                </div>
                <div>
                  <span className="text-emerald-600 font-bold uppercase text-[10px] tracking-[0.4em] mb-6 block">The Velmor Philosophy</span>
                  <h2 className="text-4xl md:text-6xl font-serif italic mb-10 leading-tight">Beyond Real Estate. <br/> A Curated Lifestyle.</h2>
                  <div className="space-y-6 text-zinc-500 leading-relaxed font-light text-lg">
                    <p>Founded in 2020 and evolving into a North Carolina powerhouse by 2026, Velmor represents the intersection of technology, luxury, and privacy.</p>
                    <p>We specialize in bio adaptive homes and corporate monoliths that prioritize environmental harmony without compromising the opulence of modern living.</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {activePage === 'gallery' && (
          <section className="pt-40 pb-32 px-6 max-w-[1400px] mx-auto min-h-screen animate-in fade-in duration-700">
            <div className="mb-20">
              <span className="text-emerald-600 font-bold uppercase text-[10px] tracking-[0.4em] mb-4 block">Selected Holdings</span>
              <h2 className="text-5xl md:text-7xl font-serif italic">Portfolio.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
              {PROPERTY_DATA.map(item => (
                <div key={item.id} className="group relative cursor-pointer" onClick={() => openGalleryModal(item)}>
                  <div className="aspect-[16/10] overflow-hidden rounded-[2.5rem] bg-zinc-100 mb-8 relative shadow-lg">
                    <img src={item.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={item.title} />
                    <button onClick={(e) => toggleWishlist(e, item.id)} className={`absolute top-6 right-6 p-4 rounded-full backdrop-blur-md transition-all ${wishlist.includes(item.id) ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/40'}`}>
                      <Heart size={20} fill={wishlist.includes(item.id) ? "currentColor" : "none"} />
                    </button>
                    <div className="absolute bottom-6 left-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                       <div className="bg-white/95 backdrop-blur px-8 py-5 rounded-2xl flex justify-between items-center shadow-2xl">
                          <span className="text-xs font-bold tracking-widest uppercase">Inspect Estate</span>
                          <Maximize2 size={18} className="text-emerald-600" />
                       </div>
                    </div>
                  </div>
                  <div className="flex justify-between px-2">
                    <div>
                      <h3 className="text-2xl font-serif italic mb-1 group-hover:text-emerald-600 transition-colors">{item.title}</h3>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">{item.location}</p>
                    </div>
                    <p className="text-xl font-serif font-bold">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activePage === 'planner' && (
          <section className="pt-40 pb-40 px-6 max-w-[1400px] mx-auto min-h-screen animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="mb-20">
              <span className="text-emerald-600 font-bold uppercase text-[10px] tracking-[0.4em] mb-4 block flex items-center gap-2">
                <ShieldCheck size={14}/> Exclusive Advisory Tool
              </span>
              <h2 className="text-5xl md:text-7xl font-serif italic mb-4">Asset Guardian.</h2>
              <p className="text-zinc-400 font-light">Simulate your portfolio growth within the North Carolina luxury corridor.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Controls */}
              <div className="lg:col-span-5 space-y-10 bg-zinc-50 p-10 md:p-12 rounded-[3rem] border border-zinc-100 shadow-sm">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Current Valuation</label>
                    <span className="text-xl font-serif font-bold text-emerald-600">${propertyValue.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" min="500000" max="25000000" step="100000" 
                    value={propertyValue} onChange={e => setPropertyValue(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-1 rounded-full appearance-none bg-zinc-200 cursor-pointer"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Annual Appreciation</label>
                    <span className="text-xl font-serif font-bold text-emerald-600">{appreciation}%</span>
                  </div>
                  <input 
                    type="range" min="1" max="25" step="0.5" 
                    value={appreciation} onChange={e => setAppreciation(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-1 rounded-full appearance-none bg-zinc-200 cursor-pointer"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Holding Period</label>
                    <span className="text-xl font-serif font-bold text-emerald-600">{years} Years</span>
                  </div>
                  <input 
                    type="range" min="1" max="50" step="1" 
                    value={years} onChange={e => setYears(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-1 rounded-full appearance-none bg-zinc-200 cursor-pointer"
                  />
                </div>

                <div className="pt-6">
                  <button onClick={() => setPage('contact')} className="w-full py-5 bg-zinc-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg group">
                    Schedule Advisory <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 h-full flex flex-col justify-center">
                <div className="relative p-12 bg-white rounded-[3rem] border border-zinc-100 shadow-2xl overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 text-emerald-50 opacity-10 pointer-events-none transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-1000">
                    <BarChart3 size={300} />
                  </div>
                  
                  <div className="relative z-10">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-500 mb-6 flex items-center gap-2">
                       <TrendingUp size={12}/> Projected Sovereign Value
                    </p>
                    <h3 className="text-6xl md:text-8xl font-serif italic mb-8 tracking-tighter">
                      ${Math.round(futureValue).toLocaleString()}
                    </h3>
                    
                    <div className="flex flex-wrap gap-8 pt-12 border-t border-zinc-50">
                      <div>
                        <p className="text-[9px] uppercase font-bold text-zinc-400 mb-2">Total Gain</p>
                        <p className="text-2xl font-serif text-emerald-600">+${Math.round(futureValue - propertyValue).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-bold text-zinc-400 mb-2">Daily Growth (Est.)</p>
                        <p className="text-2xl font-serif text-zinc-900">${Math.round((futureValue - propertyValue) / (years * 365)).toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="mt-12 p-6 bg-zinc-50 rounded-2xl flex items-center gap-4 border border-zinc-100">
                      <ShieldAlert size={20} className="text-emerald-600 shrink-0" />
                      <p className="text-xs text-zinc-400 leading-relaxed italic">Values are based on NC 2026 market projections. Actual yields depend on local zoning and economic cycles.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activePage === 'contact' && (
          <section className="pt-40 pb-40 px-6 max-w-[1400px] mx-auto min-h-screen animate-in fade-in slide-in-from-right-4 duration-700">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                <div>
                   <span className="text-emerald-600 font-bold uppercase text-[10px] tracking-[0.5em] mb-10 block underline underline-offset-8">Direct Liaison</span>
                   <h2 className="text-6xl md:text-8xl font-serif italic leading-none mb-16">Acquire <br/> Clarity.</h2>
                   <div className="space-y-12">
                      <div className="flex items-start gap-8 group">
                         <div className="w-16 h-16 rounded-3xl bg-zinc-50 flex items-center justify-center text-zinc-400 border border-zinc-100 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors"><Phone size={24}/></div>
                         <div><p className="text-[10px] uppercase tracking-[0.2em] text-zinc-300 font-bold mb-2">Private Line</p><p className="text-2xl font-light hover:text-emerald-600 transition-colors">+1 (704) 555-VELM</p></div>
                      </div>
                      <div className="flex items-start gap-8 group">
                         <div className="w-16 h-16 rounded-3xl bg-zinc-50 flex items-center justify-center text-zinc-400 border border-zinc-100 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors"><Mail size={24}/></div>
                         <div><p className="text-[10px] uppercase tracking-[0.2em] text-zinc-300 font-bold mb-2">Email Dossier</p><p className="text-2xl font-light hover:text-emerald-600 transition-colors">concierge@velmor.com</p></div>
                      </div>
                      <div className="flex items-start gap-8 group">
                         <div className="w-16 h-16 rounded-3xl bg-zinc-50 flex items-center justify-center text-zinc-400 border border-zinc-100 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors"><MapPin size={24}/></div>
                         <div><p className="text-[10px] uppercase tracking-[0.2em] text-zinc-300 font-bold mb-2">Office Hub</p><p className="text-2xl font-light">42 Tryon St, Charlotte, NC 28202</p></div>
                      </div>
                   </div>
                </div>
                <div className="bg-zinc-50 p-10 md:p-20 rounded-[4rem] border border-zinc-100 shadow-inner">
                   <form className="space-y-8" onSubmit={e => e.preventDefault()}>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold ml-4">Full Identity</label>
                        <input type="text" className="w-full bg-white py-6 px-10 rounded-2xl outline-none border border-zinc-200 focus:border-emerald-500 transition-colors shadow-sm" placeholder="e.g. Julian Vane" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold ml-4">Secure Channel</label>
                        <input type="email" className="w-full bg-white py-6 px-10 rounded-2xl outline-none border border-zinc-200 focus:border-emerald-500 transition-colors shadow-sm" placeholder="email@domain.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold ml-4">Subject of Interest</label>
                        <textarea className="w-full bg-white py-6 px-10 rounded-2xl outline-none border border-zinc-200 focus:border-emerald-500 transition-colors h-40 resize-none shadow-sm" placeholder="Specify property or investment goals..."></textarea>
                      </div>
                      <button className="w-full py-6 bg-zinc-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-emerald-600 transition-all shadow-xl transform hover:-translate-y-1">Engage Team</button>
                   </form>
                </div>
             </div>
          </section>
        )}

        {activePage === 'terms' && renderLegal("Terms of Service", (
          <>
            <p>By using the Velmor website and services, you agree to comply with our professional conduct standards. Our listings are exclusive and require verification before disclosure of sensitive architectural data.</p>
            <p>All property valuations provided on this site are for informational purposes only and do not constitute a final appraisal until a private survey is conducted by our accredited team.</p>
            <p>Intellectual property regarding architectural plans and proprietary monolith designs remains the sole property of Velmor Property Group Inc.</p>
          </>
        ))}

        {activePage === 'privacy' && renderLegal("Privacy & Cookies", (
          <>
            <p>Your privacy is our priority. We utilize end-to-end encryption for all dossier requests. We do not sell your personal data to third-party marketing firms.</p>
            <p><strong>Cookies:</strong> We use essential cookies to maintain your session security and preference cookies to store your property wishlist. No tracking cookies are used for off site profiling.</p>
            <p><strong>Security:</strong> All financial discussions are conducted via secure, private channels. We comply with NC state regulations regarding real estate data protection.</p>
          </>
        ))}
      </main>

      {selectedItem && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-950/95 backdrop-blur-md" onClick={() => setSelectedItem(null)} />
          <div className="bg-white w-full max-w-6xl h-full max-h-[90vh] rounded-[3rem] overflow-hidden relative shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedItem(null)} 
              className="absolute top-8 right-8 z-[300] p-3 bg-white/20 hover:bg-white/40 rounded-full text-zinc-600 transition-all hover:rotate-90"
            >
              <X size={24} />
            </button>
            
            <div className="w-full md:w-3/5 h-[40%] md:h-auto overflow-hidden bg-zinc-100 flex flex-col">
              <div className="flex-1 overflow-hidden relative">
                <img 
                  src={([selectedItem.img, ...selectedItem.gallery])[activeImgIndex]} 
                  className="w-full h-full object-cover transition-opacity duration-500" 
                  alt="Viewing" 
                />
              </div>
              <div className="h-24 bg-white flex p-3 gap-3 overflow-x-auto border-t border-zinc-100 no-scrollbar">
                {([selectedItem.img, ...selectedItem.gallery]).map((g, i) => (
                  <img 
                    key={i} 
                    src={g} 
                    onClick={() => setActiveImgIndex(i)}
                    className={`h-full aspect-square object-cover rounded-xl cursor-pointer transition-all ${activeImgIndex === i ? 'ring-4 ring-emerald-500 scale-95 opacity-100 shadow-lg' : 'opacity-40 hover:opacity-100'}`} 
                    alt={`Thumbnail ${i}`} 
                  />
                ))}
              </div>
            </div>

            <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto flex flex-col justify-between bg-zinc-50/50">
              <div>
                <div className="flex justify-between items-start mb-6">
                   <div>
                      <span className="text-emerald-600 font-bold uppercase text-[9px] tracking-[0.4em] mb-3 block">Selected Listing</span>
                      <h2 className="text-3xl font-serif italic">{selectedItem.title}</h2>
                   </div>
                   <button onClick={(e) => toggleWishlist(e, selectedItem.id)} className={`p-4 rounded-full transition-all ${wishlist.includes(selectedItem.id) ? 'bg-red-50 text-red-500 shadow-sm' : 'bg-zinc-100 text-zinc-300'}`}>
                      <Heart size={20} fill={wishlist.includes(selectedItem.id) ? "currentColor" : "none"} />
                   </button>
                </div>
                <p className="text-zinc-500 font-light leading-relaxed mb-8 italic font-serif">"{selectedItem.desc}"</p>
                <div className="space-y-6 mb-8 py-6 border-y border-zinc-200/50">
                   <div className="flex justify-between text-sm"><span className="text-zinc-400 font-bold uppercase text-[9px]">Location</span><span className="font-medium">{selectedItem.location}</span></div>
                   <div className="flex justify-between text-sm"><span className="text-zinc-400 font-bold uppercase text-[9px]">Valuation</span><span className="font-serif text-emerald-600 font-bold">{selectedItem.price}</span></div>
                   <div className="flex justify-between text-sm"><span className="text-zinc-400 font-bold uppercase text-[9px]">Area</span><span className="font-medium">{selectedItem.area}</span></div>
                   <div className="flex justify-between text-sm"><span className="text-zinc-400 font-bold uppercase text-[9px]">Configuration</span><span className="font-medium">{selectedItem.rooms}</span></div>
                </div>
              </div>

              <button 
                onClick={handleInquiry}
                disabled={inquirySent}
                className={`w-full py-5 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center gap-3 shadow-lg ${inquirySent ? 'bg-green-500 text-white' : 'bg-zinc-900 text-white hover:bg-emerald-600'}`}
              >
                {inquirySent ? <><CheckCircle size={14} /> Request Logged</> : <><Mail size={14} /> Request Full Dossier</>}
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-zinc-950 text-white pt-24 pb-12 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <VelmorLogo className="w-8 h-8" light />
                <span className="text-xl font-serif italic tracking-widest">VELMOR</span>
              </div>
              <p className="text-white/30 text-sm italic max-w-xs leading-relaxed font-light">
                Curating high-value assets for the modern era. <br/>
                Defining the North Carolina architectural skyline since 2020.
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold mb-6">Explore</p>
              <div className="flex flex-col gap-3 text-sm text-white/50">
                <button onClick={() => setPage('gallery')} className="text-left hover:text-white transition-colors">Portfolio</button>
                <button onClick={() => setPage('planner')} className="text-left hover:text-white transition-colors">Asset Guardian</button>
                <button onClick={() => setPage('contact')} className="text-left hover:text-white transition-colors">Contact</button>
                <button className="text-left hover:text-white transition-colors">Wishlist ({wishlist.length})</button>
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold mb-6">Network</p>
              <div className="flex flex-col gap-3 text-sm text-white/50">
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Private Portal</a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest">© 2026 VELMOR PROPERTY GROUP NC</p>
            <div className="flex gap-8 text-[9px] font-bold uppercase tracking-widest text-white/20">
               <button onClick={() => setPage('terms')} className="hover:text-white transition-all underline underline-offset-4 decoration-white/0 hover:decoration-white/20">Terms of Service</button>
               <button onClick={() => setPage('privacy')} className="hover:text-white transition-all underline underline-offset-4 decoration-white/0 hover:decoration-white/20">Privacy & Cookies</button>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 4s ease-in-out infinite;
        }

        /* Custom range input styling */
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          margin-top: -8px;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
      `}</style>

    </div>
  );
}
