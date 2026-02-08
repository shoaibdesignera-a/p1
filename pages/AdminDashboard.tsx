
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save, Sparkles, Loader2, Image as ImageIcon, LayoutGrid, List } from 'lucide-react';
import { generateDescription } from '../services/geminiService.ts';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('properties');
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [listings, setListings] = useState<any[]>([]);
  const [form, setForm] = useState({ 
    title: '', 
    location: '', 
    price: '', 
    description: '', 
    images: [] as string[] 
  });

  useEffect(() => {
    if (localStorage.getItem('admin_auth') !== 'true') navigate('/');
    const saved = localStorage.getItem('mmgg_listings');
    setListings(saved ? JSON.parse(saved) : []);
  }, [navigate]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, images: [reader.result as string] }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProduct = () => {
    if (!form.title || !form.price || form.images.length === 0) {
      alert("Executive Note: All listings require a Title, Valuation, and Primary Media.");
      return;
    }
    
    setIsSaving(true);
    setTimeout(() => {
      const newList = [{ 
        ...form, 
        id: Date.now().toString(), 
        type: activeTab,
        date: new Date().toISOString()
      }, ...listings];
      
      localStorage.setItem('mmgg_listings', JSON.stringify(newList));
      setListings(newList);
      setForm({ title: '', location: '', price: '', description: '', images: [] });
      setIsSaving(false);
      alert('Asset successfully deployed to the global marketplace.');
    }, 600);
  };

  const deleteListing = (id: string) => {
    if (window.confirm("Permanent Action: Are you sure you want to decommission this asset?")) {
      const updated = listings.filter(l => l.id !== id);
      setListings(updated);
      localStorage.setItem('mmgg_listings', JSON.stringify(updated));
    }
  };

  const handleAICopy = async () => {
    if (!form.title) {
      alert("Please provide a product title for the AI to analyze.");
      return;
    }
    setLoading(true);
    const desc = await generateDescription({ ...form, type: activeTab });
    setForm(prev => ({ ...prev, description: desc || "An exclusive masterpiece." }));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-serif font-black text-[#001F3F] uppercase tracking-tighter">Executive Command</h1>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#006837] animate-pulse"></span>
              Synchronized with Live Marketplace Node
            </p>
          </div>
          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
             {['properties', 'furniture', 'paints'].map(t => (
                <button 
                  key={t} 
                  onClick={() => setActiveTab(t)} 
                  className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === t ? 'bg-[#006837] text-white shadow-lg' : 'text-slate-400 hover:text-[#001F3F]'}`}
                >
                  {t}
                </button>
             ))}
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
          {/* Creator */}
          <div className="xl:col-span-7">
            <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-[5rem]"></div>
              
              <h2 className="text-2xl font-serif font-black text-[#001F3F] mb-10 flex items-center gap-4 uppercase">
                <Plus className="text-[#D4AF37]" size={28}/> Deploy New Asset
              </h2>
              
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Product Designation</label>
                    <input type="text" placeholder="e.g. Royal Eko Estate" className="w-full bg-[#F8FAFC] p-5 rounded-2xl outline-none border-2 border-transparent focus:border-[#D4AF37] transition-all font-bold" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Asset Valuation (NGN)</label>
                    <input type="number" placeholder="450,000,000" className="w-full bg-[#F8FAFC] p-5 rounded-2xl outline-none border-2 border-transparent focus:border-[#006837] transition-all font-black text-[#006837] text-xl" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Logistical Location</label>
                  <input type="text" placeholder="Ikoyi, Lagos" className="w-full bg-[#F8FAFC] p-5 rounded-2xl outline-none border-2 border-transparent focus:border-[#D4AF37] transition-all font-bold" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
                </div>

                <div className="space-y-2 relative">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Narrative Description</label>
                  <textarea rows={6} placeholder="Craft a compelling story for this asset..." className="w-full bg-[#F8FAFC] p-6 rounded-3xl outline-none border-2 border-transparent focus:border-[#D4AF37] transition-all font-medium italic text-slate-600 leading-relaxed" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                  <button 
                    onClick={handleAICopy} 
                    disabled={loading}
                    className="absolute bottom-4 right-4 bg-[#001F3F] text-white px-6 py-3 rounded-full text-[9px] font-black flex items-center gap-2 hover:bg-[#006837] transition-all shadow-xl disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin" size={14}/> : <Sparkles size={14} className="text-[#D4AF37]"/>}
                    GEMINI AI ASSIST
                  </button>
                </div>

                <div className="border-4 border-dashed border-slate-50 p-12 rounded-[3rem] text-center group hover:border-[#D4AF37]/30 transition-all cursor-pointer bg-slate-50/50">
                  <input type="file" id="mediaUpload" hidden onChange={handleImage} accept="image/*" />
                  <label htmlFor="mediaUpload" className="cursor-pointer flex flex-col items-center gap-4">
                    <div className="p-5 bg-white rounded-full shadow-lg text-slate-300 group-hover:text-[#D4AF37] transition-colors">
                      <ImageIcon size={48} />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inject Primary Asset Media</span>
                  </label>
                  {form.images[0] && (
                    <div className="mt-8 relative inline-block group">
                      <img src={form.images[0]} className="w-48 h-48 object-cover rounded-[2rem] shadow-2xl border-4 border-white" />
                      <button onClick={() => setForm({...form, images: []})} className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full shadow-lg"><Trash2 size={16}/></button>
                    </div>
                  )}
                </div>

                <button 
                  onClick={saveProduct} 
                  disabled={isSaving}
                  className="w-full bg-[#006837] text-white py-8 rounded-[2.5rem] font-black text-xl hover:bg-[#001F3F] transition-all shadow-2xl flex items-center justify-center gap-4 active:scale-[0.98] disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="animate-spin"/> : <Save size={28} className="text-[#D4AF37]"/>}
                  FINALIZE & DEPLOY TO MARKET
                </button>
              </div>
            </div>
          </div>

          {/* List */}
          <div className="xl:col-span-5 space-y-8">
            <h2 className="text-xl font-serif font-black uppercase text-[#001F3F] ml-4 flex items-center gap-3">
              <LayoutGrid size={20} className="text-[#D4AF37]"/> Active Portfolio
            </h2>
            <div className="space-y-6 max-h-[1000px] overflow-y-auto pr-4 scrollbar-hide">
              {listings.filter(l => l.type === activeTab).length === 0 ? (
                <div className="p-20 text-center bg-white rounded-[3rem] border border-slate-50 text-slate-400 font-bold uppercase text-xs tracking-widest italic">
                  No active listings in this sector.
                </div>
              ) : (
                listings.filter(l => l.type === activeTab).map(l => (
                  <div key={l.id} className="bg-white p-6 rounded-[2.5rem] flex items-center gap-6 shadow-sm hover:shadow-xl transition-all border border-slate-50 group">
                    <img src={l.images[0]} className="w-24 h-24 rounded-2xl object-cover shadow-inner" />
                    <div className="flex-grow">
                      <h4 className="text-[11px] font-black uppercase text-[#001F3F] group-hover:text-[#006837] transition-colors line-clamp-1">{l.title}</h4>
                      <p className="text-[10px] text-[#006837] font-black mt-1">₦ {parseInt(l.price).toLocaleString()}</p>
                      <p className="text-[9px] text-slate-400 font-bold mt-2 uppercase flex items-center gap-1">
                        <ImageIcon size={10}/> 1 Visual Asset Deployed
                      </p>
                    </div>
                    <button 
                      onClick={() => deleteListing(l.id)} 
                      className="p-4 text-red-100 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                    >
                      <Trash2 size={20}/>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
