import { useState, useEffect } from "react";
import { quotesContent } from "../data/content.ts";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

export default function QuotesSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % quotesContent.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + quotesContent.length) % quotesContent.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % quotesContent.length);
  };

  return (
    <section className="py-20 bg-gray-50 border-t border-b border-gray-100 font-body relative overflow-hidden">
      {/* Decorative Quotes Background */}
      <Quote className="absolute top-10 left-10 h-32 w-32 text-gray-200/50 -rotate-12 pointer-events-none" />
      <Quote className="absolute bottom-10 right-10 h-32 w-32 text-gray-200/50 rotate-180 pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 relative z-10 text-center space-y-6">
        
        {/* Quote Icon */}
        <div className="inline-flex rounded-full bg-maroon/10 p-4 text-maroon mb-2">
          <Quote className="h-8 w-8" />
        </div>

        {/* Quotes Window */}
        <div className="h-[120px] sm:h-[100px] flex items-center justify-center">
          <p className="font-heading text-xl sm:text-2xl italic font-semibold text-gray-800 leading-relaxed max-w-2xl animate-in fade-in zoom-in-95 duration-500">
            “{quotesContent[current]?.text}”
          </p>
        </div>

        {/* Quote Author */}
        <div className="font-body text-sm font-bold text-maroon tracking-wider uppercase pt-4 animate-in fade-in duration-500">
          — {quotesContent[current]?.author}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-6 pt-4">
          <button
            onClick={handlePrev}
            className="rounded-full border border-gray-200 p-2 text-gray-500 hover:bg-white hover:text-maroon hover:border-maroon/20 transition-all duration-200"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          {/* Indicator Dots */}
          <div className="flex gap-2">
            {quotesContent.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  idx === current ? "bg-maroon w-6" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="rounded-full border border-gray-200 p-2 text-gray-500 hover:bg-white hover:text-maroon hover:border-maroon/20 transition-all duration-200"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
