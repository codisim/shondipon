import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: { profile: true },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const { role, designation, experience, name, phone, gender, admissionNo, batch, monthlyFee } = body;

  const updateData: any = {
    profile: {
      update: {
        designation,
        experience,
        name,
        phone,
        gender,
        admissionNo,
        batch,
        monthlyFee,
      },
    },
  };

  if (role) {
    updateData.roles = { push: role };
  }

  try {
    const user = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: "Error updating user" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.update({
      where: { id: params.id },
      data: { isDeleted: true },
    });
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting user" }, { status: 500 });
  }
}
