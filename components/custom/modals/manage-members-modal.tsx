"use client";

import { FC, ReactNode, useState } from "react";
import { Dot, Loader2, ShieldAlert, ShieldCheck } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfile } from "@/types/server";
import UserAvatar from "@/components/custom/members/user-avatar";
import MemberActions from "@/components/custom/members/member-actions";
import { MemberRole } from "@prisma/client";
import { cn } from "@/lib/utils";

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};

interface ManageMembersModalProps {
  children?: ReactNode;
}

const ManageMembersModal: FC<ManageMembersModalProps> = ({ children }) => {
  const { isOpen, type, closeModal, data } = useModal();
  const [loadingId, setloadingId] = useState<string>("");

  const isModalOpen = isOpen && type == "members";
  const { server } = data as { server: ServerWithMembersWithProfile };

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="outline-none focus-visible:outline-none">
        <DialogHeader>
          <DialogTitle className="text-lg text-primary/80">
            Server Members
            <span className="text-primary"></span>
          </DialogTitle>
          <div className="flex items-center gap-x-1 text-sm lowercase font-normal text-primary/60">
            {server?.name} <Dot className="h-5 w-5" />{" "}
            <span className="font-bold">{server?.members?.length}</span> Members
          </div>
        </DialogHeader>
        <div className="mt-8">
          <ScrollArea className="max-h-[420px]">
            {server?.members?.map((member) => (
              <div
                className={cn(
                  "flex items-center gap-x-2 mb-6",
                  loadingId === member.id && "animate-pulse opacity-60"
                )}
              >
                <UserAvatar src={member.profile?.imageUrl} />
                <div className="flex flex-col gap-y-[1px]">
                  <div className="text-sm font-medium flex items-center text-primary/90">
                    {member.profile.name} {roleIconMap[member.role]}
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">
                    {member.profile.email}
                  </p>
                </div>
                {server.profileId !== member.profileId &&
                  loadingId !== member.id && (
                    <div className="ml-auto">
                      <MemberActions onLoading={setloadingId} member={member} />
                    </div>
                  )}
                {loadingId === member.id && (
                  <Loader2 className="animate-spin text-zinc-500 ml-auto h-4 w-4" />
                )}
              </div>
            ))}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageMembersModal;
