import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FiMail, FiCheck } from "react-icons/fi";

interface MagicLinkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export const MagicLinkDialog = ({
  isOpen,
  onClose,
  email,
}: MagicLinkDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FiCheck className="h-5 w-5 text-green-500" />
            Magic Link Sent!
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
            <FiMail className="h-6 w-6 text-primary" />
            <div className="space-y-1">
              <p className="font-medium">Check your inbox</p>
              <p className="text-sm text-muted-foreground">
                We've sent a magic link to {email}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">Next steps:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Click the link in your email to sign in
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                The link will expire in 24 hours
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                You'll be redirected to complete your organization setup
              </li>
            </ul>
          </div>
          <Button onClick={onClose} className="w-full">
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
