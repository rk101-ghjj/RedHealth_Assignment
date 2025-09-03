import React, { useMemo } from "react";
import UserAvatar from "./UserAvatar";
import { users } from "../mock/users";
import type { Comment } from "../mock/comments";

type Props = {
  comment: Comment;
};

export default function CommentCard({ comment }: Props) {
  const author = useMemo(() => 
    users.find((u) => u.id === comment.authorId)!,
    [comment.authorId]
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <UserAvatar name={author.name} />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-semibold text-slate-900">{author.name}</div>
              <div className="text-sm text-slate-500">{author.email}</div>
            </div>
            <div className="text-sm text-slate-500">{author.organization}</div>
          </div>
          <p className="mt-3 leading-7 text-slate-700">{comment.content}</p>
        </div>
      </div>
    </div>
  );
}


