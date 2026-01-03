import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { EMPLOYEES, MOCK_ATTENDANCE, MOCK_LEAVES } from '../lib/mockData';
import { SearchSlash, Plane, Circle, MoreHorizontal, Mail, Phone, MapPin, X, Calendar } from 'lucide-react';

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
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Staff Directory</h1>
          <p className="text-slate-500 font-bold">Manage and view your team in one place.</p>
        </div>
        <button className="px-6 py-2.5 bg-[#714B67] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-purple-100 hover:bg-[#5a3c52] transition-all">
          + New Employee
        </button>
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

      <EmployeeProfileModal
        employee={selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
      />
    </div>
  );
};

export default Dashboard;
