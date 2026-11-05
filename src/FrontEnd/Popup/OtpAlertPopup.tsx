"use client";

import React from "react";
import { Mail, Phone, ArrowRight, X, ShieldCheck } from "lucide-react";

export interface OtpAlertPopupProps {
  isOpen: boolean;
  stage: "email-sent" | "mobile-sent";
  destination: string;
  onProceed: () => void;
  onClose: () => void;
}

export default function OtpAlertPopup({
  isOpen,
  stage,
  destination,
  onProceed,
  onClose,
}: OtpAlertPopupProps) {
  if (!isOpen) return null;

  const isEmail = stage === "email-sent";

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-in fade-in-50 duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl border border-purple-100 text-center animate-in zoom-in-95 duration-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative purple glow background */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-purple-100/60 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-purple-100/60 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Central Icon Emblem (Clean & Luxury) */}
        <div className="flex justify-center mb-5">
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#742da7] to-[#9d4edd] flex items-center justify-center text-white shadow-xl shadow-purple-900/25">
            {isEmail ? (
              <Mail className="w-9 h-9 text-white animate-pulse" />
            ) : (
              <Phone className="w-9 h-9 text-white animate-pulse" />
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          {isEmail ? "OTP Sent to Your Email" : "Email Verified! Mobile OTP Sent"}
        </h3>

        {/* Subtitle */}
        <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
          {isEmail
            ? "We have sent a 4-digit verification code to your registered email address:"
            : "Great! Your email has been verified. We have now dispatched a 4-digit code to your phone:"}
        </p>

        {/* Destination Highlight Badge */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-purple-50 border border-purple-200/80 text-gray-900 max-w-full">
          {isEmail ? (
            <Mail className="w-4 h-4 text-[#742da7] shrink-0" />
          ) : (
            <Phone className="w-4 h-4 text-[#742da7] shrink-0" />
          )}
          <span className="font-semibold text-xs sm:text-sm text-[#742da7] truncate">
            {destination || (isEmail ? "your email" : "your mobile number")}
          </span>
          <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-200/60 text-[#742da7]">
            Active
          </span>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={onProceed}
            className="w-full py-3.5 rounded-full text-sm font-semibold tracking-wide text-white bg-[#742da7] hover:bg-[#8538bc] shadow-lg shadow-purple-900/20 hover:shadow-purple-900/35 transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{isEmail ? "Proceed to Verification" : "Enter Mobile OTP"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="py-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
