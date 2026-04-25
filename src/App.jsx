import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowUpRight, MapPin, X, Menu, Building2, Search,
  Linkedin, Mail, Globe, Clock, Send, Phone, MessageSquare
} from 'lucide-react';

const PROPERTY_DATA = [
  {
    id: 1, category: 'Residential', badge: 'Featured',
    title: "The Zenith Canopy", price: "$2,450,000",
    img: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    location: "Charlotte, NC", details: "4 BR / 5 BA",
    desc: "A contemporary masterpiece blending glass architecture with sustainable living.",
  },
  {
    id: 2, category: 'Residential', badge: 'New',
    title: "Obsidian Glass House", price: "$1,890,000",
    img: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    location: "Raleigh, NC", details: "3 BR / 3 BA",
    desc: "Minimalist lines and total privacy in the heart of nature.",
  },
  {
    id: 3, category: 'Commercial', badge: 'Premier',
    title: "The Monolith Center", price: "$12,500,000",
    img: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    location: "Durham, NC", details: "25,000 Sqft",
    desc: "A beacon of modern commerce with LEED certified efficiency.",
  },
  {
    id: 4, category: 'Residential', badge: 'Limited',
    title: "Marble Haven", price: "$4,200,000",
    img: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    location: "Asheville, NC", details: "5 BR / 6 BA",
    desc: "Classic charm met with futuristic automation and panoramic views.",
  },
  {
    id: 5, category: 'Commercial', badge: 'High-End',
    title: "Urban Nexus", price: "$9,700,000",
    img: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    location: "Charlotte, NC", details: "Suite A-Z",
    desc: "The ultimate corporate playground designed for creative titans.",
  },
  {
    id: 6, category: 'Residential', badge: 'Luxury',
    title: "The Ivory Villa", price: "$3,100,000",
    img: "https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    location: "Pinehurst, NC", details: "4 BR / 4 BA",
    desc: "A serene escape with high ceilings and custom lighting design.",
  }
];

const TEAM_DATA = [
  {
    name: "Alexander Velmor",
    role: "Visionary CEO & Founder",
    img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "The architect of Velmor's prestige. Alexander doesn't just sell property he engineers legacy environments for the worlds elite."
  },
  {
    name: "Elena Sterling",
    role: "Director of Private Estates",
    img: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Elena curates the most exclusive residential list in the US. Her eye for detail ensures that every home is a functional work of art."
  },
  {
    name: "Marcus Thorne",
    role: "Commercial Strategist",
    img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Marcus bridges the gap between commercial viability and aesthetic excellence, securing high yield assets for institutional investors."
  }
];

