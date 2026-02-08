
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, ArrowUpRight, Search, SlidersHorizontal } from 'lucide-react';

const Home: React.FC = () => {
  const [listings, setListings] = useState<any[]>([]);
  const location = useLocation();
  const category = location.pathname.substring(1) || 'properties';

  useEffect(() => {
    const saved = localStorage.getItem('mmgg_listings');
    const all = saved ? JSON.parse(saved) : [];
    // If the path is /properties or /, show properties. Otherwise show specific type.
    const typeToFilter = category === '' ? 'properties' : category;
    setListings(all.filter((l: any) => l.type === typeToFilter));
  }, [location]);

  return (
    <div className="animate-slide-up">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[65vh] bg-[#001F3F] flex items-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#001F3F] via-[#001F3F]/80 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="max-w-2xl space-y-6">
            <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.6em]">Premium Nigerian Portfolio</span>
            <h1 className="text-5xl md:text-8xl font-serif font-black text-white leading-[0.9] uppercase tracking-tighter">
              Bespoke {category === '' ? 'Living' : category}
            </h1>
            <p className="text-slate-300 text-lg md:text-xl font-medium italic border-l-4 border-[#006837] pl-6 py-2">
              Discover verified luxury assets curated for the West African elite.
            </p>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-4xl font-serif font-black text-[#001F3F] uppercase tracking-tight">Available Inventory</h2>
            <div className="h-1.5 w-24 bg-[#D4AF37] rounded-full"></div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-slate-100 shadow-sm text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Search size={14}/> Search Catalog
            </div>
          </div>
        </div>

        {listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {listings.map(item => (
              <Link 
                to={`/${item.type}/${item.id}`} 
                key={item.id} 
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-50"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img 
                    src={item.images[0]} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    alt={item.title} 
                  />
                  <div className="absolute top-6 left-6 bg-[#006837] text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                    Verified Asset
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-[#D4AF37] font-black text-2xl tracking-tighter">
                      ₦ {parseInt(item.price).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-2xl font-serif font-black text-[#001F3F] group-hover:text-[#006837] transition-colors">{item.title}</h3>
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    <MapPin size={14} className="text-[#D4AF37]" /> {item.location}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">View Blueprint</span>
                    <ArrowUpRight className="text-[#D4AF37] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white p-24 rounded-[4rem] text-center shadow-xl border border-slate-50">
            <div className="mb-8 opacity-10 flex justify-center"><SlidersHorizontal size={80} /></div>
            <h2 className="text-3xl font-serif font-black text-[#001F3F] mb-4 uppercase">Archive Under Maintenance</h2>
            <p className="text-slate-400 max-w-sm mx-auto italic">
              Our agents are currently auditing new assets for this category. Please check back shortly or visit the Admin portal.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
