import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.tsx";
import { registerUser } from "../services/auth.service.ts";
import { useNavigate, Link } from "react-router-dom";
import { GraduationCap, Mail, Lock, User, Phone, Loader2, ArrowRight, BookOpen, MapPin, School } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [courseInterest, setCourseInterest] = useState("");
  const [qualification, setQualification] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !courseInterest || !qualification || !city) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Phone validation (optional but if provided must include country code)
    if (phone && !phone.startsWith("+")) {
      toast.error("Phone number must include '+' and country code (e.g. +919876543210)");
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser({
        name,
        email,
        password,
        phone: phone || undefined,
        courseInterest,
        qualification,
        city,
      });
      login(data.token, data.user);
      toast.success("Admission profile submitted successfully.");
      navigate("/");
    } catch (err: any) {
      console.error("Registration failure:", err);
      toast.error(err.response?.data?.message || err.message || "Registration failed. Email may already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-50 font-body">
      
      {/* Visual Panel (Left - hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-maroon relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25 scale-105" 
             style={{ backgroundImage: `url('https://res.cloudinary.com/dpvbaiyus/image/upload/v1772014920/campus_lnna9a.avif')` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-maroon-dark via-maroon to-maroon-light/90" />
        
        <div className="relative max-w-md text-left space-y-6 text-white z-10">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-10 w-10 text-rose-300" />
            <span className="font-heading text-3xl font-bold tracking-tight">EduReach</span>
          </div>
          
          <h2 className="font-heading text-4xl font-extrabold leading-tight">
            Create Your Free Student Profile
          </h2>
          
          <p className="text-sm text-rose-100/80 leading-relaxed">
            Register your profile to explore expert mentors, browse full placement stats, and request instant AI outbound counselor telephone calls in under 10 seconds.
          </p>

          <div className="border-t border-white/20 pt-6 flex items-center gap-4 text-xs font-semibold text-rose-200">
            <div>25-acre Smart Campus</div>
            <div className="h-1 w-1 bg-white/40 rounded-full" />
            <div>92% Global Placements</div>
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
              Get Started with EduReach
            </h1>
            <p className="text-xs text-gray-500">
              Submit your admission details and unlock student dashboards.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            
            {/* Name Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 pl-12 pr-4 py-3 text-sm font-medium text-gray-900 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
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
                  className="w-full rounded-xl border border-gray-200 pl-12 pr-4 py-3 text-sm font-medium text-gray-900 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Phone Number <span className="text-[10px] text-gray-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  placeholder="+919876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 pl-12 pr-4 py-3 text-sm font-medium text-gray-900 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all duration-200"
                />
              </div>
              <span className="text-[9px] text-gray-400 leading-none">
                * Pre-populates voice counseling widgets. Format: +[country_code][number].
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                  Course Interest
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    required
                    value={courseInterest}
                    onChange={(e) => setCourseInterest(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-gray-200 pl-12 pr-4 py-3 text-sm font-medium text-gray-900 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all duration-200 bg-white"
                  >
                    <option value="">Select course</option>
                    <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                    <option value="B.Tech Information Technology">B.Tech Information Technology</option>
                    <option value="B.Tech Electronics">B.Tech Electronics</option>
                    <option value="MBA">MBA</option>
                    <option value="M.Tech">M.Tech</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                  Qualification
                </label>
                <div className="relative">
                  <School className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="Class 12 / Degree"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 pl-12 pr-4 py-3 text-sm font-medium text-gray-900 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                City
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="Hyderabad"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 pl-12 pr-4 py-3 text-sm font-medium text-gray-900 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 pl-12 pr-4 py-3 text-sm font-medium text-gray-900 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-maroon py-3.5 text-sm font-bold text-white shadow-lg hover:bg-maroon-light transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 pt-3"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Submit Admission Form
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

          </form>

          {/* Footer Link */}
          <p className="text-center text-xs text-gray-500 font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-maroon font-bold hover:underline">
              Sign In
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}
