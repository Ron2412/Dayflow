import { useState, useEffect } from 'react';
import { Calendar, Search, Filter, Clock, MapPin, User, ChevronLeft, ChevronRight, FileDown } from 'lucide-react';
import api from '../../lib/api';

const AdminAttendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        // Fetch all attendance data
        // For a real app, you'd likely filter by date range in the API
        const fetchAttendance = async () => {
            try {
                const res = await api.get('/attendance');
                setAttendanceData(res.data);
            } catch (err) {
                console.error("Failed to fetch attendance:", err);
            }
        };
        fetchAttendance();
    }, []);

    // Filter by selected date (simple client-side filter for now)
    const filteredAttendance = attendanceData.filter(record =>
        record.date === selectedDate.toISOString().split('T')[0]
    );

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    const changeDate = (days) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + days);
        setSelectedDate(newDate);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Attendance Oversight</h1>
                    <p className="text-slate-500 font-bold mt-1">Monitor daily attendance and logs.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">
                        <FileDown size={16} /> Export Report
                    </button>
                </div>
            </div>

            {/* Date Navigation */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                <button onClick={() => changeDate(-1)} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                    <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-[#714B67]" />
                    <span className="text-sm font-black text-slate-700">{formatDate(selectedDate)}</span>
                </div>
                <button onClick={() => changeDate(1)} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Staff Attendance List */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-800">Parameters</h3>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Employee</th>
                            <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Check In</th>
                            <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Check Out</th>
                            <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Status</th>
                            <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Efficiency</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-bold">
                        {filteredAttendance.length > 0 ? filteredAttendance.map((record) => (
                            <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-8 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                            <User size={16} />
                                        </div>
                                        <span className="text-slate-800">{record.employee_name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600">{record.check_in}</td>
                                <td className="px-6 py-4 text-slate-600">{record.check_out}</td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                                        {record.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {record.efficiency}%
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="px-8 py-8 text-center text-slate-400 text-sm">
                                    No attendance records for this date.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAttendance;
