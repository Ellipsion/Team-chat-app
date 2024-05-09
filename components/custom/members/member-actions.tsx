import { FC } from "react";
import qs from "query-string";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Check,
  Gavel,
  MoreVertical,
  Shield,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { Member, MemberRole } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

interface MemberActionsProps {
  onLoading?: (memberId: string) => void;
  member: Member;
}

const MemberActions: FC<MemberActionsProps> = ({ member, onLoading }) => {
  const router = useRouter();
  const { openModal, data } = useModal();

  const changeRole = async (memberId: string, role: MemberRole) => {
    if (member.role === role) {
      return;
    }
    try {
      onLoading && onLoading(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: data?.server?.id,
        },
      });

      const response = await axios.patch(url, { role });
      router.refresh();
      openModal("members", { server: response.data?.server });
    } catch (error) {
      console.log(error);
    } finally {
      onLoading && onLoading("");
    }
  };

  const kickMember = async () => {
    const memberId = member.id;
    try {
      onLoading && onLoading(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: data?.server?.id,
        },
      });

      const response = await axios.delete(url);
      router.refresh();
      openModal("members", { server: response.data?.server });
    } catch (error) {
      console.log(error);
    } finally {
      onLoading && onLoading("");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical size={15} />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-x-2">
            <ShieldQuestion size={18} />
            <span>Role</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="text-xs">
            <DropdownMenuItem onClick={() => changeRole(member.id, "GUEST")}>
              <Shield className="h-4 w-4 mr-2" />
              Guest
              {member.role === MemberRole.GUEST && (
                <Check size={15} className="ml-auto" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => changeRole(member.id, "MODERATOR")}
            >
              <ShieldCheck className="h-4 w-4 mr-2" />
              Moderator{" "}
              {member.role === MemberRole.MODERATOR && (
                <Check size={15} className="ml-auto ml-1" />
              )}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem onClick={kickMember} className="text-rose-500">
          <Gavel className="h-4 w-4 mr-2" />
          Kick
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MemberActions;
