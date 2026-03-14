import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signup(email, password, fullName);
      navigate('/dashboard');
    } catch (error) {
      // Error handled by AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-primary-50 relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating teeth decorations */}
        <div className="absolute top-20 right-10 opacity-5 animate-float">
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
            <path d="M50 10C35 10 25 20 25 35C25 45 22 55 22 65C22 75 27 85 35 85C40 85 42 80 45 75C47 71 48 70 50 70C52 70 53 71 55 75C58 80 60 85 65 85C73 85 78 75 78 65C78 55 75 45 75 35C75 20 65 10 50 10Z" fill="currentColor" className="text-primary-300"/>
          </svg>
        </div>
        <div className="absolute bottom-20 left-10 opacity-5 animate-float" style={{ animationDelay: '1s' }}>
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <path d="M50 10C35 10 25 20 25 35C25 45 22 55 22 65C22 75 27 85 35 85C40 85 42 80 45 75C47 71 48 70 50 70C52 70 53 71 55 75C58 80 60 85 65 85C73 85 78 75 78 65C78 55 75 45 75 35C75 20 65 10 50 10Z" fill="currentColor" className="text-blue-300"/>
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/4 opacity-5 animate-float" style={{ animationDelay: '2s' }}>
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="35" fill="currentColor" className="text-primary-200"/>
          </svg>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      {/* Main content */}
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full flex items-center justify-center gap-8 lg:gap-16">

          {/* Left side - Branding & Graphics */}
          <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center space-y-8 relative z-10">
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-primary-600 blur-3xl opacity-30 animate-pulse"></div>
                <Logo size="large" />
              </div>

              <div className="space-y-4 max-w-md">
                <h2 className="text-3xl font-bold text-gray-800">
                  Join DentBridge Today
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Start managing your dental practice efficiently. Sign up now and streamline your clinic operations.
                </p>

                {/* Benefits list */}
                <div className="space-y-3 pt-6 text-left">
                  {[
                    '✨ Easy Setup',
                    '🔒 Secure & Private',
                    '📱 Mobile Friendly',
                    '💼 Professional Tools',
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-gray-700 bg-white/50 backdrop-blur-sm px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className="text-xl">{benefit.split(' ')[0]}</span>
                      <span className="font-medium">{benefit.split(' ').slice(1).join(' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Signup Form */}
          <div className="w-full lg:w-1/2 max-w-md relative z-10">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8">
              <Logo size="medium" />
            </div>

            <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 sm:p-10 border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Create Account
                </h2>
                <p className="text-gray-600">
                  Get started with DentBridge
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name field */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Email field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      minLength={6}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Minimum 6 characters
                  </p>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent text-base font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-primary-600 hover:from-blue-700 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Sign in link */}
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      className="font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Free to Start</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>No Credit Card</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add floating animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .bg-grid-pattern {
          background-image:
            linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}} />
    </div>
  );
};

export default Signup;
