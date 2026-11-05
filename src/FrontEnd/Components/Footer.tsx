"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  ArrowRight,
  Check,
  Mail,
  ShieldCheck,
  Plane,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="w-full bg-[#140322] text-white border-t border-purple-900/40 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-indigo-900/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Newsletter / Stay Connected Bar */}
      <div className="relative border-b border-purple-900/40 py-12 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-[#1b0630] to-[#140322]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Stay connected with Riyadh Air
            </h3>
            <p className="text-sm text-purple-200/70 font-normal leading-relaxed">
              Be the first to receive exclusive flight fares, new destination announcements, and visionary member privileges.
            </p>
          </div>

          {/* Email Subscription Form */}
          <form
            onSubmit={handleSubscribe}
            className="w-full lg:w-auto flex-1 max-w-md flex flex-col sm:flex-row items-center gap-3"
          >
            {!subscribed ? (
              <>
                <div className="relative w-full">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-300/60" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-purple-400/30 focus:border-white text-white placeholder-purple-200/50 text-sm focus:outline-none transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto shrink-0 px-7 py-3.5 rounded-full bg-white hover:bg-purple-50 text-[#140322] font-semibold text-sm tracking-wide shadow-lg hover:shadow-white/20 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Subscribe
                </button>
              </>
            ) : (
              <div className="w-full p-3.5 rounded-full bg-purple-600/30 border border-purple-400/40 text-purple-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-purple-300" />
                <span>Thank you! You are now subscribed to Riyadh Air updates.</span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Links Columns */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Col 1: Brand & Logo */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block focus:outline-none">
              <Image
                src="/logo/rx-riyadh_air-logo.svg"
                alt="Riyadh Air Logo"
                width={170}
                height={50}
                className="h-10 w-auto object-contain drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
              />
            </Link>
            <p className="text-sm text-purple-200/70 font-normal leading-relaxed max-w-sm">
              Saudi Arabia&apos;s new digitally-native national airline, elevating the world of aviation with warm Saudi hospitality and cutting-edge sustainability.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-purple-300/80">
              <div className="w-7 h-7 rounded-full bg-purple-900/60 flex items-center justify-center">
                <Plane className="w-3.5 h-3.5 text-purple-300" />
              </div>
              <span>Connecting Riyadh to 100+ global gateways</span>
            </div>
          </div>

          {/* Col 2: Plan & Book */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white">
              Plan &amp; Book
            </h4>
            <ul className="space-y-2.5 text-sm text-purple-200/75">
              <li>
                <Link href="#destinations" className="hover:text-white transition-colors">
                  Destinations &amp; Routes
                </Link>
              </li>
              <li>
                <Link href="#offers" className="hover:text-white transition-colors">
                  Special Fares &amp; Offers
                </Link>
              </li>
              <li>
                <Link href="#stopover" className="hover:text-white transition-colors">
                  Saudi Stopover Program
                </Link>
              </li>
              <li>
                <Link href="#groups" className="hover:text-white transition-colors">
                  Group Bookings (10+)
                </Link>
              </li>
              <li>
                <Link href="#charter" className="hover:text-white transition-colors">
                  Private &amp; Cargo Charters
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Experience & Manage */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white">
              Experience
            </h4>
            <ul className="space-y-2.5 text-sm text-purple-200/75">
              <li>
                <Link href="#fleet" className="hover:text-white transition-colors">
                  Boeing 787-9 Fleet
                </Link>
              </li>
              <li>
                <Link href="#cabins" className="hover:text-white transition-colors">
                  First &amp; Business Suites
                </Link>
              </li>
              <li>
                <Link href="#dining" className="hover:text-white transition-colors">
                  Culinary In-Flight Dining
                </Link>
              </li>
              <li>
                <Link href="#sfeer" className="hover:text-white transition-colors">
                  Sfeer Guest Recognition
                </Link>
              </li>
              <li>
                <Link href="#baggage" className="hover:text-white transition-colors">
                  Baggage &amp; Extra Luggage
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: About & Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white">
              About &amp; Help
            </h4>
            <ul className="space-y-2.5 text-sm text-purple-200/75">
              <li>
                <Link href="#vision2030" className="hover:text-white transition-colors">
                  Our Vision 2030
                </Link>
              </li>
              <li>
                <Link href="#sustainability" className="hover:text-white transition-colors">
                  Sustainability Net-Zero
                </Link>
              </li>
              <li>
                <Link href="#careers" className="hover:text-white transition-colors">
                  Careers &amp; Cabin Crew
                </Link>
              </li>
              <li>
                <Link href="#press" className="hover:text-white transition-colors">
                  Press &amp; Media Room
                </Link>
              </li>
              <li>
                <Link href="#help" className="hover:text-white transition-colors">
                  24/7 Guest Assistance
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Middle Divider */}
        <div className="my-12 border-t border-purple-900/40" />

        {/* Bottom Bar: Language, Copyright & Legal Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-purple-300/70">
          
          {/* Left: Copyright */}
          <div className="text-center md:text-left">
            <p>© 2026 Riyadh Air. All Rights Reserved. Commercial Registration No. 1010873491.</p>
          </div>

          {/* Center: Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="#privacy" className="hover:text-white transition-colors">
              Privacy Notice
            </Link>
            <span className="text-purple-800">|</span>
            <Link href="#terms" className="hover:text-white transition-colors">
              Conditions of Carriage
            </Link>
            <span className="text-purple-800">|</span>
            <Link href="#cookies" className="hover:text-white transition-colors">
              Cookie Preferences
            </Link>
            <span className="text-purple-800">|</span>
            <Link href="#accessibility" className="hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>

          {/* Right: Region Indicator */}
          <div className="flex items-center gap-2 text-white/90">
            <Globe className="w-4 h-4 text-purple-300" />
            <span className="font-medium">Saudi Arabia (EN / SAR)</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
