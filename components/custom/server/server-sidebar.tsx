import { FC } from "react";
import { ChannelType } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

import { db } from "@/prisma/db";
import { getCurrentProfile } from "@/lib/profile";

import ServerHeader from "./server-header";

interface ServerSidebarProps {
  serverId: string;
}

const ServerSidebar: FC<ServerSidebarProps> = async ({ serverId }) => {
  const profile = await getCurrentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) {
    return notFound();
  }

  const textChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const members = server.members.filter(
    (member) => member.profileId !== profile.id
  );

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full border-l dark:border-none dark:bg-[#2B2D31] bg-[#f9fafa]">
      <ServerHeader server={server} role={role} />
    </div>
  );
};

export default ServerSidebar;
