"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calendar as CalendarIcon,
  Info,
  Mail,
  Phone,
  Check,
  Lock,
  Sparkles,
} from "lucide-react";
import NotificationPopup from "@/FrontEnd/Popup/NotificationPopup";

interface CountryOption {
  name: string;
  code: string;
  flag: string;
}

const countries: CountryOption[] = [
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "Pakistan", code: "+92", flag: "🇵🇰" },
  { name: "Egypt", code: "+20", flag: "🇪🇬" },
  { name: "Kuwait", code: "+965", flag: "🇰🇼" },
  { name: "Qatar", code: "+974", flag: "🇶🇦" },
  { name: "Bahrain", code: "+973", flag: "🇧🇭" },
  { name: "Oman", code: "+968", flag: "🇴🇲" },
  { name: "Jordan", code: "+962", flag: "🇯🇴" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
];

// User specified: ONLY Mr, Ms, Mrs
const titleOptions = ["Mr", "Ms", "Mrs"];

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const years = Array.from({ length: 75 }, (_, i) => 2014 - i);

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  // Steps: 1 = Registration Details, 2 = OTP Dual Verification (Email + Mobile)
  const [step, setStep] = useState<1 | 2>(1);

  // Form Fields
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [phoneCode, setPhoneCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Custom UI Dropdown States
  const [isTitleOpen, setIsTitleOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isPhoneCodeOpen, setIsPhoneCodeOpen] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  // Custom UI Datepicker States
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [calendarMonth, setCalendarMonth] = useState(0);
  const [calendarYear, setCalendarYear] = useState(1996);

  // Formatted Date String
  const formattedDob = selectedDay
    ? `${String(selectedDay).padStart(2, "0")} / ${String(calendarMonth + 1).padStart(2, "0")} / ${calendarYear}`
    : "";

  // Dual OTP States: 1. Email OTP, 2. Mobile OTP
  const [emailOtp, setEmailOtp] = useState(["", "", "", ""]);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailOtpError, setEmailOtpError] = useState("");

  const [mobileOtp, setMobileOtp] = useState(["", "", "", ""]);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [mobileOtpError, setMobileOtpError] = useState("");

  const emailOtpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const mobileOtpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Popup Modal States
  const [popupState, setPopupState] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
    memberId?: string;
  }>({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  // LOCK BACKGROUND PAGE SCROLLING WHEN MODAL IS OPEN
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Reset form when modal closes or opens
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setEmailOtp(["", "", "", ""]);
      setMobileOtp(["", "", "", ""]);
      setIsEmailVerified(false);
      setIsMobileVerified(false);
      setEmailOtpError("");
      setMobileOtpError("");
      setIsTitleOpen(false);
      setIsCountryOpen(false);
      setIsPhoneCodeOpen(false);
      setIsDatePickerOpen(false);
      setIsMonthOpen(false);
      setIsYearOpen(false);
    }
  }, [isOpen]);

  // Country selection ONLY shows Country name, and automatically updates phone dialing code
  const handleSelectCountry = (country: CountryOption) => {
    setSelectedCountry(country.name);
    setPhoneCode(country.code);
    setIsCountryOpen(false);
  };

  // Handle Email OTP input
  const handleEmailOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...emailOtp];
    updated[index] = val;
    setEmailOtp(updated);
    setEmailOtpError("");

    if (val && index < 3) {
      emailOtpRefs[index + 1].current?.focus();
    }

    // Auto-verify if "0000" is entered
    if (updated.join("") === "0000") {
      setIsEmailVerified(true);
    }
  };

  const handleVerifyEmail = () => {
    if (emailOtp.join("") === "0000") {
      setIsEmailVerified(true);
      setEmailOtpError("");
    } else {
      setEmailOtpError("Invalid code. Use mock code 0000");
    }
  };

  // Handle Mobile OTP input
  const handleMobileOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...mobileOtp];
    updated[index] = val;
    setMobileOtp(updated);
    setMobileOtpError("");

    if (val && index < 3) {
      mobileOtpRefs[index + 1].current?.focus();
    }

    // Auto-verify if "0000" is entered
    if (updated.join("") === "0000") {
      setIsMobileVerified(true);
    }
  };

  const handleVerifyMobile = () => {
    if (mobileOtp.join("") === "0000") {
      setIsMobileVerified(true);
      setMobileOtpError("");
    } else {
      setMobileOtpError("Invalid code. Use mock code 0000");
    }
  };

  // Calendar calculations
  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();
  const daysCount = getDaysInMonth(calendarMonth, calendarYear);
  const startDay = getFirstDayOfMonth(calendarMonth, calendarYear);

  // Final Completion Trigger
  const handleCompleteRegistration = () => {
    if (isEmailVerified && isMobileVerified) {
      setPopupState({
        isOpen: true,
        type: "success",
        title: "Welcome to Sfeer & Riyadh Air!",
        message: `Congratulations ${title ? `${title} ` : ""}${firstName || "Guest"}! Both your email and mobile have been verified. Your Sfeer Club privileges are now unlocked.`,
        memberId: "SFR-" + Math.floor(100000 + Math.random() * 900000),
      });
    } else {
      setPopupState({
        isOpen: true,
        type: "error",
        title: "Verification Required",
        message: "Please complete both Email and Mobile phone OTP verifications using code 0000.",
      });
    }
  };

  if (!isOpen) return null;

  // Left image switches to image copy.png on OTP step
  const leftImageSrc = step === 2 ? "/images/image copy.png" : "/images/image.png";

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-md animate-in fade-in-50 duration-200">
        
        {/* Modal Window Container */}
        <div
          className="relative w-full max-w-[960px] bg-white rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl border-0 flex flex-col md:flex-row h-auto max-h-[92vh] md:h-[640px] animate-in zoom-in-95 duration-200"
          onClick={(e) => {
            e.stopPropagation();
            setIsTitleOpen(false);
            setIsCountryOpen(false);
            setIsPhoneCodeOpen(false);
            setIsDatePickerOpen(false);
            setIsMonthOpen(false);
            setIsYearOpen(false);
          }}
        >
          {/* ========================================================= */}
          {/* LEFT SIDE: Sfeer Brand Image (1076x1462 Perfect Fit)       */}
          {/* ========================================================= */}
          <div className="relative hidden md:block w-[471px] shrink-0 bg-[#fa921d] h-full overflow-hidden">
            <Image
              src={leftImageSrc}
              alt="Sfeer Riyadh Air Member"
              fill
              className="object-cover object-left-top transition-all duration-500"
              priority
              sizes="471px"
            />
          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDE: Smooth Scrollable Form with Fixed Header & Bottom */}
          {/* ========================================================= */}
          <div className="flex-1 flex flex-col h-full overflow-hidden bg-white min-w-0">
            
            {/* 1. Fixed Header: Back, Title & Close Button */}
            <div className="px-6 sm:px-8 pt-6 pb-3 shrink-0 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
                    aria-label="Back"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                  Join Sfeer | Riyadh Air
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2. Step Indicator Progress Bar (Light Purple Theme) */}
            <div className="px-6 sm:px-8 pt-3 pb-1 shrink-0">
              <div className="flex items-center gap-2">
                <div className={`h-1.5 flex-1 rounded-full transition-all ${step >= 1 ? "bg-[#742da7]" : "bg-gray-100"}`} />
                <div className={`h-1.5 flex-1 rounded-full transition-all ${step >= 2 ? "bg-[#742da7]" : "bg-gray-100"}`} />
              </div>
            </div>

            {/* 3. Middle Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-4 space-y-4 text-left">
              
              {/* ========================================================= */}
              {/* STEP 1: All In Requested Clean Single-Line Rows           */}
              {/* ========================================================= */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in-50 duration-200 pb-2">
                  
                  {/* ROW 1: Title + First Name + Last Name (IN 1 SINGLE LINE) */}
                  <div>
                    <div className="grid grid-cols-12 gap-2.5 items-end">
                      
                      {/* Title: Only Mr, Mrs, Ms */}
                      <div className="col-span-3">
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                          Title
                        </label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsTitleOpen(!isTitleOpen);
                              setIsCountryOpen(false);
                              setIsPhoneCodeOpen(false);
                              setIsDatePickerOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 bg-white rounded-xl text-xs sm:text-sm text-left transition-all cursor-pointer ${
                              isTitleOpen
                                ? "ring-2 ring-purple-400/40 border-[#742da7]"
                                : "border border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <span className={title ? "font-semibold text-gray-900" : "text-gray-400"}>
                              {title || "Select"}
                            </span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                                isTitleOpen ? "rotate-180 text-[#742da7]" : ""
                              }`}
                            />
                          </button>

                          {/* Custom Title Dropdown: ONLY Mr, Mrs, Ms */}
                          {isTitleOpen && (
                            <div
                              className="absolute top-full left-0 mt-1.5 w-32 bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 p-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-150"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="text-[10px] font-bold text-gray-400 px-3 py-1 uppercase tracking-wider">
                                CHOOSE TITLE
                              </div>
                              {titleOptions.map((t) => (
                                <button
                                  key={t}
                                  type="button"
                                  onClick={() => {
                                    setTitle(t);
                                    setIsTitleOpen(false);
                                  }}
                                  className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm rounded-xl text-left transition-colors cursor-pointer ${
                                    title === t
                                      ? "bg-purple-50 text-[#742da7] font-bold"
                                      : "text-gray-700 hover:bg-gray-50"
                                  }`}
                                >
                                  <span>{t}</span>
                                  {title === t && <Check className="w-3.5 h-3.5 text-[#742da7]" />}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* First Name as on passport */}
                      <div className="col-span-4">
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                          First name
                        </label>
                        <input
                          type="text"
                          placeholder="First name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#742da7] focus:ring-2 focus:ring-purple-200 transition-all"
                        />
                      </div>

                      {/* Last Name as on passport */}
                      <div className="col-span-5">
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                          Last name
                        </label>
                        <input
                          type="text"
                          placeholder="Last name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#742da7] focus:ring-2 focus:ring-purple-200 transition-all"
                        />
                      </div>

                    </div>
                  </div>

                  {/* ROW 2: Email in 1 Line by Itself */}
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        required
                        placeholder="e.g. name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#742da7] focus:ring-2 focus:ring-purple-200 transition-all"
                      />
                    </div>
                  </div>

                  {/* ROW 3: Country of Residence + Country Dial Code + Number in 1 LINE */}
                  <div>
                    <div className="grid grid-cols-12 gap-2.5 items-end">
                      
                      {/* Left: Country of Residence (ONLY Country Name, 4 items max-h-[178px]) */}
                      <div className="col-span-5">
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                          Country of residence
                        </label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsCountryOpen(!isCountryOpen);
                              setIsTitleOpen(false);
                              setIsPhoneCodeOpen(false);
                              setIsDatePickerOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 bg-white rounded-xl text-xs sm:text-sm text-left transition-all cursor-pointer ${
                              isCountryOpen
                                ? "ring-2 ring-purple-400/40 border-[#742da7]"
                                : "border border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <span className="font-semibold text-gray-900 truncate">
                              {selectedCountry}
                            </span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform duration-200 ${
                                isCountryOpen ? "rotate-180 text-[#742da7]" : ""
                              }`}
                            />
                          </button>

                          {/* 4 Items clean height */}
                          {isCountryOpen && (
                            <div
                              className="absolute top-full left-0 mt-1.5 w-60 bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 p-1.5 z-50 max-h-[178px] overflow-y-auto animate-in fade-in-50 zoom-in-95 duration-150"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="text-[10px] font-bold text-gray-400 px-3 py-1 uppercase tracking-wider">
                                Select Country
                              </div>
                              {countries.map((c) => (
                                <button
                                  key={c.name}
                                  type="button"
                                  onClick={() => handleSelectCountry(c)}
                                  className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm rounded-xl text-left transition-colors cursor-pointer ${
                                    selectedCountry === c.name
                                      ? "bg-purple-50 text-[#742da7] font-bold"
                                      : "text-gray-700 hover:bg-gray-50"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="text-base">{c.flag}</span>
                                    <span>{c.name}</span>
                                  </div>
                                  {selectedCountry === c.name && (
                                    <Check className="w-4 h-4 text-[#742da7]" />
                                  )}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Middle: Country Code Selector */}
                      <div className="col-span-3">
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                          Code
                        </label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsPhoneCodeOpen(!isPhoneCodeOpen);
                              setIsCountryOpen(false);
                              setIsTitleOpen(false);
                              setIsDatePickerOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-2.5 py-2.5 bg-white rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                              isPhoneCodeOpen
                                ? "ring-2 ring-purple-400/40 border-[#742da7]"
                                : "border border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <span>({phoneCode})</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                                isPhoneCodeOpen ? "rotate-180 text-[#742da7]" : ""
                              }`}
                            />
                          </button>

                          {isPhoneCodeOpen && (
                            <div
                              className="absolute top-full left-0 mt-1.5 w-44 bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 p-1.5 z-50 max-h-[178px] overflow-y-auto animate-in fade-in-50 zoom-in-95 duration-150"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {countries.map((c) => (
                                <button
                                  key={`${c.name}-${c.code}`}
                                  type="button"
                                  onClick={() => {
                                    setPhoneCode(c.code);
                                    setIsPhoneCodeOpen(false);
                                  }}
                                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-xl text-left transition-colors cursor-pointer ${
                                    phoneCode === c.code
                                      ? "bg-purple-50 text-[#742da7] font-bold"
                                      : "text-gray-700 hover:bg-gray-50"
                                  }`}
                                >
                                  <div className="flex items-center gap-1.5">
                                    <span>{c.flag}</span>
                                    <span>{c.code}</span>
                                  </div>
                                  {phoneCode === c.code && (
                                    <Check className="w-3.5 h-3.5 text-[#742da7]" />
                                  )}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Mobile number input */}
                      <div className="col-span-4">
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="Type here"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#742da7] focus:ring-2 focus:ring-purple-200 transition-all"
                        />
                      </div>

                    </div>
                    {/* Helper note under mobile number */}
                    <p className="text-[11px] text-gray-500 mt-1.5 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>Please make sure you enter the correct phone number so we can send you a verification code.</span>
                    </p>
                  </div>

                  {/* ROW 4: Date of Birth */}
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDatePickerOpen(!isDatePickerOpen);
                          setIsCountryOpen(false);
                          setIsTitleOpen(false);
                          setIsPhoneCodeOpen(false);
                          setIsMonthOpen(false);
                          setIsYearOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 bg-white rounded-xl text-xs sm:text-sm text-left transition-all cursor-pointer ${
                          isDatePickerOpen
                            ? "ring-2 ring-purple-400/40 border-[#742da7]"
                            : "border border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span className={formattedDob ? "font-semibold text-gray-900" : "text-gray-400"}>
                          {formattedDob || "DD / MM / YYYY"}
                        </span>
                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                      </button>

                      {/* Custom UI Datepicker (In-flow, never clipped, full width) */}
                      {isDatePickerOpen && (
                        <div
                          className="mt-2.5 w-full bg-white rounded-2xl border border-gray-200 shadow-xl p-4 z-20 animate-in fade-in-50 zoom-in-95 duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsMonthOpen(false);
                            setIsYearOpen(false);
                          }}
                        >
                          <div className="flex items-center justify-between gap-2 pb-3 border-b border-gray-100 relative">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsMonthOpen(false);
                                setIsYearOpen(false);
                                if (calendarMonth === 0) {
                                  setCalendarMonth(11);
                                  setCalendarYear((y) => y - 1);
                                } else {
                                  setCalendarMonth((m) => m - 1);
                                }
                              }}
                              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                              aria-label="Previous month"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>

                            <div className="flex items-center gap-2">
                              {/* Custom Month Menu */}
                              <div className="relative">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMonthOpen(!isMonthOpen);
                                    setIsYearOpen(false);
                                  }}
                                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs font-bold text-gray-800 transition-colors cursor-pointer border border-gray-200/70"
                                >
                                  <span>{months[calendarMonth]}</span>
                                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isMonthOpen ? "rotate-180 text-[#742da7]" : ""}`} />
                                </button>

                                {isMonthOpen && (
                                  <div
                                    className="absolute top-full left-0 mt-1.5 w-36 bg-white rounded-xl shadow-2xl ring-1 ring-black/5 p-1 z-50 max-h-[190px] overflow-y-auto animate-in fade-in-50 zoom-in-95 duration-150"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {months.map((m, idx) => (
                                      <button
                                        key={m}
                                        type="button"
                                        onClick={() => {
                                          setCalendarMonth(idx);
                                          setIsMonthOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg text-left transition-colors cursor-pointer ${
                                          calendarMonth === idx
                                            ? "bg-purple-50 text-[#742da7] font-bold"
                                            : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                      >
                                        <span>{m}</span>
                                        {calendarMonth === idx && <Check className="w-3.5 h-3.5 text-[#742da7]" />}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* Custom Year Menu: ~12 items height */}
                              <div className="relative">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsYearOpen(!isYearOpen);
                                    setIsMonthOpen(false);
                                  }}
                                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs font-bold text-gray-800 transition-colors cursor-pointer border border-gray-200/70"
                                >
                                  <span>{calendarYear}</span>
                                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isYearOpen ? "rotate-180 text-[#742da7]" : ""}`} />
                                </button>

                                {isYearOpen && (
                                  <div
                                    className="absolute top-full right-0 mt-1.5 w-28 bg-white rounded-xl shadow-2xl ring-1 ring-black/5 p-1 z-50 max-h-[210px] overflow-y-auto animate-in fade-in-50 zoom-in-95 duration-150"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {years.map((y) => (
                                      <button
                                        key={y}
                                        type="button"
                                        onClick={() => {
                                          setCalendarYear(y);
                                          setIsYearOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg text-left transition-colors cursor-pointer ${
                                          calendarYear === y
                                            ? "bg-purple-50 text-[#742da7] font-bold"
                                            : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                      >
                                        <span>{y}</span>
                                        {calendarYear === y && <Check className="w-3.5 h-3.5 text-[#742da7]" />}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsMonthOpen(false);
                                setIsYearOpen(false);
                                if (calendarMonth === 11) {
                                  setCalendarMonth(0);
                                  setCalendarYear((y) => y + 1);
                                } else {
                                  setCalendarMonth((m) => m + 1);
                                }
                              }}
                              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                              aria-label="Next month"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-7 text-center text-[10px] font-bold text-gray-400 py-2.5 uppercase tracking-wider">
                            <span>Su</span>
                            <span>Mo</span>
                            <span>Tu</span>
                            <span>We</span>
                            <span>Th</span>
                            <span>Fr</span>
                            <span>Sa</span>
                          </div>

                          <div className="grid grid-cols-7 gap-1 text-center text-xs">
                            {Array.from({ length: startDay }).map((_, i) => (
                              <div key={`empty-${i}`} className="p-1.5" />
                            ))}

                            {Array.from({ length: daysCount }).map((_, i) => {
                              const day = i + 1;
                              const isSelected = selectedDay === day;
                              return (
                                <button
                                  key={`day-${day}`}
                                  type="button"
                                  onClick={() => {
                                    setSelectedDay(day);
                                    setIsDatePickerOpen(false);
                                  }}
                                  className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full font-medium transition-all cursor-pointer ${
                                    isSelected
                                      ? "bg-[#742da7] text-white font-bold shadow-md shadow-purple-900/20 scale-105"
                                      : "text-gray-700 hover:bg-purple-50 hover:text-[#742da7]"
                                  }`}
                                >
                                  {day}
                                </button>
                              );
                            })}
                          </div>

                          <div className="pt-3 mt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedDay(null);
                              }}
                              className="text-gray-400 hover:text-gray-700 font-medium cursor-pointer"
                            >
                              Clear
                            </button>
                            <span className="text-[11px] text-[#742da7] font-semibold">
                              {selectedDay ? `${selectedDay} ${months[calendarMonth]} ${calendarYear}` : "Select a date"}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setIsDatePickerOpen(false);
                              }}
                              className="px-3 py-1 rounded-full bg-[#742da7] hover:bg-[#8538bc] text-white font-semibold text-xs transition-colors cursor-pointer"
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              )}

              {/* ========================================================= */}
              {/* STEP 2: Dual Verification (Email OTP + Mobile OTP locked) */}
              {/* ========================================================= */}
              {step === 2 && (
                <div className="space-y-6 py-2 animate-in fade-in-50 duration-200">
                  
                  {/* Top Intro */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      OTP Verification
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      Verify your email address first to unlock your phone number verification.
                    </p>
                  </div>

                  {/* SECTION 1: Email OTP Verification */}
                  <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                    isEmailVerified
                      ? "bg-emerald-50/60 border-emerald-200"
                      : "bg-purple-50/40 border-purple-100"
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Mail className={`w-4 h-4 ${isEmailVerified ? "text-emerald-600" : "text-[#742da7]"}`} />
                        <span className="text-xs font-bold text-gray-900">1. Email OTP</span>
                      </div>
                      {isEmailVerified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                          <Check className="w-3.5 h-3.5" />
                          <span>Verified</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-gray-500 font-medium">
                          Sent to <span className="font-semibold text-gray-800">{email || "your email"}</span>
                        </span>
                      )}
                    </div>

                    {!isEmailVerified ? (
                      <div className="space-y-3 mt-3">
                        <div className="flex justify-center gap-3">
                          {emailOtp.map((digit, idx) => (
                            <input
                              key={`email-${idx}`}
                              ref={emailOtpRefs[idx]}
                              type="text"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleEmailOtpChange(idx, e.target.value)}
                              className="w-11 h-12 text-center text-lg font-bold text-[#742da7] bg-white border border-gray-200 rounded-xl focus:border-[#742da7] focus:outline-none shadow-sm"
                            />
                          ))}
                        </div>

                        {emailOtpError && (
                          <p className="text-center text-xs text-red-600 font-medium">{emailOtpError}</p>
                        )}

                        <div className="flex items-center justify-between text-xs pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              setEmailOtp(["0", "0", "0", "0"]);
                              setIsEmailVerified(true);
                            }}
                            className="text-[#742da7] font-semibold hover:underline cursor-pointer"
                          >
                            Fill mock (0000)
                          </button>
                          <button
                            type="button"
                            onClick={handleVerifyEmail}
                            className="px-4 py-1.5 rounded-full bg-[#742da7] text-white font-semibold text-xs hover:bg-[#8538bc] transition-colors cursor-pointer"
                          >
                            Verify Email
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-emerald-800 font-medium mt-1">
                        ✓ Email confirmed successfully. Mobile verification is now unlocked below!
                      </p>
                    )}
                  </div>

                  {/* SECTION 2: Mobile Phone OTP Verification (DISABLED UNTIL EMAIL IS VERIFIED) */}
                  <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                    !isEmailVerified
                      ? "bg-gray-50 border-gray-200 opacity-60"
                      : isMobileVerified
                      ? "bg-emerald-50/60 border-emerald-200"
                      : "bg-purple-50/40 border-purple-100"
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Phone className={`w-4 h-4 ${
                          !isEmailVerified ? "text-gray-400" : isMobileVerified ? "text-emerald-600" : "text-[#742da7]"
                        }`} />
                        <span className="text-xs font-bold text-gray-900">2. Mobile Number OTP</span>
                      </div>

                      {!isEmailVerified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500 bg-gray-200/60 px-2 py-0.5 rounded-full">
                          <Lock className="w-3 h-3" />
                          <span>Locked</span>
                        </span>
                      ) : isMobileVerified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                          <Check className="w-3.5 h-3.5" />
                          <span>Verified</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-gray-500 font-medium">
                          Sent to <span className="font-semibold text-gray-800">({phoneCode}) {phoneNumber || "Phone"}</span>
                        </span>
                      )}
                    </div>

                    {!isEmailVerified ? (
                      <p className="text-xs text-gray-500 font-normal py-2 flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 shrink-0" />
                        <span>Please complete Email OTP verification first to unlock this section.</span>
                      </p>
                    ) : !isMobileVerified ? (
                      <div className="space-y-3 mt-3 animate-in fade-in-50 duration-200">
                        <div className="flex justify-center gap-3">
                          {mobileOtp.map((digit, idx) => (
                            <input
                              key={`mobile-${idx}`}
                              ref={mobileOtpRefs[idx]}
                              type="text"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleMobileOtpChange(idx, e.target.value)}
                              className="w-11 h-12 text-center text-lg font-bold text-[#742da7] bg-white border border-gray-200 rounded-xl focus:border-[#742da7] focus:outline-none shadow-sm"
                            />
                          ))}
                        </div>

                        {mobileOtpError && (
                          <p className="text-center text-xs text-red-600 font-medium">{mobileOtpError}</p>
                        )}

                        <div className="flex items-center justify-between text-xs pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              setMobileOtp(["0", "0", "0", "0"]);
                              setIsMobileVerified(true);
                            }}
                            className="text-[#742da7] font-semibold hover:underline cursor-pointer"
                          >
                            Fill mock (0000)
                          </button>
                          <button
                            type="button"
                            onClick={handleVerifyMobile}
                            className="px-4 py-1.5 rounded-full bg-[#742da7] text-white font-semibold text-xs hover:bg-[#8538bc] transition-colors cursor-pointer"
                          >
                            Verify Mobile
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-emerald-800 font-medium mt-1">
                        ✓ Mobile number confirmed successfully. Ready to join!
                      </p>
                    )}
                  </div>

                </div>
              )}

            </div>

            {/* 4. Fixed Bottom Action Bar: Always visible, never cut off! */}
            <div className="px-6 sm:px-8 py-4 shrink-0 border-t border-gray-100 flex justify-end bg-white">
              {step === 1 && (
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-8 py-3 rounded-full text-sm font-semibold tracking-wide text-white bg-[#742da7] hover:bg-[#8538bc] shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
                >
                  OTP Next
                </button>
              )}

              {step === 2 && (
                <button
                  type="button"
                  disabled={!isEmailVerified || !isMobileVerified}
                  onClick={handleCompleteRegistration}
                  className={`px-8 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 ${
                    isEmailVerified && isMobileVerified
                      ? "text-white bg-[#742da7] hover:bg-[#8538bc] shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                      : "text-gray-400 bg-gray-100 cursor-not-allowed"
                  }`}
                >
                  Complete &amp; Join Sfeer
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Notification Popup (Success / Error message) */}
      <NotificationPopup
        isOpen={popupState.isOpen}
        type={popupState.type}
        title={popupState.title}
        message={popupState.message}
        memberId={popupState.memberId}
        actionText={popupState.type === "success" ? "Go to Dashboard" : "Try Again"}
        onClose={() => {
          setPopupState({ ...popupState, isOpen: false });
          if (popupState.type === "success") {
            onClose();
          }
        }}
      />
    </>
  );
}
