import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { profileId, comment } = body;

  const review = await prisma.review.create({
    data: {
      profileId,
      comment,
    },
  });

  return NextResponse.json(review, { status: 201 });
}
