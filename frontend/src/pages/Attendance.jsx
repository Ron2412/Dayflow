import { useState, useEffect } from 'react';
import {
    Calendar,
    Clock,
    User,
    ArrowUpRight,
    ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';

const Attendance = () => {
    const { profile } = useAuth();
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [stats, setStats] = useState({ present: 0, leaves: 0, total: 0 });

    useEffect(() => {
        const fetchData = async () => {
            if (profile?.id) {
                try {
                    const res = await api.get(`/attendance?userId=${profile.id}`);
                    setAttendanceHistory(res.data);

                    // Simple stats calculation
                    const present = res.data.filter(r => r.status === 'Present').length;
                    setStats({
                        present,
                        leaves: 0, // Mock for now
                        total: 22 // Mock working days
                    });
                } catch (err) {
                    console.error("Error fetching attendance:", err);
                }
            }
        };
        fetchData();
    }, [profile]);

    return (
        <div className="max-w-7xl mx-auto py-6 space-y-8 animate-in fade-in duration-500">
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
                    <StatCard label="Days Present" value={stats.present} sub="Days" icon={<Clock size={20} className="text-emerald-500" />} />
                    <StatCard label="Leaves Count" value={stats.leaves} sub="Days" icon={<Calendar size={20} className="text-rose-500" />} />
                    <StatCard label="Total Working" value={stats.total} sub="Days" icon={<User size={20} className="text-blue-500" />} />
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
                            <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Status</th>
                            <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400 text-right">Efficiency</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {attendanceHistory.length > 0 ? attendanceHistory.map((record) => (
                            <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-8 py-4">
                                    <span className="text-sm font-black text-slate-800">{new Date(record.date).toLocaleDateString()}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                                        <span className="text-sm font-bold text-slate-600">{record.check_in}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                                        <span className="text-sm font-bold text-slate-600">{record.check_out}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${record.status === 'Present' ? 'bg-emerald-100 text-emerald-700' :
                                            record.status === 'Absent' ? 'bg-red-100 text-red-700' :
                                                record.status === 'Half Day' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-slate-100 text-slate-600'
                                        }`}>
                                        {record.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="text-sm font-bold text-slate-600">{record.efficiency}%</span>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="px-8 py-16 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4">
                                            <Calendar size={28} />
                                        </div>
                                        <h3 className="text-slate-900 font-black text-lg">No Check-ins Found</h3>
                                        <p className="text-slate-400 font-bold text-sm mt-1">Your attendance records will appear here.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
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

export default Attendance;
