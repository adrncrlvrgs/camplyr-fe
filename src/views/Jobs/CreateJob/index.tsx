import { Page } from "@/components/shared/Layout";
import CreateJobForm from "@/modules/jobs/components/CreateJobForm";

export default function CreateJob() {
  return (
    <Page>
      <div className="mx-auto flex min-h-dvh w-full max-w-[85rem] flex-col border-x border-dashed border-neutral-400">
        <header className="border-b border-dashed border-neutral-400 px-6 py-8">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Post a job
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Describe the role, set a salary range, and add any questions you
            want applicants to answer. You'll review everything before it goes
            live.
          </p>
        </header>

        <CreateJobForm />
      </div>
    </Page>
  );
}