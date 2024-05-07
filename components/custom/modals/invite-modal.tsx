"use client";

import { FC, ReactNode, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ServerForm from "@/components/custom/server/server-form";
import { Label } from "@/components/ui/label";

interface InviteModalProps {
  children: ReactNode;
}

const InviteModal: FC<InviteModalProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className=""></Label>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
