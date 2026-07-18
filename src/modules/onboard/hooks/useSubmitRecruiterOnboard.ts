// src/hooks/useSubmitSeekerOnboarding.ts

import { Dispatch, SetStateAction, useState } from "react";
// import { onboardSeeker } from "@/utils/api/onboard.api";

import {recruiterOnboardSchema, RecruiterForm} from "@/utils/validation/validation.schema";

import { validateForm, FormErrors } from "@/utils/validation/validation.util";

type UseSubmitRecruiterOnboardingProps = {
  form: RecruiterForm;
  stepFields: (keyof RecruiterForm)[];
  setErrors: Dispatch<SetStateAction<FormErrors<RecruiterForm>>>;
  setStep: Dispatch<SetStateAction<number>>;
};

export function useSubmitRecruiterOnboarding({
  form,
  stepFields,
  setErrors,
  setStep,
}: UseSubmitRecruiterOnboardingProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitOnboarding = async () => {
    try {
      setIsSubmitting(true);

      const result = validateForm(recruiterOnboardSchema, form);

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
        // role: "SEEKER",
        // headline: result.data.headline,
        // location: result.data.location,
        // bio: result.data.bio,
        // skills: result.data.skills
        //   .split(",")
        //   .map((skill) => skill.trim())
        //   .filter(Boolean),
      };

      console.log(payload);

    //   await onboardSeeker(payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitOnboarding,
    isSubmitting,
  };
}
