
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Plus, Edit, Trash2, Home, ShoppingBag, Palette, Users, Save, Sparkles, LogOut, Check, Image as ImageIcon, X, Loader2, DollarSign, MapPin } from 'lucide-react';
import { generatePropertyDescription } from '../services/geminiService';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'properties' | 'furniture' | 'paints' | 'leads'>('properties');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [listings, setListings] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('mmgg_listings');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Critical: Failed to restore local assets", e);
      return [];
    }
  });
  
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    category: '',
    amenities: '',
    description: '',
    images: [] as string[]
  });

  useEffect(() => {
    if (localStorage.getItem('admin_auth') !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem('mmgg_listings', JSON.stringify(listings));
  }, [listings]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, reader.result as string]
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleAiDescription = async () => {
    if (!formData.title || !formData.location) {
      alert("Professional Note: Please provide a 'Title' and 'Location' to help the AI craft an accurate luxury description.");
      return;
    }
    setIsAiGenerating(true);
    const desc = await generatePropertyDescription({
      title: formData.title,
      type: activeTab === 'properties' ? 'Property' : activeTab === 'furniture' ? 'Furniture' : 'Paint Product',
      location: formData.location,
      amenities: formData.amenities.split(',').map(s => s.trim())
    });
    if (desc) {
      setFormData({ ...formData, description: desc });
    }
    setIsAiGenerating(false);
  };

  const handleSaveProduct = () => {
    if (!formData.title || !formData.price || formData.images.length === 0) {
      alert("Incomplete Listing: Every luxury listing requires a Title, Price, and at least one high-definition image.");
      return;
    }
    
    setIsSaving(true);
    setTimeout(() => {
      const newProduct = {
        ...formData,
        id: Date.now().toString(),
        type: activeTab,
        date: new Date().toLocaleDateString()
      };
      setListings([newProduct, ...listings]);
      setFormData({ title: '', location: '', price: '', category: '', amenities: '', description: '', images: [] });
      setIsSaving(false);
      alert("Success: Listing is now live on the marketplace.");
    }, 800);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Security Check: Are you absolutely sure you want to permanently remove this asset from the public marketplace?')) {
      setListings(listings.filter(l => l.id !== id));
    }
  };

  const filteredListings = listings.filter(l => l.type === activeTab);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      <aside className="w-72 bg-[#001F3F] text-white p-8 hidden lg:flex flex-col border-r border-white/5 shadow-2xl sticky top-0 h-screen">
        <div className="mb-16">
            <svg viewBox="0 0 400 150" className="h-12 w-auto mb-4">
                <path d="M50 100 L150 20 L250 100" fill="none" stroke="#D4AF37" strokeWidth="12" />
                <text x="50" y="130" fill="white" fontSize="60" fontWeight="900">MM&GG</text>
            </svg>
            <div className="text-[10px] font-black text-[#D4AF37] tracking-[0.3em] uppercase opacity-70">Executive Command Center</div>
        </div>

        <nav className="flex-grow space-y-4">
          {[
            { id: 'properties', label: 'Real Estate Hub', icon: <Home size={20} /> },
            { id: 'furniture', label: 'Furniture Vault', icon: <ShoppingBag size={20} /> },
            { id: 'paints', label: 'Paint Archives', icon: <Palette size={20} /> },
            { id: 'leads', label: 'Client Inquiries', icon: <Users size={20} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-xs transition-all tracking-widest uppercase ${
                activeTab === item.id 
                ? 'bg-[#006837] text-white shadow-[0_10px_30px_-10px_rgba(0,104,55,0.6)] translate-x-2' 
                : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-10 border-t border-white/5">
            <button 
              onClick={() => { localStorage.removeItem('admin_auth'); navigate('/'); window.location.reload(); }}
              className="group w-full flex items-center gap-4 px-6 py-4 text-red-400 font-black text-xs tracking-widest uppercase hover:bg-red-500/10 rounded-2xl transition-all"
            >
              <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" /> Sign Out
            </button>
        </div>
      </aside>

      <main className="flex-grow p-12 overflow-y-auto max-h-screen scroll-smooth">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <span className="w-3 h-3 rounded-full bg-[#006837] animate-pulse"></span>
               <h1 className="text-4xl font-serif font-black text-[#001F3F] uppercase tracking-tight">Managing {activeTab}</h1>
            </div>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <Check size={14} className="text-[#006837]" /> Connected to Global Marketplace Node
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
          <div className="xl:col-span-8 space-y-8">
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-10 overflow-hidden relative">
              <h2 className="text-2xl font-black text-[#001F3F] mb-10 flex items-center gap-4 border-b border-slate-100 pb-6 uppercase tracking-tight">
                <Plus className="text-[#D4AF37]" size={28} /> Advanced Content Creator
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Product Identification</label>
                  <input type="text" className="w-full bg-[#F8FAFC] border-2 border-transparent rounded-2xl p-5 outline-none focus:border-[#D4AF37] focus:bg-white transition-all font-bold text-slate-800" placeholder="Enter Full Product Title..." value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Valuation (NGN)</label>
                  <div className="relative">
                    <DollarSign size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#006837]" />
                    <input type="number" className="w-full bg-[#F8FAFC] border-2 border-transparent rounded-2xl p-5 pl-12 outline-none focus:border-[#D4AF37] focus:bg-white transition-all font-black text-[#006837] text-xl" placeholder="0.00" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Market Location</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
                    <input type="text" className="w-full bg-[#F8FAFC] border-2 border-transparent rounded-2xl p-5 pl-12 outline-none focus:border-[#D4AF37] focus:bg-white transition-all font-bold text-slate-800" placeholder="Location or Category..." value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                  </div>
                </div>
              </div>

              <div className="mb-10 space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Visual Assets</label>
                <div onClick={() => fileInputRef.current?.click()} className="w-full h-48 border-4 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:border-[#D4AF37]/30 hover:bg-slate-50 transition-all group">
                  <ImageIcon size={48} className="text-slate-200 group-hover:text-[#D4AF37] transition-colors mb-2" />
                  <p className="text-sm font-bold text-slate-400 group-hover:text-[#001F3F]">Select High-Definition photos</p>
                  <input type="file" ref={fileInputRef} hidden multiple accept="image/*" onChange={handleImageUpload} />
                </div>
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mt-6 animate-in fade-in zoom-in">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-lg group">
                        <img src={img} className="w-full h-full object-cover" alt="Upload preview" />
                        <button onClick={(e) => { e.stopPropagation(); removeImage(idx); }} className="absolute inset-0 bg-red-600/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"><X size={20} /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-12">
                <div className="flex justify-between items-center ml-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Asset Description</label>
                  <button onClick={handleAiDescription} disabled={isAiGenerating} className="group text-[10px] font-black text-[#006837] bg-[#006837]/5 px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#006837] hover:text-white transition-all">
                    {isAiGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                    GENERATE LUXURY COPY WITH GEMINI
                  </button>
                </div>
                <textarea rows={6} className="w-full bg-[#F8FAFC] border-2 border-transparent rounded-[2rem] p-8 outline-none focus:border-[#D4AF37] focus:bg-white transition-all font-medium text-slate-600 leading-relaxed italic" placeholder="The AI will craft your description..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>

              <button onClick={handleSaveProduct} disabled={isSaving} className="w-full bg-[#006837] text-white py-6 rounded-[2rem] font-black text-xl shadow-xl hover:bg-[#004d29] hover:-translate-y-1 transition-all flex items-center justify-center gap-4 active:scale-[0.98] disabled:opacity-50">
                {isSaving ? <Loader2 className="animate-spin" /> : <Save size={28} className="text-[#D4AF37]" />}
                FINALIZE & DEPLOY LISTING
              </button>
            </div>
          </div>
          <div className="xl:col-span-4 space-y-10">
             <div className="space-y-6">
               <h2 className="text-xl font-black text-[#001F3F] uppercase tracking-widest ml-4">Deployment History</h2>
               <div className="space-y-4 max-h-[800px] overflow-y-auto pr-4 scrollbar-hide">
                 {filteredListings.length === 0 && <div className="p-12 text-center bg-white rounded-[2rem] border-dashed border-slate-200">No assets deployed.</div>}
                 {filteredListings.map(item => (
                   <div key={item.id} className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex gap-5 group hover:shadow-xl transition-all">
                      <img src={item.images[0]} className="w-24 h-24 rounded-2xl object-cover shadow-md" alt="Preview" />
                      <div className="flex-grow flex flex-col justify-between py-1">
                        <div>
                          <h4 className="font-black text-sm line-clamp-1 uppercase text-[#001F3F]">{item.title}</h4>
                          <p className="text-[10px] font-black text-[#006837] mt-1">₦ {parseInt(item.price).toLocaleString()}</p>
                        </div>
                        <div className="flex gap-3 mt-4">
                          <button onClick={() => handleDelete(item.id)} className="flex-grow py-2.5 bg-[#F8FAFC] rounded-xl hover:bg-red-50 text-red-600 transition-colors flex justify-center"><Trash2 size={16} /></button>
                        </div>
                      </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
