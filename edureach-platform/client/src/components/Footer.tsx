import { siteConfig, contactInfo, navLinks } from "../data/content.ts";
import { GraduationCap, Mail, Phone, MapPin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 font-body border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-white" />
              <span className="font-heading text-2xl font-bold text-white tracking-tight">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              A premier engineering and management institution dedicated to academic excellence, innovation, and career success since 2005.
            </p>
            <span className="inline-block text-xs font-semibold text-maroon-light bg-maroon/20 px-3 py-1.5 rounded-full border border-maroon/20">
              {siteConfig.established}
            </span>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold text-white tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold text-white tracking-wide">
              Admissions Office
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-maroon-light shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Apply Now</p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="hover:text-white transition-colors break-all"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-maroon-light shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Hotline</p>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="hover:text-white transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-maroon-light shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Campus</p>
                  <span>{contactInfo.address}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Support / Hours */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold text-white tracking-wide">
              Office Hours
            </h4>
            <p className="text-sm leading-relaxed">
              Monday to Saturday: <br />
              <span className="text-white font-medium">9:00 AM – 5:00 PM</span>
            </p>
            <p className="text-xs text-gray-500 leading-relaxed border-l-2 border-maroon pl-3">
              The admissions block remains open on Sundays during active application seasons.
            </p>
          </div>
        </div>

        <hr className="border-gray-800 my-12" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name} College. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for prospective students.
          </p>
        </div>
      </div>
    </footer>
  );
}
