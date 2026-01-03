import { useState } from 'react';
import { Search, Filter, MoreHorizontal, Mail, Phone, MapPin, SearchSlash, Plane, Circle } from 'lucide-react';
import { EMPLOYEES, MOCK_ATTENDANCE, MOCK_LEAVES } from '../../lib/mockData';

const EmployeeCard = ({ employee, indicatorStatus }) => (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all group relative">
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
            <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors mr-10">
                <MoreHorizontal size={20} />
            </button>
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

        <div className="mt-6 flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${employee.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>{employee.status}</span>
            <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">View Profile</button>
        </div>
    </div>
);

const EmployeeDirectory = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');

    const filteredEmployees = EMPLOYEES.filter(emp => {
        const matchesSearch = emp.full_name.toLowerCase().includes(search.toLowerCase()) ||
            emp.employee_id.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' || emp.department.toLowerCase() === filter.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Staff Directory</h1>
                    <p className="text-slate-500 mt-2 font-bold text-lg">Managing {EMPLOYEES.length} team members across departments.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name or employee ID..."
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-blue-600 outline-none font-bold text-slate-900 shadow-sm transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-4">
                    <select
                        className="px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl font-black text-slate-700 outline-none focus:border-blue-600 shadow-sm appearance-none"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All Departments</option>
                        <option value="engineering">Engineering</option>
                        <option value="human resources">Human Resources</option>
                        <option value="product">Product</option>
                        <option value="operations">Operations</option>
                    </select>
                    <button className="p-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm">
                        <Filter size={24} />
                    </button>
                </div>
            </div>

            {filteredEmployees.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
                    {filteredEmployees.map(emp => {
                        // Calculate indicator status
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
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 bg-slate-50/50 rounded-[2.5rem] border-4 border-dashed border-slate-100">
                    <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-slate-200">
                        <SearchSlash size={40} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-900">No results found</h3>
                        <p className="text-slate-500 font-bold max-w-xs mx-auto mt-1">We couldn't find any staff member matching "{search}". Try another keyword.</p>
                    </div>
                    <button onClick={() => setSearch('')} className="px-6 py-2 bg-slate-900 text-white text-xs font-black uppercase rounded-xl tracking-widest">Clear Search</button>
                </div>
            )}
        </div>
    );
};

export default EmployeeDirectory;
