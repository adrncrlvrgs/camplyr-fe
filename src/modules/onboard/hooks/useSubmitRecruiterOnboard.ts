import { Dispatch, SetStateAction, useState } from "react";
import {recruiterOnboardSchema, RecruiterForm} from "@/utils/validation/validation.schema";
import { validateForm, FormErrors } from "@/utils/validation/validation.util";
import { onboardRecruiter } from "@/utils/api/onboard.api";
import { useAuth } from "@/context/AuthContext";


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
  const [isOnboardedIndicator, setIsOnboardedIndicator] =
    useState<boolean>(false);
  const { setIsOnboarded } = useAuth();

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
        role: "RECRUITER",
        companyName: result.data.companyName,
        location: result.data.location,
        position: result.data.position,
        description: result.data.description,
        website: result.data.website
      };


      const response = (await onboardRecruiter(payload)) as 
        | { userData?: { isOnboarded?: boolean } }
        | undefined;
      const onboarded = Boolean(response?.userData?.isOnboarded);

      setIsOnboardedIndicator(onboarded); 
      console.log(response);

      if (onboarded) {
        setIsOnboarded(true);
      }

      console.log(payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitOnboarding,
    isSubmitting,
    isOnboardedIndicator
  };
}
