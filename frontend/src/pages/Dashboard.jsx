import { 
  Clock, 
  Calendar, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  TrendingUp,
  MapPin,
  MoreVertical,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const StatCard = ({ label, value, trend, icon, color }) => (
  <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group overflow-hidden relative">
    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 group-hover:scale-125 transition-transform ${color}`}></div>
    <div className="flex items-center justify-between mb-6">
      <div className={`p-4 rounded-2xl ${color} text-white shadow-lg shadow-opacity-30 flex items-center justify-center`}>
        {icon}
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 text-xs font-black rounded-full">
        <TrendingUp size={14} /> {trend}
      </div>
    </div>
    <p className="text-slate-500 font-bold mb-1">{label}</p>
    <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Overview</h1>
          <p className="text-slate-500 mt-2 font-bold text-lg">Welcome back, John! Here's the pulse of Dayflow today.</p>
        </div>
        <div className="flex gap-4">
           <button className="px-6 py-3 bg-white border-2 border-slate-100 rounded-2xl font-black text-slate-700 hover:border-slate-200 hover:bg-slate-50 transition-all">Export Report</button>
           <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all">+ New Employee</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard label="Total Employees" value="1,284" trend="+12.5%" icon={<Users size={24} />} color="bg-blue-600" />
        <StatCard label="Live Attendance" value="98.2%" trend="+2.4%" icon={<Clock size={24} />} color="bg-indigo-600" />
        <StatCard label="Pending Leaves" value="18" trend="-5%" icon={<Calendar size={24} />} color="bg-amber-500" />
        <StatCard label="Monthly Payroll" value="$842.5k" trend="+8.2%" icon={<DollarSign size={24} />} color="bg-slate-900" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-900">Attendance Records</h3>
              <p className="text-sm font-bold text-slate-400">Monitoring real-time check-ins</p>
            </div>
            <button className="text-blue-600 font-black text-sm hover:underline">View All</button>
          </div>
          <div className="p-4">
             <div className="overflow-x-auto">
               <table className="w-full">
                 <thead>
                   <tr className="text-left">
                     <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none">Employee</th>
                     <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none">Time</th>
                     <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none">Location</th>
                     <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none text-right">Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   {[
                     { name: 'Sarah Wilson', role: 'UX Designer', time: '08:54 AM', loc: 'NY Office', status: 'On-time' },
                     { name: 'Marcus Chen', role: 'DevOps Eng.', time: '09:12 AM', loc: 'Remote', status: 'Late' },
                     { name: 'Elena Rodriguez', role: 'Product Manager', time: '08:45 AM', loc: 'London', status: 'On-time' },
                     { name: 'David Kim', role: 'HR Specialist', time: '09:05 AM', loc: 'NY Office', status: 'On-time' },
                   ].map((emp, i) => (
                     <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                       <td className="px-6 py-6">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors uppercase">
                              {emp.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                               <p className="font-black text-slate-900 leading-tight">{emp.name}</p>
                               <p className="text-xs font-bold text-slate-400 uppercase mt-0.5">{emp.role}</p>
                            </div>
                         </div>
                       </td>
                       <td className="px-6 py-6 text-sm font-bold text-slate-600">{emp.time}</td>
                       <td className="px-6 py-6 text-sm font-bold text-slate-500 flex items-center gap-1.5"><MapPin size={14} className="text-slate-300" /> {emp.loc}</td>
                       <td className="px-6 py-6 text-right">
                          <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider ${
                            emp.status === 'On-time' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          }`}>{emp.status}</span>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-900">Pending Actions</h3>
                <span className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center font-black text-sm">3</span>
             </div>
             <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 rounded-3xl bg-amber-50/50 border border-amber-100">
                   <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl"><Calendar size={20} /></div>
                   <div className="flex-1">
                      <p className="text-sm font-black text-slate-900">Sick Leave Application</p>
                      <p className="text-xs font-bold text-slate-500 mt-1">Alex Smith · 2 Days</p>
                      <div className="flex gap-2 mt-4">
                         <button className="flex-1 py-2 bg-emerald-500 text-white text-[11px] font-black rounded-xl hover:bg-emerald-600 transition-colors uppercase">Approve</button>
                         <button className="flex-1 py-2 bg-white border border-slate-200 text-slate-600 text-[11px] font-black rounded-xl hover:bg-slate-50 transition-colors uppercase">Reject</button>
                      </div>
                   </div>
                </div>
                
                <div className="flex items-center gap-4 p-5 rounded-3xl bg-blue-50/50 border border-blue-100">
                   <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl"><CheckCircle2 size={20} /></div>
                   <div className="flex-1">
                      <p className="text-sm font-black text-slate-900">Payroll Finalization</p>
                      <p className="text-xs font-bold text-slate-500 mt-1">Due in 3 hours</p>
                   </div>
                   <ChevronRight size={18} className="text-blue-400" />
                </div>
             </div>
           </div>

           <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2.5rem] text-white relative overflow-hidden group shadow-2xl">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative z-10">
                <div className="p-4 bg-white/10 rounded-2xl w-fit mb-6"><AlertCircle size={24} /></div>
                <h4 className="text-xl font-black mb-2">Team Anniversary</h4>
                <p className="text-slate-400 font-bold mb-6 italic text-sm">"Celebrate 5 years of excellence with the engineering team this Friday."</p>
                <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform">Send Wishes</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
