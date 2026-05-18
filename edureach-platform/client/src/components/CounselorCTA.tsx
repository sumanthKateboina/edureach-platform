import { PhoneCall } from "lucide-react";

interface CounselorCTAProps {
  onCallClick: () => void;
}

export default function CounselorCTA({ onCallClick }: CounselorCTAProps) {
  return (
    <section className="py-20 bg-gray-950 font-body relative overflow-hidden">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-1/2 left-1/4 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-maroon/20 blur-3xl" />
      <div className="absolute top-1/2 right-1/4 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-rose-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 w-full text-center z-10 space-y-6">
        
        {/* Title Group */}
        <div className="space-y-3">
          <span className="text-xs font-bold tracking-widest text-rose-300 uppercase block">
            Our Expert Counselors Are Just a Phone Call Away
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white leading-tight">
            Confused About Your Career Path?
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300 leading-relaxed">
            Get instant, personalized guidance regarding program curriculums, fee structures, vector scholarships, and placement trajectories. Test our voice agent or request a callback!
          </p>
        </div>

        {/* Action button with Pulsing call indicator */}
        <div className="pt-4 flex flex-col items-center justify-center space-y-4">
          <button
            onClick={onCallClick}
            className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-rose-500 to-maroon px-8 py-4.5 text-base font-bold text-white shadow-xl hover:shadow-rose-900/25 hover:translate-y-[-2px] hover:scale-102 transition-all duration-300"
          >
            {/* Phone Pulse */}
            <span className="relative flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-5 w-5 bg-white items-center justify-center">
                <PhoneCall className="h-3 w-3 text-maroon fill-maroon" />
              </span>
            </span>
            Request Instant AI Phone Call
          </button>

          <p className="text-xs text-gray-500">
            * Phone counselor calls are completely free of charge and process in under 10 seconds.
          </p>
        </div>

      </div>
    </section>
  );
}
