"use server";

import User from "@/lib/models/User";
import UserProfile from "@/lib/models/UserProfile";
import Payment from "@/lib/models/Payment";
import Notice from "@/lib/models/Notice";
import connectDB from "@/lib/db";
import { startOfMonth, endOfMonth, subMonths, format } from "date-fns";

export async function getAdminStats() {
  await connectDB();

  const totalUsers = await User.countDocuments({ isDeleted: false });
  const totalStudents = await User.countDocuments({ roles: "STUDENT", isDeleted: false });
  const totalTeachers = await User.countDocuments({ roles: "TEACHER", isDeleted: false });

  // Calculate total revenue (sum of all PAID payments)
  const totalRevenueResult = await Payment.aggregate([
    { $match: { status: "PAID" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  const totalRevenue = totalRevenueResult[0]?.total || 0;

  // Recent payments
  const recentPayments = await Payment.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate({
      path: "profile",
      select: "name email",
      populate: { path: "user", select: "email" }
    });

  // Monthly revenue for chart (last 6 months)
  const monthlyRevenue = [];
  for (let i = 5; i >= 0; i--) {
    const date = subMonths(new Date(), i);
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    
    // We can match by 'month' string if it's stored consistently, or by createdAt/paidAt
    // Assuming 'paidAt' is the source of truth for revenue timing, or createdAt for due
    // Let's use paidAt for revenue
    const result = await Payment.aggregate([
      { 
        $match: { 
          status: "PAID",
          paidAt: { $gte: start, $lte: end }
        } 
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    
    monthlyRevenue.push({
      month: format(date, "MMMM"),
      revenue: result[0]?.total || 0,
    });
  }

  return {
    totalUsers,
    totalStudents,
    totalTeachers,
    totalRevenue,
    recentPayments: JSON.parse(JSON.stringify(recentPayments)),
    monthlyRevenue,
  };
}

export async function getTeacherStats(userId: string) {
  await connectDB();
  // Placeholder logic as per plan
  const totalStudents = await User.countDocuments({ roles: "STUDENT", isDeleted: false });
  const notices = await Notice.find().sort({ createdAt: -1 }).limit(5);

  return {
    totalStudents,
    notices: JSON.parse(JSON.stringify(notices)),
  };
}

export async function getStudentStats(userId: string) {
  await connectDB();
  
  const userProfile = await UserProfile.findOne({ user: userId });
  if (!userProfile) return null;

  const payments = await Payment.find({ profile: userProfile._id }).sort({ createdAt: -1 });
  const notices = await Notice.find().sort({ createdAt: -1 }).limit(5);

  const totalPaid = payments
    .filter(p => p.status === "PAID")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pendingPayments = payments.filter(p => p.status !== "PAID").length;

  return {
    profile: JSON.parse(JSON.stringify(userProfile)),
    payments: JSON.parse(JSON.stringify(payments)),
    notices: JSON.parse(JSON.stringify(notices)),
    totalPaid,
    pendingPayments,
  };
}
