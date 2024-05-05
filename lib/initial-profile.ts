import prisma from "@/prisma/db";
import { currentUser, auth} from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

export const getInitialProfile = async () => {
    const user = await currentUser();

    if (!user) {
        return redirect("/sign-in")
    }

    let profile = await prisma.profile.findUnique({
        where: {
            userId: user.id
        }
    });

    if (!profile) {
        profile = await prisma.profile.create({data: {
            userId: user.id,
            name: `${user.fullName}`,
            email: user.emailAddresses[0].emailAddress,
            imageUrl: user.imageUrl,
        }})
    }

    return profile;
}