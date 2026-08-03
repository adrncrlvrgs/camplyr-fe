import { Page } from "@/components/shared/Layout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  BriefcaseBusiness,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";

export default function JobsPage() {
  return (
    <Page>
      <div className="mx-auto flex min-h-dvh w-full max-w-[85rem] border-x border-dashed border-neutral-400 px-10">
        {/* Filters */}
        <aside className="hidden w-72 border-r border-dashed border-neutral-300 p-6 lg:block">
          <h2 className="mb-6 text-lg font-semibold">Filters</h2>

          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm font-medium">Location</p>
              <Input placeholder="Remote or City" />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium">Job Type</p>

              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Full-time
                </label>

                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Part-time
                </label>

                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Contract
                </label>

                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Remote
                </label>
              </div>
            </div>

            <Button className="w-full">
              Apply Filters
            </Button>
          </div>
        </aside>

        {/* Job List */}
        <section className="flex-1 border-r border-dashed border-neutral-300">
          <div className="sticky top-0 border-b border-dashed border-neutral-300 bg-background p-5">
            <div className="flex gap-3">
              <Input
                placeholder="Search jobs..."
                className="flex-1"
              />

              <Button size="icon">
                <Search size={18} />
              </Button>

              <Button variant="outline" size="icon">
                <SlidersHorizontal size={18} />
              </Button>
            </div>
          </div>

          <div className="space-y-3 p-5">
            {[1, 2, 3, 4, 5].map((job) => (
              <div
                key={job}
                className="cursor-pointer rounded-xl border p-5 transition hover:border-primary hover:bg-muted/40"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">
                      Frontend Developer
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Camplyr Technologies
                    </p>

                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        Remote
                      </span>

                      <span className="flex items-center gap-1">
                        <BriefcaseBusiness size={14} />
                        Full-time
                      </span>
                    </div>
                  </div>

                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    New
                  </span>
                </div>

                <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">
                  Join our engineering team to build scalable React
                  applications using TypeScript and modern frontend
                  technologies.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Job Details */}
        <aside className="hidden w-[420px] p-6 xl:block">
          <h2 className="text-2xl font-semibold">
            Frontend Developer
          </h2>

          <p className="mt-1 text-muted-foreground">
            Camplyr Technologies • Remote
          </p>

          <div className="mt-6 flex gap-3">
            <Button>Apply Now</Button>

            <Button variant="outline">
              Save Job
            </Button>
          </div>

          <div className="mt-8 space-y-4">
            <h3 className="font-medium">Job Description</h3>

            <p className="text-sm leading-7 text-muted-foreground">
              Build modern web applications using React,
              TypeScript, Tailwind CSS, and collaborate with
              designers and backend engineers to deliver a great
              user experience.
            </p>
          </div>
        </aside>
      </div>
    </Page>
  );
}