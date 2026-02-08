
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, MessageCircle, ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react';

const DetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('mmgg_listings');
    const all = saved ? JSON.parse(saved) : [];
    setItem(all.find((i: any) => i.id === id));
  }, [id]);

  if (!item) return <div className="p-20 text-center font-serif text-3xl">Asset Loading...</div>;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-slate-50">
            <img src={item.images[0]} className="w-full h-full object-cover" alt={item.title} />
          </div>
        </div>
        <div className="space-y-10">
          <Link to="/" className="text-[10px] font-black flex items-center gap-2 uppercase tracking-widest text-[#D4AF37]"><ArrowLeft size={14}/> Return To Marketplace</Link>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-serif font-black text-[#001F3F] leading-tight">{item.title}</h1>
            <div className="flex items-center gap-3 text-slate-500 font-bold uppercase tracking-widest text-xs">
              <MapPin className="text-[#D4AF37]" /> {item.location}
            </div>
          </div>
          <div className="bg-[#F8FAFC] p-8 rounded-[2rem] border border-slate-100 flex justify-between items-center">
            <span className="text-4xl font-black text-[#006837]">₦ {parseInt(item.price).toLocaleString()}</span>
            <span className="text-[9px] font-black text-[#25D366] bg-[#25D366]/10 px-4 py-2 rounded-full flex items-center gap-2">
              <ShieldCheck size={14}/> SECURE ASSET
            </span>
          </div>
          <p className="text-slate-600 text-lg leading-relaxed italic border-l-4 border-[#D4AF37] pl-8">{item.description}</p>
          <a href={`https://wa.me/2348136190811?text=Inquiry: ${item.title}`} className="w-full bg-[#006837] text-white py-6 rounded-[2rem] font-black text-center flex items-center justify-center gap-4 hover:bg-[#001F3F] transition-all uppercase tracking-widest text-sm shadow-xl">
            <MessageCircle size={24}/> Acquire via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
