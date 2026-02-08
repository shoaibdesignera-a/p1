
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, ArrowRight, Loader2 } from 'lucide-react';

const Home: React.FC = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const category = location.pathname.substring(1) || 'properties';

  useEffect(() => {
    const saved = localStorage.getItem('mmgg_listings');
    const all = saved ? JSON.parse(saved) : [];
    setListings(all.filter((l: any) => l.type === category));
    setLoading(false);
  }, [category]);

  return (
    <div className="pb-20">
      <section className="relative h-[60vh] bg-[#001F3F] flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200')] bg-cover"></div>
        <div className="relative z-10 space-y-6">
          <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.5em]">The Apex Of Quality</span>
          <h1 className="text-5xl md:text-7xl font-serif font-black text-white uppercase tracking-tighter">Luxury {category}</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto italic">Verified assets for the discerning Nigerian elite.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#006837]" size={48} /></div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {listings.map(item => (
              <Link to={`/properties/${item.id}`} key={item.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-2xl hover:-translate-y-2 transition-all">
                <div className="aspect-video relative overflow-hidden">
                  <img src={item.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                  <div className="absolute top-4 left-4 bg-[#006837] text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase">Verified</div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-serif font-black text-[#001F3F] mb-2">{item.title}</h3>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-6">
                    <MapPin size={14} className="text-[#D4AF37]" /> {item.location}
                  </div>
                  <div className="flex justify-between items-center border-t border-slate-100 pt-6">
                    <span className="text-xl font-black text-[#006837]">₦ {parseInt(item.price).toLocaleString()}</span>
                    <span className="text-[10px] font-black uppercase flex items-center gap-2 text-[#D4AF37]">Explore <ArrowRight size={12}/></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white p-20 rounded-[3rem] text-center shadow-xl border border-slate-100">
            <h2 className="text-2xl font-serif font-black text-[#001F3F] mb-4">CATALOG UNDER REVIEW</h2>
            <p className="text-slate-400 max-w-sm mx-auto mb-10 italic">Our agents are currently auditing new assets. Please visit the admin portal to populate the gallery.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
