"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";

export default function AirportNotice() {
  return (
    <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-white border-0 p-8 sm:p-12 lg:p-16 text-center shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_50px_rgba(28,7,52,0.09)] transition-all duration-300">
          
          {/* Subtle decorative top accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-400 via-purple-600 to-indigo-500 rounded-full" />

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-900 tracking-tight leading-tight">
            Airport change <br /> notice
          </h2>

          {/* Notice Description */}
          <p className="mt-5 text-sm sm:text-base text-gray-700 max-w-2xl mx-auto leading-relaxed font-normal">
            Riyadh Air flights between Riyadh and London, Cairo, Lahore, Islamabad,
            Dhaka, and Jeddah are operating via Al Qassim Airport (ELQ).
            Complimentary bus transfers provided between Riyadh and Al Qassim
            Airport.
          </p>

          {/* Call to action button */}
          <div className="mt-8 flex justify-center">
            <Link
              href="#travel-arrangements"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#742da7] hover:bg-[#8538bc] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>View updated travel arrangements</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
