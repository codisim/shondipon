"use server";

import User from "@/lib/models/User";
import connectDB from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getUsers(page = 1, limit = 10, search = "", role = "", gender = "", status = "") {
  await connectDB();

  const query: any = { isDeleted: false };
  if (search) {
    query.email = { $regex: search, $options: "i" };
  }
  if (role) {
    query.roles = role;
  }

  // For gender and status, we need to query UserProfile first or use aggregation
  // Since User and UserProfile are separate, let's use aggregation for efficiency
  // or fetch profiles and filter IDs (simpler for now but less efficient for large data)
  // Let's use aggregation to join User and UserProfile
  
  const pipeline: any[] = [
    { $match: query },
    {
      $lookup: {
        from: "userprofiles",
        localField: "_id",
        foreignField: "user",
        as: "profile",
      },
    },
    { $unwind: { path: "$profile", preserveNullAndEmptyArrays: true } },
  ];

  if (gender) {
    pipeline.push({ $match: { "profile.gender": gender } });
  }
  if (status) {
    pipeline.push({ $match: { "profile.status": status } });
  }

  const skip = (page - 1) * limit;

  const users = await User.aggregate([
    ...pipeline,
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
  ]);

  // Count total for pagination
  const countResult = await User.aggregate([
    ...pipeline,
    { $count: "total" }
  ]);
  const total = countResult[0]?.total || 0;

  return {
    users: JSON.parse(JSON.stringify(users)),
    total,
    totalPages: Math.ceil(total / limit),
  };
}

export async function updateUserRole(userId: string, newRole: string) {
  await connectDB();
  await User.findByIdAndUpdate(userId, { roles: [newRole] });
  revalidatePath("/dashboard/users");
  revalidatePath("/dashboard/students");
  revalidatePath("/dashboard/teachers");
}

export async function updateUserStatus(userId: string, newStatus: string) {
  await connectDB();
  // Status is in UserProfile
  await import("@/lib/models/UserProfile").then(mod => 
    mod.default.findOneAndUpdate({ user: userId }, { status: newStatus })
  );
  revalidatePath("/dashboard/users");
  revalidatePath("/dashboard/students");
}

export async function deleteUser(id: string) {
  await connectDB();
  await User.findByIdAndUpdate(id, { isDeleted: true });
  revalidatePath("/dashboard/users");
}
