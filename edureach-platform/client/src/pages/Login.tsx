import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.tsx";
import { loginUser } from "../services/auth.service.ts";
import { useNavigate, Link } from "react-router-dom";
import { GraduationCap, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      login(data.token);
      toast.success("Welcome back! Login successful.");
      navigate("/");
    } catch (err: any) {
      console.error("Login failure:", err);
      toast.error(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-50 font-body">
      
      {/* Visual Panel (Left - hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-maroon relative items-center justify-center p-12 overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute inset-0 bg-cover bg-center opacity-25 scale-105" 
             style={{ backgroundImage: `url('https://res.cloudinary.com/dpvbaiyus/image/upload/v1772014920/campus_lnna9a.avif')` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-maroon-dark via-maroon to-maroon-light/90" />
        
        <div className="relative max-w-md text-left space-y-6 text-white z-10">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-10 w-10 text-rose-300" />
            <span className="font-heading text-3xl font-bold tracking-tight">EduReach</span>
          </div>
          
          <h2 className="font-heading text-4xl font-extrabold leading-tight">
            Unlock the Gateway to Smarter Education
          </h2>
          
          <p className="text-sm text-rose-100/80 leading-relaxed">
            Gain immediate access to AI-powered admissions guidance, departmental statistics, and outbound voice counselors. Join thousands of students making smarter academic decisions today.
          </p>

          <div className="border-t border-white/20 pt-6 flex items-center gap-4 text-xs font-semibold text-rose-200">
            <div>Autonomous Counselor Calls</div>
            <div className="h-1 w-1 bg-white/40 rounded-full" />
            <div>Gemini RAG Assistant</div>
          </div>
        </div>
      </div>

      {/* Form Panel (Right) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Header */}
          <div className="text-center space-y-2 lg:text-left">
            <a href="/" className="lg:hidden inline-flex items-center gap-2 text-maroon mb-4">
              <GraduationCap className="h-8 w-8" />
              <span className="font-heading text-xl font-bold tracking-tight">EduReach</span>
            </a>
            <h1 className="font-heading text-3xl font-bold text-gray-900">
              Sign In to Your Account
            </h1>
            <p className="text-xs text-gray-500">
              Enter your credentials to unlock premium university dashboards.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 pl-12 pr-4 py-3.5 text-sm font-medium text-gray-900 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 pl-12 pr-4 py-3.5 text-sm font-medium text-gray-900 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-maroon py-3.5 text-sm font-bold text-white shadow-lg hover:bg-maroon-light transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

          </form>

          {/* Footer Link */}
          <p className="text-center text-xs text-gray-500 font-medium">
            Don't have an account?{" "}
            <Link to="/signup" className="text-maroon font-bold hover:underline">
              Register now for free
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}