const Modal = ({ property, onClose }) => {
  const [activeImg, setActiveImg] = useState(property?.img);
  useEffect(() => { if (property) setActiveImg(property.img); }, [property]);
  if (!property) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row relative shadow-2xl animate-in zoom-in duration-500">
        <button onClick={onClose} className="absolute top-6 right-6 z-[1001] p-3 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-all">
          <X size={20} className="text-zinc-900" />
        </button>
        
        <div className="w-full md:w-3/5 h-[40vh] md:h-auto bg-zinc-100 relative overflow-hidden">
          <img src={activeImg} className="w-full h-full object-cover animate-in fade-in duration-700" alt="Property Detail" />
          <div className="absolute bottom-6 left-6 flex gap-3">
            {[property.img, ...(property.gallery || [])].map((g, idx) => (
              <img 
                key={idx} src={g} 
                onClick={() => setActiveImg(g)}
                className={`w-16 h-16 rounded-xl border-2 cursor-pointer transition-all ${activeImg === g ? 'border-emerald-500 scale-110 shadow-lg' : 'border-white/50 hover:border-white opacity-70 hover:opacity-100'}`}
              />
            ))}
          </div>
        </div>

        <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto max-h-[50vh] md:max-h-[90vh]">
          <span className="text-emerald-600 font-bold uppercase text-[10px] tracking-widest block mb-2">{property.category}</span>
          <h2 className="text-3xl md:text-4xl font-serif italic mb-6">{property.title}</h2>
          <div className="flex items-center gap-2 text-zinc-400 text-sm mb-8"><MapPin size={16}/> {property.location}</div>
          <p className="text-zinc-500 leading-relaxed mb-8 text-sm md:text-base font-light">{property.desc}</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-5 bg-zinc-50 rounded-2xl">
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Price</span>
              <span className="text-lg font-serif text-emerald-600">{property.price}</span>
            </div>
            <div className="p-5 bg-zinc-50 rounded-2xl">
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Size</span>
              <span className="text-lg font-serif text-zinc-800">{property.details}</span>
            </div>
          </div>
          <button className="w-full py-5 bg-zinc-950 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-600 transition-all">Connect with Advisor</button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activePage, setPage] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [servants, setServants] = useState(2);
  const [techLevel, setTechLevel] = useState(1);
  const [landArea, setLandArea] = useState(5000);

  const maintenanceCost = useMemo(() => {
    const base = (servants * 4500) + (landArea * 0.5);
    const multiplier = [1, 1.5, 2.5][techLevel];
    return Math.floor(base * multiplier);
  }, [servants, techLevel, landArea]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProps = useMemo(() => {
    return PROPERTY_DATA.filter(p => {
      const matchesFilter = filter === 'All' || p.category === filter;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'planner', label: 'Lifestyle' },
    { id: 'team', label: 'The Group' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNav = (id) => {
    setPage(id);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-white min-h-screen font-sans text-zinc-900 overflow-x-hidden selection:bg-emerald-100">
      
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled || activePage !== 'home' ? 'bg-white/80 backdrop-blur-md py-4 border-b border-zinc-100' : 'bg-transparent py-8'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleNav('home')}>
            <div className="w-8 h-8 bg-zinc-950 text-white flex items-center justify-center rounded-lg group-hover:bg-emerald-600 transition-colors">
              <Building2 size={16} />
            </div>
            <span className={`tracking-[0.4em] font-serif font-bold text-lg ${scrolled || activePage !== 'home' ? 'text-zinc-900' : 'text-white'}`}>VELMOR</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {navItems.map(item => (
              <button 
                key={item.id} onClick={() => handleNav(item.id)}
                className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all relative py-1 ${activePage === item.id ? 'text-emerald-600' : (scrolled || activePage !== 'home' ? 'text-zinc-400 hover:text-zinc-900' : 'text-white/60 hover:text-white')}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button className="md:hidden p-2 z-[110]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} className="text-zinc-900" /> : <Menu size={24} className={scrolled || activePage !== 'home' ? 'text-zinc-900' : 'text-white'} />}
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 bg-white z-[105] p-12 transition-all duration-500 ease-in-out flex flex-col justify-center ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}>
        <div className="space-y-10">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => handleNav(item.id)} className="block text-4xl font-serif italic text-zinc-900 text-left w-full border-b border-zinc-50 pb-4">
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <main>
        {activePage === 'home' && (
          <>
            <section className="h-screen relative flex items-center justify-center overflow-hidden">
              <img src="https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1600" className="absolute inset-0 w-full h-full object-cover scale-105 animate-zoom" alt="Hero" />
              <div className="absolute inset-0 bg-zinc-950/40" />
              <div className="relative z-10 text-center px-6 max-w-4xl">
                <p className="text-emerald-400 font-bold tracking-[0.5em] text-[10px] uppercase mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">High-End Real Estate Vanguard</p>
                <h1 className="text-5xl md:text-8xl font-serif italic text-white mb-10 leading-[1.1] animate-in fade-in slide-in-from-bottom-10 duration-1000">Beyond Living. <br/><span className="font-sans not-italic font-light opacity-80">Architecting Legacies.</span></h1>
                <div className="flex flex-col md:flex-row gap-5 justify-center animate-in fade-in slide-in-from-bottom-12 duration-1000">
                  <button onClick={() => setPage('gallery')} className="px-12 py-5 bg-white text-zinc-950 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all">Explore Collection</button>
                  <button onClick={() => setPage('contact')} className="px-12 py-5 border border-white/30 backdrop-blur-md text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">Book Consultation</button>
                </div>
              </div>
            </section>

            <section className="py-24 md:py-40 px-6">
              <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <div className="space-y-10">
                  <h2 className="text-4xl md:text-6xl font-serif italic leading-tight">Invisible details of prestige.</h2>
                  <p className="text-zinc-500 text-lg leading-relaxed font-light">
                    Velmor Premier is a strategic luxury consultancy. We shift the focus from square footage to "Life Value." Our philosophy centers on emotional architecture and invisible technology.
                  </p>
                  <div className="grid grid-cols-2 gap-10 pt-6">
                    <div>
                      <h4 className="text-3xl font-serif italic mb-2">$8.4B+</h4>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Asset Volume</p>
                    </div>
                    <div>
                      <h4 className="text-3xl font-serif italic mb-2">98%</h4>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Retention</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <img src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800" className="w-full aspect-square object-cover rounded-[3rem] shadow-2xl" alt="Architecture" />
                </div>
              </div>
            </section>
          </>
        )}

        {activePage === 'gallery' && (
          <section className="pt-32 pb-32 px-6 max-w-[1400px] mx-auto animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
              <div className="max-w-xl">
                <h2 className="text-5xl md:text-6xl font-serif italic mb-6 leading-tight">Curated <br/> Environments.</h2>
                <p className="text-zinc-400 text-[10px] font-bold tracking-[0.2em] uppercase">Limited North Carolina Assets.</p>
              </div>
              <div className="flex bg-zinc-50 p-1.5 rounded-2xl border border-zinc-100 w-full md:w-auto">
                {['All', 'Residential', 'Commercial'].map(c => (
                  <button key={c} onClick={() => setFilter(c)} className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${filter === c ? 'bg-white text-emerald-600 shadow-sm' : 'text-zinc-400 hover:text-zinc-900'}`}>{c}</button>
                ))}
              </div>
            </div>

            <div className="mb-16 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-400 pl-4">
                <Search size={20} strokeWidth={1.5} />
              </div>
              <input 
                type="text"
                placeholder="Find by name or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-zinc-100 py-6 pl-14 pr-8 text-xl md:text-2xl font-serif italic focus:outline-none focus:border-emerald-600 transition-all placeholder:text-zinc-200"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProps.map((item, idx) => (
                <div 
                  key={item.id} 
                  className="group cursor-pointer animate-in fade-in slide-in-from-bottom-8"
                  style={{ animationDelay: `${idx * 100}ms` }}
                  onClick={() => setSelectedProperty(item)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] mb-8">
                    <img src={item.img} className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110" />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur text-[9px] font-black uppercase tracking-widest text-emerald-600 rounded-full">{item.badge}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-serif italic mb-2 group-hover:text-emerald-600 transition-colors">{item.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-600 font-bold font-serif">{item.price}</span>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5"><MapPin size={12}/> {item.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activePage === 'planner' && (
          <section className="pt-32 pb-32 px-6 max-w-[1400px] mx-auto animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row gap-20">
              <div className="lg:w-1/2 space-y-12">
                <h2 className="text-5xl md:text-7xl font-serif italic leading-tight">Lifestyle <br/> Architecture.</h2>
                <div className="space-y-16">
                  <div className="space-y-6">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                      <span>Staff Count</span>
                      <span className="text-emerald-600 font-black">{servants} Persons</span>
                    </div>
                    <input type="range" min="1" max="15" value={servants} onChange={(e) => setServants(Number(e.target.value))} className="w-full h-[2px] bg-zinc-100 appearance-none accent-emerald-600 rounded-full" />
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                      <span>Total Estate Size</span>
                      <span className="text-emerald-600 font-black">{landArea.toLocaleString()} SQFT</span>
                    </div>
                    <input type="range" min="1000" max="50000" step="500" value={landArea} onChange={(e) => setLandArea(Number(e.target.value))} className="w-full h-[2px] bg-zinc-100 appearance-none accent-emerald-600 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-zinc-950 p-16 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-500">Monthly Burn Rate</h4>
                    <div className="text-6xl md:text-8xl font-serif italic">${maintenanceCost.toLocaleString()} <span className="text-sm text-zinc-600 tracking-normal">/Month</span></div>
                  </div>
                  <p className="text-zinc-500 text-sm italic font-light max-w-xs mt-12">Estimates cover payroll, energy, and precision maintenance schedules.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activePage === 'team' && (
          <section className="pt-32 pb-32 px-6 max-w-[1400px] mx-auto animate-in fade-in duration-700">
             <div className="text-center mb-24 max-w-2xl mx-auto">
                <h2 className="text-5xl md:text-7xl font-serif italic mb-8">The Vanguard.</h2>
                <p className="text-zinc-500 font-light text-lg">Discreet advisors bridging the gap between desire and legacy.</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                {TEAM_DATA.map((m, i) => (
                  <div key={i} className="group text-center">
                    <div className="aspect-[4/5] overflow-hidden rounded-[3rem] mb-10 border border-zinc-50 grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:shadow-xl">
                      <img src={m.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    </div>
                    <h3 className="text-2xl font-serif italic mb-1">{m.name}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-6">{m.role}</p>
                    <p className="text-zinc-400 text-sm italic font-light px-8">"{m.bio}"</p>
                  </div>
                ))}
             </div>
          </section>
        )}

        {activePage === 'contact' && (
          <section className="pt-32 pb-32 px-6 max-w-[1400px] mx-auto animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row gap-24 lg:gap-32">
              <div className="lg:w-2/5 space-y-12">
                <h2 className="text-5xl md:text-7xl font-serif italic leading-tight">Let's Talk <br/> Strategy.</h2>
                <div className="space-y-10">
                  <div className="flex items-center gap-6 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <Mail size={20} />
                    </div>
                    <span className="text-lg font-serif italic">concierge@velmor.com</span>
                  </div>
                  <div className="flex items-center gap-6 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <Phone size={20} />
                    </div>
                    <span className="text-lg font-serif italic">+1 (800) VELMOR</span>
                  </div>
                </div>
              </div>

              <div className="lg:w-3/5">
                <form className="space-y-12" onSubmit={e => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                    <div className="relative group">
                      <input type="text" id="name" className="peer w-full bg-transparent border-b border-zinc-100 py-4 text-lg font-light focus:outline-none focus:border-emerald-600 transition-all placeholder-transparent" placeholder="Name" />
                      <label htmlFor="name" className="absolute left-0 -top-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300 peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-placeholder-shown:font-serif peer-placeholder-shown:italic peer-placeholder-shown:tracking-normal peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-emerald-600 transition-all pointer-events-none">Your Full Name</label>
                    </div>
                    <div className="relative group">
                      <input type="email" id="email" className="peer w-full bg-transparent border-b border-zinc-100 py-4 text-lg font-light focus:outline-none focus:border-emerald-600 transition-all placeholder-transparent" placeholder="Email" />
                      <label htmlFor="email" className="absolute left-0 -top-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300 peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-placeholder-shown:font-serif peer-placeholder-shown:italic peer-placeholder-shown:tracking-normal peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-emerald-600 transition-all pointer-events-none">Email Address</label>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <select id="type" className="peer w-full bg-transparent border-b border-zinc-100 py-4 text-lg font-light italic focus:outline-none focus:border-emerald-600 transition-all appearance-none cursor-pointer">
                      <option>Acquisition Consultation</option>
                      <option>Portfolio Management</option>
                      <option>Lifestyle Concierge</option>
                    </select>
                    <label htmlFor="type" className="absolute left-0 -top-4 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 transition-all">Interest Type</label>
                  </div>

                  <div className="relative group">
                    <textarea id="msg" rows="3" className="peer w-full bg-transparent border-b border-zinc-100 py-4 text-lg font-light focus:outline-none focus:border-emerald-600 transition-all placeholder-transparent resize-none" placeholder="Message"></textarea>
                    <label htmlFor="msg" className="absolute left-0 -top-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300 peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-placeholder-shown:font-serif peer-placeholder-shown:italic peer-placeholder-shown:tracking-normal peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-emerald-600 transition-all pointer-events-none">Tell us about your legacy</label>
                  </div>

                  <button className="flex items-center gap-6 group py-4">
                    <div className="w-16 h-16 rounded-full bg-zinc-950 flex items-center justify-center text-white group-hover:bg-emerald-600 transition-all duration-500 shadow-xl group-hover:scale-110">
                      <Send size={24} />
                    </div>
                    <div className="text-left">
                      <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Secure Send</span>
                      <span className="text-2xl font-serif italic">Submit Request</span>
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}
      </main>

      <Modal property={selectedProperty} onClose={() => setSelectedProperty(null)} />

      <footer className="bg-zinc-950 text-white py-32 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
           <div className="col-span-1 md:col-span-2 space-y-10">
              <div className="flex items-center gap-2">
                 <Building2 className="text-emerald-500" size={32} />
                 <span className="font-serif font-bold text-3xl tracking-[0.2em] uppercase italic">Velmor</span>
              </div>
              <p className="text-zinc-500 max-w-sm font-light text-lg italic">Architecting environments for the world's most distinguished minds.</p>
           </div>
           <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-500 mb-10">Directory</h4>
              <ul className="space-y-6 text-zinc-400 text-sm font-light">
                 <li onClick={() => handleNav('gallery')} className="hover:text-emerald-500 cursor-pointer transition-colors">Portfolio</li>
                 <li onClick={() => handleNav('planner')} className="hover:text-emerald-500 cursor-pointer transition-colors">Economics</li>
                 <li onClick={() => handleNav('team')} className="hover:text-emerald-500 cursor-pointer transition-colors">The Group</li>
                 <li onClick={() => handleNav('contact')} className="hover:text-emerald-500 cursor-pointer transition-colors">Connect</li>
              </ul>
           </div>
           <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-500 mb-10">Presence</h4>
              <div className="flex gap-4">
                 <a href="#" className="w-12 h-12 border border-white/5 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-all"><Linkedin size={18}/></a>
                 <a href="#" className="w-12 h-12 border border-white/5 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-all"><Globe size={18}/></a>
              </div>
           </div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <p className="text-[9px] uppercase tracking-[0.6em] text-zinc-600 font-bold">© 2026 VELMOR PREMIER GROUP · PRIVATE EQUITY</p>
           <div className="flex gap-10 text-zinc-700 text-[9px] uppercase tracking-widest font-bold">
             <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
             <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
           </div>
        </div>
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes zoom { from { transform: scale(1); } to { transform: scale(1.1); } }
        .animate-zoom { animation: zoom 25s ease-in-out infinite alternate; }

        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in-from-bottom { from { transform: translateY(2rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes zoom-in { from { transform: scale(0.97); opacity: 0; } to { transform: scale(1); opacity: 1; } }

        .animate-in { animation-fill-mode: both; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
        .fade-in { animation-name: fade-in; animation-duration: 1.2s; }
        .zoom-in { animation-name: zoom-in; animation-duration: 0.8s; }
        .slide-in-from-bottom-8 { animation-name: slide-in-from-bottom; animation-duration: 1.2s; }
        
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none; height: 14px; width: 14px; border-radius: 50%;
          background: #059669; cursor: pointer; border: none;
          box-shadow: 0 0 15px rgba(5, 150, 105, 0.4);
        }
      `}</style>
    </div>
  );
}
