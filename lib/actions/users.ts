"use server";

import User from "@/lib/models/User";
import connectDB from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getUsers(page = 1, limit = 10, search = "", role = "") {
  await connectDB();

  const query: any = { isDeleted: false };
  if (search) {
    query.email = { $regex: search, $options: "i" };
  }
  if (role) {
    query.roles = role;
  }

  const skip = (page - 1) * limit;

  const users = await User.find(query)
    .select("-password")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(query);

  return {
    users: JSON.parse(JSON.stringify(users)),
    total,
    totalPages: Math.ceil(total / limit),
  };
}

export async function deleteUser(id: string) {
  await connectDB();
  await User.findByIdAndUpdate(id, { isDeleted: true });
  revalidatePath("/dashboard/users");
}
