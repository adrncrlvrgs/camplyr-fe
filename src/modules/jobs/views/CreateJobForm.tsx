import { CustomForm } from "@/components/ui/CustomFrom";
import { CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { jobSchema } from "@/utils/validation/validation.schema";
import { useAddJob } from "../hooks/useAddJob";

export default function CreateJobForm() {
  const { createJob, isSubmitting, serverError } = useAddJob();
  return (
    <CustomForm schema={jobSchema} onSubmit={createJob} resetOnSuccess>
      {({ errors }) => (
        <>
          <CardContent className="w-full px-4 pb-4 pt-2">
            <div className="flex gap-3">
              <div className="flex-1">
                <textarea
                  name="content"
                  placeholder="What's on your mind?"
                  className="
                    w-full
                    min-h-[120px]
                    resize-none
                    bg-transparent
                    p-2
                    text-base
                    outline-none
                    border-none
                    focus:outline-none
                    focus:ring-0
                    focus-visible:ring-0
                    placeholder:text-muted-foreground
                  "
                />

                <FormError message={errors.content} />
                <FormError message={serverError?.message} />
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

                {isSubmitting ? "Posting..." : "Create Post"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 flex items-center gap-1 text-sm text-muted-foreground hover:text-black"
              ></Button>
            </div>
          </CardFooter>
        </>
      )}
    </CustomForm>
  );
}
