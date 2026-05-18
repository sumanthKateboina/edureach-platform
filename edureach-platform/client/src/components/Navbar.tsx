import { useState } from "react";
import { useAuth } from "../context/AuthContext.tsx";
import { navLinks, siteConfig } from "../data/content.ts";
import { Menu, X, GraduationCap, LogOut, User } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <GraduationCap className="h-8 w-8 text-maroon transition-transform group-hover:scale-110" />
          <span className="font-heading text-2xl font-bold tracking-tight text-maroon">
            {siteConfig.name}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm font-medium text-gray-600 hover:text-maroon transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-full bg-cream px-4 py-2 border border-maroon/10">
                <User className="h-4 w-4 text-maroon" />
                <span className="font-body text-xs font-semibold text-maroon">
                  Hi, {user.name.split(" ")[0]}
                </span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-maroon hover:border-maroon/20 transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <a
                href="/login"
                className="text-sm font-semibold text-gray-600 hover:text-maroon transition-colors"
              >
                Sign In
              </a>
              <a
                href="/signup"
                className="rounded-lg bg-maroon px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-maroon-light transition-all duration-200"
              >
                Register
              </a>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-50 hover:text-maroon md:hidden transition-colors"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white/95 px-6 py-6 backdrop-blur-md md:hidden shadow-xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-body text-base font-medium text-gray-600 hover:text-maroon transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <hr className="border-gray-100 my-2" />
            {user ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 py-2">
                  <User className="h-5 w-5 text-maroon" />
                  <span className="font-body text-sm font-medium text-gray-700">
                    Logged in as {user.name}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <a
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center rounded-lg border border-gray-200 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Sign In
                </a>
                <a
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center rounded-lg bg-maroon py-3 text-sm font-semibold text-white hover:bg-maroon-light shadow-md"
                >
                  Register
                </a>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
