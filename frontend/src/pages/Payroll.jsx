import { useState, useEffect } from 'react';
import { Download, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';

const Payroll = () => {
    const { profile } = useAuth();
    const [salaryData, setSalaryData] = useState(null);

    useEffect(() => {
        if (profile?.id) {
            api.get(`/payroll?userId=${profile.id}`)
                .then(res => setSalaryData(res.data))
                .catch(err => console.error("Error fetching payroll:", err));
        }
    }, [profile]);

    if (!salaryData) return <div className="p-8 text-center text-slate-400 font-bold">Loading Payroll Data...</div>;

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="bg-[#714B67] rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                <div className="relative z-10">
                    <p className="text-sm font-bold opacity-80 uppercase tracking-widest mb-2">Net Salary (Monthly)</p>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-8">${salaryData.net_salary?.toLocaleString()}</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/20 pt-8">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Basic Pay</p>
                            <p className="text-xl font-bold">${salaryData.basic?.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">HRA</p>
                            <p className="text-xl font-bold">${salaryData.hra?.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Allowances</p>
                            <p className="text-xl font-bold">${salaryData.allowances?.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Deductions</p>
                            <p className="text-xl font-bold text-red-300">-${salaryData.deductions?.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Payslips (Mock for now, can be real in future) */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
                <div className="p-8 border-b border-slate-100">
                    <h3 className="text-xl font-black text-slate-800">Recent Payslips</h3>
                </div>
                <div className="divide-y divide-slate-50">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:shadow-md transition-all">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <p className="font-black text-slate-800">Payslip - October 2025</p>
                                    <p className="text-xs font-bold text-slate-400">Processed on Oct 31, 2025</p>
                                </div>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#714B67] hover:text-white transition-all">
                                <Download size={16} /> Download
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Payroll;
