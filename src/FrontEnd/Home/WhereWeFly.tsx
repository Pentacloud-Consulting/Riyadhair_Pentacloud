"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plane, CalendarCheck } from "lucide-react";

export default function WhereWeFly() {
  return (
    <section className="w-full bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
        
        {/* Top Intro Paragraph */}
        <div className="max-w-4xl">
          <p className="text-sm sm:text-base font-normal text-gray-700 leading-relaxed">
            Discover Riyadh Air destinations, explore travel options, and book
            with confidence. We&apos;ve made it simple, intuitive, and convenient
            for you. Your next adventure begins here.
          </p>
        </div>

        {/* Block 1: Where we fly */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Text */}
          <div className="space-y-4 max-w-lg">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Where we fly
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Every destination tells a story. Riyadh Air connects you to the ones
              worth remembering. This is where your next adventure begins. Explore
              our route on the horizon as Riyadh Air connects the Kingdom to the
              world.
            </p>
            <div className="pt-2">
              <Link
                href="#destinations"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#742da7] hover:bg-[#8538bc] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>View destinations</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
              </Link>
            </div>
          </div>

          {/* Right Image (Airplane flying over Earth at night) */}
          <div className="relative group overflow-hidden rounded-[24px] sm:rounded-[32px] shadow-xl shadow-purple-950/10 border-0 aspect-[16/10] bg-gray-900">
            <Image
              src="/images/where-we-fly.jpg"
              alt="Riyadh Air aircraft flying over Earth at night"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Subtle atmospheric vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Block 2: Manage your order */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Image (Laptop, passport and travel accessories on desk) */}
          <div className="order-2 lg:order-1 relative group overflow-hidden rounded-[24px] sm:rounded-[32px] shadow-xl shadow-purple-950/10 border-0 aspect-[16/10] bg-gray-100">
            <Image
              src="/images/manage-order.jpg"
              alt="Manage your Riyadh Air flight booking"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Subtle atmospheric vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Right Text */}
          <div className="order-1 lg:order-2 space-y-4 max-w-lg">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Manage your order
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Review and update essential booking information in a few steps.
              Whether you need to retrieve your order or make a change, everything
              begins here.
            </p>
            <div className="pt-2">
              <Link
                href="#manage-order"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#742da7] hover:bg-[#8538bc] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Access your order</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
