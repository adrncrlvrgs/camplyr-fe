export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: string;
  isOnboarded: boolean;
}