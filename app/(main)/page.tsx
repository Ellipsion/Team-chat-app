import { getInitialProfile } from "@/lib/initial-profile";
import prisma from "@/prisma/db";
import { redirect } from "next/navigation";

const Page = async () => {
  const profile = await getInitialProfile();

  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return (
    <div>
      <h1>Create a server</h1>
      <p>{JSON.stringify(profile)}</p>
    </div>
  );
};

export default Page;
