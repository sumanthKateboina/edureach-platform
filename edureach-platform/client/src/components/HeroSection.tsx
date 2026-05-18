import { siteConfig, images } from "../data/content.ts";
import { MessageSquare, PhoneCall, ArrowDownCircle } from "lucide-react";

interface HeroSectionProps {
  onCallClick: () => void;
  onChatClick: () => void;
}

export default function HeroSection({ onCallClick, onChatClick }: HeroSectionProps) {
  return (
    <section className="relative h-[90vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-gray-950">
      {/* Background Image Parallax with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 scale-105"
        style={{ backgroundImage: `url('${images.hero}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-maroon-dark/40" />

      {/* Grid Content */}
      <div className="relative mx-auto max-w-7xl px-6 w-full text-left z-10 flex flex-col items-start gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* Established Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-maroon/25 px-4 py-2 border border-maroon-light/35 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-body text-xs font-semibold tracking-wide text-white uppercase">
            Admissions Active 2026-27 · {siteConfig.established}
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="max-w-3xl font-heading text-4xl sm:text-6xl font-extrabold text-white leading-tight">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-200 via-rose-300 to-amber-200">{siteConfig.name}</span> College
        </h1>

        {/* Tagline */}
        <p className="max-w-xl font-body text-base sm:text-lg text-gray-300 leading-relaxed">
          {siteConfig.tagline}. Hyderabad's premier engineering and technology campus featuring a 92% placement rate, world-class labs, and autonomous AI counseling.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mt-4 w-full">
          <a
            href="#courses"
            className="flex items-center gap-2 rounded-xl bg-maroon px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-maroon-light hover:translate-y-[-2px] transition-all duration-200"
          >
            Explore Programs
            <ArrowDownCircle className="h-4 w-4" />
          </a>
          <button
            onClick={onCallClick}
            className="flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 px-6 py-3.5 text-sm font-bold text-white border border-white/20 hover:border-white/30 backdrop-blur-md hover:translate-y-[-2px] transition-all duration-200"
          >
            <PhoneCall className="h-4 w-4 text-rose-300" />
            Talk to Counselor
          </button>
          <button
            onClick={onChatClick}
            className="flex items-center gap-2 rounded-xl bg-gray-900 hover:bg-gray-800 px-6 py-3.5 text-sm font-bold text-gray-200 border border-gray-800 hover:translate-y-[-2px] transition-all duration-200"
          >
            <MessageSquare className="h-4 w-4 text-emerald-400" />
            Chat with Bot
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mt-8 pt-8 border-t border-white/10 w-full max-w-xl text-xs text-gray-400 font-body">
          <div>Approved by <span className="text-white font-semibold">AICTE, New Delhi</span></div>
          <div className="h-1 w-1 rounded-full bg-gray-600 hidden sm:block" />
          <div>Affiliated with <span className="text-white font-semibold">JNTU Hyderabad</span></div>
          <div className="h-1 w-1 rounded-full bg-gray-600 hidden sm:block" />
          <div>Ranked <span className="text-white font-semibold">Top 50</span> in State</div>
        </div>

      </div>
    </section>
  );
}
