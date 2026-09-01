import { Button } from "@/components/ui/Button";
import { FileText, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";

import { Job } from "@/views/Jobs/sections/data";

type JobDetailsProps = {
  job: Job | null;
};

// type FeedPost = {
//   id: string;
//   type: "JOB" | "POST";
//   title?: string;
//   company?: string;
//   location?: string;
// };

// type ApplicationFormProps = {
//   post: FeedPost;
// };

const ApplicationForm = ({ job }: JobDetailsProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Later:
    // const formData = new FormData(e.currentTarget);
    // submitApplication(formData);
  };

  return (

    <Dialog>
      <DialogTrigger asChild>
        <div className="space-y-6 mb-2">
          <Button className="flex-1">Apply Now</Button>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogTitle>title here</DialogTitle>

        <DialogDescription>
          Enter detail info about the job
        </DialogDescription>

        <div className="mt-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {/* Job information */}
      <div className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-center gap-2">
          <FileText size={18} />

          <h3 className="font-semibold">
            {job?.title}
          </h3>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          {job?.company}
        </p>

        <p className="text-sm text-muted-foreground">
          {job?.location}
        </p>
      </div>

      {/* Resume */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="resume"
          className="text-sm font-medium"
        >
          Resume
        </label>

        <input
          id="resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          required
          className="rounded-md border p-2 text-sm"
        />

        <span className="text-xs text-muted-foreground">
          Accepted formats: PDF, DOC, DOCX
        </span>
      </div>

      {/* Cover letter */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="coverLetter"
          className="text-sm font-medium"
        >
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
        <label
          htmlFor="message"
          className="text-sm font-medium"
        >
          Additional Message
          <span className="ml-1 text-muted-foreground">
            (Optional)
          </span>
        </label>

        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Add anything else you'd like the recruiter to know..."
          className="resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <Button
        type="submit"
        className="w-full gap-2"
      >
        <Send size={16} />
        Submit Application
      </Button>
    </form>
        </div>
      </DialogContent>
    </Dialog>

  );
};

export default ApplicationForm;