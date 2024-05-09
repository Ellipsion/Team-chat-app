import { getCurrentProfile } from "@/lib/profile";
import { db } from "@/prisma/db";
import { redirect } from "next/navigation";
import { FC } from "react";

interface InvitePageProps {
  params: { inviteCode: string };
}

const InvitePage: FC<InvitePageProps> = async ({ params }) => {
  const { inviteCode } = params;

  if (!inviteCode) {
    return redirect("/");
  }

  const profile = await getCurrentProfile();

  if (!profile) {
    return redirect("/");
  }

  // User already exists in server
  const existingServer = await db.server.findUnique({
    where: {
      inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    // console.log(
    //   `[ Redirecting ] user ${profile.email} is already a part of server ${existingServer.name}`
    // );
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode,
    },
    data: {
      members: {
        create: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return null;
};

export default InvitePage;
