import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Clock, Mail, Lock, User, Building2, Phone, Upload, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [companyName, setCompanyName] = useState('');
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('employee');
    const [employeeId, setEmployeeId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showVerification, setShowVerification] = useState(false);

    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const { signIn } = useAuth(); // We'll simulate auto-login after signup

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(file);
            const reader = new FileReader();
            reader.onloadend = () => setLogoPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        // SRS Password Rules
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters, include a number and a special character.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        // Simulation: Save company and user to localStorage
        setTimeout(() => {
            const dynamicUsers = JSON.parse(localStorage.getItem('dayflow_dynamic_users') || '[]');

            const generatedId = `OI${fullName.substring(0, 2).toUpperCase()}${companyName.substring(0, 2).toUpperCase()}${new Date().getFullYear()}${String(dynamicUsers.length + 1).padStart(3, '0')}`;

            const newUser = {
                id: `${role}-${Date.now()}`,
                email,
                password,
                full_name: fullName,
                phone,
                company_name: companyName,
                role: role,
                employee_id: employeeId || generatedId,
                logo: logoPreview,
                created_at: new Date().toISOString(),
                status: 'active',
                department: role === 'hr' ? 'HR' : 'Engineering',
                designation: role === 'hr' ? 'HR Manager' : 'Staff Member'
            };

            dynamicUsers.push(newUser);
            localStorage.setItem('dayflow_dynamic_users', JSON.stringify(dynamicUsers));

            setLoading(false);
            setShowVerification(true); // Show simulated email verification

            // Auto-complete verification after 3 seconds
            setTimeout(() => {
                setShowVerification(false);
                setSuccess(true);
                // Auto-redirect after 2 seconds
                setTimeout(() => navigate('/login'), 2000);
            }, 3000);
        }, 1500);
    };

    if (showVerification) {
        return (
            <div className="min-h-screen gradient-bg flex items-center justify-center p-6 bg-[#f8fafc]">
                <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl p-10 text-center border border-slate-100 animate-in zoom-in-95 duration-300">
                    <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <Mail size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Verify Email</h2>
                    <p className="text-slate-500 font-medium mb-8 italic">We've sent a code to <span className="text-slate-900 font-bold">{email}</span>. Verifying your inbox...</p>
                    <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="w-12 h-14 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center text-xl font-black text-slate-300">
                                {i < 3 ? '•' : ''}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen gradient-bg flex items-center justify-center p-6 bg-[#f8fafc]">
                <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl p-10 text-center border border-slate-100">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Registration Successful!</h2>
                    <p className="text-slate-500 font-medium mb-8">Welcome, <span className="text-slate-900 font-bold">{fullName}</span>. Your company <span className="text-blue-600 font-bold">{companyName}</span> is now on Dayflow.</p>
                    <p className="text-xs text-slate-400">Redirecting to login...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center p-6 bg-[#f8fafc]">
            <div className="max-w-4xl w-full bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/40 overflow-hidden flex flex-col md:flex-row">

                {/* Left Side - Info */}
                <div className="hidden md:flex w-1/3 bg-blue-600 p-10 text-white flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                    <div>
                        <div className="flex items-center gap-2 mb-8">
                            <Clock size={28} strokeWidth={3} />
                            <span className="text-xl font-black tracking-tight">Dayflow</span>
                        </div>
                        <h2 className="text-2xl font-bold leading-tight">Scale your team with confidence.</h2>
                    </div>
                    <p className="text-blue-100 text-xs font-medium italic">Complete the form to set up your corporate HR workspace.</p>
                </div>

                {/* Right Side - Form */}
                <div className="flex-1 p-8 md:p-12 overflow-y-auto max-h-[90vh]">
                    <h1 className="text-3xl font-black text-slate-900 mb-2">Company Signup</h1>
                    <p className="text-slate-500 mb-8 font-medium text-sm italic">Get started with Dayflow HRMS today.</p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold animate-shake">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSignup} className="space-y-6">
                        {/* Company Info Section */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[2px] mb-4">Organization Details</h3>

                            <div className="flex flex-col md:flex-row gap-6 items-center">
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-24 h-24 bg-slate-100 rounded-3xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-200 transition-all overflow-hidden relative group"
                                >
                                    {logoPreview ? (
                                        <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <>
                                            <Upload size={20} className="text-slate-400 group-hover:scale-110 transition-transform" />
                                            <span className="text-[8px] font-black text-slate-400 mt-1 uppercase">Logo</span>
                                        </>
                                    )}
                                    <input
                                        type="file" ref={fileInputRef} className="hidden"
                                        accept="image/*" onChange={handleLogoChange}
                                    />
                                </div>

                                <div className="flex-1 space-y-2 w-full">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Company Name</label>
                                    <div className="relative group">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"><Building2 size={18} /></span>
                                        <input
                                            type="text" required
                                            className="w-full pl-12 pr-4 py-3 bg-slate-100/50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all font-bold text-slate-900"
                                            placeholder="Odoo India"
                                            value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Admin Info Section */}
                        <div className="space-y-4 pt-4 border-t border-slate-100">
                            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[2px] mb-4">Administrator Access</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <div className="relative group">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"><User size={18} /></span>
                                        <input
                                            type="text" required
                                            className="w-full pl-12 pr-4 py-3 bg-slate-100/50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all font-bold text-slate-900"
                                            placeholder="John Doe"
                                            value={fullName} onChange={(e) => setFullName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                                    <div className="relative group">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"><Mail size={18} /></span>
                                        <input
                                            type="email" required
                                            className="w-full pl-12 pr-4 py-3 bg-slate-100/50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all font-bold text-slate-900"
                                            placeholder="admin@company.com"
                                            value={email} onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Account Role</label>
                                    <div className="flex bg-slate-100 p-1 rounded-2xl">
                                        <button
                                            type="button"
                                            onClick={() => setRole('employee')}
                                            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${role === 'employee' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
                                        >
                                            Employee
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setRole('hr')}
                                            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${role === 'hr' ? 'bg-white text-[#714B67] shadow-sm' : 'text-slate-400'}`}
                                        >
                                            HR Admin
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Employee ID (Optional)</label>
                                    <input
                                        type="text"
                                        className="w-full px-5 py-3 bg-slate-100/50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all font-bold text-slate-900"
                                        placeholder="Auto-generated if empty"
                                        value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                    <div className="relative group">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"><Phone size={18} /></span>
                                        <input
                                            type="tel" required
                                            className="w-full pl-12 pr-4 py-3 bg-slate-100/50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all font-bold text-slate-900"
                                            placeholder="+91 98765 43210"
                                            value={phone} onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                                    <div className="relative group">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"><Lock size={18} /></span>
                                        <input
                                            type="password" required
                                            className="w-full pl-12 pr-4 py-3 bg-slate-100/50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all font-bold text-slate-900"
                                            placeholder="••••••••"
                                            value={password} onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <p className="text-[9px] font-bold text-slate-400 px-1">Min 8 chars, 1 number, 1 special char.</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
                                    <div className="relative group">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"><Lock size={18} /></span>
                                        <input
                                            type="password" required
                                            className="w-full pl-12 pr-4 py-3 bg-slate-100/50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all font-bold text-slate-900"
                                            placeholder="••••••••"
                                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit" disabled={loading}
                            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group mt-4 h-14"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <>Create Workspace <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-slate-500 font-bold text-sm">
                        Already have a workspace? <Link to="/login" className="text-blue-600 hover:underline">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
