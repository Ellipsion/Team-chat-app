import { NextResponse } from "next/server";
import { getCurrentProfile } from "@/lib/profile";
import { db } from "@/prisma/db";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const profile = await getCurrentProfile();

        if (!profile) {
            return new NextResponse("Unauthorised", {status: 401});
        }

        const {name, imageUrl} = await req.json();

        if (!name || !imageUrl) {
            return new NextResponse("Missing values", {status: 400});
        }

        const server = await db.server.create({
            data: {
                name,
                imageUrl,
                profileId: profile.id,
                channels: {
                    create: [
                        {name: "general", profileId: profile.id}
                    ]
                },
                members: {
                    create: [
                        {profileId: profile.id, role: MemberRole.ADMIN}
                    ]
                }
            }
        });

        return NextResponse.json({ server, status: 201});

    } catch (error) {
        console.log(" [ /server POST ] ", error);
        return new NextResponse("Interal Server Error", {status: 500});
    }
}