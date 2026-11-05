"use client";

import React, { useState } from "react";
import {
  ArrowLeftRight,
  Search,
  Calendar,
  Users,
  ChevronDown,
  Tag,
  Check,
  Plane,
  X,
} from "lucide-react";

interface Destination {
  city: string;
  code: string;
  country: string;
}

const popularDestinations: Destination[] = [
  { city: "London", code: "LHR", country: "United Kingdom" },
  { city: "Dubai", code: "DXB", country: "United Arab Emirates" },
  { city: "Paris", code: "CDG", country: "France" },
  { city: "New York", code: "JFK", country: "United States" },
  { city: "Tokyo", code: "HND", country: "Japan" },
  { city: "Jeddah", code: "JED", country: "Saudi Arabia" },
];

export default function Hero() {
  // State for search fields
  const [fromLocation, setFromLocation] = useState({ code: "RUH", city: "Riyadh" });
  const [toLocation, setToLocation] = useState<Destination | null>(null);
  const [departureDate, setDepartureDate] = useState("18 Nov");
  const [returnDate, setReturnDate] = useState("25 Nov");
  const [guests, setGuests] = useState(1);
  const [cabin, setCabin] = useState("Economy");

  // Dropdown states
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // Swap From & To
  const handleSwap = () => {
    if (toLocation) {
      const prevFrom = { ...fromLocation };
      setFromLocation({ code: toLocation.code, city: toLocation.city });
      setToLocation({ city: prevFrom.city, code: prevFrom.code, country: "Saudi Arabia" });
    }
  };

  return (
    <section className="relative w-full bg-white pt-6 sm:pt-10 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* ========================================================= */}
        {/* TOP FLOATING SEARCH CAPSULE (Clean Borderless Luxury Pill) */}
        {/* ========================================================= */}
        <div className="w-full max-w-5xl relative z-30">
          <div className="bg-white rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.02)] p-2 sm:p-2.5 flex items-center justify-between transition-all duration-300 hover:shadow-[0_10px_40px_rgba(28,7,52,0.12)]">
            
            {/* 1. FROM */}
            <div
              onClick={() => setActiveDropdown(activeDropdown === "from" ? null : "from")}
              className="relative flex-1 min-w-0 px-3.5 sm:px-5 py-2 rounded-full hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <span className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                From
              </span>
              <div className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                {fromLocation.code} - {fromLocation.city}
              </div>

              {/* From Dropdown */}
              {activeDropdown === "from" && (
                <div
                  className="absolute top-full left-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 p-2 z-50 text-left"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-3 py-2 text-[11px] font-semibold text-gray-400 uppercase">
                    Select Origin
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFromLocation({ code: "RUH", city: "Riyadh" });
                      setActiveDropdown(null);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-800 rounded-xl hover:bg-purple-50 hover:text-purple-900 transition-colors"
                  >
                    <span>RUH - Riyadh (Hub)</span>
                    {fromLocation.code === "RUH" && <Check className="w-4 h-4 text-purple-700" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFromLocation({ code: "JED", city: "Jeddah" });
                      setActiveDropdown(null);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-800 rounded-xl hover:bg-purple-50 hover:text-purple-900 transition-colors"
                  >
                    <span>JED - Jeddah</span>
                    {fromLocation.code === "JED" && <Check className="w-4 h-4 text-purple-700" />}
                  </button>
                </div>
              )}
            </div>

            {/* SWAP BUTTON */}
            <div className="shrink-0 px-1">
              <button
                type="button"
                onClick={handleSwap}
                aria-label="Swap origins and destinations"
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-purple-900 hover:bg-purple-50 transition-all duration-200"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* 2. TO */}
            <div
              onClick={() => setActiveDropdown(activeDropdown === "to" ? null : "to")}
              className="relative flex-1 min-w-0 px-3.5 sm:px-5 py-2 rounded-full hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <span className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                To
              </span>
              <div
                className={`text-xs sm:text-sm truncate ${
                  toLocation ? "font-bold text-gray-900" : "font-medium text-gray-400"
                }`}
              >
                {toLocation ? `${toLocation.code} - ${toLocation.city}` : "Where to?"}
              </div>

              {/* To Destination Dropdown */}
              {activeDropdown === "to" && (
                <div
                  className="absolute top-full left-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 p-2 z-50 text-left"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase">
                    Popular Destinations
                  </div>
                  <div className="max-h-56 overflow-y-auto space-y-0.5">
                    {popularDestinations.map((dest) => (
                      <button
                        key={dest.code}
                        type="button"
                        onClick={() => {
                          setToLocation(dest);
                          setActiveDropdown(null);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl hover:bg-purple-50 hover:text-purple-900 transition-colors text-left"
                      >
                        <div>
                          <span className="font-bold text-gray-900">{dest.code}</span>{" "}
                          <span className="text-gray-600">- {dest.city}</span>
                          <div className="text-[10px] text-gray-400">{dest.country}</div>
                        </div>
                        {toLocation?.code === dest.code && (
                          <Check className="w-4 h-4 text-purple-700" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Subtle Divider */}
            <div className="hidden lg:block w-px h-7 bg-gray-100" />

            {/* 3. DEPARTURE */}
            <div
              onClick={() => setActiveDropdown(activeDropdown === "dep" ? null : "dep")}
              className="relative hidden md:block px-4 py-2 rounded-full hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <span className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                Departure
              </span>
              <div className="text-xs sm:text-sm font-bold text-gray-900 whitespace-nowrap">
                {departureDate}
              </div>

              {activeDropdown === "dep" && (
                <div
                  className="absolute top-full left-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 p-3 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-xs font-semibold text-gray-700 block mb-2">
                    Select Date
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {["15 Nov", "18 Nov", "20 Nov", "25 Nov"].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          setDepartureDate(d);
                          setActiveDropdown(null);
                        }}
                        className={`p-2 rounded-lg font-medium text-center ${
                          departureDate === d ? "bg-purple-800 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 4. RETURN */}
            <div
              onClick={() => setActiveDropdown(activeDropdown === "ret" ? null : "ret")}
              className="relative hidden md:block px-4 py-2 rounded-full hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <span className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                Return
              </span>
              <div className="text-xs sm:text-sm font-bold text-gray-900 whitespace-nowrap">
                {returnDate}
              </div>

              {activeDropdown === "ret" && (
                <div
                  className="absolute top-full left-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 p-3 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-xs font-semibold text-gray-700 block mb-2">
                    Select Return Date
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {["22 Nov", "25 Nov", "30 Nov", "05 Dec"].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          setReturnDate(d);
                          setActiveDropdown(null);
                        }}
                        className={`p-2 rounded-lg font-medium text-center ${
                          returnDate === d ? "bg-purple-800 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Subtle Divider */}
            <div className="hidden lg:block w-px h-7 bg-gray-100" />

            {/* 5. GUESTS */}
            <div
              onClick={() => setActiveDropdown(activeDropdown === "guests" ? null : "guests")}
              className="relative hidden sm:block px-4 py-2 rounded-full hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <span className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                Guests
              </span>
              <div className="text-xs sm:text-sm font-bold text-gray-900 whitespace-nowrap">
                {guests} {guests === 1 ? "Guest" : "Guests"}
              </div>

              {activeDropdown === "guests" && (
                <div
                  className="absolute top-full left-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 p-3 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between text-xs font-semibold mb-2">
                    <span>Adults (12+)</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <span>{guests}</span>
                      <button
                        type="button"
                        onClick={() => setGuests(guests + 1)}
                        className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Subtle Divider */}
            <div className="hidden lg:block w-px h-7 bg-gray-100" />

            {/* 6. CABIN */}
            <div
              onClick={() => setActiveDropdown(activeDropdown === "cabin" ? null : "cabin")}
              className="relative hidden sm:block px-4 py-2 rounded-full hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <span className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                Cabin
              </span>
              <div className="text-xs sm:text-sm font-bold text-gray-900 whitespace-nowrap">
                {cabin}
              </div>

              {activeDropdown === "cabin" && (
                <div
                  className="absolute top-full right-0 mt-3 w-44 bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 p-2 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  {["Economy", "Premium Economy", "Business", "First Suite"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setCabin(c);
                        setActiveDropdown(null);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-xl ${
                        cabin === c ? "bg-purple-100 text-purple-900" : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 7. SEARCH BUTTON (Round circle magnifying glass button without harsh borders) */}
            <div className="shrink-0 pl-1 pr-1">
              <button
                type="button"
                aria-label="Search flights"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gray-100/90 hover:bg-[#1c0734] text-gray-600 hover:text-white transition-all duration-300 flex items-center justify-center shadow-none hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Under search capsule: Add a promo code without harsh dark borders */}
          <div className="mt-3.5 text-center">
            {!showPromoInput ? (
              <button
                type="button"
                onClick={() => setShowPromoInput(true)}
                className="text-xs sm:text-sm font-medium text-gray-600 hover:text-purple-900 transition-colors"
              >
                Add a promo code
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 bg-gray-100/80 rounded-full px-3.5 py-1.5 shadow-sm animate-in fade-in-50 duration-200">
                <Tag className="w-3.5 h-3.5 text-purple-700" />
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="bg-transparent text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none uppercase w-32"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (promoCode.trim()) setPromoApplied(true);
                  }}
                  className="text-xs font-bold text-purple-900 hover:text-purple-700 px-1 cursor-pointer"
                >
                  {promoApplied ? "✓ Applied" : "Apply"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPromoInput(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* LARGE BANNER CARD (Riyadh Air Purple with 3D Wave lines) */}
        {/* ========================================================= */}
        <div className="w-full mt-7 relative rounded-[28px] sm:rounded-[36px] lg:rounded-[42px] overflow-hidden bg-gradient-to-br from-[#1b0533] via-[#240842] to-[#140226] shadow-2xl shadow-purple-950/25 min-h-[360px] sm:min-h-[460px] lg:min-h-[500px] flex items-center">
          
          {/* Authentic Riyadh Air 3D Ribbed Kinetic Waves Pattern */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
              className="w-full h-full object-cover opacity-85"
              viewBox="0 0 1200 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="waveGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#9333ea" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#c084fc" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="wireGlow" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6d28d9" stopOpacity="0.9" />
                  <stop offset="40%" stopColor="#a855f7" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#e9d5ff" stopOpacity="0.15" />
                </linearGradient>
              </defs>

              {/* Ambient purple vortex glow in background */}
              <circle cx="500" cy="300" r="350" fill="#4c1d95" opacity="0.35" filter="blur(60px)" />
              <circle cx="850" cy="400" r="280" fill="#581c87" opacity="0.4" filter="blur(70px)" />

              {/* Array of swept 3D wave rib curves */}
              {Array.from({ length: 32 }).map((_, i) => {
                const step = i * 28;
                const opacity = 0.15 + (i % 8) * 0.08;
                return (
                  <path
                    key={i}
                    d={`M -100 ${150 + i * 14} Q ${250 + step * 0.4} ${50 + i * 10}, ${580 + step * 0.7} ${240 + i * 8} T ${1300} ${320 + i * 12}`}
                    stroke="url(#wireGlow)"
                    strokeWidth="1.25"
                    strokeOpacity={opacity}
                  />
                );
              })}

              {/* Cross-axial sweeping lattice ribbing to reproduce the exact curved grid in image */}
              {Array.from({ length: 26 }).map((_, j) => {
                const xOffset = j * 45;
                return (
                  <path
                    key={`cross-${j}`}
                    d={`M ${120 + xOffset * 0.9} 50 C ${200 + xOffset * 0.8} 180, ${320 + xOffset * 0.8} 360, ${480 + xOffset * 0.9} 620`}
                    stroke="url(#waveGlow)"
                    strokeWidth="1.1"
                    strokeOpacity={0.25 + (j % 5) * 0.1}
                  />
                );
              })}
            </svg>
          </div>

          {/* Banner Content (Plan & manage + Plan your next journey with ease) */}
          <div className="relative z-10 px-8 sm:px-14 lg:px-20 py-12 max-w-2xl">
            {/* Tagline */}
            <p className="text-xs sm:text-sm font-medium tracking-wider text-purple-200/90 mb-3 sm:mb-4">
              Plan &amp; manage
            </p>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]">
              Plan your next journey with ease
            </h1>
          </div>

        </div>

      </div>
    </section>
  );
}
