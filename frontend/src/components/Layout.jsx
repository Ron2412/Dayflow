import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Clock,
  Calendar,
  LogOut,
  DollarSign,
  Settings,
  Search,
  Bell,
  ChevronRight,
  UserPlus,
  Key
} from 'lucide-react';

const NavLink = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group ${active
      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
      : 'text-slate-500 hover:bg-blue-50 hover:text-blue-600'
      }`}
  >
    <div className="flex items-center gap-3 font-bold text-[15px]">
      <span className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'} transition-colors`}>
        {icon}
      </span>
      {label}
    </div>
    {active && <ChevronRight size={16} />}
  </Link>
);

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useAuth();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-slate-100 hidden lg:flex flex-col p-6 pr-4">
        <div className="flex items-center gap-3 px-4 mb-10">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Clock size={24} strokeWidth={3} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Dayflow</h1>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
          <div className="px-4 mb-4 text-[11px] font-black text-slate-400 uppercase tracking-[2px]">Core</div>
          <NavLink to="/dashboard" label="Dashboard" icon={<LayoutDashboard size={20} />} active={location.pathname === '/dashboard'} />
          <NavLink to="/attendance" label="Attendance" icon={<Clock size={20} />} active={location.pathname === '/attendance'} />
          <NavLink to="/leaves" label="Leaves" icon={<Calendar size={20} />} active={location.pathname === '/leaves'} />

          {profile?.role === 'hr' && (
            <>
              <div className="px-4 mt-10 mb-4 text-[11px] font-black text-slate-400 uppercase tracking-[2px]">Onboarding</div>
              <NavLink to="/admin/add-employee" label="Add Employee" icon={<UserPlus size={20} />} active={location.pathname === '/admin/add-employee'} />
            </>
          )}

          <div className="px-4 mt-10 mb-4 text-[11px] font-black text-slate-400 uppercase tracking-[2px]">Management</div>
          <NavLink to="/payroll" label="Payroll & Salary" icon={<DollarSign size={20} />} active={location.pathname === '/payroll'} />
          <NavLink to="/employees" label="Employees" icon={<Users size={20} />} active={location.pathname === '/employees'} />
          <NavLink to="/settings/password" label="Security" icon={<Key size={20} />} active={location.pathname === '/settings/password'} />
          <NavLink to="/settings" label="Settings" icon={<Settings size={20} />} active={location.pathname === '/settings'} />
        </nav>

        <div className="mt-auto px-2">
          <div className="bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden group mb-6">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-blue-600/30 transition-all"></div>
            <p className="text-xs font-bold text-slate-400 mb-1">Upgrade to Pro</p>
            <h4 className="text-sm font-black mb-4 leading-snug">Get advanced payroll analytics today.</h4>
            <button className="text-[11px] font-black bg-white text-slate-900 px-4 py-2 rounded-lg hover:scale-105 transition-transform uppercase">Learn More</button>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-6 py-4 text-slate-500 font-bold rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        <header className="h-24 bg-white/60 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-10">
          <div className="relative w-96 group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-12 pr-4 py-3 bg-slate-100/50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all font-medium text-slate-800"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-500 hover:text-blue-600 hover:border-blue-100 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-10 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-900">{profile?.full_name || 'User'}</p>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{profile?.role === 'hr' ? 'HR Administrator' : 'Staff Member'}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 border-4 border-white shadow-xl flex items-center justify-center text-white font-black text-lg">
                {profile?.full_name ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
              </div>
            </div>
          </div>
        </header>

        <div className="p-10 max-w-[1600px] mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
