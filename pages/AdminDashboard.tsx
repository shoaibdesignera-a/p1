
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save, Sparkles, Loader2, Image as ImageIcon } from 'lucide-react';
import { generateDescription } from '../services/geminiService.ts';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('properties');
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState<any[]>([]);
  const [form, setForm] = useState({ title: '', location: '', price: '', description: '', images: [] as string[] });

  useEffect(() => {
    if (localStorage.getItem('admin_auth') !== 'true') navigate('/');
    const saved = localStorage.getItem('mmgg_listings');
    setListings(saved ? JSON.parse(saved) : []);
  }, [navigate]);

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({...form, images: [reader.result as string]});
      reader.readAsDataURL(file);
    }
  };

  const save = () => {
    const newList = [{...form, id: Date.now().toString(), type: activeTab}, ...listings];
    localStorage.setItem('mmgg_listings', JSON.stringify(newList));
    setListings(newList);
    setForm({ title: '', location: '', price: '', description: '', images: [] });
    alert('Asset deployed successfully.');
  };

  const handleAI = async () => {
    setLoading(true);
    const desc = await generateDescription(form);
    setForm({...form, description: desc});
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl">
            <div className="flex gap-4 mb-10">
              {['properties', 'furniture', 'paints'].map(t => (
                <button key={t} onClick={() => setActiveTab(t)} className={`flex-grow py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === t ? 'bg-[#006837] text-white' : 'bg-slate-100 text-slate-400'}`}>{t}</button>
              ))}
            </div>
            <div className="space-y-6">
              <input type="text" placeholder="Title" className="w-full bg-slate-50 p-5 rounded-2xl outline-none border border-transparent focus:border-[#D4AF37]" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
              <input type="text" placeholder="Location" className="w-full bg-slate-50 p-5 rounded-2xl outline-none border border-transparent focus:border-[#D4AF37]" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
              <input type="number" placeholder="Price (NGN)" className="w-full bg-slate-50 p-5 rounded-2xl outline-none border border-transparent focus:border-[#D4AF37]" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
              <div className="relative">
                <textarea placeholder="Description" rows={6} className="w-full bg-slate-50 p-5 rounded-2xl outline-none border border-transparent focus:border-[#D4AF37]" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                <button onClick={handleAI} disabled={loading} className="absolute bottom-4 right-4 bg-[#001F3F] text-white px-4 py-2 rounded-full text-[10px] font-black flex items-center gap-2">
                  {loading ? <Loader2 className="animate-spin"/> : <Sparkles size={14}/>} AI GENERATE
                </button>
              </div>
              <div className="border-4 border-dashed border-slate-100 p-10 rounded-[2rem] text-center">
                <input type="file" onChange={handleImage} hidden id="imgIn" />
                <label htmlFor="imgIn" className="cursor-pointer flex flex-col items-center gap-2">
                  <ImageIcon className="text-slate-300" size={48} />
                  <span className="text-[10px] font-black text-slate-400 uppercase">Upload Asset Media</span>
                </label>
                {form.images[0] && <img src={form.images[0]} className="mt-4 w-32 h-32 object-cover rounded-xl mx-auto" />}
              </div>
              <button onClick={save} className="w-full bg-[#006837] text-white py-6 rounded-[2rem] font-black text-xl hover:bg-[#001F3F] transition-all">DEPLOY LISTING</button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-xl font-serif font-black uppercase text-[#001F3F]">Active Inventory</h2>
          {listings.filter(l => l.type === activeTab).map(l => (
            <div key={l.id} className="bg-white p-4 rounded-2xl flex items-center gap-4 shadow-sm border border-slate-100">
              <img src={l.images[0]} className="w-16 h-16 rounded-xl object-cover" />
              <div className="flex-grow">
                <h4 className="text-[10px] font-black uppercase line-clamp-1">{l.title}</h4>
                <p className="text-[9px] text-[#006837] font-black">₦ {parseInt(l.price).toLocaleString()}</p>
              </div>
              <button onClick={() => {
                const updated = listings.filter(i => i.id !== l.id);
                setListings(updated);
                localStorage.setItem('mmgg_listings', JSON.stringify(updated));
              }} className="text-red-400 p-2"><Trash2 size={16}/></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
