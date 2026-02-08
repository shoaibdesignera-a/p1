
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Mail, Instagram, MessageCircle, Lock, User, MapPin } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [creds, setCreds] = useState({ u: '', p: '' });
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (creds.u === 'mmgg' && creds.p === 'mm&gg') {
      localStorage.setItem('admin_auth', 'true');
      setShowLogin(false);
      navigate('/admin');
    } else {
      alert('Unauthorized');
    }
  };

  const isAdmin = localStorage.getItem('admin_auth') === 'true';

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-[#006837] text-white py-4 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex flex-col">
            <span className="text-3xl font-serif font-black tracking-tighter">MM&GG</span>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">Real Estate & Property</span>
          </Link>
          <nav className="hidden md:flex gap-10 items-center">
            {['Properties', 'Furniture', 'Paints'].map(l => (
              <Link key={l} to={`/${l.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-widest hover:text-[#D4AF37] transition-colors">{l}</Link>
            ))}
            {isAdmin && <Link to="/admin" className="text-[10px] font-black text-[#D4AF37] bg-white/10 px-4 py-2 rounded-full">ADMIN</Link>}
            <a href="https://wa.me/2348136190811" className="bg-[#D4AF37] text-[#001F3F] px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">Enquire</a>
          </nav>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-[#001F3F] text-white pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <span className="text-3xl font-serif font-black">MM&GG</span>
            <p className="text-slate-400 text-xs leading-relaxed">Redefining Nigerian luxury through exceptional developments and artisanal finishings.</p>
          </div>
          <div>
            <h4 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest mb-6">Contact</h4>
            <div className="text-xs space-y-4 text-slate-300">
              <p className="flex items-center gap-2"><MapPin size={14} /> Ikeja GRA, Lagos, Nigeria</p>
              <p className="flex items-center gap-2"><Phone size={14} /> +234 813 619 0811</p>
            </div>
          </div>
          <div>
            <h4 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest mb-6">Admin</h4>
            {isAdmin ? (
              <button onClick={() => { localStorage.removeItem('admin_auth'); navigate('/'); window.location.reload(); }} className="text-xs text-red-400 font-bold uppercase underline">Exit Portal</button>
            ) : (
              <button onClick={() => setShowLogin(true)} className="text-xs text-slate-400 font-bold uppercase flex items-center gap-2"><Lock size={12}/> Secure Login</button>
            )}
            {showLogin && (
              <form onSubmit={handleLogin} className="mt-4 space-y-2 bg-white/5 p-4 rounded-xl border border-white/10">
                <input type="text" placeholder="ID" className="w-full bg-transparent border border-white/20 p-2 text-xs rounded" value={creds.u} onChange={e => setCreds({...creds, u: e.target.value})} />
                <input type="password" placeholder="KEY" className="w-full bg-transparent border border-white/20 p-2 text-xs rounded" value={creds.p} onChange={e => setCreds({...creds, p: e.target.value})} />
                <button className="w-full bg-[#D4AF37] text-[#001F3F] p-2 text-[10px] font-black rounded">ENTER</button>
              </form>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
