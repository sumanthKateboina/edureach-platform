import { X, Lock, Sparkles } from "lucide-react";

interface SignupPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupPopup({ isOpen, onClose }: SignupPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-md rounded-2xl bg-white border border-gray-100 p-8 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 flex flex-col items-center text-center space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Lock Icon */}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-maroon/10 text-maroon mb-2 border border-maroon/5">
          <Lock className="h-7 w-7" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 items-center justify-center">
              <Sparkles className="h-2.5 w-2.5 text-white" />
            </span>
          </span>
        </div>

        {/* Copy text */}
        <div className="space-y-2">
          <h3 className="font-heading text-2xl font-bold text-gray-900 leading-snug">
            Unlock Full Access
          </h3>
          <p className="font-body text-sm text-gray-500 leading-relaxed px-2">
            Register a free student profile to explore premium campus galleries, placement logs, and schedule autonomous voice calls with academic counselors.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          <a
            href="/signup"
            className="block w-full rounded-xl bg-maroon py-3 text-sm font-bold text-white shadow-md hover:bg-maroon-light transition-all duration-200"
          >
            Create Free Account
          </a>
          <a
            href="/login"
            className="block w-full rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-maroon transition-all duration-200"
          >
            Sign In Instead
          </a>
        </div>

        {/* Small T&C */}
        <p className="text-[10px] text-gray-400 leading-snug">
          By registering, you obtain instant, unlimited access to our RAG Knowledge assistant and outbound phone counselor system.
        </p>

      </div>
    </div>
  );
}
