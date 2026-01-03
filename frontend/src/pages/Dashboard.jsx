import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { EMPLOYEES, MOCK_ATTENDANCE, MOCK_LEAVES } from '../lib/mockData';
import { SearchSlash, Plane, Circle, MoreHorizontal, Mail, Phone, MapPin, X, Calendar, User, Clock, Award, ArrowUpRight, Users } from 'lucide-react';

const EmployeeCard = ({ employee, indicatorStatus, onClick }) => (
  <div
    onClick={() => onClick(employee)}
    className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all group relative cursor-pointer"
  >
    {/* Status Indicator */}
    <div className="absolute top-6 right-6 z-10">
      {indicatorStatus === 'present' && (
        <div className="flex items-center justify-center w-8 h-8 bg-emerald-100 rounded-full text-emerald-600 shadow-sm animate-pulse" title="Present">
          <Circle size={12} fill="currentColor" />
        </div>
      )}
      {indicatorStatus === 'on-leave' && (
        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-blue-600 shadow-sm" title="On Leave">
          <Plane size={16} />
        </div>
      )}
      {indicatorStatus === 'absent' && (
        <div className="flex items-center justify-center w-8 h-8 bg-amber-100 rounded-full text-amber-500 shadow-sm" title="Absent">
          <Circle size={12} fill="currentColor" />
        </div>
      )}
    </div>

    <div className="flex items-start justify-between mb-6">
      <div className="relative">
        {employee.avatar ? (
          <img
            src={employee.avatar}
            alt={employee.full_name}
            className="w-16 h-16 rounded-3xl object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border-4 border-white shadow-sm flex items-center justify-center text-blue-600 font-black text-xl group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-500">
            {employee?.full_name?.split(' ')?.map(n => n[0]).join('') || '??'}
          </div>
        )}
      </div>
    </div>

    <div className="mb-6">
      <h3 className="text-lg font-black text-slate-900 leading-tight mb-1">{employee.full_name}</h3>
      <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">{employee.designation}</p>
    </div>

    <div className="space-y-3 pt-6 border-t border-slate-50">
      <div className="flex items-center gap-3 text-slate-500">
        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><Mail size={14} /></div>
        <span className="text-xs font-bold overflow-hidden text-ellipsis whitespace-nowrap">{employee.email}</span>
      </div>
      <div className="flex items-center gap-3 text-slate-500">
        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><Phone size={14} /></div>
        <span className="text-xs font-bold">{employee.employee_id}</span>
      </div>
      <div className="flex items-center gap-3 text-slate-500">
        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><MapPin size={14} /></div>
        <span className="text-xs font-bold uppercase tracking-wider">{employee.department}</span>
      </div>
    </div>
  </div>
);

