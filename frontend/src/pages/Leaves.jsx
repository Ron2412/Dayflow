import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    Plus,
    Calendar,
    Clock,
    CheckCircle2,
    XCircle,
    Search,
    ChevronDown,
    Filter,
    ArrowUpRight,
    User
} from 'lucide-react';
import { EMPLOYEES } from '../lib/mockData';

const Leaves = () => {
    const { profile } = useAuth();
    const isAdmin = profile?.role === 'hr';
    const [selectedTab, setSelectedTab] = useState('My Time Off');
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

    // Mock States
    const [myRequests, setMyRequests] = useState([
        { id: 1, type: 'Paid Time Off', start: '2025-10-28', end: '2025-10-30', status: 'Approved', days: 3 },
        { id: 2, type: 'Sick Leave', start: '2025-11-05', end: '2025-11-05', status: 'To Approve', days: 1 }
    ]);

    const [allRequests, setAllRequests] = useState([
        { id: 3, employee: 'John Doe', type: 'Paid Time Off', start: '2025-11-10', end: '2025-11-12', status: 'To Approve', days: 3 },
        { id: 4, employee: 'Elena Rodriguez', type: 'Sick Leave', start: '2025-11-08', end: '2025-11-08', status: 'To Approve', days: 1 }
    ]);

    const tabs = isAdmin
        ? ['Overview', 'My Time Off', 'To Approve']
        : ['Overview', 'My Time Off'];

    const handleApprove = (id) => {
        setAllRequests(allRequests.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
    };

    const handleRefuse = (id) => {
        setAllRequests(allRequests.map(r => r.id === id ? { ...r, status: 'Refused' } : r));
    };

    return (
        <div className="max-w-7xl mx-auto py-6">
            {/* Secondary Header / Sub-nav */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div className="flex bg-slate-100 p-1 rounded-xl">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                            className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${selectedTab === tab
                                    ? 'bg-white text-[#714B67] shadow-sm'
                                    : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {selectedTab === 'My Time Off' && (
                    <button
                        onClick={() => setIsRequestModalOpen(true)}
                        className="bg-[#714B67] text-white px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-[#714B67]/20 flex items-center gap-2 hover:bg-[#5a3c52] transition-colors"
                    >
                        <Plus size={16} /> New Request
                    </button>
                )}
            </div>

            {/* Tab Content */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {selectedTab === 'Overview' && <OverviewView />}
                {selectedTab === 'My Time Off' && <MyTimeOffView requests={myRequests} />}
                {selectedTab === 'To Approve' && isAdmin && (
                    <ApprovalsView
                        requests={allRequests}
                        onApprove={handleApprove}
                        onRefuse={handleRefuse}
                    />
                )}
            </div>

            {/* Request Modal */}
            {isRequestModalOpen && (
                <RequestModal
                    onClose={() => setIsRequestModalOpen(false)}
                    onSubmit={(req) => {
                        setMyRequests([...myRequests, { ...req, id: Date.now(), status: 'To Approve' }]);
                        setIsRequestModalOpen(false);
                    }}
                />
            )}
        </div>
    );
};

const OverviewView = () => (
    <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Available Days" value="12" sub="Paid Time Off" color="blue" />
            <StatCard label="Planned Next" value="03" sub="Days" color="emerald" />
            <StatCard label="Sick Balance" value="05" sub="Days" color="rose" />
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
                <Calendar size={40} />
            </div>
            <h3 className="text-xl font-black text-slate-800">Department Calendar</h3>
            <p className="text-sm font-bold text-slate-400 mt-2">Visual calendar view coming soon in the next update!</p>
        </div>
    </div>
);

const MyTimeOffView = ({ requests }) => (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Leave Type</th>
                    <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Start Date</th>
                    <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">End Date</th>
                    <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Duration</th>
                    <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-bold">
                {requests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-4 text-slate-800">{req.type}</td>
                        <td className="px-6 py-4 text-slate-600">{req.start}</td>
                        <td className="px-6 py-4 text-slate-600">{req.end}</td>
                        <td className="px-6 py-4 text-slate-700">{req.days} Days</td>
                        <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${req.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' :
                                    req.status === 'Refused' ? 'bg-rose-100 text-rose-600' :
                                        'bg-amber-100 text-amber-600'
                                }`}>
                                {req.status}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const ApprovalsView = ({ requests, onApprove, onRefuse }) => (
    <div className="space-y-6">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400"><Filter size={18} /></div>
                <span className="text-sm font-black text-slate-700 uppercase tracking-widest">Pending Approvals</span>
            </div>
            <div className="relative w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search..." className="w-full bg-slate-50 border border-slate-200 rounded-xl py-1.5 pl-10 pr-4 text-xs font-bold outline-none" />
            </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
            {requests.map((req) => (
                <div key={req.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-[#714B67]/20 transition-all">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#714B67] font-black">
                            {req.employee[0]}
                        </div>
                        <div>
                            <h4 className="font-black text-slate-900">{req.employee}</h4>
                            <p className="text-xs font-bold text-slate-400">{req.type} • {req.days} Days</p>
                        </div>
                        <div className="h-10 w-px bg-slate-100 mx-2"></div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-400 uppercase">Period</span>
                            <span className="text-sm font-black text-slate-700">{req.start} to {req.end}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {req.status === 'To Approve' ? (
                            <>
                                <button
                                    onClick={() => onApprove(req.id)}
                                    className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                                >
                                    <CheckCircle2 size={20} />
                                </button>
                                <button
                                    onClick={() => onRefuse(req.id)}
                                    className="p-3 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                                >
                                    <XCircle size={20} />
                                </button>
                            </>
                        ) : (
                            <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${req.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                                }`}>
                                {req.status}
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const RequestModal = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        type: 'Paid Time Off',
        start: '',
        end: '',
        days: 1,
        desc: ''
    });

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-slate-50 px-8 py-5 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-800">New Leave Request</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-xl transition-colors"><XCircle size={20} className="text-slate-400" /></button>
                </div>

                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Leave Type</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-[#714B67]/10"
                            >
                                <option>Paid Time Off</option>
                                <option>Sick Leave</option>
                                <option>Unpaid Leave</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Duration (Days)</label>
                            <input
                                type="number"
                                value={formData.days}
                                onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-[#714B67]/10"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Start Date</label>
                            <input
                                type="date"
                                value={formData.start}
                                onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">End Date</label>
                            <input
                                type="date"
                                value={formData.end}
                                onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</label>
                        <textarea
                            placeholder="Reason for leave..."
                            rows={3}
                            value={formData.desc}
                            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-[#714B67]/10 resize-none"
                        ></textarea>
                    </div>
                </div>

                <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                    <button
                        onClick={() => onSubmit(formData)}
                        className="flex-1 bg-[#714B67] text-white py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-[#714B67]/20 hover:bg-[#5a3c52] transition-colors"
                    >
                        Submit Request
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 bg-white border border-slate-200 text-slate-600 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ label, value, sub, color }) => {
    const colors = {
        blue: 'text-blue-600 bg-blue-50 border-blue-100',
        emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
        rose: 'text-rose-600 bg-rose-50 border-rose-100'
    };
    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border transition-transform group-hover:scale-110 ${colors[color]}`}>
                <ArrowUpRight size={24} />
            </div>
            <div className="flex items-end gap-1 mb-2">
                <span className="text-4xl font-black text-slate-900 leading-none">{value}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{sub}</span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        </div>
    );
};

export default Leaves;
