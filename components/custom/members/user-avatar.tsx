import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { User, User2 } from "lucide-react";

import { FC } from "react";

interface UserAvatarProps {
  src?: string;
  className?: string;
}

const UserAvatar: FC<UserAvatarProps> = ({ className, src }) => {
  return (
    <Avatar className={cn("h-7 w-7", className)}>
      <AvatarImage src={src} />
      <AvatarFallback className="bg-zinc-500 p-1 text-secondary animate-pulse">
        <User />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
