import { Button } from "@/components/ui/Button";
import { PlusIcon } from "lucide-react";
import {
  // Dialog,
  // DialogContent,
  // DialogTrigger,
  // DialogTitle,
  // DialogDescription,
} from "@/components/ui/Dialog";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
// import CreateJobForm from "@/modules/jobs/components/CreateJobForm";



export default function JobCreate() {


  const {user} = useAuth();
const navigate = useNavigate();
  if(user?.role === "RECRUITER"){
    return (
      <Button onClick={()=>{
        navigate(`/jobs/new`)
      }}>
        Create a Job <PlusIcon size={18} />
      </Button>
    )
  }
  return ;
  //(
    // <Dialog>
    //   <DialogTrigger asChild>
    //     <div className="space-y-6 mb-2">
    //       <Button>
    //         Create a Job <PlusIcon size={18} />
    //       </Button>
    //     </div>
    //   </DialogTrigger>

    //   <DialogContent className="sm:max-w-4xl">
    //     <DialogTitle>Create a Job</DialogTitle>

    //     <DialogDescription>
    //       Enter detail info about the job
    //     </DialogDescription>

    //     <div className="mt-4"><CreateJobForm /></div>
    //   </DialogContent>
    // </Dialog>
  //);
}
