import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  BriefcaseBusiness,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";

export default function JobList() {
  return (
    <section className="flex-1 border-r border-dashed border-neutral-300">
      <div className="sticky top-0 border-b border-dashed border-neutral-300 bg-background p-5">
        <div className="flex gap-3">
          <Input placeholder="Search jobs..." className="flex-1" />

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
                <h3 className="font-semibold">Frontend Developer</h3>

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
              Join our engineering team to build scalable React applications
              using TypeScript and modern frontend technologies.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
