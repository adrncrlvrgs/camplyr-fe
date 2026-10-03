import type { JobStatus, JobType, QuestionType } from "./jobType";

export type { JobStatus, JobType, QuestionType };

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export type UserRole = "SEEKER" | "RECRUITER" | "ADMIN";

// Must match the Prisma enum: PENDING | REVIEW | SHORTLISTED | REJECTED | HIRED
export type ApplicationStatus =
  | "PENDING"
  | "REVIEW"
  | "SHORTLISTED"
  | "REJECTED"
  | "HIRED";

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  isOnboarded: boolean;
}

export interface Application {
  id: string;
  status: ApplicationStatus;
  coverLetter: string | null;
  resumeUrl: string | null;
  createdAt: string;
  job: {
    id: string;
    title: string;
    location: string;
    status: JobStatus;
    company: {
      id: string;
      name: string;
      slug: string;
      logoUrl: string | null;
    };
  };
}

export interface Jobs { // this is for the job feed
  id: string;
  title: string;
  location: string | null;
  description: string;
  salaryMin: number | null;
  salaryMax: number | null;
  status: JobStatus;
  type: JobType;
  requirements: string[];
  createdAt: string;
  company: {
    id: string;
    name: string;
    slug: string;
    logoUrl: string | null;
  };
}

export interface JobQuestion {
  id: string;
  label: string;
  type: QuestionType;
  required: boolean;
  options: string[] | null;
  sortOrder: number;
}

// Full job for the detail page and the create response: the feed shape + questions
export interface JobDetail extends Jobs {
  questions: JobQuestion[];
}

export interface Post {
  id: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatarUrl: string;
    role: string;
  };
}

export type PaginatedPostsResponse<T> = {
  items: T[];
  nextCursor: string | null;
  hasNextPage: boolean;
};

export interface OnboardRecruiter {
  position: string;
  companyName: string;
  website: string;
  location: string;
  description: string;
}