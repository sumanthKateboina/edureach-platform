import { achievementsContent } from "../data/content.ts";
import { Award, Briefcase, Building2, TrendingUp } from "lucide-react";

export default function AchievementsSection() {
  const getIcon = (label: string) => {
    if (label.includes("Placement")) return <TrendingUp className="h-6 w-6 text-rose-300" />;
    if (label.includes("Package")) return <Award className="h-6 w-6 text-amber-300" />;
    if (label.includes("Companies")) return <Building2 className="h-6 w-6 text-sky-300" />;
    return <Briefcase className="h-6 w-6 text-emerald-300" />;
  };

  return (
    <section className="relative w-full py-16 bg-gradient-to-br from-maroon-dark via-maroon to-maroon-light overflow-hidden font-body shadow-inner">
      {/* Decorative Blur Spheres */}
      <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-black/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 w-full text-center z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 items-center">
          {achievementsContent.stats.map((stat, idx) => (
            <div 
              key={stat.label} 
              className={`flex flex-col items-center justify-center space-y-2 py-4 px-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 ${
                idx % 2 === 0 ? "translate-y-1" : "-translate-y-1"
              }`}
            >
              {/* Icon Container */}
              <div className="rounded-full bg-white/10 p-3 mb-1 border border-white/5">
                {getIcon(stat.label)}
              </div>

              {/* Stat Value */}
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none">
                {stat.value}
              </div>

              {/* Stat Label */}
              <div className="text-xs sm:text-sm font-medium text-rose-100 tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
