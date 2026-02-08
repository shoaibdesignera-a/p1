
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, MessageCircle, ArrowLeft, ShieldCheck, Share2, Star } from 'lucide-react';

const DetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('mmgg_listings');
    const all = saved ? JSON.parse(saved) : [];
    const found = all.find((i: any) => i.id === id);
    if (found) setItem(found);
  }, [id]);

  if (!item) return (
    <div className="min-h-screen flex items-center justify-center bg-white p-20">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin"></div>
        <p className="font-serif italic text-xl">Loading Asset Specifications...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen animate-slide-up">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-24">
        {/* Gallery */}
        <div className="space-y-6">
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-3xl border-[16px] border-[#F8FAFC]">
            <img src={item.images[0]} className="w-full h-full object-cover" alt={item.title} />
          </div>
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square bg-slate-100 rounded-2xl overflow-hidden opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer">
                <img src={item.images[0]} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <button onClick={() => navigate(-1)} className="w-fit text-[10px] font-black flex items-center gap-2 uppercase tracking-widest text-[#D4AF37] mb-12 hover:-translate-x-1 transition-transform">
            <ArrowLeft size={16}/> Back To Marketplace
          </button>
          
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-2 text-[#006837] font-black text-[10px] uppercase tracking-widest">
              <Star size={14} fill="currentColor"/> Highly Coveted Asset
            </div>
            <h1 className="text-6xl md:text-7xl font-serif font-black text-[#001F3F] leading-tight uppercase tracking-tight">
              {item.title}
            </h1>
            <div className="flex items-center gap-3 text-slate-400 font-bold uppercase tracking-widest text-xs">
              <MapPin className="text-[#D4AF37]" size={18}/> {item.location}
            </div>
          </div>

          <div className="bg-[#F8FAFC] p-10 rounded-[3rem] border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Official Valuation</span>
              <span className="text-5xl font-black text-[#006837] tracking-tighter">
                ₦ {parseInt(item.price).toLocaleString()}
              </span>
            </div>
            <div className="px-6 py-3 bg-[#25D366]/5 rounded-full flex items-center gap-3 border border-[#25D366]/20">
              <ShieldCheck size={18} className="text-[#25D366]"/>
              <span className="text-[9px] font-black text-[#25D366] uppercase tracking-widest">Ownership Verified</span>
            </div>
          </div>

          <div className="space-y-8 flex-grow">
            <div className="prose prose-slate">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Masterpiece Narrative</h4>
              <p className="text-slate-600 text-xl leading-relaxed italic border-l-4 border-[#D4AF37] pl-8">
                {item.description}
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href={`https://wa.me/2348136190811?text=Official Request: I wish to proceed with the acquisition of ${item.title}. Reference: ${item.id}`} 
              className="bg-[#006837] text-white py-6 rounded-3xl font-black text-center flex items-center justify-center gap-4 hover:bg-[#001F3F] transition-all uppercase tracking-widest text-xs shadow-2xl active:scale-95"
            >
              <MessageCircle size={24}/> Secure via WhatsApp
            </a>
            <button className="bg-slate-50 text-[#001F3F] py-6 rounded-3xl font-black flex items-center justify-center gap-4 border border-slate-100 hover:bg-slate-100 transition-all uppercase tracking-widest text-xs">
              <Share2 size={20}/> Share Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
