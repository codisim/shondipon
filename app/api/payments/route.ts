import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { profileId, month, amount } = body;

  const payment = await prisma.payment.create({
    data: {
      profileId,
      month,
      amount,
      status: "UNPAID",
    },
  });

  return NextResponse.json(payment, { status: 201 });
}

export async function GET() {
  const payments = await prisma.payment.findMany({
    include: {
      profile: {
        select: { name: true },
      },
    },
  });

  return NextResponse.json(payments);
}
