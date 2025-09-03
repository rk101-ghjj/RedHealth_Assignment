"use client";
import React, { useEffect } from "react";

type Props = {
  message: string;
  onClose: () => void;
  durationMs?: number;
};

export default function Toast({ message, onClose, durationMs = 2500 }: Props) {
  useEffect(() => {
    const id = setTimeout(onClose, durationMs);
    return () => clearTimeout(id);
  }, [onClose, durationMs]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="rounded-md border border-slate-200 bg-white shadow-lg">
        <div className="flex items-start gap-3 px-4 py-3">
          <div>
            <div className="font-medium text-slate-900">Comment Posted!</div>
            <div className="text-sm text-slate-600">{message}</div>
          </div>
        </div>
      </div>
    </div>
  );
}


