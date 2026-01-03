import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import {
  Users,
  Clock,
  Calendar,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  User,
  Power,
  Settings as SettingsIcon,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, signOut } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [status, setStatus] = useState('absent'); // 'present' or 'absent'

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  const navItems = [
    { label: 'Employees', path: '/dashboard', icon: <Users size={18} /> },
    { label: 'Attendance', path: '/attendance', icon: <Clock size={18} /> },
    { label: 'Time Off', path: '/leaves', icon: <Calendar size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="h-14 bg-[#714B67] text-white flex items-center justify-between px-4 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-6 h-full">
          {/* Logo / Home */}
          <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Clock size={20} strokeWidth={3} className="text-white" />
            </div>
            <span className="font-black text-lg tracking-tight">Dayflow</span>
          </Link>

          {/* Navigation Tabs */}
          <nav className="flex items-center h-full">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 h-full text-sm font-bold transition-colors hover:bg-white/10 ${location.pathname === item.path ? 'bg-white/20 border-b-2 border-white' : 'text-white/80'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative w-64 hidden md:block">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-white/10 border-none rounded-md py-1.5 pl-10 pr-4 text-sm text-white placeholder-white/50 focus:bg-white focus:text-slate-900 focus:placeholder-slate-400 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Attendance Indicator */}
            <button
              onClick={() => setStatus(status === 'present' ? 'absent' : 'present')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${status === 'present' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
            >
              <div className={`w-2 h-2 rounded-full ${status === 'present' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></div>
              {status === 'present' ? 'Checked IN' : 'Checked Out'}
            </button>

            <button className="p-2 hover:bg-white/10 rounded-lg text-white/80 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-blue-400 rounded-full border-2 border-[#714B67]"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 pl-2 pr-1 py-1 hover:bg-white/10 rounded-lg transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/20">
                  {profile?.avatar ? (
                    <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-blue-500 flex items-center justify-center text-[10px] font-black uppercase">
                      {profile?.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </div>
                  )}
                </div>
                <ChevronDown size={14} className={`text-white/60 group-hover:text-white transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
              </button>

              {showProfileMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowProfileMenu(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-slate-100 mb-2">
                      <p className="text-sm font-black text-slate-900">{profile?.full_name}</p>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">{profile?.role === 'hr' ? 'HR Administrator' : 'Staff Member'}</p>
                    </div>

                    <button
                      onClick={() => {
                        navigate('/profile');
                        setShowProfileMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-[#714B67] transition-colors"
                    >
                      <User size={18} /> My Profile
                    </button>
                    <div className="h-px bg-slate-100 my-2 mx-4"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Power size={18} /> Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-4 md:p-8 max-w-[1920px] mx-auto w-full">
        <Outlet />
      </main>

      {/* Check-in Systray Overlay (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 group">
        <div className="bg-white p-4 rounded-3xl shadow-2xl border border-slate-100 flex flex-col gap-4 w-64 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-slate-900">Live Attendance</span>
            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${status === 'present' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
              {status}
            </span>
          </div>
          <div className="text-xs font-bold text-slate-500 leading-relaxed italic border-l-4 border-blue-500 pl-3 py-1 bg-slate-50 rounded-r-lg">
            {status === 'present' ? "You checked in at 09:00 AM. Have a productive day!" : "You haven't checked in yet. Don't forget to punch in!"}
          </div>
          <button
            onClick={() => setStatus(status === 'present' ? 'absent' : 'present')}
            className={`w-full py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${status === 'present' ? 'bg-red-500 text-white shadow-lg shadow-red-200 hover:bg-red-600' : 'bg-emerald-500 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-600'
              }`}
          >
            {status === 'present' ? <><XCircle size={18} /> Check Out</> : <><CheckCircle2 size={18} /> Check IN</>}
          </button>
        </div>
        <button
          className={`w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center transition-all ${status === 'present' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
            }`}
        >
          <Clock size={28} />
        </button>
      </div>
    </div>
  );
};

export default Layout;
