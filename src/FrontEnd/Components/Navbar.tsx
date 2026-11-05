"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Plane,
} from "lucide-react";
import SignupModal from "@/FrontEnd/Signup/SignupModal";

interface SubItem {
  name: string;
  desc?: string;
  href: string;
}

interface NavItem {
  title: string;
  href: string;
  submenu?: SubItem[];
}

const navItems: NavItem[] = [
  {
    title: "Plan & book",
    href: "#plan-book",
    submenu: [
      { name: "Book Flights", desc: "Search and reserve direct & connecting flights", href: "#book-flights" },
      { name: "Special Offers", desc: "Exclusive fares & seasonal holiday packages", href: "#offers" },
      { name: "Destinations & Route Map", desc: "Explore our expanding global network", href: "#destinations" },
      { name: "Group Bookings", desc: "Special pricing for 10 or more passengers", href: "#group" },
    ],
  },
  {
    title: "Manage",
    href: "#manage",
    submenu: [
      { name: "Manage Booking", desc: "Change seats, dates or add baggage", href: "#manage-booking" },
      { name: "Online Check-in", desc: "Check in 48 hours before departure", href: "#check-in" },
      { name: "Flight Status", desc: "Live updates & real-time radar tracking", href: "#status" },
      { name: "Baggage Services", desc: "Allowance, extra luggage & lost baggage tracker", href: "#baggage" },
    ],
  },
  {
    title: "Experience",
    href: "#experience",
    submenu: [
      { name: "The Riyadh Air Fleet", desc: "Next-generation Boeing 787-9 Dreamliners", href: "#fleet" },
      { name: "First & Business Suites", desc: "World-class private luxury in the sky", href: "#premium" },
      { name: "Dining & Cuisine", desc: "Curated Saudi and international culinary delights", href: "#dining" },
      { name: "Inflight Wi-Fi & Media", desc: "Ultra-fast satellite streaming on all flights", href: "#connectivity" },
    ],
  },
  {
    title: "Discover Riyadh",
    href: "#discover",
    submenu: [
      { name: "Diriyah & At-Turaif", desc: "UNESCO World Heritage birthplace of Saudi Arabia", href: "#diriyah" },
      { name: "Modern City & Towers", desc: "Kingdom Centre, Boulevard City & Sky Views", href: "#city" },
      { name: "Events & Riyadh Season", desc: "World concerts, sports, culture & festivals", href: "#riyadh-season" },
      { name: "Stopover Program", desc: "Enjoy up to 96 hours in Saudi with a free transit visa", href: "#stopover" },
    ],
  },
  {
    title: "Sfeer",
    href: "#sfeer",
    submenu: [
      { name: "About Sfeer Rewards", desc: "Our visionary guest recognition program", href: "#about-sfeer" },
      { name: "Earn & Redeem Miles", desc: "Turn flights and partner purchases into upgrades", href: "#earn" },
      { name: "Tier Privileges", desc: "Silver, Gold & Platinum VIP benefits", href: "#tiers" },
    ],
  },
  {
    title: "About us",
    href: "#about",
    submenu: [
      { name: "Our Vision 2030", desc: "Connecting Riyadh to over 100 destinations worldwide", href: "#vision" },
      { name: "Sustainability", desc: "Commitment to net-zero carbon aviation", href: "#sustainability" },
      { name: "Press & Newsroom", desc: "Latest airline announcements and press releases", href: "#news" },
      { name: "Careers", desc: "Join our world-class cabin & cockpit crew", href: "#careers" },
    ],
  },
  {
    title: "Help",
    href: "#help",
    submenu: [
      { name: "Help Center & FAQs", desc: "Answers to common passenger questions", href: "#faqs" },
      { name: "Contact Support", desc: "24/7 dedicated guest assistance", href: "#contact" },
      { name: "Special Assistance", desc: "Accessibility, medical needs & dietary meals", href: "#special-assistance" },
      { name: "Feedback & Claims", desc: "Share your experience or submit a request", href: "#feedback" },
    ],
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [selectedLang, setSelectedLang] = useState("EN");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    initials: string;
  } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);

    // Sync user auth status
    const checkUser = () => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("riyadh_user");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed && parsed.isLoggedIn) {
              setCurrentUser({
                name: parsed.name || "Zuhaib",
                initials: parsed.initials || "ZU",
              });
              return;
            }
          } catch {
            // ignore
          }
        }
        setCurrentUser(null);
      }
    };

    checkUser();
    window.addEventListener("riyadh-auth-changed", checkUser);
    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("riyadh-auth-changed", checkUser);
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top subtle luxury bar */}
      <div className="hidden lg:flex items-center justify-between px-6 lg:px-12 py-1.5 text-[11px] font-medium tracking-wider uppercase text-purple-200/70 bg-[#160424] border-b border-purple-900/40">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <Plane className="w-3.5 h-3.5 text-purple-300 -rotate-45 shrink-0" />
          <span>The Future Takes Flight • Welcome to Riyadh Air</span>
        </div>
        <div className="flex items-center gap-6 whitespace-nowrap">
          <Link href="#status" className="hover:text-white transition-colors">
            Flight Status
          </Link>
          <span className="text-purple-800">|</span>
          <Link href="#checkin" className="hover:text-white transition-colors">
            Check-in
          </Link>
          <span className="text-purple-800">|</span>
          <Link href="#sfeer" className="text-purple-300 hover:text-white transition-colors font-semibold">
            Sfeer Club
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#1c0734]/95 backdrop-blur-xl shadow-2xl shadow-purple-950/70 border-b border-purple-500/20 py-2.5"
            : "bg-gradient-to-r from-[#1c0734] via-[#240a40] to-[#1c0734] border-b border-white/10 py-3.5"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12">
          {/* Strict single-line horizontal flex row */}
          <div className="flex items-center justify-between h-14 gap-4 xl:gap-8">
            
            {/* Left: Riyadh Air Logo */}
            <div className="shrink-0 flex items-center">
              <Link href="/" className="group flex items-center focus:outline-none">
                <Image
                  src="/logo/rx-riyadh_air-logo.svg"
                  alt="Riyadh Air Logo"
                  width={155}
                  height={44}
                  priority
                  className="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.12)] transition-transform duration-200 group-hover:scale-105"
                />
              </Link>
            </div>

            {/* Center: Desktop Navigation Buttons (All on ONE single line, whitespace-nowrap) */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-7 2xl:gap-9 whitespace-nowrap">
              {navItems.map((item) => {
                const isOpen = activeMenu === item.title;
                return (
                  <div
                    key={item.title}
                    className="relative shrink-0"
                    onMouseEnter={() => setActiveMenu(item.title)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <Link
                      href={item.href}
                      className={`whitespace-nowrap text-[14px] xl:text-[15px] font-medium tracking-normal transition-colors duration-200 py-2 px-1 relative block ${
                        isOpen
                          ? "text-white"
                          : "text-white/90 hover:text-white"
                      }`}
                    >
                      <span>{item.title}</span>
                      {/* Active underline animation */}
                      <span
                        className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-400 to-indigo-300 rounded-full transition-all duration-200 ${
                          isOpen ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                        }`}
                      />
                    </Link>

                    {/* Dropdown Menu on hover */}
                    {item.submenu && isOpen && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 bg-[#21093c]/95 backdrop-blur-2xl border border-purple-400/20 rounded-2xl p-3 shadow-2xl shadow-purple-950/80 animate-in fade-in-50 slide-in-from-top-2 duration-150 z-50">
                        <div className="flex flex-col gap-1">
                          {item.submenu.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="group/item flex flex-col p-2.5 rounded-xl hover:bg-white/10 transition-all duration-150 whitespace-normal"
                            >
                              <div className="flex items-center justify-between text-sm font-medium text-white group-hover/item:text-purple-200">
                                <span>{sub.name}</span>
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 text-purple-300" />
                              </div>
                              {sub.desc && (
                                <p className="text-xs text-purple-200/60 mt-0.5 line-clamp-1 group-hover/item:text-purple-200/80">
                                  {sub.desc}
                                </p>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right: Globe, Cart & Login Buttons (Strictly in line, no wrap) */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0 whitespace-nowrap">
              
              {/* Language Selector Dropdown */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-1.5 py-1.5 px-2.5 text-xs font-semibold text-white/90 hover:text-white rounded-full hover:bg-white/10 transition-colors whitespace-nowrap"
                  aria-label="Select Language"
                >
                  <Globe className="w-4 h-4 text-purple-200 shrink-0" />
                  <span className="tracking-wide">EN / SAR</span>
                  <ChevronDown
                    className={`w-3 h-3 opacity-70 transition-transform duration-200 ${
                      isLangOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isLangOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-48 bg-[#21093c] border border-purple-400/20 rounded-xl p-2 shadow-2xl z-50 whitespace-nowrap"
                    onMouseLeave={() => setIsLangOpen(false)}
                  >
                    <div className="text-[10px] font-bold text-purple-300/80 px-2.5 py-1 uppercase tracking-wider">
                      Language & Region
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedLang("EN");
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg flex items-center justify-between transition-colors ${
                        selectedLang === "EN"
                          ? "bg-purple-600/40 text-white font-semibold"
                          : "text-purple-200 hover:bg-white/10"
                      }`}
                    >
                      <span>English (EN - SAR)</span>
                      {selectedLang === "EN" && <span className="text-purple-300 text-xs">✓</span>}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedLang("AR");
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg flex items-center justify-between transition-colors ${
                        selectedLang === "AR"
                          ? "bg-purple-600/40 text-white font-semibold"
                          : "text-purple-200 hover:bg-white/10"
                      }`}
                    >
                      <span>العربية (AR - SAR)</span>
                      {selectedLang === "AR" && <span className="text-purple-300 text-xs">✓</span>}
                    </button>
                  </div>
                )}
              </div>

              {/* Shopping Cart / Bookings Bag */}
              <Link
                href="#cart"
                className="relative p-2 text-white/90 hover:text-white rounded-full hover:bg-white/10 transition-colors shrink-0"
                aria-label="View bookings & cart"
              >
                <ShoppingCart className="w-[18px] h-[18px]" />
                {cartCount > 0 ? (
                  <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-purple-500 rounded-full shadow">
                    {cartCount}
                  </span>
                ) : (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-purple-300" />
                )}
              </Link>

              {/* Join or Profile Button */}
              {currentUser ? (
                <Link
                  href="/profile"
                  className="shrink-0 whitespace-nowrap inline-flex items-center justify-center gap-2 px-4 py-1.5 text-sm font-semibold text-white bg-purple-600/40 hover:bg-purple-600/60 border border-purple-400/40 rounded-full shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-white text-[#1c0734] text-xs font-bold flex items-center justify-center shadow-sm">
                    {currentUser.initials}
                  </div>
                  <span className="whitespace-nowrap">Profile</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSignupModalOpen(true)}
                  className="shrink-0 whitespace-nowrap inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold text-[#1c0734] bg-white hover:bg-purple-50 rounded-full shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
                >
                  <User className="w-4 h-4 text-[#6e29a9] shrink-0" />
                  <span className="whitespace-nowrap">Join</span>
                </button>
              )}

              {/* Mobile Menu Hamburger (Visible only on smaller screens) */}
              <div className="flex lg:hidden shrink-0">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-xl text-purple-200 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#1b0633]/98 backdrop-blur-2xl border-b border-purple-500/20 px-5 pt-4 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isExpanded = mobileExpanded === item.title;
                return (
                  <div key={item.title} className="border-b border-purple-900/30 pb-1">
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(isExpanded ? null : item.title)}
                      className="w-full flex items-center justify-between py-2.5 px-3 text-base font-medium text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                      <span>{item.title}</span>
                      {item.submenu && (
                        <ChevronDown
                          className={`w-4 h-4 text-purple-300 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>

                    {item.submenu && isExpanded && (
                      <div className="pl-4 pr-2 py-2 space-y-1 bg-black/20 rounded-xl my-1">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 px-3 text-sm text-purple-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <div className="font-medium">{sub.name}</div>
                            {sub.desc && (
                              <div className="text-xs text-purple-300/60 mt-0.5">{sub.desc}</div>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex flex-col gap-3">
              {currentUser ? (
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-purple-600/40 hover:bg-purple-600/60 border border-purple-400/40 rounded-full shadow-lg transition-all cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-full bg-white text-[#1c0734] text-xs font-bold flex items-center justify-center">
                    {currentUser.initials}
                  </div>
                  <span>View Profile ({currentUser.name})</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSignupModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-[#1c0734] bg-white hover:bg-purple-100 rounded-full shadow-lg transition-all cursor-pointer"
                >
                  <User className="w-4 h-4 text-[#6e29a9]" />
                  <span>Join Sfeer Rewards</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Sfeer / Riyadh Air Sign Up & Login Modal */}
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
    </header>
  );
}
