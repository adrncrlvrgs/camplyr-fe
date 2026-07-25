
import { Card} from "@/components/ui/Card";
import CreatePostForm from "@/modules/post/views/CreatePost";

export default function CardWritePost() {
  return (
    <Card className="sm:max-w-xl shadow-sm border border-neutral-200 rounded-2xl p-3 w-full">
      <CreatePostForm/>
    </Card>
  );
}
