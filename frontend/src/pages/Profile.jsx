import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    Pencil,
    Plus,
    Mail,
    Phone,
    Building,
    Briefcase,
    MapPin,
    User,
    Heart,
    Award,
    Zap
} from 'lucide-react';

const SalaryField = ({ label, amount, percentage, onChangePercent, sub, isPF, isAmountOnly }) => (
    <div className="space-y-1">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-1">
            <label className="text-sm font-bold text-slate-700">{label}</label>
            <div className="flex items-center gap-4">
                <div className="flex items-center border-b border-transparent focus-within:border-slate-300">
                    <input
                        type="number"
                        readOnly
                        value={amount.toFixed(2)}
                        className="bg-transparent font-black text-right text-slate-900 outline-none w-24"
                    />
                    <span className="text-[10px] font-black text-slate-400 ml-1">₹ / month</span>
                </div>
                {!isAmountOnly && (
                    <div className="flex items-center border-b border-transparent focus-within:border-slate-300">
                        <input
                            type="number"
                            value={percentage}
                            onChange={(e) => onChangePercent(Number(e.target.value))}
                            className="bg-transparent font-black text-right text-slate-900 outline-none w-12"
                        />
                        <span className="text-[10px] font-black text-slate-400 ml-1">%</span>
                    </div>
                )}
            </div>
        </div>
        <p className="text-[10px] font-bold text-slate-400 leading-tight">{sub}</p>
    </div>
);

