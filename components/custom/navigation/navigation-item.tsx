"use client";

import { FC } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import ActionTooltip from "@/components/custom/common/action-tooltip";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

const NavigationItem: FC<NavigationItemProps> = ({ id, imageUrl, name }) => {
  const { serverId } = useParams();
  const router = useRouter();

  const isActive = serverId === id;

  const changeRoute = () => router.push(`/servers/${id}`);

  return (
    <button
      onClick={changeRoute}
      className="group relative flex items-center mb-3"
    >
      <ActionTooltip side="right" align="center" label={name}>
        <>
          <div
            className={cn(
              "absolute left-0 bg-primary rounded-r-full transition-all w-1",
              !isActive && "group-hover:h-5",
              isActive ? "h-9" : "h-2"
            )}
          />
          <div
            className={cn(
              "relative group flex mx-3 h-12 w-12 rounded-3xl bg-primary/10 group-hover:rounded-2xl transition-all overflow-hidden",
              isActive && "bg-primary/20 text-primary rounded-2xl"
            )}
          >
            <Image fill src={imageUrl} alt="Channel" />
          </div>
        </>
      </ActionTooltip>
    </button>
  );
};

export default NavigationItem;
