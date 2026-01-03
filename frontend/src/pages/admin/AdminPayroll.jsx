import { useState, useEffect } from 'react';
import { DollarSign, Search, Filter, Download, FileText, ArrowUpRight, Save } from 'lucide-react';
import api from '../../lib/api';

const AdminPayroll = () => {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    useEffect(() => {
        fetchPayrollData();
    }, []);

    const fetchPayrollData = async () => {
        try {
            const res = await api.get('/payroll'); // Returns all payroll data joined with user info
            setEmployees(res.data);
        } catch (err) {
            console.error("Failed to fetch payroll:", err);
        }
    };

    const handleEdit = (emp) => {
        setEditingId(emp.user_id);
        setEditForm({ ...emp });
    };

    const handleSave = async () => {
        try {
            const res = await api.put(`/payroll/${editingId}`, {
                basic: Number(editForm.basic),
                hra: Number(editForm.hra),
                allowances: Number(editForm.allowances),
                deductions: Number(editForm.deductions),

                // Granular fields
                wage: Number(editForm.wage),
                std_allowance: Number(editForm.std_allowance),
                perf_bonus: Number(editForm.perf_bonus),
                lta: Number(editForm.lta),
                fixed_allowance: Number(editForm.fixed_allowance),
                pf: Number(editForm.pf),
                pt: Number(editForm.pt),

                net_salary: Number(editForm.net_salary),
                status: editForm.status
            });

            setEmployees(employees.map(e => e.user_id === editingId ? { ...e, ...res.data, employee: e.employee, role: e.role } : e));
            setEditingId(null);
        } catch (err) {
            console.error("Failed to update payroll:", err);
        }
    };

    const filteredEmployees = employees.filter(emp =>
        emp.employee?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPayroll = employees.reduce((sum, emp) => sum + (emp.net_salary || 0), 0);
    const employeesPaid = employees.filter(e => e.status === 'processed').length;

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Payroll Management</h1>
                    <p className="text-slate-500 font-bold mt-1">Manage salaries and process payments.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-[#714B67] text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-[#714B67]/20 hover:bg-[#5a3c52] transition-colors">
                        <DollarSign size={16} /> Run Payroll
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Monthly Payroll</p>
                    <p className="text-3xl font-black text-slate-900">${totalPayroll.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Employees Paid</p>
                    <p className="text-3xl font-black text-emerald-600">{employeesPaid} <span className="text-slate-400 text-sm">/ {employees.length}</span></p>
                </div>
            </div>

            {/* Employee List */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="text-lg font-black text-slate-800">Salary Structure</h3>
                    <div className="relative w-full md:w-64">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search employee..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs font-bold outline-none focus:ring-2 focus:ring-[#714B67]/10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Employee</th>
                                <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Role</th>
                                <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400 text-right">Basic</th>
                                <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400 text-right">HRA</th>
                                <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400 text-right">Allowances</th>
                                <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400 text-right">Deductions</th>
                                <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400 text-right">Net Salary</th>
                                <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 font-bold text-sm">
                            {filteredEmployees.map((emp) => (
                                <tr key={emp.user_id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 text-slate-800">{emp.employee}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-[10px] uppercase tracking-wide ${emp.role === 'hr' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {emp.role}
                                        </span>
                                    </td>

                                    {editingId === emp.user_id ? (
                                        <>
                                            <td colSpan="5" className="px-6 py-4">
                                                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                                                    <div>
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Monthly Wage</label>
                                                        <input
                                                            type="number"
                                                            className="block w-32 bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold outline-none ring-2 ring-transparent focus:ring-[#714B67]/20 focus:border-[#714B67] transition-all"
                                                            placeholder="Enter Wage"
                                                            value={editForm.wage || ''}
                                                            onChange={e => {
                                                                const wage = Number(e.target.value);
                                                                const basic = wage * 0.50;
                                                                const hra = basic * 0.50;
                                                                const stdDesc = 4167; // Fixed Standard Allowance
                                                                const perfBonus = wage * 0.0833;
                                                                const lta = wage * 0.08333;

                                                                // Fixed Allowance is balancing figure?
                                                                // Formula says: Fixed allowance = wage - total of all the component (which ones?)
                                                                // Let's assume Fixed Allowance is what's left after specific components.
                                                                // But usually, Wage IS the total. Or Wage is the base for CT?
                                                                // The image says: "Fixed allowance is = wage - total of all the component".
                                                                // Let's assume Wage is the Gross total.
                                                                // Components sum must NOT exceed Wage.

                                                                const componentsSum = basic + hra + stdDesc + perfBonus + lta;
                                                                let fixedAllowance = wage - componentsSum;
                                                                if (fixedAllowance < 0) fixedAllowance = 0; // Prevent negative

                                                                const pf = basic * 0.12;
                                                                const pt = 200;
                                                                const totalDeductions = pf + pt;

                                                                const netSalary = wage - totalDeductions;

                                                                setEditForm({
                                                                    ...editForm,
                                                                    wage,
                                                                    basic,
                                                                    hra,
                                                                    std_allowance: stdDesc,
                                                                    perf_bonus: perfBonus,
                                                                    lta,
                                                                    fixed_allowance: fixedAllowance,
                                                                    pf,
                                                                    pt,
                                                                    allowances: stdDesc + perfBonus + lta + fixedAllowance, // Grouped for backwards compat
                                                                    deductions: totalDeductions,
                                                                    net_salary: netSalary
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex-1 grid grid-cols-4 gap-2 text-[10px] font-bold text-slate-500">
                                                        <div>Basic: {Math.round(editForm.basic || 0)}</div>
                                                        <div>HRA: {Math.round(editForm.hra || 0)}</div>
                                                        <div>Allowances: {Math.round(editForm.allowances || 0)}</div>
                                                        <div>Net: {Math.round(editForm.net_salary || 0)}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center align-middle">
                                                <button onClick={handleSave} className="bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-600 shadow-md transition-all hover:scale-105"><Save size={18} /></button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="px-6 py-4 text-slate-600 text-right font-medium">₹ {Math.round(emp.basic || 0).toLocaleString()}</td>
                                            <td className="px-6 py-4 text-slate-600 text-right font-medium">₹ {Math.round(emp.hra || 0).toLocaleString()}</td>
                                            <td className="px-6 py-4 text-slate-600 text-right font-medium">₹ {Math.round(emp.allowances || 0).toLocaleString()}</td>
                                            <td className="px-6 py-4 text-red-400 text-right font-medium">- ₹ {Math.round(emp.deductions || 0).toLocaleString()}</td>
                                            <td className="px-6 py-4 text-slate-900 font-black text-right text-lg">₹ {Math.round(emp.net_salary || 0).toLocaleString()}</td>
                                            <td className="px-6 py-4 text-center">
                                                <button onClick={() => handleEdit(emp)} className="text-[#714B67] hover:text-[#5a3c52] hover:bg-[#714B67]/10 px-3 py-1 rounded-lg transition-all text-xs font-black uppercase tracking-wider">EDIT</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPayroll;