const EmployeeProfileModal = ({ employee, onClose }) => {
  if (!employee) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="h-32 bg-gradient-to-r from-[#714B67] to-[#45273D]"></div>

        <div className="px-10 pb-10">
          <div className="relative -mt-16 mb-6">
            {employee.avatar ? (
              <img src={employee.avatar} alt="" className="w-32 h-32 rounded-[2rem] border-8 border-white shadow-xl object-cover" />
            ) : (
              <div className="w-32 h-32 rounded-[2rem] border-8 border-white shadow-xl bg-blue-500 flex items-center justify-center text-white text-4xl font-black">
                {employee.full_name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900 mb-1">{employee.full_name}</h2>
            <p className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs">{employee.designation}</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Personal Info</label>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                    <Mail size={16} className="text-slate-300" /> {employee.email}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                    <Phone size={16} className="text-slate-300" /> {employee.employee_id}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Organization</label>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                    <MapPin size={16} className="text-slate-300" /> {employee.department}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                    <Calendar size={16} className="text-slate-300" /> Joined {employee.join_date}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100 flex justify-between items-center">
            <span className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
              Read-Only Profile
            </span>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { profile } = useAuth();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const isAdmin = profile?.role === 'hr';

  const StaffDashboard = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome back, {profile?.full_name?.split(' ')[0]}!</h1>
        <p className="text-slate-500 font-bold italic">Here's a quick look at your workspace today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <QuickCard
          label="My Profile"
          sub="View & Edit Details"
          icon={<User size={24} className="text-blue-600" />}
          path="/profile"
          color="bg-blue-50 border-blue-100"
        />
        <QuickCard
          label="Attendance"
          sub="History & Tracking"
          icon={<Clock size={24} className="text-emerald-600" />}
          path="/attendance"
          color="bg-emerald-50 border-emerald-100"
        />
        <QuickCard
          label="Time Off"
          sub="Requests & Balance"
          icon={<Calendar size={24} className="text-rose-600" />}
          path="/leaves"
          color="bg-rose-50 border-rose-100"
        />
        <QuickCard
          label="Log Out"
          sub="End Session"
          icon={<Power size={24} className="text-slate-600" />}
          path="/login"
          color="bg-slate-100 border-slate-200"
          isLogout
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-6">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">Recent Activity</h3>
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 space-y-6">
            <ActivityItem
              icon={<CheckCircle2 size={16} className="text-emerald-500" />}
              text="Attendance verified for Oct 22"
              time="2 hours ago"
            />
            <ActivityItem
              icon={<Clock size={16} className="text-blue-500" />}
              text="Checked in at 09:00 AM"
              time="4 hours ago"
            />
            <ActivityItem
              icon={<Award size={16} className="text-amber-500" />}
              text="New Skill 'React Architecture' added to profile"
              time="3 hours ago"
            />
            <ActivityItem
              icon={<Plane size={16} className="text-rose-500" />}
              text="Leave request 'Sick Leave' pending approval"
              time="Yesterday"
            />
            <ActivityItem
              icon={<User size={16} className="text-purple-500" />}
              text="Profile information updated"
              time="Oct 20, 2025"
            />
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">Announcements</h3>
          <div className="bg-[#714B67] text-white rounded-[2.5rem] p-8 shadow-xl shadow-[#714B67]/20 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <p className="text-xs font-black uppercase tracking-widest text-[#d5c3d0] mb-2">Company Update</p>
            <h4 className="text-lg font-bold leading-tight mb-4">New Holiday Policy updated for 2026.</h4>
            <button className="text-[10px] font-black uppercase tracking-widest underline decoration-2 underline-offset-4 hover:text-[#d5c3d0] transition-colors">Read More</button>
          </div>
        </div>
      </div>
    </div>
  );

  const AdminDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-[#714B67] to-[#5a3c52] p-8 rounded-[2.5rem] text-white shadow-2xl shadow-[#714B67]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2 tracking-tight">Admin Console</h2>
          <p className="text-white/70 font-bold max-w-md">Manage your team, track attendance, and oversee time-off requests.</p>
        </div>
        <div className="mt-8 flex gap-4">
          <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-3 group hover:bg-white/20 transition-all cursor-pointer">
            <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-400/20">
              <Plane size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-white/50">Alert</p>
              <p className="text-sm font-black">2 Pending Approvals</p>
            </div>
            <ArrowUpRight size={16} className="text-white/30 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-slate-800 tracking-tight">Staff Directory</h3>
        <div className="flex gap-2">
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <Users size={14} /> Total: {EMPLOYEES.length}
          </div>
          <Link to="/admin/add-employee" className="px-6 py-2.5 bg-[#714B67] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-purple-100 hover:bg-[#5a3c52] transition-all">
            + New Employee
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        {EMPLOYEES.map(emp => {
          let indicatorStatus = 'absent';
          const isPresent = MOCK_ATTENDANCE.some(a => a.user_id === emp.id);
          const onLeave = MOCK_LEAVES.some(l => l.user_id === emp.id && l.status === 'approved');

          if (isPresent) indicatorStatus = 'present';
          else if (onLeave) indicatorStatus = 'on-leave';

          return (
            <EmployeeCard
              key={emp.id}
              employee={emp}
              indicatorStatus={indicatorStatus}
              onClick={setSelectedEmployee}
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="pb-12">
      {isAdmin ? <AdminDashboard /> : <StaffDashboard />}

      <EmployeeProfileModal
        employee={selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
      />
    </div>
  );
};

// Sub-components
import { Power, CheckCircle2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const QuickCard = ({ label, sub, icon, path, color, isLogout }) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleClick = () => {
    if (isLogout) signOut();
    navigate(path);
  };

  return (
    <button
      onClick={handleClick}
      className={`p-6 rounded-[2.5rem] border ${color} shadow-sm group hover:shadow-md hover:scale-[1.02] transition-all text-left flex flex-col gap-4`}
    >
      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:rotate-6 transition-transform">
        {icon}
      </div>
      <div>
        <h3 className="font-black text-slate-900 tracking-tight">{label}</h3>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sub}</p>
      </div>
    </button>
  );
};

const ActivityItem = ({ icon, text, time }) => (
  <div className="flex items-center justify-between group">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors">
        {icon}
      </div>
      <span className="text-sm font-bold text-slate-700">{text}</span>
    </div>
    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{time}</span>
  </div>
);

export default Dashboard;
