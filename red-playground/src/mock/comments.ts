import type { User } from "./users";

export type Comment = {
  id: string;
  authorId: User["id"];
  content: string;
  createdAt: string; 
};

export const comments: Comment[] = [
  {
    id: "1",
    authorId: "1",
    content:
      "This is a really insightful post! I've been working with similar technologies and found this approach quite effective. The examples you provided are clear and well-documented.",
    createdAt: "2024-08-12T10:15:00Z",
  },
  {
    id: "2",
    authorId: "2",
    content:
      "Great explanation! I had some questions about the implementation details, but your code samples cleared everything up. Looking forward to trying this out in my project.",
    createdAt: "2024-08-13T09:20:00Z",
  },
  {
    id: "3",
    authorId: "3",
    content:
      "Thanks for sharing this! The performance improvements you mentioned are exactly what we needed for our application. The before/after benchmarks really help demonstrate the impact.",
    createdAt: "2024-08-15T14:40:00Z",
  },
  {
    id: "4",
    authorId: "4",
    content:
      "Excellent tutorial! I appreciate how you broke down complex concepts into digestible steps. The troubleshooting section at the end is particularly valuable.",
    createdAt: "2024-08-20T18:05:00Z",
  },
  {
    id: "5",
    authorId: "5",
    content:
      "This approach saved us hours of development time. The integration was smoother than expected, and the documentation quality is outstanding. Highly recommended!",
    createdAt: "2024-08-22T12:30:00Z",
  },
];


