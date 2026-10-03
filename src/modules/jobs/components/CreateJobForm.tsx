import { useRef, useState, type ReactNode } from "react";
import { CustomForm } from "@/components/ui/CustomFrom";
import { CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { Input } from "@/components/ui/Input";
import { jobSchema, type CreateJobInput } from "@/utils/validation/validation.schema";
import {
  CURRENCY_SYMBOL,
  DESCRIPTION_MIN,
  JOB_TYPE_OPTIONS,
} from "@/utils/constant/jobType";
import { useAddJob } from "../hooks/useAddJob";
import { QuestionBuilder, type JobQuestion } from "./QuestionBuilder";

/* ---------- small layout helpers ---------- */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border bg-muted/40 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <header className="border-b px-5 py-4">
        <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        )}
      </header>

      <div className="space-y-4 p-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  optional,
  error,
  aside,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  error?: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <label htmlFor={htmlFor} className="text-sm font-medium">
          {label}
          {optional && (
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              (optional)
            </span>
          )}
        </label>
        {aside}
      </div>
      {children}
      <FormError message={error} />
    </div>
  );
}

/* ---------- form ---------- */

export default function CreateJobForm() {
  const { createJob, isSubmitting, serverError } = useAddJob();
  const [questions, setQuestions] = useState<JobQuestion[]>([]);
  const [descLength, setDescLength] = useState(0);

  // Which button was clicked: "Post job" publishes, "Save draft" doesn't.
  const statusRef = useRef<CreateJobInput["status"]>("OPEN");

  // Client-side error first; fall back to what the backend reported.
  const fieldError = (name: string, clientError?: string) =>
    clientError ?? serverError?.fieldErrors?.[name]?.[0];

  // The question builder lives outside CustomForm, so merge it in here.
  const handleSubmit = async (
    data: Omit<CreateJobInput, "questions" | "status">
  ) => {
    const ok = await createJob({
      ...data,
      questions,
      status: statusRef.current,
    });

    statusRef.current = "OPEN";

    if (ok) {
      setQuestions([]);
      setDescLength(0);
    }
  };

  const selectClass =
    "h-10 w-full rounded-md border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

  return (
    <CustomForm schema={jobSchema} onSubmit={handleSubmit}> 
    {/* resetOnSuccess */}
      {({ errors }) => (
        <>
          <CardContent className="w-full px-6 pb-6 pt-4">
            {serverError?.message && (
              <div
                role="alert"
                className="mb-6 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
              >
                {serverError.message}
              </div>
            )}

            {/* Stacks on mobile, two columns from lg and up */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 lg:grid-cols-2">
              {/* Left column: the basics */}
              <div className="space-y-6">
                <Section
                  title="Job details"
                  description="What applicants see first."
                >
                  <Field
                    label="Job title"
                    htmlFor="title"
                    error={fieldError("title", errors?.title)}
                  >
                    <Input
                      id="title"
                      name="title"
                      placeholder="e.g. Frontend Engineer"
                    />
                  </Field>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="Location"
                      htmlFor="location"
                      error={fieldError("location", errors?.location)}
                    >
                      <Input
                        id="location"
                        name="location"
                        placeholder="City, or “Remote”"
                      />
                    </Field>

                    <Field
                      label="Job type"
                      htmlFor="type"
                      error={fieldError("type", errors?.type)}
                    >
                      <select
                        id="type"
                        name="type"
                        defaultValue="FULL_TIME"
                        className={selectClass}
                      >
                        {JOB_TYPE_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field
                    label="Description"
                    htmlFor="description"
                    error={fieldError("description", errors?.description)}
                    aside={
                      <span
                        className={`text-xs tabular-nums ${
                          descLength >= DESCRIPTION_MIN
                            ? "text-muted-foreground"
                            : "text-amber-600"
                        }`}
                      >
                        {descLength} / {DESCRIPTION_MIN} min
                      </span>
                    }
                  >
                    <textarea
                      id="description"
                      name="description"
                      rows={6}
                      onChange={(e) => setDescLength(e.target.value.trim().length)}
                      placeholder="Responsibilities, requirements, and what makes this role worth applying for."
                      className="min-h-[140px] w-full resize-y rounded-md border bg-background px-3 py-2 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                    />
                  </Field>
                </Section>

                <Section
                  title="Salary range"
                  description="Listings with a range tend to get more applicants."
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="Minimum"
                      htmlFor="salaryMin"
                      optional
                      error={fieldError("salaryMin", errors?.salaryMin)}
                    >
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          {CURRENCY_SYMBOL}
                        </span>
                        <Input
                          id="salaryMin"
                          name="salaryMin"
                          type="number"
                          min={0}
                          inputMode="numeric"
                          placeholder="0"
                          className="pl-7"
                        />
                      </div>
                    </Field>

                    <Field
                      label="Maximum"
                      htmlFor="salaryMax"
                      optional
                      error={fieldError("salaryMax", errors?.salaryMax)}
                    >
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          {CURRENCY_SYMBOL}
                        </span>
                        <Input
                          id="salaryMax"
                          name="salaryMax"
                          type="number"
                          min={0}
                          inputMode="numeric"
                          placeholder="0"
                          className="pl-7"
                        />
                      </div>
                    </Field>
                  </div>
                </Section>
              </div>

              {/* Right column: screening questions */}
              <div className="lg:self-start">
                <Section
                  title="Application questions"
                  description="Extra questions applicants answer when they apply."
                >
                  <QuestionBuilder value={questions} onChange={setQuestions} />
                  <FormError message={fieldError("questions", errors?.questions)} />
                </Section>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between gap-4 border-t bg-muted/30 px-6 py-4">
            <p className="text-xs text-muted-foreground">
              {questions.length === 0
                ? "No custom questions"
                : `${questions.length} custom question${questions.length === 1 ? "" : "s"}`}
            </p>

            {/* "Post job" is first in the DOM so Enter in a text field publishes,
                not saves a draft; flex-row-reverse puts it on the right visually. */}
            <div className="flex flex-row-reverse items-center gap-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                onClick={() => (statusRef.current = "OPEN")}
                className="min-w-[130px] bg-primary text-white hover:bg-primary/90"
              >
                {isSubmitting ? "Posting job…" : "Post job"}
              </Button>
              <Button
                type="submit"
                variant="outline"
                disabled={isSubmitting}
                onClick={() => (statusRef.current = "DRAFT")}
              >
                Save draft
              </Button>
            </div>
          </CardFooter>
        </>
      )}
    </CustomForm>
  );
}