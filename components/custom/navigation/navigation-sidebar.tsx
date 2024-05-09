import { FC } from "react";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

import { db } from "@/prisma/db";
import { getCurrentProfile } from "@/lib/profile";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/custom/common/theme-toggle";

import NavigationAction from "./navigation-action";
import NavigationItem from "./navigation-item";

interface NavigationSidebarProps {}

const NavigationSidebar: FC<NavigationSidebarProps> = async ({}) => {
  const profile = await getCurrentProfile();

  if (!profile) {
    return redirect("/");
  }

  // Find all the servers that this user is a part of.
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  const defaultOpen = !servers;

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary bg-secondary w-full py-3">
      <NavigationAction defaultOpen={defaultOpen} />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <NavigationItem
            key={server.id}
            id={server.id}
            name={server.name}
            imageUrl={server.imageUrl}
          />
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-10 w-10",
            },
          }}
        />
      </div>
    </div>
  );
};

export default NavigationSidebar;
