import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth"; // assuming you have this from previous setup


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      password,
      role,           // "ADMIN" | "TEACHER" | "STUDENT"
      phone,
      // optional fields depending on role
      gender,
      address,
      profilePhoto,
      // student-specific (can be passed or left null)
      admissionNo,
      batch,
      monthlyFee,
      admissionDate,
      // teacher-specific
      experience,
      designation,
    } = body;

    // ── Basic validation ───────────────────────────────────────────────
    if (!email?.trim() || !password?.trim() || !role) {
      return NextResponse.json(
        { error: "Email, password and role are required" },
        { status: 400 }
      );
    }

    if (!["ADMIN", "TEACHER", "STUDENT"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role. Must be ADMIN, TEACHER or STUDENT" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.trim() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 409 }
      );
    }

    // ── Hash password ──────────────────────────────────────────────────
    const hashedPassword = await bcrypt.hash(password.trim(), 12);

    // ── Create base User record ────────────────────────────────────────
    const newUser = await prisma.user.create({
      data: {
        email: email.trim(),
        password: hashedPassword,
        role: role as "ADMIN" | "TEACHER" | "STUDENT",
        needPasswordChange: true, // force change on first login
        isDeleted: false,
      },
    });

    // ── Create role-specific profile ───────────────────────────────────
    let profile: any = null;

    if (role === "ADMIN") {
      if (!name || !phone) {
        // cleanup partial user if required fields missing
        await prisma.user.delete({ where: { id: newUser.id } });
        return NextResponse.json(
          { error: "Name and phone are required for ADMIN" },
          { status: 400 }
        );
      }

      profile = await prisma.admin.create({
        data: {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          profilePhoto: profilePhoto || null,
          address: address || null,
          gender: gender || null, // can be validated if needed
          user: { connect: { id: newUser.id } },
        },
      });
    } else if (role === "TEACHER") {
      if (!name || !phone) {
        await prisma.user.delete({ where: { id: newUser.id } });
        return NextResponse.json(
          { error: "Name and phone are required for TEACHER" },
          { status: 400 }
        );
      }

      profile = await prisma.teacher.create({
        data: {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          profilePhoto: profilePhoto || null,
          address: address || null,
          gender: gender || null,
          experience: experience ? Number(experience) : null,
          designation: designation || null,
          user: { connect: { id: newUser.id } },
        },
      });
    } else if (role === "STUDENT") {
      if (!name || !phone) {
        await prisma.user.delete({ where: { id: newUser.id } });
        return NextResponse.json(
          { error: "Name and phone are required for STUDENT" },
          { status: 400 }
        );
      }

      profile = await prisma.student.create({
        data: {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          profilePhoto: profilePhoto || null,
          address: address || null,
          gender: gender || null,
          admissionNo: admissionNo || null,
          batch: batch || null,
          monthlyFee: monthlyFee ? Number(monthlyFee) : 0,
          admissionDate: admissionDate ? new Date(admissionDate) : new Date(),
          status: "ACTIVE",
          user: { connect: { id: newUser.id } },
        },
      });
    }

    // ── Generate JWT token (optional – many apps return token right after register) ──
    const token = await signToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    // Return success response
    return NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
          needPasswordChange: newUser.needPasswordChange,
        },
        profile,
        token, // ← optional – remove if you want user to login separately
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);

    // Prisma unique constraint violation (P2002)
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email is already in use" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}