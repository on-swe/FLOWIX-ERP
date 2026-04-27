"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type RegisterDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin: () => void;
};

export function RegisterDialog({
  open,
  onOpenChange,
  onSwitchToLogin,
}: RegisterDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[460px] p-6 rounded-3xl">
        <DialogHeader>
          <DialogTitle>Create an account</DialogTitle>
          <DialogDescription>
            Join Vai to get insights from your documents.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <p className="text-center text-sm text-muted-foreground">
            Registration is currently disabled in this demo.
          </p>
          <Button onClick={onSwitchToLogin} variant="link">
            Already have an account? Sign in
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
