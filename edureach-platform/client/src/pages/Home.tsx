import { useState } from "react";
import { useAuth } from "../context/AuthContext.tsx";
import Navbar from "../components/Navbar.tsx";
import HeroSection from "../components/HeroSection.tsx";
import AboutSection from "../components/AboutSection.tsx";
import AchievementsSection from "../components/AchievementsSection.tsx";
import CoursesSection from "../components/CoursesSection.tsx";
import QuotesSection from "../components/QuotesSection.tsx";
import MentorsSection from "../components/MentorsSection.tsx";
import StudentLifeSection from "../components/StudentLifeSection.tsx";
import EventsGallery from "../components/EventsGallery.tsx";
import HiringStatsSection from "../components/HiringStatsSection.tsx";
import CounselorCTA from "../components/CounselorCTA.tsx";
import Footer from "../components/Footer.tsx";
import CallPopup from "../components/CallPopup.tsx";
import SignupPopup from "../components/SignupPopup.tsx";
import FloatingChatButton from "../components/FloatingChatButton.tsx";
import { Lock, Sparkles, Eye, PhoneCall } from "lucide-react";

export default function Home() {
  const { user } = useAuth();
  
  // Modal Triggers
  const [callOpen, setCallOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [hasTriggeredScrollGate, setHasTriggeredScrollGate] = useState(false);

  // Triggered the first time a non-logged visitor scrolls to the mentors section
  const handleScrollToMentors = () => {
    if (!user && !hasTriggeredScrollGate) {
      setHasTriggeredScrollGate(true);
      setSignupOpen(true);
    }
  };

  // Helper to open call popup or force register
  const handleCallRequest = () => {
    if (user) {
      setCallOpen(true);
    } else {
      setSignupOpen(true);
    }
  };

  // Helper to toggle chat drawer (Floating button handles this globally, but we can hook into it)
  const handleChatToggle = () => {
    if (!user) {
      setSignupOpen(true);
    } else {
      // Find the floating chat button and trigger click or open globally
      const chatBtn = document.querySelector('button[title*="Chat"]') as HTMLButtonElement;
      chatBtn?.click();
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-900 selection:bg-maroon selection:text-white">
      
      {/* Global Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection onCallClick={handleCallRequest} onChatClick={handleChatToggle} />

      {/* Institutional Highlights */}
      <AboutSection />
      <AchievementsSection />
      
      {/* Gated tabbed course offerings */}
      <CoursesSection />
      
      {/* Testimonials */}
      <QuotesSection />

      {/* Gated scroll-gated mentors block */}
      <MentorsSection onScrollToMentors={handleScrollToMentors} />

      {/* Gated Premium Features */}
      {user ? (
        <div className="animate-in fade-in duration-700">
          <StudentLifeSection />
          <EventsGallery />
          <HiringStatsSection />
          <CounselorCTA onCallClick={handleCallRequest} />
        </div>
      ) : (
        /* Gated Blurr Teaser block */
        <div className="relative py-24 bg-gray-50 overflow-hidden font-body text-center border-t border-gray-100">
          
          {/* Teaser Background (highly blurred) */}
          <div className="absolute inset-0 select-none pointer-events-none opacity-20 blur-xl scale-102 flex flex-col items-center justify-center space-y-16">
            <div className="h-40 w-full bg-slate-300" />
            <div className="h-40 w-full bg-slate-200" />
          </div>

          <div className="absolute inset-0 bg-white/70 backdrop-blur-[4px]" />

          {/* Gated Overlay Card */}
          <div className="relative max-w-xl mx-auto px-6 z-10 space-y-6">
            
            {/* Lock Circle */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-maroon/10 border border-maroon/5 text-maroon shadow-md relative">
              <Lock className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 items-center justify-center">
                  <Sparkles className="h-2 w-2 text-white" />
                </span>
              </span>
            </div>

            {/* Locked Copy Text */}
            <div className="space-y-3">
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                Premium College Insights Locked
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto">
                Join the prospective student portal to unlock campus infrastructure details, Placement logs, MNC recruiters, and AI-enabled voice callback counselor modules.
              </p>
            </div>

            {/* Locked Features Bullet Indicators */}
            <div className="max-w-sm mx-auto grid grid-cols-2 gap-3 text-left py-4 text-xs font-semibold text-gray-700 bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-maroon shrink-0" />
                Campus life gallery
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-maroon shrink-0" />
                Recruiter statistics
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-maroon shrink-0" />
                Outbound voice calls
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-maroon shrink-0" />
                Active AI counselors
              </div>
            </div>

            {/* Unlock Button */}
            <div className="pt-2">
              <button
                onClick={() => setSignupOpen(true)}
                className="rounded-xl bg-maroon hover:bg-maroon-light px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 inline-flex items-center gap-2 active:scale-98"
              >
                Create Account to Unlock Features
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer />

      {/* Floating RAG chat bubble */}
      <FloatingChatButton />

      {/* Outbound counseling modal */}
      <CallPopup isOpen={callOpen} onClose={() => setCallOpen(false)} />

      {/* Visitor register prompt modal */}
      <SignupPopup isOpen={signupOpen} onClose={() => setSignupOpen(false)} />

    </div>
  );
}
