import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FormError } from "@/components/ui/FormError";

import {
  recruiterOnboardSchema,
  RecruiterForm,
} from "@/utils/validation/validation.schema";
import { validateForm, FormErrors } from "@/utils/validation/validation.util";
import { useSubmitRecruiterOnboarding } from "../hooks/useSubmitRecruiterOnboard";

const initialForm: RecruiterForm = {
  position: "",
  companyName: "",
  website: "",
  location: "",
  description: "",
};

const stepFields: (keyof RecruiterForm)[] = [
  "position",
  "companyName",
  "website",
  "location",
  "description",
];

export default function RecruiterOnboarding() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<RecruiterForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors<RecruiterForm>>({});

  const totalSteps = stepFields.length;

  const { submitOnboarding, isSubmitting } = useSubmitRecruiterOnboarding({
    form,
    stepFields,
    setErrors,
    setStep,
  });

  const updateField = <K extends keyof RecruiterForm>(
    field: K,
    value: RecruiterForm[K],
  ) => {
    setForm((prev) => ({
      ...prev, //retain lahat
      [field]: value, // update specific object
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };
  const validateCurrentStep = () => {
    const result = validateForm(recruiterOnboardSchema, form);

    const currentField = stepFields[step];

    if (!currentField) {
      // just checking kung existing sya
      setErrors({});
      return true;
    }

    if (!result.success) {
      const currentFieldError = result.errors[currentField];
      setErrors({
        [currentField]: currentFieldError,
      } as FormErrors<RecruiterForm>);

      return false;
    }
  };

  const nextStep = () => {
    console.log("clicked")
    const isValid = validateCurrentStep();

    if (!isValid) return;

    if (step < totalSteps - 1) {
      // this is for updating the step state, -1 because step starts in 0
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
              <h1 className="text-2xl font-bold">
                What's your company called?
              </h1>

              <p className="text-sm text-muted-foreground">
                This will appear on your company profile.
              </p>
            </div>

            <div className="space-y-2">
              <Input
                name="companyName"
                placeholder="Camplyr Inc."
                value={form.companyName}
                onChange={(e) => updateField("companyName", e.target.value)}
              />

              <FormError message={errors.companyName} />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold">What's your role?</h1>

              <p className="text-sm text-muted-foreground">
                This will be shown to applicants.
              </p>
            </div>

            <div className="space-y-2">
              <Input
                name="position"
                placeholder="HR Manager"
                value={form.position}
                onChange={(e) => updateField("position", e.target.value)}
              />

              <FormError message={errors.position} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold">Company website</h1>

              <p className="text-sm text-muted-foreground">
                Optional but recommended.
              </p>
            </div>

            <div className="space-y-2">
              <Input
                name="website"
                placeholder="https://company.com"
                value={form.website}
                onChange={(e) => updateField("website", e.target.value)}
              />

              <FormError message={errors.website} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold">Company location</h1>

              <p className="text-sm text-muted-foreground">
                Where is your company based?
              </p>
            </div>

            <div className="space-y-2">
              <Input
                name="location"
                placeholder="Makati, Metro Manila"
                value={form.location}
                onChange={(e) => updateField("location", e.target.value)}
              />

              <FormError message={errors.location} />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold">
                Tell candidates about your company
              </h1>

              <p className="text-sm text-muted-foreground">
                Write a short company description.
              </p>
            </div>

            <div className="space-y-2">
              <textarea
                name="description"
                rows={6}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="We build software that..."
                className="min-h-[140px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />

              <FormError message={errors.description} />
            </div>
          </div>
        )}

        {/* steps here */}

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
