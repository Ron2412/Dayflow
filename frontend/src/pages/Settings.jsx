import { Link } from 'react-router-dom';
import {
    Settings as SettingsIcon,
    Lock,
    User,
    Bell,
    Shield,
    ChevronRight,
    Smartphone,
    Languages,
    HelpCircle
} from 'lucide-react';

const Settings = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 py-6">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#714B67] text-white rounded-[1.25rem] flex items-center justify-center shadow-lg shadow-[#714B67]/20">
                    <SettingsIcon size={28} />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Settings</h1>
                    <p className="text-sm font-bold text-slate-500">Manage your account preferences and security.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar-ish Nav */}
                <div className="space-y-2">
                    <SettingsTab active icon={<User size={18} />} label="General" />
                    <SettingsTab icon={<Bell size={18} />} label="Notifications" />
                    <SettingsTab icon={<Shield size={18} />} label="Security" />
                    <SettingsTab icon={<Lock size={18} />} label="Privacy" />
                </div>

                {/* Content Area */}
                <div className="md:col-span-2 space-y-6">
                    <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                        <div className="p-8 border-b border-slate-50">
                            <h3 className="font-black text-slate-900 mb-1">Security & Login</h3>
                            <p className="text-xs font-bold text-slate-400">Manage your password and authentication methods.</p>
                        </div>
                        <div className="divide-y divide-slate-50">
                            <Link to="/settings/password" className="flex items-center justify-between p-8 hover:bg-slate-50 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        <Lock size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900">Change Password</p>
                                        <p className="text-xs font-bold text-slate-400">Last changed 3 months ago</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-600 transition-colors" />
                            </Link>

                            <div className="flex items-center justify-between p-8 group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                                        <Shield size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900">Two-Factor Authentication</p>
                                        <p className="text-xs font-bold text-slate-400">Currently disabled (Recommended)</p>
                                    </div>
                                </div>
                                <button className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-slate-900 text-white rounded-lg">Enable</button>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                        <div className="p-8 border-b border-slate-50">
                            <h3 className="font-black text-slate-900 mb-1">App Preferences</h3>
                            <p className="text-xs font-bold text-slate-400">Customize your Dayflow experience.</p>
                        </div>
                        <div className="px-8 pb-8 pt-4 space-y-4">
                            <PreferenceToggle label="Push Notifications" desc="Get real-time updates on leave status" enabled />
                            <PreferenceToggle label="Email Summaries" desc="Weekly attendance and payroll overview" />
                            <PreferenceToggle label="Developer Mode" desc="Enable advanced debugging features" />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

const SettingsTab = ({ icon, label, active }) => (
    <button className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${active
            ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
            : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
        }`}>
        {icon}
        {label}
    </button>
);

const PreferenceToggle = ({ label, desc, enabled = false }) => (
    <div className="flex items-center justify-between py-2">
        <div>
            <p className="text-sm font-black text-slate-800">{label}</p>
            <p className="text-[10px] font-bold text-slate-400">{desc}</p>
        </div>
        <button className={`w-12 h-6 rounded-full relative transition-all ${enabled ? 'bg-blue-600' : 'bg-slate-200'}`}>
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${enabled ? 'left-7' : 'left-1'}`}></div>
        </button>
    </div>
);

export default Settings;
