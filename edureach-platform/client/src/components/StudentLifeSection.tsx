import { campusFeatures } from "../data/content.ts";
import { CheckCircle } from "lucide-react";

export default function StudentLifeSection() {
  return (
    <section id="campus" className="py-24 bg-cream scroll-mt-16 font-body">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold tracking-widest text-maroon uppercase">
            Beyond the Classroom
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900">
            Campus & Student Life
          </h2>
          <div className="h-1 w-16 bg-maroon mx-auto rounded-full" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campusFeatures.map((feature) => (
            <div 
              key={feature.title} 
              className="group relative rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-white h-[360px] flex flex-col justify-end transition-all duration-300 hover:shadow-2xl hover:translate-y-[-4px]"
            >
              {/* Background Image with Zoom */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${feature.image}')` }}
              />
              {/* Elegant Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent transition-opacity duration-300" />

              {/* Text Details */}
              <div className="relative p-6 space-y-3 text-left z-10">
                <div className="flex items-center gap-2 text-rose-300">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-xs font-bold tracking-wider uppercase">Premium Facility</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-white leading-tight">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-200">
                  {feature.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
