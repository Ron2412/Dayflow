import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    Search,
    ChevronLeft,
    ChevronRight,
    Calendar,
    Clock,
    User,
    ArrowUpRight,
    Filter
} from 'lucide-react';
import { EMPLOYEES, MOCK_ATTENDANCE } from '../lib/mockData';

const Attendance = () => {
    const { profile } = useAuth();
    const isAdmin = profile?.role === 'hr';
    const [viewMode, setViewMode] = useState(isAdmin ? 'admin' : 'user');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [searchQuery, setSearchQuery] = useState('');

    // Admin View Sub-component
    const AdminView = () => (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Control Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="flex bg-slate-100 rounded-lg p-1">
                        <button className="p-2 hover:bg-white rounded-md transition-all shadow-sm"><ChevronLeft size={18} /></button>
                        <button className="p-2 hover:bg-white rounded-md transition-all shadow-sm"><ChevronRight size={18} /></button>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                        <Calendar size={16} className="text-slate-500" />
                        <span className="text-sm font-black text-slate-700">22, October 2025</span>
                        <ChevronDown size={14} className="text-slate-400" />
                    </div>
                    <button className="px-4 py-2 text-sm font-black text-[#714B67] hover:bg-[#714B67]/5 rounded-lg transition-colors border border-transparent hover:border-[#714B67]/10">Today</button>
                </div>

                <div className="relative flex-1 max-w-md">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search employee..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm font-bold focus:bg-white focus:ring-2 focus:ring-[#714B67]/10 outline-none transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Attendance Table */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-400">Employee</th>
                            <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-400">Check In</th>
                            <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-400">Check Out</th>
                            <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-400">Work Hours</th>
                            <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-400">Extra Hours</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {EMPLOYEES.slice(0, 5).map((emp, idx) => (
                            <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                                            <img src={emp.avatar} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-sm font-black text-slate-800">{emp.full_name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm font-bold text-slate-600 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg">09:00 AM</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm font-bold text-slate-600 bg-amber-50 text-amber-700 px-3 py-1 rounded-lg">06:00 PM</span>
                                </td>
                                <td className="px-6 py-4 text-sm font-black text-slate-700">09:00</td>
                                <td className="px-6 py-4 text-sm font-black text-blue-600">+01:00</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    // User View Sub-component
    const UserView = () => (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header & Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                <div className="lg:col-span-4 space-y-4">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Attendance History</h2>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm cursor-pointer hover:border-[#714B67] transition-all">
                            <Calendar size={16} className="text-[#714B67]" />
                            <span className="text-sm font-black text-slate-700">October 2025</span>
                            <ChevronDown size={14} className="text-slate-400" />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard label="Days Present" value="18" sub="Days" icon={<Clock size={20} className="text-emerald-500" />} />
                    <StatCard label="Leaves Count" value="02" sub="Days" icon={<Calendar size={20} className="text-rose-500" />} />
                    <StatCard label="Total Working" value="20" sub="Days" icon={<User size={20} className="text-blue-500" />} />
                </div>
            </div>

            {/* Monthly History Table */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Date</th>
                            <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Check In</th>
                            <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Check Out</th>
                            <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Work Hours</th>
                            <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400 text-right">Extra Hours</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {[28, 29, 30, 31].map((day) => (
                            <tr key={day} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-8 py-4">
                                    <span className="text-sm font-black text-slate-800">{day}, October 2025</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                                        <span className="text-sm font-bold text-slate-600">09:00 AM</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                                        <span className="text-sm font-bold text-slate-600">07:00 PM</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm font-black text-slate-700">10:00</td>
                                <td className="px-6 py-4 text-sm font-black text-emerald-600 text-right">+01:00</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto py-6">
            {/* View Switcher (Only for Admin to toggle) */}
            {isAdmin && (
                <div className="flex justify-end mb-8">
                    <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
                        <button
                            onClick={() => setViewMode('admin')}
                            className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'admin' ? 'bg-white text-[#714B67] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Admin View
                        </button>
                        <button
                            onClick={() => setViewMode('user')}
                            className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'user' ? 'bg-white text-[#714B67] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            My Attendance
                        </button>
                    </div>
                </div>
            )}

            {viewMode === 'admin' ? <AdminView /> : <UserView />}
        </div>
    );
};

const StatCard = ({ label, value, sub, icon }) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
        <div className="flex items-center justify-between mb-2">
            <div className="p-3 rounded-2xl bg-slate-50 group-hover:bg-white border border-slate-100 transition-colors">
                {icon}
            </div>
            <ArrowUpRight size={16} className="text-slate-300 group-hover:text-slate-400 transition-colors" />
        </div>
        <div className="flex items-end gap-1">
            <span className="text-3xl font-black text-slate-900 leading-none">{value}</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{sub}</span>
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{label}</p>
    </div>
);

const ChevronDown = ({ size = 20, className = "" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m6 9 6 6 6-6" />
    </svg>
);

export default Attendance;
