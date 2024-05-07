import {db} from "@/prisma/db";
import { currentUser, auth} from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

export const getInitialProfile = async () => {
    const user = await currentUser();

    if (!user) {
        return redirect("/sign-in")
    }

    let profile = await db.profile.findUnique({
        where: {
            userId: user.id
        }
    });

    if (!profile) {
        profile = await db.profile.create({data: {
            userId: user.id,
            name: `${user.fullName}`,
            email: user.emailAddresses[0].emailAddress,
            imageUrl: user.imageUrl,
        }})
    }

    return profile;
}

export const getCurrentProfile = async () => {
    const {userId} = auth();

    if (!userId) {
        return null
    }

    const profile = await db.profile.findUnique({
        where: {
            userId
        }
    })

    return profile
}