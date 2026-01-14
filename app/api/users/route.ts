import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  const users = await prisma.user.findMany({
    where: { isDeleted: false },
    include: { profile: true },
  });

  return NextResponse.json(users);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, roles, name, phone, gender, designation, experience, admissionNo, batch, monthlyFee } = body;

    // Basic validation
    if (!email || !password || !name || !phone) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        roles: roles || ["STUDENT"],
        profile: {
          create: {
            name,
            phone,
            gender,
            designation,
            experience,
            admissionNo,
            batch,
            monthlyFee,
            status: "ACTIVE",
          },
        },
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Error creating user" }, { status: 500 });
  }
}
