import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FormError } from "@/components/ui/FormError";

import {
  seekerOnboardingSchema,
  SeekerForm,
} from "@/utils/validation/validation.schema";

import { validateForm, FormErrors } from "@/utils/validation/validation.util";
import { useSubmitSeekerOnboarding } from "../hooks/useSubmitSeekerOnboarding";

const initialForm: SeekerForm = {
  headline: "",
  location: "",
  bio: "",
  skills: "",
};

const stepFields: (keyof SeekerForm)[] = [
  "headline",
  "location",
  "bio",
  "skills",
];

export default function SeekerOnboarding() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<SeekerForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors<SeekerForm>>({});

  const totalSteps = stepFields.length;

  const { submitOnboarding, isSubmitting } = useSubmitSeekerOnboarding({
    form,
    stepFields,
    setErrors,
    setStep,
  });

  const updateField = <K extends keyof SeekerForm>(
    field: K,
    value: SeekerForm[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const validateCurrentStep = () => {
    const result = validateForm(seekerOnboardingSchema, form);

    const currentField = stepFields[step];

    if (!currentField) {
      setErrors({});
      return true;
    }

    if (!result.success) {
      const currentFieldError = result.errors[currentField];

      if (currentFieldError) {
        setErrors({
          [currentField]: currentFieldError,
        } as FormErrors<SeekerForm>);

        return false;
      }
    }

    setErrors({});
    return true;
  };

  const nextStep = () => {
    const isValid = validateCurrentStep();

    if (!isValid) return;

    if (step < totalSteps - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setErrors({});
      setStep((prev) => prev - 1);
    }
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

            <div className="space-y-2">
              <Input
                placeholder="Example: Frontend Developer"
                value={form.headline}
                onChange={(e) => updateField("headline", e.target.value)}
              />

              <FormError message={errors.headline} />
            </div>
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

            <div className="space-y-2">
              <Input
                placeholder="Example: Quezon City, Philippines"
                value={form.location}
                onChange={(e) => updateField("location", e.target.value)}
              />

              <FormError message={errors.location} />
            </div>
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

            <div className="space-y-2">
              <textarea
                className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Example: I am a frontend developer who enjoys building clean and user-friendly web apps."
                value={form.bio}
                onChange={(e) => updateField("bio", e.target.value)}
                rows={5}
              />

              <FormError message={errors.bio} />
            </div>
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

            <div className="space-y-2">
              <Input
                placeholder="React, TypeScript, Tailwind, NodeJS"
                value={form.skills}
                onChange={(e) => updateField("skills", e.target.value)}
              />

              <FormError message={errors.skills} />
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={step === 0 || isSubmitting}
          >
            Back
          </Button>

          {step < totalSteps - 1 ? (
            <Button onClick={nextStep} disabled={isSubmitting}>
              Next
            </Button>
          ) : (
            <Button onClick={submitOnboarding} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Finish"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}