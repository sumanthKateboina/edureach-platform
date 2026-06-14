import { useState } from "react";
import { useAuth } from "../context/AuthContext.tsx";
import { initiateCall } from "../services/vapi.service.ts";
import { vapiFormContent } from "../data/content.ts";
import { X, PhoneCall, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "react-hot-toast";

interface CallPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CallPopup({ isOpen, onClose }: CallPopupProps) {
  const { user } = useAuth();
  const [phone, setPhone] = useState(user?.phone || "");
  const [course, setCourse] = useState(vapiFormContent.courses[0] || "");
  const [topic, setTopic] = useState(vapiFormContent.topics[0] || "");
  const [status, setStatus] = useState<"idle" | "calling" | "success" | "callback" | "failed">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedPhone = phone.replace(/[\s()-]/g, "");
    if (!normalizedPhone) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    
    if (!/^\+[1-9]\d{7,14}$/.test(normalizedPhone) && !/^[6-9]\d{9}$/.test(normalizedPhone)) {
      toast.error("Phone number must include country code (e.g., +919876543210)");
      return;
    }

    setStatus("calling");
    setErrorMessage("");

    try {
      const result = await initiateCall({ phone: normalizedPhone, course, topic });
      if (result.data?.fallback) {
        setStatus("callback");
        toast.success("Callback request received.");
      } else {
        setStatus("success");
        toast.success("AI counselor is calling you!");
      }
    } catch (err: any) {
      console.error("Vapi trigger failed:", err);
      setStatus("failed");
      setErrorMessage(err.response?.data?.message || err.message || "We could not start the call right now.");
      toast.error("Could not start the call.");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setPhone(user?.phone || "");
    setErrorMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-md rounded-2xl bg-white border border-gray-100 p-8 shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col justify-between">
        
        {/* Close Button */}
        <button
          onClick={resetForm}
          className="absolute top-4 right-4 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Idle form state */}
        {status === "idle" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-maroon/10 text-maroon border border-maroon/5">
                <PhoneCall className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-xl font-bold text-gray-900">
                Talk to Our AI Counselor
              </h3>
              <p className="font-body text-xs text-gray-500 max-w-xs mx-auto">
                Get personalized guidance on courses, admissions, and campus fests instantly.
              </p>
            </div>

            {/* Fields */}
            <div className="space-y-4 text-left">
              
              {/* Phone Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+919876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all duration-200"
                />
                <span className="text-[10px] text-gray-400 font-medium">
                  * Use country code. Indian numbers are saved as callback requests if live voice dispatch is unavailable.
                </span>
              </div>

              {/* Course Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                  Preferred Course
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-3 text-sm font-medium text-gray-800 bg-white focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all duration-200"
                >
                  {vapiFormContent.courses.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Topic Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                  Discussion Topic
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-3 text-sm font-medium text-gray-800 bg-white focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all duration-200"
                >
                  {vapiFormContent.topics.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-maroon py-3 text-sm font-bold text-white shadow-md hover:bg-maroon-light transition-all duration-200"
            >
              Initiate Free Counseling Call
            </button>

          </form>
        )}

        {/* Calling state */}
        {status === "calling" && (
          <div className="py-8 flex flex-col items-center justify-center space-y-6 text-center">
            <div className="relative flex items-center justify-center h-20 w-20">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-maroon/20 opacity-75" />
              <div className="rounded-full bg-maroon/10 text-maroon p-5 border border-maroon/5 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-gray-900">
                Calling you now...
              </h3>
              <p className="font-body text-xs text-gray-500 leading-relaxed max-w-xs">
                Our voice counselor is contacting you at <span className="text-maroon font-bold">{phone}</span>. Please keep your phone unlocked.
              </p>
            </div>
          </div>
        )}

        {/* Success state */}
        {status === "success" && (
          <div className="py-8 flex flex-col items-center justify-center space-y-6 text-center">
            <div className="rounded-full bg-emerald-100 text-emerald-600 p-5 border border-emerald-50 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-gray-900">
                Call Initiated!
              </h3>
              <p className="font-body text-xs text-gray-500 leading-relaxed max-w-xs">
                Your phone line is now active. You will receive a call from our counselor shortly.
              </p>
            </div>

            <button
              onClick={resetForm}
              className="w-full rounded-xl bg-gray-900 py-3 text-sm font-bold text-white hover:bg-gray-800 transition-all duration-200"
            >
              Done
            </button>
          </div>
        )}

        {/* Callback fallback state */}
        {status === "callback" && (
          <div className="py-8 flex flex-col items-center justify-center space-y-6 text-center">
            <div className="rounded-full bg-amber-100 text-amber-600 p-5 border border-amber-50 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-gray-900">
                Callback Requested
              </h3>
              <p className="font-body text-xs text-gray-500 leading-relaxed max-w-xs">
                Your number has been received. Our admissions team will contact you from the college line because instant voice dispatch is not available for this number.
              </p>
            </div>

            <button
              onClick={resetForm}
              className="w-full rounded-xl bg-gray-900 py-3 text-sm font-bold text-white hover:bg-gray-800 transition-all duration-200"
            >
              Done
            </button>
          </div>
        )}

        {/* Failed state */}
        {status === "failed" && (
          <div className="py-8 flex flex-col items-center justify-center space-y-6 text-center">
            <div className="rounded-full bg-rose-100 text-rose-600 p-5 border border-rose-50 flex items-center justify-center">
              <AlertCircle className="h-10 w-10" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-gray-900">
                Call Failed
              </h3>
              <p className="font-body text-xs text-gray-500 leading-relaxed max-w-xs">
                {errorMessage || "We could not start the voice call right now. Please retry in a moment."}
              </p>
            </div>

            <div className="flex gap-3 w-full pt-2">
              <button
                onClick={() => setStatus("idle")}
                className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all duration-200"
              >
                Retry
              </button>
              <button
                onClick={resetForm}
                className="flex-1 rounded-xl bg-gray-900 py-3 text-sm font-bold text-white hover:bg-gray-800 transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
