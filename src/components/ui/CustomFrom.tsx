import { FormEvent, ReactNode, useState } from "react";
import { z } from "zod";

import {
  validateForm,
  FormErrors,
} from "@/utils/validation/validation.util";

type CustomFormState<TValues> = {
  errors: FormErrors<TValues>;
};

type CustomFormProps<TSchema extends z.ZodTypeAny> = {
  schema: TSchema;

  onSubmit: (
    data: z.infer<TSchema>
  ) => void | Promise<void>;

  children:
    | ReactNode
    | ((state: CustomFormState<z.infer<TSchema>>) => ReactNode);

  className?: string;

  /**
   * Optional.
   * Reset the form after a successful submission.
   */
  resetOnSuccess?: boolean;
};

function getFormValues(form: HTMLFormElement) {
  const formData = new FormData(form);

  const values: Record<
    string,
    FormDataEntryValue | FormDataEntryValue[]
  > = {};

  for (const [key, value] of formData.entries()) {
    if (key in values) {
      const current = values[key];

      values[key] = Array.isArray(current)
        ? [...current, value]
        : [current, value];
    } else {
      values[key] = value;
    }
  }

  return values;
}

export function CustomForm<TSchema extends z.ZodTypeAny>({
  schema,
  onSubmit,
  children,
  className,
  resetOnSuccess = false,
}: CustomFormProps<TSchema>) {
  const [errors, setErrors] =
    useState<FormErrors<z.infer<TSchema>>>({});

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const form = event.currentTarget;

    const values = getFormValues(form);

    const result = validateForm(schema, values);

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    setErrors({});

    try {
      await onSubmit(result.data);

      if (resetOnSuccess) {
        form.reset();
      }
    } catch {
      // Let the feature hook manage API errors.
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={className}
    >
      {typeof children === "function"
        ? children({ errors })
        : children}
    </form>
  );
}