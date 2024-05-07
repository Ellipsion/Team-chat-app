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

interface CreateServerModalProps {
  children: ReactNode;
}

const CreateServerModal: FC<CreateServerModalProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Create Your Server
          </DialogTitle>
          <DialogDescription className="text-center">
            Give you server a personality with a name and an image. <br /> You
            can always change it later.
          </DialogDescription>
        </DialogHeader>
        <ServerForm close={closeModal} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateServerModal;
