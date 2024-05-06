import ServerForm from "@/components/custom/server/server-form";
import { getInitialProfile } from "@/lib/profile";
import { db } from "@/prisma/db";
import { redirect } from "next/navigation";

const Page = async () => {
  const profile = await getInitialProfile();

  const server = await db.server.findFirst({
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
    <div className="pt-24">
      <div className="mx-auto max-w-md bg-white shadow-lg dark:bg-gray-800 rounded-lg">
        <div className="p-5 text-center">
          <h1 className="text-2xl font-bold">Create your server</h1>
          <p className="text-sm mt-3 text-muted-foreground">
            Give you server a personality with a name and an image. <br /> You
            can always change it later.
          </p>
        </div>
        <ServerForm />
      </div>
    </div>
  );
};

export default Page;
