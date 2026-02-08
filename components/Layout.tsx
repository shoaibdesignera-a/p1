
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ShieldCheck, Lock, User, LogOut, Instagram } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [creds, setCreds] = useState({ user: '', pass: '' });
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = localStorage.getItem('admin_auth') === 'true';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (creds.user === 'mmgg' && creds.pass === 'mm&gg') {
      localStorage.setItem('admin_auth', 'true');
      setShowLogin(false);
      navigate('/admin');
      window.location.reload();
    } else {
      alert('Security violation: Incorrect credentials.');
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_auth');
    navigate('/');
    window.location.reload();
  };

  // Close menu on navigation
  useEffect(() => setIsMenuOpen(false), [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-[#006837] text-white py-4 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex flex-col group">
            <span className="text-3xl font-serif font-black tracking-tighter group-hover:text-[#D4AF37] transition-colors">MM&GG</span>
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">Real Estate & Property</span>
          </Link>

          <nav className="hidden md:flex gap-10 items-center">
            {['Properties', 'Furniture', 'Paints'].map((item) => (
              <Link 
                key={item} 
                to={`/${item.toLowerCase()}`} 
                className={`text-[10px] font-black uppercase tracking-widest hover:text-[#D4AF37] transition-all ${location.pathname.includes(item.toLowerCase()) ? 'text-[#D4AF37]' : ''}`}
              >
                {item}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">
                Admin Portal
              </Link>
            )}
            <a href="https://wa.me/2348136190811" className="bg-[#D4AF37] text-[#001F3F] px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg">
              Enquire Now
            </a>
          </nav>

          <button className="md:hidden text-[#D4AF37]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#001F3F] border-t border-white/5 p-8 flex flex-col gap-6 md:hidden animate-slide-up">
            {['Properties', 'Furniture', 'Paints'].map((item) => (
              <Link key={item} to={`/${item.toLowerCase()}`} className="text-sm font-black uppercase tracking-widest border-b border-white/5 pb-4">
                {item}
              </Link>
            ))}
            {isAdmin && <Link to="/admin" className="text-sm font-black uppercase text-[#D4AF37]">Admin Portal</Link>}
            <a href="https://wa.me/2348136190811" className="bg-[#006837] text-white p-4 rounded-xl text-center text-xs font-black uppercase">WhatsApp Contact</a>
          </div>
        )}
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-[#001F3F] text-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2 space-y-8">
            <span className="text-4xl font-serif font-black">MM&GG</span>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed italic">
              "Establishing global presence through excellence in Nigerian real estate development and premium artisanal finishing."
            </p>
            <div className="flex gap-4">
               <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-[#D4AF37] hover:text-[#001F3F] transition-all"><Instagram size={18}/></a>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest">Contact Headquarters</h4>
            <div className="text-xs space-y-4 text-slate-400 font-medium">
              <p>Ikeja GRA, Lagos, Nigeria</p>
              <p>+234 813 619 0811</p>
              <p>info@mmggrealestate.com</p>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest">Secure Access</h4>
            {isAdmin ? (
              <button onClick={logout} className="flex items-center gap-2 text-red-400 text-xs font-black uppercase hover:underline">
                <LogOut size={14}/> Sign Out of System
              </button>
            ) : (
              <button onClick={() => setShowLogin(true)} className="flex items-center gap-2 text-slate-500 text-xs font-black uppercase hover:text-white transition-colors">
                <Lock size={14}/> Internal Portal Login
              </button>
            )}
            
            {showLogin && !isAdmin && (
              <form onSubmit={handleLogin} className="mt-4 p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3 animate-slide-up">
                <input 
                  type="text" 
                  placeholder="ID" 
                  className="w-full bg-transparent border border-white/20 p-3 text-xs rounded-xl"
                  value={creds.user}
                  onChange={e => setCreds({...creds, user: e.target.value})}
                />
                <input 
                  type="password" 
                  placeholder="Key" 
                  className="w-full bg-transparent border border-white/20 p-3 text-xs rounded-xl"
                  value={creds.pass}
                  onChange={e => setCreds({...creds, pass: e.target.value})}
                />
                <button className="w-full bg-[#D4AF37] text-[#001F3F] py-3 rounded-xl text-[10px] font-black uppercase tracking-widest">Authorize</button>
              </form>
            )}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-[8px] font-black uppercase tracking-[0.3em] text-slate-600">
          &copy; {new Date().getFullYear()} MM&GG Real Estate and Property Ltd. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
