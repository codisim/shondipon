import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const notices = await prisma.notice.findMany({
    include: {
      createdBy: {
        select: { email: true, roles: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(notices);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, description, userId } = body;

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user || !user.roles.some(r => r === "ADMIN" || r === "TEACHER")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const notice = await prisma.notice.create({
    data: {
      title,
      description,
      createdById: userId,
    },
  });

  return NextResponse.json(notice, { status: 201 });
}
