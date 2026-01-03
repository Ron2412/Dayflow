import { useState } from 'react';
import { Lock, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

const ChangePassword = () => {
    const { user } = useAuth();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        setError('');

        const user = JSON.parse(localStorage.getItem('dayflow_user') || '{}');

        // Simulation: Update password in localStorage
        const dynamicUsers = JSON.parse(localStorage.getItem('dayflow_dynamic_users') || '[]');
        const userIndex = dynamicUsers.findIndex(u => u.id === user.id);

        if (userIndex !== -1) {
            dynamicUsers[userIndex].password = newPassword;
            localStorage.setItem('dayflow_dynamic_users', JSON.stringify(dynamicUsers));
        }

        // Also update the current session user object
        const updatedUser = { ...user, password: newPassword };
        localStorage.setItem('dayflow_user', JSON.stringify(updatedUser));
        // Note: The app usually needs to reload or use context state update
        // For prototype, we'll just show success

        setTimeout(() => {
            setSuccess(true);
            setNewPassword('');
            setConfirmPassword('');
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                        <Lock size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Change Password</h1>
                        <p className="text-sm font-bold text-slate-500">Update your credentials for better security.</p>
                    </div>
                </div>

                {success ? (
                    <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl text-center space-y-4">
                        <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-200">
                            <CheckCircle2 size={32} />
                        </div>
                        <h2 className="text-xl font-black text-slate-900">Successfully Changed</h2>
                        <p className="text-slate-500 font-medium">Your password has been updated. Use it for your next login.</p>
                        <button onClick={() => setSuccess(false)} className="px-6 py-2 bg-slate-900 text-white text-xs font-black uppercase rounded-xl tracking-widest">Done</button>
                    </div>
                ) : (
                    <form onSubmit={handleChange} className="space-y-6">
                        {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100">{error}</div>}

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"><ShieldCheck size={18} /></span>
                                <input
                                    type="password" required
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all font-bold text-slate-900"
                                    value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"><ShieldCheck size={18} /></span>
                                <input
                                    type="password" required
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none transition-all font-bold text-slate-900"
                                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit" disabled={loading}
                            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black shadow-xl shadow-slate-200 hover:bg-black active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <>Update Password</>}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ChangePassword;