const Profile = () => {
    const { profile } = useAuth();
    const [activeTab, setActiveTab] = useState('Private Info');

    // RBAC: Only HR can see Salary Info
    const isAdmin = profile?.role === 'hr';
    const tabs = isAdmin ? ['Resume', 'Private Info', 'Salary Info'] : ['Resume', 'Private Info'];

    // Salary Mock State
    const [wage, setWage] = useState(50000);
    const [percentBasic, setPercentBasic] = useState(50);
    const [percentHRA, setPercentHRA] = useState(50);
    const [percentStandard, setPercentStandard] = useState(16.67);
    const [percentBonus, setPercentBonus] = useState(8.33);
    const [percentLTA, setPercentLTA] = useState(8.33);
    const [percentFixed, setPercentFixed] = useState(11.67);
    const [percentPF, setPercentPF] = useState(12);

    const basicSalary = wage * (percentBasic / 100);
    const hra = basicSalary * (percentHRA / 100);
    const standardAllowance = basicSalary * (percentStandard / 100);
    const performanceBonus = basicSalary * (percentBonus / 100);
    const lta = basicSalary * (percentLTA / 100);
    const fixedAllowance = basicSalary * (percentFixed / 100);

    const employeePF = basicSalary * (percentPF / 100);
    const employerPF = basicSalary * (percentPF / 100);
    const professionalTax = 200;

    return (
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 mb-12">
            {/* Form Header / Breadcrumbs */}
            <div className="bg-slate-50 px-10 py-4 border-b border-slate-100 flex items-center justify-between">
                <h1 className="text-xl font-black text-slate-800 tracking-tight">My Profile</h1>
                <div className="flex gap-2">
                    <button className="px-6 py-2 bg-[#714B67] text-white rounded-lg font-black text-xs uppercase tracking-widest shadow-md hover:bg-[#5a3c52] transition-colors">Save</button>
                    <button className="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors">Discard</button>
                </div>
            </div>

            <div className="p-10">
                {/* Main Info Section (Always Visible) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
                    {/* Avatar Section */}
                    <div className="lg:col-span-3 flex flex-col items-center">
                        <div className="relative group cursor-pointer">
                            <div className="w-48 h-48 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                                {profile?.avatar ? (
                                    <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User size={80} className="text-slate-300" />
                                )}
                            </div>
                            <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-[#714B67] p-3 rounded-full text-white shadow-lg">
                                    <Pencil size={20} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Identity & Basic Info */}
                    <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <div className="border-b-2 border-slate-900 pb-2">
                                <h2 className="text-4xl font-black text-slate-900 tracking-tight">{profile?.full_name || 'My Name'}</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Login ID</label>
                                    <input type="text" readOnly value={profile?.id?.slice(0, 8)} className="bg-transparent font-bold text-slate-700 outline-none" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Email</label>
                                    <input type="text" readOnly value={profile?.email} className="bg-transparent font-bold text-slate-700 outline-none" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Mobile</label>
                                    <input type="text" placeholder="+91 00000 00000" className="bg-transparent border-b border-transparent focus:border-slate-200 font-bold text-slate-700 outline-none transition-colors" />
                                </div>
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
                                    <input type="text" readOnly value={profile?.department || 'Engineering'} className="flex-1 bg-transparent font-bold text-slate-700 outline-none" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <label className="w-24 text-[11px] font-black uppercase tracking-widest text-slate-400">Manager</label>
                                    <input type="text" placeholder="Select Manager" className="flex-1 bg-transparent border-b border-transparent focus:border-slate-200 font-bold text-slate-700 outline-none transition-colors" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <label className="w-24 text-[11px] font-black uppercase tracking-widest text-slate-400">Location</label>
                                    <input type="text" readOnly value="Gandhinagar, India" className="flex-1 bg-transparent font-bold text-slate-700 outline-none" />
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
                {activeTab === 'Salary Info' && isAdmin ? (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* Wages Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 border-b border-slate-200 pb-2">
                                    <label className="w-32 text-sm font-black text-slate-600">Month Wage</label>
                                    <input
                                        type="number"
                                        value={wage}
                                        onChange={(e) => setWage(Number(e.target.value))}
                                        className="flex-1 bg-transparent font-black text-xl text-slate-900 outline-none"
                                    />
                                    <span className="text-slate-400 font-bold">/ Month</span>
                                </div>
                                <div className="flex items-center gap-4 border-b border-slate-200 pb-2">
                                    <label className="w-32 text-sm font-black text-slate-600">Yearly Wage</label>
                                    <input type="number" readOnly value={wage * 12} className="flex-1 bg-transparent font-black text-xl text-slate-900 outline-none" />
                                    <span className="text-slate-400 font-bold">/ Yearly</span>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-black text-slate-600">No. of working days in a week:</label>
                                    <input type="text" placeholder="5" className="border-b border-slate-200 font-black text-slate-900 outline-none py-1" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <label className="text-sm font-black text-slate-600">Break Time:</label>
                                    <div className="flex-1 flex items-center border-b border-slate-200">
                                        <input type="text" placeholder="1" className="bg-transparent font-black text-slate-900 outline-none py-1 w-full" />
                                        <span className="text-slate-400 font-black text-xl">/hrs</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Components & Contributions Split */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* Left: Salary Components */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-black text-slate-900 border-b-2 border-[#714B67] w-fit mb-8 pb-1">Salary Components</h3>
                                <div className="space-y-8">
                                    <SalaryField label="Basic Salary" amount={basicSalary} percentage={percentBasic} onChangePercent={setPercentBasic} sub="Define Basic salary from company cost compute it based on monthly Wages" />
                                    <SalaryField label="House Rent Allowance" amount={hra} percentage={percentHRA} onChangePercent={setPercentHRA} sub="HRA provided to employees 50% of the basic salary" />
                                    <SalaryField label="Standard Allowance" amount={standardAllowance} percentage={percentStandard} onChangePercent={setPercentStandard} sub="A standard allowance is a predetermined, fixed amount provided to employee as part of their salary" />
                                    <SalaryField label="Performance Bonus" amount={performanceBonus} percentage={percentBonus} onChangePercent={setPercentBonus} sub="Variable amount paid during payroll. The value defined by the company and calculated as a % of the basic salary" />
                                    <SalaryField label="Leave Travel Allowance" amount={lta} percentage={percentLTA} onChangePercent={setPercentLTA} sub="LTA is paid by the company to cover their travel expenses. and calculated as a % of the basic salary" />
                                    <SalaryField label="Fixed Allowance" amount={fixedAllowance} percentage={percentFixed} onChangePercent={setPercentFixed} sub="Fixed allowance portion of wages is determined after calculating all salary components" />
                                </div>
                            </div>

                            {/* Right: PF & Tax */}
                            <div className="space-y-12">
                                <div>
                                    <h3 className="text-lg font-black text-slate-900 border-b-2 border-[#714B67] w-fit mb-8 pb-1">Provident Fund (PF) Contribution</h3>
                                    <div className="space-y-8">
                                        <SalaryField label="Employee" amount={employeePF} percentage={percentPF} onChangePercent={setPercentPF} sub="PF is calculated based on the basic salary" isPF />
                                        <SalaryField label="Employer" amount={employerPF} percentage={percentPF} onChangePercent={setPercentPF} sub="PF is calculated based on the basic salary" isPF />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-slate-900 border-b-2 border-[#714B67] w-fit mb-8 pb-1">Tax Deductions</h3>
                                    <div className="space-y-8">
                                        <SalaryField label="Professional Tax" amount={professionalTax} sub="Professional Tax deducted from the Gross salary" isAmountOnly />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : activeTab === 'Resume' || activeTab === 'Private Info' ? (

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
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
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
                                    <button className="mt-6 flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors">
                                        <Plus size={14} /> Add Skills
                                    </button>
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
                                    <button className="mt-6 flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors">
                                        <Plus size={14} /> Add Certification
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Profile;
