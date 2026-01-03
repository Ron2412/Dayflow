import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import {
    Pencil,
    Plus,
    User,
    Heart,
    Award,
    Zap,
    CheckCircle2
} from 'lucide-react';

const SalaryField = ({ label, amount, sub, isAmountOnly }) => (
    <div className="space-y-1">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-1">
            <label className="text-sm font-bold text-slate-700">{label}</label>
            <div className="flex items-center gap-4">
                <div className="flex items-center border-b border-transparent">
                    <input
                        type="number"
                        readOnly
                        value={amount?.toFixed(2) || 0}
                        className="bg-transparent font-black text-right text-slate-900 outline-none w-24"
                    />
                    <span className="text-[10px] font-black text-slate-400 ml-1">₹ / month</span>
                </div>
            </div>
        </div>
        <p className="text-[10px] font-bold text-slate-400 leading-tight">{sub}</p>
    </div>
);

const Profile = () => {
    const { profile } = useAuth();
    const [activeTab, setActiveTab] = useState('Private Info');
    const [isEditing, setIsEditing] = useState(false);

    // Salary Data from API
    const [salaryData, setSalaryData] = useState(null);

    useEffect(() => {
        if (profile?.id && activeTab === 'Salary Info') {
            api.get(`/payroll?userId=${profile.id}`)
                .then(res => setSalaryData(res.data))
                .catch(err => console.error("Error fetching salary:", err));
        }
    }, [profile, activeTab]);


    // Initial State from Profile
    const [formData, setFormData] = useState({
        full_name: profile?.full_name || 'My Name',
        email: profile?.email || '',
        phone: profile?.phone || '+91 00000 00000',
        address: profile?.address || 'Gandhinagar, India',
        designation: profile?.designation || 'Staff Member',
        department: profile?.department || 'Engineering',
        manager: profile?.manager || '',
        avatar: profile?.avatar || null
    });

    // RBAC: Only HR can see Salary Info (Wait, User wants "user can see... but cannot change")
    // Use Case: User Can See Salary. Admin Can Edit (in AdminPayroll page).
    // So everyone can see Salary Info, but it's Read Only.
    const tabs = ['Resume', 'Private Info', 'Salary Info'];

    const [showToast, setShowToast] = useState(false);

    const handleSave = () => {
        // Simulation: save to user object
        setIsEditing(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Helper to determine if a field is editable for the current user
    const canEditField = (fieldName) => {
        if (!isEditing) return false;
        // Edit logic for Personal Info only
        const editableFields = ['phone', 'address', 'avatar', 'full_name', 'department', 'designation'];
        // In real app, RBAC would limit 'designation' etc.
        return editableFields.includes(fieldName);
    };

    const InputField = ({ label, name, type = 'text', readOnly = false }) => (
        <div className="flex flex-col">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</label>
            <input
                type={type}
                readOnly={!canEditField(name) || readOnly}
                value={formData[name]}
                onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
                className={`bg-transparent font-bold outline-none transition-all ${canEditField(name)
                    ? 'border-b border-blue-500 text-slate-900 focus:bg-blue-50/50 px-1'
                    : 'text-slate-700'
                    }`}
            />
        </div>
    );

    return (
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 mb-12">
            {/* Form Header / Breadcrumbs */}
            <div className="bg-slate-50 px-10 py-4 border-b border-slate-100 flex items-center justify-between">
                <h1 className="text-xl font-black text-slate-800 tracking-tight">My Profile</h1>
                <div className="flex gap-2">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-6 py-2 bg-[#714B67] text-white rounded-lg font-black text-xs uppercase tracking-widest shadow-md hover:bg-[#5a3c52] transition-colors"
                        >
                            Edit
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-black text-xs uppercase tracking-widest shadow-md hover:bg-emerald-700 transition-colors"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors"
                            >
                                Discard
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="p-10">
                {/* Main Info Section (Always Visible) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
                    {/* Avatar Section */}
                    <div className="lg:col-span-3 flex flex-col items-center">
                        <div className="relative group cursor-pointer">
                            <div className="w-48 h-48 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                                {formData.avatar ? (
                                    <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User size={80} className="text-slate-300" />
                                )}
                            </div>
                            {canEditField('avatar') && (
                                <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="bg-[#714B67] p-3 rounded-full text-white shadow-lg">
                                        <Pencil size={20} />
                                    </div>
                                </div>
                            )}
                        </div>
                        {isEditing && <p className="text-[10px] font-bold text-slate-400 mt-4 text-center uppercase tracking-tighter">Tap to update photo</p>}
                    </div>

                    {/* Identity & Basic Info */}
                    <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <div className={`border-b-2 pb-2 transition-colors ${isEditing ? 'border-blue-500' : 'border-slate-900'}`}>
                                <input
                                    type="text"
                                    readOnly={!canEditField('full_name')}
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    className="text-4xl font-black text-slate-900 tracking-tight bg-transparent w-full outline-none"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Employee ID</label>
                                    <input type="text" readOnly value={profile?.employee_id || profile?.id?.slice(0, 8)} className="bg-transparent font-bold text-slate-700 outline-none" />
                                </div>
                                <InputField label="Email Address" name="email" readOnly={true} />
                                <InputField label="Phone Number" name="phone" />
                            </div>
                        </div>

                        <div className="space-y-6 pt-12 md:pt-14">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <label className="w-24 text-[11px] font-black uppercase tracking-widest text-slate-400">Company</label>
                                    <input type="text" readOnly value="Odoo India" className="flex-1 bg-transparent font-bold text-slate-700 outline-none" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <label className="w-24 text-[11px] font-black uppercase tracking-widest text-slate-400">Department</label>
                                    <input
                                        type="text"
                                        readOnly={!canEditField('department')}
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                        className={`flex-1 bg-transparent font-bold outline-none transition-all ${canEditField('department') ? 'border-b border-blue-500 text-slate-900' : 'text-slate-700'}`}
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <label className="w-24 text-[11px] font-black uppercase tracking-widest text-slate-400">Designation</label>
                                    <input
                                        type="text"
                                        readOnly={!canEditField('designation')}
                                        value={formData.designation}
                                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                                        className={`flex-1 bg-transparent font-bold outline-none transition-all ${canEditField('designation') ? 'border-b border-blue-500 text-slate-900' : 'text-slate-700'}`}
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <label className="w-24 text-[11px] font-black uppercase tracking-widest text-slate-400">Location</label>
                                    <input
                                        type="text"
                                        readOnly={!canEditField('address')}
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className={`flex-1 bg-transparent font-bold outline-none transition-all ${canEditField('address') ? 'border-b border-blue-500 text-slate-900' : 'text-slate-700'}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="flex border-b border-slate-100 mb-10">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab
                                ? 'text-[#714B67] border-b-2 border-[#714B67] bg-slate-50'
                                : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'Salary Info' ? (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-300 min-h-[400px]">
                        {salaryData ? (
                            <>
                                {/* Wages Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                    <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100 space-y-6">
                                        <h3 className="text-lg font-black text-slate-900 border-b-2 border-slate-200 pb-2">Monthly Compensation</h3>
                                        <div className="flex items-center gap-4">
                                            <div className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl">
                                                <Zap size={24} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Net Salary</p>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-3xl font-black text-slate-900">
                                                        ₹ {Number(salaryData.net_salary).toLocaleString('en-IN')}
                                                    </span>
                                                    <span className="text-xs font-bold text-slate-400">/ month</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Components & Contributions Split */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                                    {/* Left: Salary Components */}
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-black text-slate-900 border-b-2 border-[#714B67] w-fit mb-8 pb-1">Earnings</h3>
                                        <div className="space-y-6 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                                            <SalaryField label="Basic Salary" amount={salaryData.basic} sub="50% of monthly wage" />
                                            <SalaryField label="House Rent Allowance" amount={salaryData.hra} sub="50% of Basic Salary" />

                                            {/* Granular Allowances if available, else fallback */}
                                            {salaryData.wage ? (
                                                <>
                                                    <SalaryField label="Standard Allowance" amount={salaryData.std_allowance} sub="Fixed statutory allowance" />
                                                    <SalaryField label="Performance Bonus" amount={salaryData.perf_bonus} sub="8.33% of Wage" />
                                                    <SalaryField label="Leave Travel Allowance" amount={salaryData.lta} sub="8.333% of Wage" />
                                                    <SalaryField label="Fixed Allowance" amount={salaryData.fixed_allowance} sub="Balancing component" />
                                                </>
                                            ) : (
                                                <SalaryField label="Special Allowances" amount={salaryData.allowances} sub="Fixed additional compensation" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Right: PF & Tax */}
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-black text-slate-900 border-b-2 border-red-500 w-fit mb-8 pb-1">Deductions</h3>
                                        <div className="space-y-6 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                                            {salaryData.wage ? (
                                                <>
                                                    <SalaryField label="Provident Fund" amount={salaryData.pf} sub="12% of Basic" isAmountOnly />
                                                    <SalaryField label="Professional Tax" amount={salaryData.pt} sub="Fixed State Tax" isAmountOnly />
                                                </>
                                            ) : (
                                                <SalaryField label="Total Deductions" amount={salaryData.deductions} sub="PF, Professional Tax, and Income Tax" isAmountOnly />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-slate-200 rounded-[2.5rem]">
                                <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4">
                                    <Zap size={32} />
                                </div>
                                <h3 className="text-lg font-black text-slate-900">No Salary Info Available</h3>
                                <p className="text-slate-400 font-bold max-w-xs mt-2">Salary information hasn't been generated for your profile yet. Please contact HR.</p>
                            </div>
                        )}
                    </div>
                ) : activeTab === 'Resume' || activeTab === 'Private Info' ? (
                    // Resume / Private Info View (Static for now, same as before)
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 animate-in fade-in duration-300">
                        {/* Left Column: About & Interests */}
                        <div className="lg:col-span-7 space-y-12">
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <User size={20} className="text-[#714B67]" />
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight">About</h3>
                                </div>
                                <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                                    <p className="text-sm text-slate-600 leading-relaxed font-bold">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <Heart size={20} className="text-[#714B67]" />
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight">What I love about my job</h3>
                                </div>
                                <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 italic">
                                    <p className="text-sm text-slate-600 leading-relaxed font-bold">
                                        "Helping businesses scale with robust open-source solutions and working with the brilliant minds at Odoo India."
                                    </p>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <Plus size={20} className="text-[#714B67]" />
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight">My interests and hobbies</h3>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed font-bold pl-2 border-l-4 border-[#714B67]">
                                    Open source contribution, high-altitude trekking, and mentoring junior developers.
                                </p>
                            </section>
                        </div>

                        {/* Right Column: Skills & Certifications */}
                        <div className="lg:col-span-5 space-y-12">
                            <section>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <Zap size={20} className="text-[#714B67]" />
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Skills</h3>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm min-h-[200px] flex flex-col">
                                    <div className="flex flex-wrap gap-2 mb-auto">
                                        {['React', 'UI/UX', 'Node.js', 'Python'].map(skill => (
                                            <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-black uppercase tracking-tight">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3 text-red-100">
                                        <Award size={20} className="text-[#714B67]" />
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Certification</h3>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm min-h-[200px] flex flex-col">
                                    <div className="flex flex-col gap-4 mb-auto">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-black">AWS</div>
                                            <div>
                                                <p className="text-sm font-black text-slate-800">Cloud Practitioner</p>
                                                <p className="text-[10px] font-bold text-slate-400">Valid until 2026</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                ) : null}
            </div>

            {/* Success Toast */}
            {showToast && (
                <div className="fixed bottom-10 right-10 bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-right duration-300 z-50">
                    <CheckCircle2 size={24} />
                    <div>
                        <p className="font-black text-sm uppercase tracking-widest">Profile Updated</p>
                        <p className="text-[10px] font-bold opacity-80">Changes have been saved successfully.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
