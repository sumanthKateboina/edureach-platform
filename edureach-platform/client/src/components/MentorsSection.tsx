import { useEffect, useRef } from "react";
import { mentorsContent } from "../data/content.ts";
import { BookOpen, GraduationCap } from "lucide-react";

interface MentorsSectionProps {
  onScrollToMentors: () => void;
}

export default function MentorsSection({ onScrollToMentors }: MentorsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const observerTriggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !observerTriggered.current) {
          observerTriggered.current = true;
          onScrollToMentors();
        }
      },
      { threshold: 0.15 } // Trigger when 15% of the element is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [onScrollToMentors]);

  return (
    <section 
      id="mentors" 
      ref={sectionRef}
      className="py-24 bg-white scroll-mt-16 font-body"
    >
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold tracking-widest text-maroon uppercase">
            Learn from the Best
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900">
            Distinguished Faculty & Mentors
          </h2>
          <div className="h-1 w-16 bg-maroon mx-auto rounded-full" />
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mentorsContent.map((mentor) => (
            <div 
              key={mentor.name} 
              className="group flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-md hover:shadow-xl hover:border-maroon/10 hover:translate-y-[-4px] transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Image Wrap */}
                <div className="relative overflow-hidden rounded-xl h-[220px] bg-gray-50 border border-gray-100">
                  <div 
                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${mentor.image}')` }}
                  />
                  <div className="absolute top-3 right-3 rounded-lg bg-white/95 border border-maroon/10 px-2.5 py-1 backdrop-blur-sm shadow-sm flex items-center gap-1 text-[10px] font-bold text-maroon uppercase tracking-wider">
                    <GraduationCap className="h-3 w-3" />
                    Doctorate
                  </div>
                </div>

                {/* Profile Details */}
                <div className="space-y-1">
                  <h3 className="font-heading text-lg font-bold text-gray-900 leading-snug group-hover:text-maroon transition-colors">
                    {mentor.name}
                  </h3>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {mentor.role}
                  </p>
                </div>

                {/* Bio text */}
                <p className="text-xs text-gray-600 leading-relaxed min-h-[48px] line-clamp-3">
                  {mentor.bio}
                </p>
              </div>

              {/* Teaching Subject info */}
              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-50 text-xs font-semibold text-gray-700 bg-cream -mx-5 -mb-5 p-4 rounded-b-2xl border-t border-maroon/5">
                <BookOpen className="h-4 w-4 text-maroon shrink-0" />
                <span className="truncate">Teaches: {mentor.teaches}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
