"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FileText, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import type { Jobs } from "@/utils/constant/types";
import { useSendApplication } from "../hooks/useSendApplication";

type ApplicationFormProps = {
  job: Jobs | null;
  onApplicationSubmitted?: () => void;
};

const ApplicationForm = ({ job, onApplicationSubmitted }: ApplicationFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { submitApplication, isSubmitting, serverError } = useSendApplication();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!job) return;

    const formData = new FormData(e.currentTarget);
    const resumeUrl = (formData.get("resumeUrl") as string)?.trim() || undefined;
    const coverLetterText = (formData.get("coverLetter") as string)?.trim() || "";
    const additionalMessage = (formData.get("message") as string)?.trim();

    // Backend only stores one `coverLetter` field — fold the optional
    // "Additional Message" into it instead of dropping it silently.
    const coverLetter = additionalMessage
      ? `${coverLetterText}\n\n${additionalMessage}`
      : coverLetterText;

    const success = await submitApplication({ coverLetter, resumeUrl }, job.id);

    if (success) {
      e.currentTarget.reset();
      setIsOpen(false);
      onApplicationSubmitted?.();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="space-y-6 mb-2">
          <Button className="flex-1">Apply Now</Button>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogTitle>Apply to {job?.title}</DialogTitle>

        <DialogDescription>
          Fill out the details below to submit your application.
        </DialogDescription>

        <div className="mt-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Job information */}
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="flex items-center gap-2">
                <FileText size={18} />
                <h3 className="font-semibold">{job?.title}</h3>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">{job?.company.name}</p>
              <p className="text-sm text-muted-foreground">{job?.location}</p>
            </div>

            {/* Resume link */}
            <div className="flex flex-col gap-2">
              <label htmlFor="resumeUrl" className="text-sm font-medium">
                Resume
                <span className="ml-1 text-muted-foreground">(Optional)</span>
              </label>

              <input
                id="resumeUrl"
                name="resumeUrl"
                type="url"
                placeholder="https://drive.google.com/your-resume.pdf"
                className="rounded-md border p-2 text-sm"
              />

              <span className="text-xs text-muted-foreground">
                Paste a link to your resume (Google Drive, Dropbox, personal site, etc.)
              </span>
            </div>

            {/* Cover letter */}
            <div className="flex flex-col gap-2">
              <label htmlFor="coverLetter" className="text-sm font-medium">
                Cover Letter
              </label>

              <textarea
                id="coverLetter"
                name="coverLetter"
                rows={7}
                required
                placeholder="Introduce yourself and explain why you're interested in this position..."
                className="resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Additional message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium">
                Additional Message
                <span className="ml-1 text-muted-foreground">(Optional)</span>
              </label>

              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Add anything else you'd like the recruiter to know..."
                className="resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {serverError && (
              <p className="text-sm text-red-600">{serverError.message}</p>
            )}

            <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
              <Send size={16} />
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationForm;