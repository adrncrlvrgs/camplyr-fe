// import { Card } from "@/components/ui/Card";
// import React from "react";

export function OnboardForm() {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome to Camplyr</h1>
        <p className="text-muted-foreground">
          Tell us how you'll use Camplyr.
        </p>
      </div>

      <div className="grid gap-4">
        <button className="border rounded-xl p-6 text-left hover:border-primary">
          <h2 className="font-semibold">I'm looking for a job</h2>
          <p className="text-sm text-muted-foreground">
            Create a professional profile and apply for jobs.
          </p>
        </button>

        <button className="border rounded-xl p-6 text-left hover:border-primary">
          <h2 className="font-semibold">I'm hiring</h2>
          <p className="text-sm text-muted-foreground">
            Post jobs and discover candidates.
          </p>
        </button>
      </div>
    </div>
  )}