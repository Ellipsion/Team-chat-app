import { FC, ReactNode } from "react";
import { notFound, redirect } from "next/navigation";

import { db } from "@/prisma/db";
import { getCurrentProfile } from "@/lib/profile";
import ServerSidebar from "@/components/custom/server/server-sidebar";

interface ServerDetailLayoutProps {
  children: ReactNode;
  params: { serverId: string };
}

const ServerDetailLayout: FC<ServerDetailLayoutProps> = async ({
  children,
  params,
}) => {
  const profile = await getCurrentProfile();
  const { serverId } = params;
  if (!profile) {
    return redirect("/sign-in");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex flex-col h-full w-60 fixed inset-y-0 z-20">
        <ServerSidebar serverId={serverId} />
      </div>
      <main className="md:pl-60 h-full">{children}</main>
    </div>
  );
};

export default ServerDetailLayout;
