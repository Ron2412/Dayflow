import { useState } from 'react';
import { UserPlus, Mail, User, Briefcase, Calendar, ShieldCheck, Copy, Check, Loader2 } from 'lucide-react';
import { generateEmployeeId, generateTempPassword } from '../../lib/utils';
import { supabase } from '../../lib/supabase';

const AddEmployee = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('employee');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        const year = new Date().getFullYear();

        try {
            // 1. Simulate serial generation
            const serial = Math.floor(Math.random() * 900) + 100;

            // 2. Generate ID and Pass
            const employeeId = generateEmployeeId(firstName, lastName, year, serial);
            const tempPassword = generateTempPassword();

            setResult({
                fullName: `${firstName} ${lastName}`,
                employeeId,
                email,
                tempPassword,
                role
            });

        } catch (err) {
            console.error(err);
            alert('Error simulating creation: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const finalizeEmployee = async () => {
        if (!result) return;
        setLoading(true);

        // Simulate API delay
        await new Promise(r => setTimeout(r, 1000));

        // Save to local storage for login simulation
        const dynamicUsers = JSON.parse(localStorage.getItem('dayflow_dynamic_users') || '[]');
        const newUser = {
            id: `dynamic-${Date.now()}`,
            email: result.email,
            password: result.tempPassword, // Store the generated password
            full_name: result.fullName,
            employee_id: result.employeeId,
            role: result.role,
            hourly_rate: result.role === 'hr' ? 45.0 : 25.0,
            created_at: new Date().toISOString()
        };

        dynamicUsers.push(newUser);
        localStorage.setItem('dayflow_dynamic_users', JSON.stringify(dynamicUsers));

        alert(`Success! User ${result.fullName} created.\n\nID: ${result.employeeId}\nPassword: ${result.tempPassword}\n\nYou can now log out and sign in as this user.`);

        setLoading(false);
        setResult(null);
        setFirstName('');
        setLastName('');
        setEmail('');
    };

    const copyToClipboard = () => {
        const text = `Employee: ${result.fullName}\nID: ${result.employeeId}\nEmail: ${result.email}\nTemp Pass: ${result.tempPassword}`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                    <UserPlus size={24} />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Onboard New Employee</h1>
                    <p className="text-slate-500 font-bold">Register a staff member and generate their workspace credentials.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                    <form onSubmit={handleCreate} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                                <input
                                    type="text" required placeholder="John"
                                    className="w-full px-5 py-4 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all font-bold text-slate-900"
                                    value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                                <input
                                    type="text" required placeholder="Doe"
                                    className="w-full px-5 py-4 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all font-bold text-slate-900"
                                    value={lastName} onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"><Mail size={18} /></span>
                                <input
                                    type="email" required placeholder="john.doe@odooindia.com"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all font-bold text-slate-900"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Access Role</label>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setRole('employee')}
                                    className={`flex-1 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all border-2 ${role === 'employee' ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
                                >Employee</button>
                                <button
                                    type="button"
                                    onClick={() => setRole('hr')}
                                    className={`flex-1 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all border-2 ${role === 'hr' ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-300' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
                                >HR / Admin</button>
                            </div>
                        </div>

                        <button
                            type="submit" disabled={loading}
                            className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg"
                        >
                            {loading ? <Loader2 className="animate-spin" size={24} /> : <>Generate Credentials</>}
                        </button>
                    </form>
                </div>

                <div>
                    {result ? (
                        <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group animate-in slide-in-from-right duration-500">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>

                            <div className="relative z-10 space-y-8">
                                <div className="flex items-center justify-between">
                                    <span className="px-4 py-1.5 bg-blue-600/20 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-600/30">System Generated</span>
                                    <button onClick={copyToClipboard} className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white transition-colors">
                                        {copied ? <Check size={20} className="text-emerald-400" /> : <Copy size={20} />}
                                    </button>
                                </div>

                                <div>
                                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Employee</h2>
                                    <p className="text-2xl font-black">{result.fullName}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Corporate ID</h2>
                                        <p className="text-lg font-black text-blue-400 tracking-tight">{result.employeeId}</p>
                                    </div>
                                    <div>
                                        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Access Role</h2>
                                        <p className="text-lg font-black capitalize">{result.role || 'Employee'}</p>
                                    </div>
                                </div>

                                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                                    <div>
                                        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                            <ShieldCheck size={12} /> Temporary Password
                                        </h2>
                                        <p className="text-xl font-mono font-black text-emerald-400">{result.tempPassword}</p>
                                    </div>
                                    <p className="text-[10px] text-slate-400 italic">User will be prompted to change this on first login.</p>
                                </div>

                                <div className="pt-4">
                                    <button
                                        onClick={finalizeEmployee}
                                        disabled={loading}
                                        className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                                    >
                                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Finalize & Create User'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full border-4 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center p-10 text-center space-y-4 bg-slate-50/50">
                            <div className="p-5 bg-white rounded-3xl shadow-sm text-slate-300">
                                <ShieldCheck size={48} />
                            </div>
                            <div>
                                <p className="text-slate-400 font-bold">Waiting for input...</p>
                                <p className="text-xs text-slate-300 mt-1 max-w-[200px]">Fill in the employee details to generate their unique Dayflow credentials.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddEmployee;
