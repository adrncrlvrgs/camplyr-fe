import {z} from "zod"

export const seekerOnboardingSchema = z.object({
  headline: z.string().trim().min(2, "Headline is required"),
  location: z.string().trim().min(2, "Location is required"),
  bio: z.string().trim().min(10, "Bio must be at least 10 characters"),
  skills: z.string().trim().min(2, "At least one skill is required"),
});

export type SeekerForm = z.infer<typeof seekerOnboardingSchema>;

export const recruiterOnboardSchema = z.object({
  position: z.string().trim().min(2, "Position is required"),
  companyName : z.string().trim().min(2, "Company Name is required"),
  website : z.string().trim().min(2, "Website is required"),
  location : z.string().trim().min(2, "Website is required"),
  description : z.string().trim().min(2, "Website is required"),
});

export type RecruiterForm = z.infer<typeof recruiterOnboardSchema>;