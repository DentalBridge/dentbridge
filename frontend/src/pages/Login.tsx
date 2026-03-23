import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import { Mail, Lock, ArrowRight, Shield, Clock, Award, Users, Sparkles} from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      // Error handled by AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE - Hero Cover Section */}
      <div className="hidden lg:flex lg:flex-1 relative bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0">
          {/* Large animated orbs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

          {/* Geometric grid pattern */}
          <div className="absolute inset-0 bg-grid-white opacity-10"></div>

          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-float-particles"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          {/* Logo and branding */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center border border-white/30">
                <svg width="60" height="60" viewBox="0 0 200 200" fill="none">
                  {/* Tooth outline */}
                  <g transform="translate(100, 100)">
                    <path
                      d="M 0,-70 C -22,-70 -38,-56 -38,-33 C -38,-18 -40,-3 -40,13 C -40,31 -34,47 -22,47 C -14,47 -12,39 -8,29 C -5,22 -3,20 0,20 C 3,20 5,22 8,29 C 12,39 14,47 22,47 C 34,47 40,31 40,13 C 40,-3 38,-18 38,-33 C 38,-56 22,-70 0,-70 Z"
                      fill="none"
                      stroke="white"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line x1="0" y1="20" x2="0" y2="42" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.6"/>
                  </g>
                  {/* Plus icon */}
                  <g transform="translate(155, 45)">
                    <circle cx="0" cy="0" r="18" fill="none" stroke="white" strokeWidth="3"/>
                    <line x1="0" y1="-10" x2="0" y2="10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    <line x1="-10" y1="0" x2="10" y2="0" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  </g>
                </svg>
              </div>
              <div>
                <h1 className="text-7xl font-black tracking-tight leading-none">
                  <span className="text-blue-100">Dent</span>
                  <span className="text-white">Bridge</span>
                </h1>
                <p className="text-base text-gray-300 tracking-wider uppercase font-bold mt-1">Healthcare</p>
              </div>
            </div>
          </div>

          {/* Hero content */}
          <div className="space-y-8 max-w-lg">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-medium">
                <Sparkles className="inline w-4 h-4 mr-2" />
                The Modern Dental Practice Platform
              </div>
              <h2 className="text-5xl font-bold leading-tight">
                Transform Your Dental Practice
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed">
                Streamline appointments, manage patients, and grow your practice with our all-in-one platform trusted by 500+ clinics.
              </p>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-1">HIPAA Compliant</h3>
                <p className="text-sm text-blue-100">Bank-level security</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-1">Save 10+ Hours</h3>
                <p className="text-sm text-blue-100">Weekly automation</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-1">500+ Clinics</h3>
                <p className="text-sm text-blue-100">Trust DentBridge</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-1">4.9/5 Rating</h3>
                <p className="text-sm text-blue-100">Customer reviews</p>
              </div>
            </div>
          </div>

          {/* 🔵 ADD YOUR CUSTOM MESSAGE HERE 🔵 */}
          {/* Simply uncomment below and edit the text */}
          {
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
              </div>
             <div>
               <p className="text-sm mb-2 italic">
                 Reach us at:
               </p>

               <p className="text-sm mb-1 italic">
                 <a href="mailto:appointments@dentbridgehealthcare.com" className="hover:underline">
                   appointments@dentbridgehealthcare.com
                 </a>
               </p>

               <p className="text-sm mb-2 italic">
                 <a href="mailto:founder@dentbridgehealthcare.com" className="hover:underline">
                   founder@dentbridgehealthcare.com
                 </a>,{" "}
                 <a href="mailto:help@dentbridgehealthcare.com" className="hover:underline">
                   help@dentbridgehealthcare.com
                 </a>

               </p>

               <p className="text-sm font-semibold">Raghavendra</p>
               <p className="text-xs text-blue-100">
                 Rajajinagar, Bengaluru
               </p>
             </div>
            </div>
          </div>
          }
        </div>
      </div>

      {/* RIGHT SIDE - Login Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Subtle background decorations */}
        <div className="absolute inset-0 overflow-hidden opacity-40">
          <div className="absolute top-10 right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-cyan-100 rounded-full blur-3xl"></div>
        </div>

        {/* Login card */}
        <div className="relative z-10 w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <Logo size="medium" showTagline={false} />
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">
                Sign in to access your dashboard
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 hover:border-gray-300"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 hover:border-gray-300"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex items-center justify-center gap-2 py-4 px-6 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                >
                  Create Account
                </Link>
              </p>
            </div>

            {/* Trust badges */}
            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>HIPAA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes float-particles {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }

        .animate-blob {
          animation: blob 20s infinite;
        }

        .animate-float-particles {
          animation: float-particles 10s ease-in infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .bg-grid-white {
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}} />
    </div>
  );
};

export default Login;
