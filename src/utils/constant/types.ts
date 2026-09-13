export interface ApiResponse<T> {
  message: string;
  data: T;
}

export type UserRole = "SEEKER" | "RECRUITER" | "ADMIN";
export type JobStatus = "OPEN" | "CLOSED" | "DRAFT";
export type JobType = "FULL_TIME" | "PART-TIME" | "CONTRACT" | "INTERNSHIP" | "TEMPORARY"

export type ApplicationStatus =
  | "PENDING"
  | "REVIEWED"
  | "ACCEPTED"
  | "REJECTED"; 

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


export interface Jobs {
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

