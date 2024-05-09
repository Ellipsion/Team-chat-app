import { NextResponse } from "next/server";
import { getCurrentProfile } from "@/lib/profile";
import { db } from "@/prisma/db";
import { MemberRole } from "@prisma/client";

interface RequestParams {
    params: {memberId: string}
}

export async function PATCH(req: Request,  { params } : RequestParams) {
    try {
        const profile = await getCurrentProfile();
        const { memberId } = params;
        const { searchParams }  = new URL(req.url);
        const serverId = searchParams.get("serverId");
        const {role} = await req.json();        

        if (!memberId) {
            return new NextResponse("Missing server ID", {status: 400});
        }

        if (!role) {
            return new NextResponse("Missing Role", {status: 400});
        }
        
        if (!profile) {
            return new NextResponse("Unauthorised", {status: 401});
        }
        
        if (!serverId) {
            return new NextResponse("Missing server ID", {status: 400});
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id
            },
            data: {
                members: {
                    update: {
                        where: {
                            id: memberId,
                            profileId: {
                                not: profile.id
                            }
                        }, data: {
                            role
                        }
                    }
                }
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
            return new NextResponse("Bad request", {status:  400});
        }

        return NextResponse.json({ server, status: 201});

    } catch (error) {
        console.log(" [ /memebers PATCH ] ", error);
        return new NextResponse("Interal Server Error", {status: 500});
    }
}

export async function DELETE(req: Request,  { params } : RequestParams) {
    try {
        const profile = await getCurrentProfile();
        const { memberId } = params;
        const { searchParams }  = new URL(req.url);
        const serverId = searchParams.get("serverId");     

        if (!profile) {
            return new NextResponse("Unauthorised", {status: 401});
        }

        if (!memberId) {
            return new NextResponse("Missing server ID", {status: 400});
        }
        
        if (!serverId) {
            return new NextResponse("Missing server ID", {status: 400});
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id
            },
            data: {
                members: {
                    deleteMany: {
                        id: memberId,
                        profileId: {
                            not: profile.id
                        }
                    }
                }
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
            return new NextResponse("Bad request", {status:  400});
        }

        return NextResponse.json({ server, status: 201});

    } catch (error) {
        console.log(" [ /member DELETE ] ", error);
        return new NextResponse("Interal Server Error", {status: 500});
    }
}