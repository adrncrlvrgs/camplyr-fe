import { z } from "zod";

export type FormErrors<TValues> = Partial<Record<keyof TValues, string>>;

type ValidationResult<TSchema extends z.ZodType> =
  | {
      success: true;
      data: z.infer<TSchema>;
      errors?: never;
    }
  | {
      success: false;
      data?: never;
      errors: FormErrors<z.infer<TSchema>>;
    };
export function validateForm<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  values: unknown,
): ValidationResult<TSchema> {
  const result = schema.safeParse(values);

  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  }

  const errors: Record<string, string> = {};

  result.error.issues.forEach((issue) => {
    const fieldName = issue.path[0];

    if (typeof fieldName === "string" && !errors[fieldName]) {
      errors[fieldName] = issue.message;
    }
  });

  return {
    success: false,
    errors: errors as FormErrors<z.infer<TSchema>>,
  };
}
