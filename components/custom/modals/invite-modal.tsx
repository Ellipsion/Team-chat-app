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
import { useModal } from "@/hooks/use-modal-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, CheckCheck, HashIcon, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOrigin } from "@/hooks/use-origin";

interface InviteModalProps {
  children?: ReactNode;
}

const InviteModal: FC<InviteModalProps> = ({ children }) => {
  const origin = useOrigin();
  const {
    isOpen,
    type,
    closeModal,
    data: { server },
  } = useModal();

  const isModalOpen = isOpen && type == "invite";

  const [copied, setCopied] = useState(false);

  // TODO: generate new invite link
  const [loading, setLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-md text-primary/80">
            Invite friends to{" "}
            <span className="text-primary">{server?.name}</span>
          </DialogTitle>
          <div className="flex items-end gap-x-2 lowercase font-normal text-primary/60">
            <HashIcon className="h-5 w-5" /> General
          </div>
        </DialogHeader>
        <div className="mt-5">
          <Label className="uppercase text-xs font-bold text-accent-foreground/70">
            Send a server invite link
          </Label>
          <div className="px-1 pl-2 mt-2 flex items-center gap-x-2 justify-between bg-secondary h-10 cursor-text w-full rounded text-primary/90 font-normal">
            <span className="truncate flex-1 max-w-xs">{inviteUrl}</span>
            <Button
              onClick={onCopy}
              size={"sm"}
              variant={"primary"}
              className={cn("h-8 w-20 rounded px-5")}
            >
              {copied ? <CheckCheck /> : <>Copy</>}
            </Button>
          </div>
          <Button
            variant={"link"}
            size={"sm"}
            className="px-0 text-xs text-primary/60"
          >
            Generate a new link
            <RefreshCcw className="ml-2" size={12} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
