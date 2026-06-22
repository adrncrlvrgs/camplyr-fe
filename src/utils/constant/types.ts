export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  isOnboarded: boolean;
}

export type UserRole = "SEEKER" | "RECRUITER" | "ADMIN";