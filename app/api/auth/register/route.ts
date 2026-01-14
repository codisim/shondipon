import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, phone, gender } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        roles: ["STUDENT"],
        profile: {
          create: {
            name,
            phone,
            gender,
            status: "ACTIVE",
            admissionDate: new Date(),
          },
        },
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "User registration failed" },
      { status: 500 }
    );
  }
}
