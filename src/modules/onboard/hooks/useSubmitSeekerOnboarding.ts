// src/hooks/useSubmitSeekerOnboarding.ts

import { Dispatch, SetStateAction, useState } from "react";
import { onboardSeeker } from "@/utils/api/onboard.api";

import {
  seekerOnboardingSchema,
  SeekerForm,
} from "@/utils/validation/validation.schema";

import { validateForm, FormErrors } from "@/utils/validation/validation.util";

type UseSubmitSeekerOnboardingProps = {
  form: SeekerForm;
  stepFields: (keyof SeekerForm)[];
  setErrors: Dispatch<SetStateAction<FormErrors<SeekerForm>>>;
  setStep: Dispatch<SetStateAction<number>>;
};

export function useSubmitSeekerOnboarding({
  form,
  stepFields,
  setErrors,
  setStep,
}: UseSubmitSeekerOnboardingProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitOnboarding = async () => {
    try {
      setIsSubmitting(true);

      const result = validateForm(seekerOnboardingSchema, form);

      if (!result.success) {
        setErrors(result.errors);

        const firstErrorField = stepFields.find(
          (field) => result.errors[field],
        );

        if (firstErrorField) {
          setStep(stepFields.indexOf(firstErrorField));
        }

        return;
      }

      const payload = {
        role: "SEEKER",
        headline: result.data.headline,
        location: result.data.location,
        bio: result.data.bio,
        skills: result.data.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      console.log(payload);

      await onboardSeeker(payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitOnboarding,
    isSubmitting,
  };
}
