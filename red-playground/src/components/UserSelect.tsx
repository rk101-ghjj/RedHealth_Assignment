"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { users as allUsers } from "../mock/users";
import UserAvatar from "./UserAvatar";

const DROPDOWN_MAX_HEIGHT = "";

type Props = {
  value: string;
  onChange: (userId: string) => void;
  placeholder?: string;
  onOpenChange?: (open: boolean) => void;
};

export default function UserSelect({ value, onChange, placeholder = "Choose a user to comment as...", onOpenChange }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selected = useMemo(() => allUsers.find((u) => u.id === value), [value]);

  const handleClose = useCallback(() => {
    setOpen(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

  const handleToggle = useCallback(() => {
    const newOpen = !open;
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  }, [open, onOpenChange]);

  const handleOptionClick = useCallback((userId: string) => {
    onChange(userId);
    handleClose();
  }, [onChange, handleClose]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [handleClose]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        role="combobox"
        aria-controls="radix-:r0:"
        aria-expanded={open}
        aria-autocomplete="none"
        dir="ltr"
        data-state={open ? "open" : "closed"}
        data-placeholder=""
        onClick={handleToggle}
        className={`flex h-10 w-full items-center justify-between rounded-md border relative ${
          open ? "border-[#5B8EFF]" : "border-slate-300"
        } bg-white px-3 py-2 text-left text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#5B8EFF] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1`}
        aria-haspopup="listbox"
      >
        <span className={`pointer-events-none truncate ${selected ? "text-slate-800" : "text-slate-400"}`}>
          {selected ? `${selected.name} (${selected.organization})` : placeholder}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 shrink-0 text-slate-500 opacity-70"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </button>

      {open && (
        <div className={`absolute z-50 left-0 right-0 mt-2 rounded-md border border-slate-200 bg-white shadow-lg ${DROPDOWN_MAX_HEIGHT}`}>
          <ul role="listbox" className="py-0.5">
            {allUsers.map((u) => {
              const isSelected = u.id === value;
              return (
                <li key={u.id}>
                  <button
                    type="button"
                    onClick={() => handleOptionClick(u.id)}
                    className={`group flex w-full items-center gap-2 pl-5 pr-3 py-0 leading-4 text-left text-sm text-slate-800 ${
                      isSelected
                        ? "bg-slate-100 hover:bg-[#0F1A2C] hover:text-white"
                        : "hover:bg-[#0F1A2C] hover:text-white"
                    }`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 mr-1 flex items-center justify-center">
                        {isSelected && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="8"
                            height="8"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 text-slate-800 group-hover:text-white"
                            aria-hidden="true"
                          >
                            <path d="M20 6 9 17l-5-5"></path>
                          </svg>
                        )}
                      </div>
                      <UserAvatar name={u.name} size="sm" className="my-0.5" />
                    </div>
                    <div className="min-w-0 flex-1 truncate font-medium">
                      {u.name}({u.organization})
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}


