import { Button } from "@/components/ui/Button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";

import CreateJobForm from "@/modules/jobs/views/CreateJobForm";

export default function JobCreate() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="space-y-6 mb-2">
          <Button>
            Create a Job <PlusIcon size={18} />
          </Button>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogTitle>Create a Job</DialogTitle>

        <DialogDescription>
          Share your thoughts, ideas, or updates.
        </DialogDescription>

        <div className="mt-4"><CreateJobForm /></div>
      </DialogContent>
    </Dialog>
  );
}
