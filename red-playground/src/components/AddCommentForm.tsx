"use client";
import React, { useCallback, useMemo, useState } from "react";
import { users } from "../mock/users";
import UserSelect from "./UserSelect";

const COMMENT_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 text-[#5B8EFF]"
    aria-hidden
  >
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
  </svg>
);

const SEND_ICON = (
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
    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
    <path d="m21.854 2.147-10.94 10.939"></path>
  </svg>
);

type Props = {
  onAdd: (payload: { userId: string; content: string }) => void;
};

export default function AddCommentForm({ onAdd }: Props) {
  const [userId, setUserId] = useState("");
  const [content, setContent] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isDisabled = useMemo(() => !userId || content.trim().length === 0, [userId, content]);
  const selectedUser = useMemo(() => users.find((u) => u.id === userId), [userId]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (isDisabled) return;
    onAdd({ userId, content: content.trim() });
    setContent("");
    setUserId("");
  }, [isDisabled, onAdd, userId, content]);

  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
        {COMMENT_ICON}
        Add a Comment
      </h3>

      <div className="mt-4">
        <label className="block text-sm font-medium text-slate-700">Select User</label>
        <div className="relative mt-2">
          <UserSelect value={userId} onChange={setUserId} onOpenChange={setIsDropdownOpen} />
        </div>
        {selectedUser && (
          <p className="text-sm text-muted-foreground mt-1">
            Commenting as {selectedUser.name} from {selectedUser.organization}.
          </p>
        )}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-slate-700">Your Comment</label>
        <textarea
          rows={4}
          value={content}
          onChange={handleContentChange}
          placeholder="Write your comment here..."
          className="mt-2 flex min-h-[80px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B8EFF] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 resize-none"
        />
      </div>

      {!isDropdownOpen && (
        <div className="mt-5">
          <button
            type="submit"
            disabled={isDisabled}
            className="btn-primary w-full sm:w-auto flex items-center gap-2"
          >
          {SEND_ICON}
          Post Comment
          </button>
        </div>
      )}
    </form>
  );
}


