import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Clock, Mail, Lock, ArrowRight, Github, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: signInError } = await signIn({ email, password });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-6 bg-[#f8fafc]">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-xl w-full flex flex-col md:flex-row bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/40 overflow-hidden">
        {/* Left Side - Visual */}
        <div className="hidden md:flex w-2/5 bg-blue-600 p-12 text-white flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <Clock size={32} strokeWidth={3} />
              <span className="text-2xl font-black tracking-tight">Dayflow</span>
            </div>
            <h2 className="text-3xl font-bold leading-tight">Master your workday, simplify your HR.</h2>
          </div>
          <div className="text-blue-100 text-sm">
            Join 1,000+ teams managing people smarter.
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 p-10 md:p-14">
          <div className="md:hidden flex items-center gap-2 mb-8 text-blue-600">
            <Clock size={28} strokeWidth={3} />
            <span className="text-xl font-black tracking-tight text-slate-900">Dayflow</span>
          </div>

          <h1 className="text-3xl font-black text-slate-900 mb-2">Welcome back</h1>
          <p className="text-slate-500 mb-8 font-medium">Use your Email or Employee ID (e.g., OIJODO2022001) to sign in.</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email or Employee ID</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Mail size={18} />
                </span>
                <input
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-100/50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium text-slate-900"
                  placeholder="OIJODO/Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-100/50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium text-slate-900"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between ml-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="w-5 h-5 border-2 border-slate-200 rounded group-hover:border-blue-400 peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all"></div>
                    <CheckCircle2 size={12} className="absolute left-1 top-1 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 group-hover:text-slate-700 transition-colors">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert("Password reset link sent to your work email (Simulated)")}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group h-14"
              >
                {loading ? <Loader2 className="animate-spin text-white" size={24} /> : <>Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span>Or</span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            <p className="text-center text-slate-600 font-bold">
              New here? <Link to="/signup" className="text-blue-600 hover:underline">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
