// import { Card } from "@/components/ui/Card";
// import React from "react";

import { useState } from "react";
import SeekerOnboarding from "./SeekerForm";

export function OnboardForm() {
  const [roleAs, setRoleAs] = useState<string>("");

  const handleSelectForm = (clickedAs : string) => {
    setRoleAs(clickedAs)
  }
   console.log(roleAs)
  return (
    <>
      {roleAs === "" && (
      <div className="max-w-md mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome to Camplyr</h1>
          <p className="text-muted-foreground">
            Tell us how you'll use Camplyr.
          </p>
        </div>

        <div className="grid gap-4">
          <button className="border rounded-xl p-6 text-left hover:border-primary" onClick={() => handleSelectForm("SEEKER")}>
            <h2 className="font-semibold">I'm looking for a job</h2>
            <p className="text-sm text-muted-foreground">
              Create a professional profile and apply for jobs.
            </p>
          </button>

          <button className="border rounded-xl p-6 text-left hover:border-primary" onClick={() => handleSelectForm("RECRUITER")}>
            <h2 className="font-semibold">I'm hiring</h2>
            <p className="text-sm text-muted-foreground">
              Post jobs and discover candidates.
            </p>
          </button>
        </div>
      </div>
      )}

      {roleAs === "SEEKER" && (
        <SeekerOnboarding/>
      )}
    </>
    

    // <div className="max-w-md mx-auto space-y-6">
    //   <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    //   <select {...register("role")}>
    //     <option value="">Select role</option>
    //     <option value="SEEKER">Job Seeker</option>
    //     <option value="RECRUITER">Recruiter</option>
    //   </select>

    //   {role === "SEEKER" && (
    //     <>
    //       <input {...register("headline")} placeholder="Headline" />
    //       <p className="text-red-500">{errors.headline?.message}</p>

    //       <input {...register("location")} placeholder="Location" />
    //       <p className="text-red-500">{errors.location?.message}</p>

    //       <textarea {...register("bio")} placeholder="Bio" />

    //       <input {...register("skills")} placeholder="React, TypeScript" />
    //       <p className="text-red-500">{errors.skills?.message}</p>
    //     </>
    //   )}

    //   {role === "RECRUITER" && (
    //     <>
    //       <input {...register("companyName")} placeholder="Company name" />
    //       <p className="text-red-500">{errors.companyName?.message}</p>

    //       <input {...register("companyWebsite")} placeholder="Website" />

    //       <textarea
    //         {...register("companyDescription")}
    //         placeholder="Company description"
    //       />
    //     </>
    //   )}

    //   <button disabled={isSubmitting}>
    //     {isSubmitting ? "Saving..." : "Finish Onboarding"}
    //   </button>
    // </form>
    // </div>
  )}