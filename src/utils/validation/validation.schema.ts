import {z} from "zod"

import {
  CREATABLE_JOB_STATUSES,
  DESCRIPTION_MIN,
  JOB_TYPES,
  MAX_OPTIONS,
  MAX_QUESTIONS,
  QUESTION_TYPES,
  isChoiceQuestion,
} from "@/utils/constant/jobType";


const optionalInt = z.preprocess(
  (v) => (v === "" || v === null ? undefined : v),
  z.coerce.number().int("Whole numbers only").min(0).optional()
);


export const jobQuestionSchema = z
  .object({
    id: z.string(), // client-only (drag key); the backend strips it
    label: z.string().trim().min(3, "Question must be at least 3 characters").max(200),
    type: z.enum(QUESTION_TYPES),
    required: z.boolean(),
    options: z.array(z.string().trim().min(1).max(100)).max(MAX_OPTIONS).default([]),
  })
  .superRefine((q, ctx) => {
    if (!isChoiceQuestion(q.type)) return;
 
    if (q.options.length < 2) {
      ctx.addIssue({
        code: "custom",
        path: ["options"],
        message: "Choice questions need at least 2 options",
      });
    }
  });
 
export const jobSchema = z
  .object({
    title: z.string().trim().min(3, "Title is required").max(150),
    description: z.string().trim().min(DESCRIPTION_MIN, `Describe the job (min ${DESCRIPTION_MIN} chars)`).max(10_000),
    location: z.string().trim().min(2, "Location is required").max(150),
    type: z.enum(JOB_TYPES).default("FULL_TIME"),
    status: z.enum(CREATABLE_JOB_STATUSES).default("OPEN"),
    salaryMin: optionalInt,
    salaryMax: optionalInt,
    questions: z.array(jobQuestionSchema).max(MAX_QUESTIONS).default([]),
  })
  .refine(
    (d) => d.salaryMin == null || d.salaryMax == null || d.salaryMax >= d.salaryMin,
    { message: "Max salary must be ≥ min salary", path: ["salaryMax"] }
  );
 
export type CreateJobInput = z.infer<typeof jobSchema>;
export type JobQuestionInput = z.infer<typeof jobQuestionSchema>;



export const jobStatuses = ["DRAFT", "OPEN"] as const;

// const isChoice = (t: (typeof QUESTION_TYPES)[number]) =>
//   t === "SINGLE_CHOICE" || t === "MULTI_CHOICE";
 


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

export const postSchema = z.object({
  content: z.string().trim().min(1, "Post content is required").max(5000, "Post is too long"),
  imageUrl: z.string().trim().url("Invalid image URL").optional().or(z.literal(""))
})

export type PostInput = z.infer<typeof postSchema>;




export const createApplicationSchema = z.object({
  coverLetter: z.string().optional(),
  resumeUrl: z.string().url().optional(),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;

// export const updateApplicationStatus = z.object({
//   status: z.nativeEnum(ApplicationStatus)
// });

// export type UpdateApplicationStatusInput = z.infer<typeof updateApplicationStatus>;