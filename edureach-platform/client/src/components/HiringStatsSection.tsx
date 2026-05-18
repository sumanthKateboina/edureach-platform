import { topRecruiters, deptPlacements, images } from "../data/content.ts";
import { Award, CheckCircle2, Star } from "lucide-react";

export default function HiringStatsSection() {
  return (
    <section id="placements" className="py-24 bg-cream scroll-mt-16 font-body">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold tracking-widest text-maroon uppercase">
            Where Our Students Go
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900">
            Placement Highlights 2023–24
          </h2>
          <div className="h-1 w-16 bg-maroon mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Progress Bars (Left - 7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-gray-100 shadow-md space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-5 w-5 text-maroon" />
              <h3 className="font-heading text-xl font-bold text-gray-900">
                Departmental Placement Metrics
              </h3>
            </div>
            
            <p className="text-xs text-gray-500 leading-relaxed">
              * The B.Tech Artificial Intelligence and Data Science program achieved a record-breaking 100% placement rate in its maiden graduating batch.
            </p>

            <div className="space-y-5 pt-4">
              {deptPlacements.map((item) => (
                <div key={item.dept} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-gray-800">{item.dept} Department</span>
                    <span className="font-body text-xs font-semibold text-maroon bg-maroon/5 px-2.5 py-0.5 rounded-full border border-maroon/10">
                      Avg: {item.avg} · {item.pct}% Hired
                    </span>
                  </div>
                  {/* Progress Bar Track */}
                  <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-maroon-light to-maroon rounded-full transition-all duration-1000"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MNC Hiring Partners (Right - 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md relative overflow-hidden">
              
              {/* Decorative Background Scroller */}
              <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-maroon/5 blur-xl" />

              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 text-maroon" />
                <h3 className="font-heading text-xl font-bold text-gray-900">
                  Global Hiring Partners
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Over 150+ tier-1 product MNCs and consulting giants conduct active annual recruitment campaigns at the EduReach campus.
              </p>

              {/* Badges Flex Grid */}
              <div className="flex flex-wrap gap-2.5">
                {topRecruiters.map((company) => (
                  <span 
                    key={company} 
                    className="font-body text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-100 px-3.5 py-2 rounded-xl hover:bg-cream hover:text-maroon hover:border-maroon/20 hover:scale-105 transition-all duration-200 cursor-default"
                  >
                    {company}
                  </span>
                ))}
              </div>

              {/* Extra Highlights image banner */}
              <div className="mt-8 rounded-xl overflow-hidden border border-gray-100 shadow-inner relative h-36">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${images.recruter2}')` }}
                />
                <div className="absolute inset-0 bg-maroon-dark/20 backdrop-blur-[1px]" />
                <div className="absolute bottom-3 left-4 text-left">
                  <span className="inline-block bg-emerald-500 text-white font-bold text-[9px] uppercase px-2 py-0.5 rounded mb-1.5 shadow-sm">Exclusive Partner Drive</span>
                  <h4 className="font-heading text-sm font-bold text-white leading-tight drop-shadow-sm">42 LPA Highest Package (Google)</h4>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
