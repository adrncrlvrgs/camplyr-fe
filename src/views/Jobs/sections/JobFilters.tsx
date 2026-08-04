import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function JobFilters() {
  return (
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

        <Button className="w-full">Apply Filters</Button>
      </div>
    </aside>
  );
}
