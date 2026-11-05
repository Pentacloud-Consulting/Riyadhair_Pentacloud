"use client";

import React from "react";
import { CheckCircle2, XCircle, X, ArrowRight } from "lucide-react";

export interface PopupProps {
  isOpen: boolean;
  type: "success" | "error" | "info";
  title: string;
  message: string;
  memberId?: string;
  onClose: () => void;
  onAction?: () => void;
  actionText?: string;
}

export default function NotificationPopup({
  isOpen,
  type,
  title,
  message,
  memberId,
  onClose,
  onAction,
  actionText = "Continue",
}: PopupProps) {
  if (!isOpen) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in-50 duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-[28px] p-6 sm:p-8 shadow-2xl border border-gray-150 text-center animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Icon Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon Header */}
        <div className="flex justify-center mb-5">
          {isSuccess ? (
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#6e29a9] to-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-900/25">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shadow-md">
              <XCircle className="w-8 h-8" />
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          {title}
        </h3>

        {/* Member ID Badge if available */}
        {memberId && (
          <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-900 text-xs font-bold tracking-wider">
            <span>Sfeer Member ID:</span>
            <span className="font-mono text-[#6e29a9]">{memberId}</span>
          </div>
        )}

        {/* Description Message */}
        <p className="mt-3 text-sm text-gray-600 leading-relaxed font-normal">
          {message}
        </p>

        {/* CTA Buttons */}
        <div className="mt-7 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={() => {
              if (onAction) onAction();
              onClose();
            }}
            className={`w-full py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
              isSuccess
                ? "bg-[#6e29a9] hover:bg-[#7f32c2] text-white shadow-purple-900/25"
                : "bg-red-600 hover:bg-red-700 text-white shadow-red-900/20"
            }`}
          >
            {actionText}
          </button>

          {!isSuccess && (
            <button
              type="button"
              onClick={onClose}
              className="py-2 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors"
            >
              Dismiss
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
