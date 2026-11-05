"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plane,
  Award,
  CreditCard,
  Calendar,
  Mail,
  Phone,
  Globe,
  ChevronRight,
  LogOut,
  ArrowRight,
  ShieldCheck,
  QrCode,
  Compass,
} from "lucide-react";

interface UserProfile {
  isLoggedIn: boolean;
  name: string;
  initials: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  country?: string;
  dob?: string;
  memberId?: string;
  sfeerPoints?: number;
  levelPoints?: number;
  tier?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"my-sfeer" | "activity-history" | "personal-info">("my-sfeer");
  const [selectedTier, setSelectedTier] = useState<"silver" | "gold" | "platinum">("silver");
  const asOfDate = "5 Nov 2026";
  const [user, setUser] = useState<UserProfile>({
    isLoggedIn: true,
    name: "Zuhaib Khan",
    initials: "ZU",
    title: "Mr",
    firstName: "Zuhaib",
    lastName: "Khan",
    email: "zuhaib@riyadhair.com",
    phone: "(+91) 9876543210",
    country: "India",
    dob: "24 / 07 / 1996",
    memberId: "SFR-838963",
    sfeerPoints: 0,
    levelPoints: 0,
    tier: "Silver Tier",
  });

  // Load user data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("riyadh_user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser((prev) => ({ ...prev, ...parsed, isLoggedIn: true }));
        } catch {
          // ignore fallback
        }
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("riyadh_user");
      window.dispatchEvent(new Event("riyadh-auth-changed"));
    }
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#fcfbfe] text-gray-900 pb-20">
      
      {/* ========================================================= */}
      {/* 1. TOP PURPLE BANNER (Matches User Image 2 Authentically)  */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-r from-[#21093c] via-[#2f0e54] to-[#1c0734] text-white pt-10 pb-12 px-4 sm:px-6 lg:px-12 border-b border-purple-900/30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Left: User Avatar & Name */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Initials Circle Emblem */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-[#1c0734] flex items-center justify-center font-bold text-lg sm:text-xl shadow-xl ring-4 ring-white/10 shrink-0">
              {user.initials || "ZU"}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Sfeer
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/30 text-purple-200 border border-purple-400/20">
                  Guest Club
                </span>
              </div>
              <p className="text-xs sm:text-sm text-purple-200/80 mt-1 flex items-center gap-2">
                <span>{user.name}</span>
                <span>•</span>
                <span className="font-mono text-purple-300 font-semibold">{user.memberId}</span>
              </p>
            </div>
          </div>

          {/* Right: Sfeer Points & Level Points Statistics */}
          <div className="flex items-center gap-8 sm:gap-12 bg-white/5 backdrop-blur-md px-6 py-3.5 rounded-2xl border border-white/10 self-start md:self-auto">
            <div>
              <p className="text-[11px] font-semibold text-purple-200/70 tracking-wide uppercase">
                Sfeer Points
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-white mt-0.5 font-mono">
                {user.sfeerPoints ?? 0}
              </p>
            </div>

            <div className="w-px h-10 bg-white/15" />

            <div>
              <p className="text-[11px] font-semibold text-purple-200/70 tracking-wide uppercase">
                Level Points
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-white mt-0.5 font-mono">
                {user.levelPoints ?? 0}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. SUB-NAVIGATION TABS (My Sfeer, Activity History, Info)  */}
      {/* ========================================================= */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between overflow-x-auto">
          <div className="flex gap-2 sm:gap-6 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab("my-sfeer")}
              className={`py-4 px-2 sm:px-3 text-xs sm:text-sm font-semibold transition-all relative cursor-pointer ${
                activeTab === "my-sfeer"
                  ? "text-[#742da7] font-bold"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <span>My Sfeer</span>
              {activeTab === "my-sfeer" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#742da7] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("activity-history")}
              className={`py-4 px-2 sm:px-3 text-xs sm:text-sm font-semibold transition-all relative cursor-pointer ${
                activeTab === "activity-history"
                  ? "text-[#742da7] font-bold"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <span>Activity History</span>
              {activeTab === "activity-history" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#742da7] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("personal-info")}
              className={`py-4 px-2 sm:px-3 text-xs sm:text-sm font-semibold transition-all relative cursor-pointer ${
                activeTab === "personal-info"
                  ? "text-[#742da7] font-bold"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <span>Profile Details</span>
              {activeTab === "personal-info" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#742da7] rounded-full" />
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors py-2 px-3 rounded-full hover:bg-red-50 cursor-pointer shrink-0"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign out</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. MAIN DASHBOARD CONTENT                                 */}
      {/* ========================================================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 mt-8 sm:mt-10">
        
        {/* TAB 1: My Sfeer (Digital Card + Activity Card + Perks) */}
        {activeTab === "my-sfeer" && (
          <div className="space-y-8 animate-in fade-in-50 duration-200">
            
            {/* Top Grid: Digital Loyalty Card & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Column: Tier Selection Tabs & Matte Loyalty Card */}
              <div className="lg:col-span-7 flex flex-col space-y-3">
                
                {/* 3 Airways Tier Tabs (Silver, Gold, Platinum) */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-2xl border border-gray-200/70">
                    <button
                      type="button"
                      onClick={() => setSelectedTier("silver")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedTier === "silver"
                          ? "bg-orange-500 text-white shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Silver
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedTier("gold")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedTier === "gold"
                          ? "bg-orange-500 text-white shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Gold
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedTier("platinum")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedTier === "platinum"
                          ? "bg-orange-500 text-white shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Platinum
                    </button>
                  </div>

                  <span className="text-[11px] font-medium text-gray-500 hidden sm:inline">
                    Digital Membership Card
                  </span>
                </div>

                {/* Digital Sfeer Card (Orange Box) */}
                <div className="relative overflow-hidden rounded-[28px] p-7 sm:p-8 flex flex-col justify-between w-full h-[270px] sm:h-[280px] bg-gradient-to-br from-[#FF7A00] via-[#FF6200] to-[#E64D00] text-white border border-orange-400/30 shadow-xl shadow-orange-500/25 shrink-0 transition-all duration-300">
                  {/* Subtle Glow Overlay */}
                  <div className="absolute inset-0 bg-white/[0.08] backdrop-blur-[1px] pointer-events-none" />
                  <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-white/10 blur-2xl pointer-events-none" />

                  {/* Top Row: Brand & Tier Badge */}
                  <div className="flex items-start justify-between relative z-10">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                        Riyadh Air
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2 mt-0.5 text-white">
                        <span>SFEER</span>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize shadow-sm bg-black/25 text-white backdrop-blur-sm border border-white/20">
                          {selectedTier} Tier
                        </span>
                      </h3>
                    </div>

                    <div className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm bg-white/15 backdrop-blur-md text-white border-white/25">
                      <Award className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Middle: Tier Miles & Precision Plane Progress Track */}
                  <div className="relative z-10 my-4 py-1">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <div className="flex items-center gap-1.5 font-medium text-white">
                        <span className="font-bold text-sm text-white">
                          {selectedTier === "silver" ? "0" : selectedTier === "gold" ? "25,000" : "50,000"}
                        </span>
                        <span className="text-[11px] sm:text-xs text-white/85">
                          Tier Miles earned as of {asOfDate}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-sm">
                        {selectedTier === "silver" ? "Goal: Gold" : selectedTier === "gold" ? "Goal: Platinum" : "VIP Elite"}
                      </span>
                    </div>

                    {/* Precision Vector Progress Track */}
                    <div className="relative flex items-center w-full py-2">
                      <svg className="w-full h-8 overflow-visible" viewBox="0 0 400 24" fill="none">
                        {/* 1. Inactive Track Line */}
                        <line
                          x1="14"
                          y1="12"
                          x2="386"
                          y2="12"
                          stroke="rgba(255,255,255,0.35)"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />

                        {/* 2. Active White Stem Line */}
                        <line
                          x1="14"
                          y1="12"
                          x2={selectedTier === "silver" ? "43" : selectedTier === "gold" ? "187" : "363"}
                          y2="12"
                          stroke="#ffffff"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          className="transition-all duration-700 ease-out"
                        />

                        {/* 3. Left Concentric Circle (◎) */}
                        <circle
                          cx="14"
                          cy="12"
                          r="7.5"
                          stroke="#ffffff"
                          strokeWidth="2.5"
                          fill="transparent"
                        />
                        <circle cx="14" cy="12" r="3" fill="#ffffff" />

                        {/* 4. Midpoint Milestone (Gold) */}
                        <circle
                          cx="200"
                          cy="12"
                          r="5"
                          stroke={
                            selectedTier === "gold" || selectedTier === "platinum"
                              ? "#ffffff"
                              : "rgba(255,255,255,0.4)"
                          }
                          strokeWidth="2"
                          fill="transparent"
                          className="transition-colors duration-300"
                        />
                        <circle
                          cx="200"
                          cy="12"
                          r="1.8"
                          fill={
                            selectedTier === "gold" || selectedTier === "platinum"
                              ? "#ffffff"
                              : "rgba(255,255,255,0.6)"
                          }
                          className="transition-colors duration-300"
                        />

                        {/* 5. Right Milestone (Platinum Circle) */}
                        <circle
                          cx="386"
                          cy="12"
                          r="7.5"
                          stroke={selectedTier === "platinum" ? "#ffffff" : "rgba(255,255,255,0.4)"}
                          strokeWidth="2.5"
                          fill="transparent"
                          className="transition-colors duration-300"
                        />
                        <circle
                          cx="386"
                          cy="12"
                          r="3"
                          fill={selectedTier === "platinum" ? "#ffffff" : "rgba(255,255,255,0.5)"}
                          className="transition-colors duration-300"
                        />

                        {/* 6. Clean Jet Airplane Facing Right (→) */}
                        <g
                          transform={`translate(${selectedTier === "silver" ? 42 : selectedTier === "gold" ? 186 : 362}, 0)`}
                          className="transition-all duration-700 ease-out"
                        >
                          <path
                            d="M 23 12 L 15 0.5 L 11 0.5 L 14 10 L 4 10 L 2.5 6 L 0 6 L 1 12 L 0 18 L 2.5 18 L 4 14 L 14 14 L 11 23.5 L 15 23.5 Z"
                            fill="#ffffff"
                          />
                        </g>
                      </svg>
                    </div>

                    {/* 3 Tier Labels under track (Silver, Gold, Platinum) */}
                    <div className="flex items-center justify-between text-[10px] font-medium pt-0.5">
                      <span className={selectedTier === "silver" ? "font-bold text-white" : "text-white/75"}>
                        Silver
                      </span>
                      <span className={selectedTier === "gold" ? "font-bold text-white" : "text-white/75"}>
                        Gold (25,000)
                      </span>
                      <span className={selectedTier === "platinum" ? "font-bold text-white" : "text-white/75"}>
                        Platinum (50,000)
                      </span>
                    </div>
                  </div>

                  {/* Bottom Row: Member Name & Membership No. */}
                  <div className="relative z-10 pt-3 border-t border-white/20 flex items-end justify-between text-white">
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-white/75">
                        Member Name
                      </p>
                      <p className="text-sm sm:text-base font-bold uppercase tracking-wide text-white">
                        {user.name}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] uppercase font-bold tracking-wider text-white/75">
                        Membership No.
                      </p>
                      <p className="font-mono text-sm sm:text-base font-bold tracking-wider text-white">
                        {user.memberId}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="lg:col-span-5 bg-white rounded-[28px] p-6 border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 tracking-tight">
                    Quick Booking & Actions
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Manage upcoming journeys, redeem your miles, and discover exclusive fares.
                  </p>
                </div>

                <div className="space-y-2.5 my-4">
                  <Link
                    href="/"
                    className="flex items-center justify-between p-3 rounded-xl bg-purple-50/60 hover:bg-purple-100/70 text-[#742da7] font-semibold text-xs sm:text-sm transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <Plane className="w-4 h-4 text-[#742da7]" />
                      <span>Search &amp; Book Flights</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/#manage-order"
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold text-xs sm:text-sm transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <CreditCard className="w-4 h-4 text-gray-600" />
                      <span>Manage Existing Order</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="pt-2 text-[11px] text-gray-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Your account is verified and ready for travel bookings.</span>
                </div>
              </div>

            </div>

            {/* User Reference Image 2: Activity History Card */}
            <div className="bg-white rounded-[28px] p-8 sm:p-12 border border-dashed border-gray-300 shadow-sm text-center max-w-xl mx-auto sm:mx-0 sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Activity history
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 font-normal">
                Start earning points by booking your first flight
              </p>
              <div className="mt-6">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border-2 border-gray-900 text-gray-900 font-bold text-xs sm:text-sm hover:bg-gray-900 hover:text-white transition-all duration-200 active:scale-95"
                >
                  Book a Flight
                </Link>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: Activity History Only */}
        {activeTab === "activity-history" && (
          <div className="space-y-6 animate-in fade-in-50 duration-200">
            {/* Box matching image 2 exactly */}
            <div className="bg-white rounded-[28px] p-8 sm:p-12 border border-dashed border-gray-300 shadow-sm max-w-lg">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Activity history
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 font-normal">
                Start earning points by booking your first flight
              </p>
              <div className="mt-6">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border-2 border-gray-900 text-gray-900 font-bold text-xs sm:text-sm hover:bg-gray-900 hover:text-white transition-all duration-200 active:scale-95"
                >
                  Book a Flight
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Personal Information Details */}
        {activeTab === "personal-info" && (
          <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-gray-150 shadow-sm max-w-2xl animate-in fade-in-50 duration-200">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              Personal Information
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Your verified Riyadh Air Sfeer traveler profile details.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-150">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Full Name
                </p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">
                  {user.title ? `${user.title} ` : ""}{user.name}
                </p>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-150">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Country of Residence
                </p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">
                  {user.country || "Saudi Arabia"}
                </p>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-150">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Verified Email
                </p>
                <p className="text-sm font-bold text-gray-900 mt-0.5 flex items-center gap-1.5">
                  <span>{user.email}</span>
                  <span className="text-emerald-600 text-xs">✓</span>
                </p>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-150">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Verified Phone
                </p>
                <p className="text-sm font-bold text-gray-900 mt-0.5 flex items-center gap-1.5">
                  <span>{user.phone}</span>
                  <span className="text-emerald-600 text-xs">✓</span>
                </p>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-150">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Date of Birth
                </p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">
                  {user.dob || "Not specified"}
                </p>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-150">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Sfeer Member ID
                </p>
                <p className="text-sm font-mono font-bold text-[#742da7] mt-0.5">
                  {user.memberId}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={handleLogout}
                className="px-5 py-2 rounded-full border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors cursor-pointer"
              >
                Sign out of account
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
