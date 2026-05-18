import { eventsGallery } from "../data/content.ts";
import { Image as ImageIcon } from "lucide-react";

export default function EventsGallery() {
  return (
    <section className="py-24 bg-white font-body">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold tracking-widest text-maroon uppercase">
            Life at EduReach
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900">
            Events & Highlights
          </h2>
          <div className="h-1 w-16 bg-maroon mx-auto rounded-full" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsGallery.map((event) => (
            <div 
              key={event.title} 
              className="group relative rounded-2xl overflow-hidden shadow-md h-[260px] border border-gray-100 bg-gray-50 flex flex-col justify-end transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]"
            >
              {/* Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${event.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />

              {/* Title Tag */}
              <div className="relative p-6 space-y-2 text-left z-10">
                <div className="flex items-center gap-1.5 text-rose-300 text-[10px] font-bold uppercase tracking-wider">
                  <ImageIcon className="h-3.5 w-3.5" />
                  Campus Event
                </div>
                <h3 className="font-heading text-lg font-bold text-white leading-tight">
                  {event.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
