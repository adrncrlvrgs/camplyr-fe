import { FormEvent, ReactNode, useState } from "react";
import { z } from "zod";

import { validateForm, FormErrors } from "@/utils/validation/validation.util";

type CustomFormState<TValues> = {
  errors: FormErrors<TValues>;
};

type CustomFormProps<TSchema extends z.ZodTypeAny> = {
  schema: TSchema;
  onSubmit: (
    data: z.infer<TSchema>,
    formElement: HTMLFormElement
  ) => void | Promise<void>;
  children:
    | ReactNode
    | ((state: CustomFormState<z.infer<TSchema>>) => ReactNode);
  className?: string;
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

      values[key] = Array.isArray(current)// checking if array
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
}: CustomFormProps<TSchema>) {
  const [errors, setErrors] = useState<FormErrors<z.infer<TSchema>>>({});

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formElement = event.currentTarget;

    const values = getFormValues(formElement);

    const result = validateForm(schema, values);

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    // Clear previous validation errors
    setErrors({});

    // Let the feature hook handle loading,
    // API calls, server errors, etc.
    await onSubmit(result.data, formElement);
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