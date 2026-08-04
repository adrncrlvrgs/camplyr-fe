import { Button } from "@/components/ui/Button";
export default function JobDetails() {
  return (
    <aside className="hidden w-[420px] p-6 xl:block">
      <h2 className="text-2xl font-semibold">Frontend Developer</h2>

      <p className="mt-1 text-muted-foreground">
        Camplyr Technologies • Remote
      </p>

      <div className="mt-6 flex gap-3">
        <Button>Apply Now</Button>

        <Button variant="outline">Save Job</Button>
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="font-medium">Job Description</h3>

        <p className="text-sm leading-7 text-muted-foreground">
          Build modern web applications using React, TypeScript, Tailwind CSS,
          and collaborate with designers and backend engineers to deliver a
          great user experience.
        </p>
      </div>
    </aside>
  );
}
