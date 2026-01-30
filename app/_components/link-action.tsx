import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";

const LinkToolbarAction = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Link />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Link</DialogTitle>
        <Input className="text-white" />
        <Button>Add Link</Button>
      </DialogContent>
    </Dialog>
  );
};

export default LinkToolbarAction;
