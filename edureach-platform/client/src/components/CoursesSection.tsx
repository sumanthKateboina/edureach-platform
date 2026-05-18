import { useState } from "react";
import { coursesContent } from "../data/content.ts";
import { GraduationCap, Users, Calendar, Award } from "lucide-react";

export default function CoursesSection() {
  const [activeTab, setActiveTab] = useState<"btech" | "mtech" | "mba">("btech");

  return (
    <section id="courses" className="py-24 bg-cream scroll-mt-16 font-body">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold tracking-widest text-maroon uppercase">
            World-Class Education
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900">
            Academic Programs Offered
          </h2>
          <div className="h-1 w-16 bg-maroon mx-auto rounded-full" />
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-xl bg-white p-1.5 shadow-md border border-gray-100">
            <button
              onClick={() => setActiveTab("btech")}
              className={`rounded-lg px-6 py-3 text-sm font-bold transition-all duration-200 ${
                activeTab === "btech"
                  ? "bg-maroon text-white shadow-sm"
                  : "text-gray-600 hover:text-maroon"
              }`}
            >
              B.Tech Programs
            </button>
            <button
              onClick={() => setActiveTab("mtech")}
              className={`rounded-lg px-6 py-3 text-sm font-bold transition-all duration-200 ${
                activeTab === "mtech"
                  ? "bg-maroon text-white shadow-sm"
                  : "text-gray-600 hover:text-maroon"
              }`}
            >
              M.Tech Programs
            </button>
            <button
              onClick={() => setActiveTab("mba")}
              className={`rounded-lg px-6 py-3 text-sm font-bold transition-all duration-200 ${
                activeTab === "mba"
                  ? "bg-maroon text-white shadow-sm"
                  : "text-gray-600 hover:text-maroon"
              }`}
            >
              MBA Program
            </button>
          </div>
        </div>

        {/* Tab Panels */}
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-300">
          
          {/* B.Tech Tab */}
          {activeTab === "btech" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coursesContent.btech.map((course) => (
                <div 
                  key={course.name} 
                  className="group rounded-2xl bg-white p-6 shadow-md border border-gray-100 hover:shadow-xl hover:border-maroon/10 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-maroon/10 p-3 text-maroon group-hover:bg-maroon group-hover:text-white transition-colors duration-300">
                        <GraduationCap className="h-6 w-6" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-gray-900 group-hover:text-maroon transition-colors duration-200">
                        {course.name}
                      </h3>
                    </div>
                    
                    <p className="text-xs text-gray-500 font-medium uppercase leading-relaxed">
                      Engineering & Technology · Full Time
                    </p>

                    <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-50/80 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>4 Years</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span>{course.seats} Seats</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 bg-cream rounded-xl px-4 py-3 border border-maroon/5">
                    <span className="text-xs font-semibold text-gray-500 uppercase">Avg Package</span>
                    <span className="flex items-center gap-1.5 font-heading text-base font-bold text-maroon">
                      <Award className="h-4 w-4 text-amber-500" />
                      {course.avg}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* M.Tech Tab */}
          {activeTab === "mtech" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {coursesContent.mtech.map((course) => (
                <div 
                  key={course.name} 
                  className="group rounded-2xl bg-white p-6 shadow-md border border-gray-100 hover:shadow-xl hover:border-maroon/10 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-maroon/10 p-3 text-maroon group-hover:bg-maroon group-hover:text-white transition-colors duration-300">
                        <GraduationCap className="h-6 w-6" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-gray-900 group-hover:text-maroon transition-colors duration-200">
                        {course.name}
                      </h3>
                    </div>
                    
                    <p className="text-xs text-gray-500 font-medium uppercase leading-relaxed">
                      Post Graduate · Full Time
                    </p>

                    <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-50/80 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>2 Years</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span>{course.seats} Seats</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 bg-cream rounded-xl px-4 py-3 border border-maroon/5 text-xs text-gray-500 font-medium">
                    <span>Eligibility: GATE or entrance exam score</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* MBA Tab */}
          {activeTab === "mba" && (
            <div className="max-w-2xl mx-auto">
              <div 
                className="group rounded-2xl bg-white p-8 shadow-md border border-gray-100 hover:shadow-xl hover:border-maroon/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-maroon/10 p-3 text-maroon group-hover:bg-maroon group-hover:text-white transition-colors duration-300">
                      <GraduationCap className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-gray-900 group-hover:text-maroon transition-colors duration-200">
                        {coursesContent.mba.name}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium uppercase mt-1">
                        Master of Business Administration · PG Full Time
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed pt-2">
                    Our MBA program offers world-class case-based training with specializations in Finance, Marketing, Human Resources, and Information Technology, mentored by top faculties and former industry executives.
                  </p>

                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-50/80 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>2 Years Duration</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{coursesContent.mba.seats} Seats Intake</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-8 bg-cream rounded-xl px-5 py-4 border border-maroon/5">
                  <span className="text-xs font-semibold text-gray-500 uppercase">Avg Management Placement Package</span>
                  <span className="flex items-center gap-1.5 font-heading text-lg font-bold text-maroon">
                    <Award className="h-5 w-5 text-amber-500" />
                    {coursesContent.mba.avg}
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
