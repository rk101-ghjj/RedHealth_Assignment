"use client";
import React from "react";

type Props = {
  sort: "newest" | "oldest" | null;
  onChange: (value: "newest" | "oldest") => void;
};

export default function SortToggle({ sort, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange("newest")}
        className={`h-9 rounded-md px-3 flex items-center gap-2 text-sm font-medium transition-colors ${
          sort === "newest"
            ? "bg-[#5B8EFF] text-white border border-transparent hover:bg-[#4E7FF0]"
            : "border border-slate-200 bg-white text-slate-700 hover:bg-[#0F1A2C] hover:text-white"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
          aria-hidden
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        Newest
      </button>
      <button
        type="button"
        onClick={() => onChange("oldest")}
        className={`h-9 rounded-md px-3 flex items-center gap-2 text-sm font-medium transition-colors ${
          sort === "oldest"
            ? "bg-[#5B8EFF] text-white border border-transparent hover:bg-[#4E7FF0]"
            : "border border-slate-200 bg-white text-slate-700 hover:bg-[#0F1A2C] hover:text-white"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
          aria-hidden
        >
          <path d="M8 2v4"></path>
          <path d="M16 2v4"></path>
          <rect width="18" height="18" x="3" y="4" rx="2"></rect>
          <path d="M3 10h18"></path>
        </svg>
        Oldest
      </button>
    </div>
  );
}


