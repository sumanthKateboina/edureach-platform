import { aboutContent, images } from "../data/content.ts";
import { CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white scroll-mt-16 font-body">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Collage Images (Left) */}
          <div className="lg:col-span-5 relative w-full h-[400px] sm:h-[450px]">
            {/* Main Campus Image */}
            <div 
              className="absolute top-0 left-0 w-[85%] h-[80%] rounded-2xl bg-cover bg-center shadow-xl border border-gray-100"
              style={{ backgroundImage: `url('${images.campus1}')` }}
            />
            {/* Overlapping Student Life Image */}
            <div 
              className="absolute bottom-0 right-0 w-[60%] h-[55%] rounded-2xl bg-cover bg-center shadow-2xl border-4 border-white"
              style={{ backgroundImage: `url('${images.students}')` }}
            />
            {/* Mini Experience Card */}
            <div className="absolute -left-6 bottom-16 bg-maroon text-white p-6 rounded-2xl shadow-xl hidden sm:block border border-maroon-light/20">
              <p className="font-heading text-3xl font-bold leading-none">20+</p>
              <p className="text-xs uppercase tracking-wider mt-1 text-rose-200">Years of Academic <br />Excellence</p>
            </div>
          </div>

          {/* Description & Stats (Right) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-widest text-maroon uppercase">
                {aboutContent.subtitle}
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                {aboutContent.title}
              </h2>
            </div>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {aboutContent.description}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700 font-medium pt-2">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                AICTE & JNTU Accredited
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                Modern smart class and high-end AI labs
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                Comprehensive student internship mandates
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                Dedicated startup incubation support
              </li>
            </ul>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-100">
              {aboutContent.highlights.map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="font-heading text-2xl sm:text-3xl font-bold text-maroon">
                    {item.value}
                  </div>
                  <div className="text-xs text-gray-500 leading-snug font-medium">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
