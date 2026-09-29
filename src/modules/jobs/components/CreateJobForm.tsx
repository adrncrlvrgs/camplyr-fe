import { CustomForm } from "@/components/ui/CustomFrom";
import { CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { jobSchema } from "@/utils/validation/validation.schema";
import { useAddJob } from "../hooks/useAddJob";
import { Input } from "@/components/ui/Input";

export default function CreateJobForm() {
  const { createJob, isSubmitting, serverError } = useAddJob();
  return (
    <CustomForm schema={jobSchema} onSubmit={createJob} resetOnSuccess>
      {({ errors }) => (
        <>
          <CardContent className="w-full px-4 pb-4 pt-2">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input name="title" placeholder="Enter job title" />
                <FormError message={errors?.title} />
                <FormError message={serverError?.message} />
                <textarea
                  name="content"
                  placeholder="About this job..."
                  className="
                    w-full
                    min-h-[120px]
                    resize-none
                    bg-transparent
                    p-2
                    text-base
                    outline-none
                    focus:outline-none
                    focus:ring-0
                    focus-visible:ring-0
                    placeholder:text-muted-foreground
                  "
                />

                <FormError message={errors?.description} />
                <FormError message={serverError?.message} />
                <Input name="salaryMax" placeholder="Enter Location" />
                <FormError message={errors?.location} />
                <FormError message={serverError?.message} />
                <div className="flex mt-1">
                  <Input
                    name="salaryMax"
                    placeholder="Enter Max Salary Amount"
                    type="number"
                  />
                  <FormError message={errors?.salaryMax} />
                  <FormError message={serverError?.message} />
                  <Input
                    name="salaryMin"
                    placeholder="Enter Min Salary Amount"
                    type="number"
                  />
                  <FormError message={errors?.salaryMin} />
                  <FormError message={serverError?.message} />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pb-2 justify-around px-10 pt-1">
            <div className="flex w-full gap-x-20">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="sm"
                className="flex-1 flex items-center gap-1 text-sm bg-primary text-white hover:bg-primary/90"
              >
                {isSubmitting ? "Posting..." : "Post Job"}
              </Button>

            </div>
          </CardFooter>
        </>
      )}
    </CustomForm>
  );
}
