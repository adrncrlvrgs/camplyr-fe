import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type SeekerForm = {
  headline: string;
  location: string;
  bio: string;
  skills: string;
};

const initialForm: SeekerForm = {
  headline: "",
  location: "",
  bio: "",
  skills: "",
};

export default function SeekerOnboarding() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<SeekerForm>(initialForm);

  const totalSteps = 4;

  const updateField = <K extends keyof SeekerForm>(
    field: K,
    value: SeekerForm[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const nextStep = () => {
    if (step < totalSteps - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const submitOnboarding = async () => {
    const payload = {
      role: "SEEKER",
      headline: form.headline,
      location: form.location,
      bio: form.bio,
      skills: form.skills.split(",").map((skill) => skill.trim()),
    };

    console.log(payload);

    // await api.patch("/users/onboarding", payload);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="w-full max-w-lg rounded-2xl bg-background p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Step {step + 1} of {totalSteps}
          </p>

          <div className="mt-2 h-2 w-full rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary transition-all"
              style={{
                width: `${((step + 1) / totalSteps) * 100}%`,
              }}
            />
          </div>
        </div>

        {step === 0 && (
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold">What do you do?</h1>
              <p className="text-sm text-muted-foreground">
                Add a short headline for your profile.
              </p>
            </div>

            <Input
              placeholder="Example: Frontend Developer"
              value={form.headline}
              onChange={(e) => updateField("headline", e.target.value)}
            />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold">Where are you located?</h1>
              <p className="text-sm text-muted-foreground">
                This helps recruiters find nearby candidates.
              </p>
            </div>

            <Input
              placeholder="Example: Quezon City, Philippines"
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold">Tell us about yourself</h1>
              <p className="text-sm text-muted-foreground">
                Write a short intro for your profile.
              </p>
            </div>

            <textarea
              placeholder="Example: I am a frontend developer who enjoys building clean and user-friendly web apps."
              value={form.bio}
              onChange={(e) => updateField("bio", e.target.value)}
              rows={5}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold">What are your skills?</h1>
              <p className="text-sm text-muted-foreground">
                Separate each skill with a comma.
              </p>
            </div>

            <Input
              placeholder="React, TypeScript, Tailwind, NodeJS"
              value={form.skills}
              onChange={(e) => updateField("skills", e.target.value)}
            />
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <Button variant="outline" onClick={prevStep} disabled={step === 0}>
            Back
          </Button>

          {step < totalSteps - 1 ? (
            <Button onClick={nextStep}>Next</Button>
          ) : (
            <Button onClick={submitOnboarding}>Finish</Button>
          )}
        </div>
      </div>
    </div>
  );
}
