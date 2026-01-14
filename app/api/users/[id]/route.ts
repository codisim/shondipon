import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const user = await prisma.user.update({
    where: { id: params.id },
    data: {
      roles: { push: body.role },
      profile: {
        update: {
          designation: body.designation,
          experience: body.experience,
        },
      },
    },
  });

  return NextResponse.json(user);
}
