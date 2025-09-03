"use client";
import React, { useCallback, useMemo, useState } from "react";
import Toast from "../components/Toast";
import AddCommentForm from "../components/AddCommentForm";
import CommentCard from "../components/CommentCard";
import SortToggle from "../components/SortToggle";
import { comments as seedComments } from "../mock/comments";
import { users } from "../mock/users";

export default function Home() {
  const [sort, setSort] = useState<"newest" | "oldest" | null>("newest");
  const [comments, setComments] = useState(seedComments);

  const [toast, setToast] = useState<string | null>(null);

  const handleAdd = useCallback((payload: { userId: string; content: string }) => {
    const newItem = {
      id: `c-${Date.now()}`,
      authorId: payload.userId,
      content: payload.content,
      createdAt: new Date().toISOString(),
    };
    setComments((prev) => [newItem, ...prev]);
    setToast("Your comment has been successfully added.");
  }, []);

  const handleToastClose = useCallback(() => {
    setToast(null);
  }, []);

  const ordered = useMemo(() => {
    const copy = [...comments];
    copy.sort((a, b) => {
      const desc = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sort === "newest" || sort === null) return desc;
      return -desc;
    });
    return copy;
  }, [comments, sort]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="mb-4 text-center text-4xl font-bold text-slate-900">
          Comment System
        </h1>
        <p className="mx-auto max-w-2xl text-center text-xl text-muted-foreground mb-6">
          Share your thoughts and engage with the community. Join the conversation below!
        </p>

        <div className="mt-10">
          <AddCommentForm onAdd={handleAdd} />
        </div>

        <div className="mt-10 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            Comments ({comments.length})
          </h2>
          <SortToggle sort={sort} onChange={setSort} />
        </div>

        <div className="mt-6 space-y-6">
          {ordered.map((c) => (
            <CommentCard key={c.id} comment={c} />
          ))}
        </div>
      </div>
      {toast && <Toast message={toast} onClose={handleToastClose} />}
    </div>
  );
}
