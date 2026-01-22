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
  const totalReviews = await import("@/lib/models/Review").then(mod => mod.default.countDocuments());

  // Calculate total revenue (sum of all PAID payments)
  const totalRevenueResult = await Payment.aggregate([
    { $match: { status: "PAID" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  const totalRevenue = totalRevenueResult[0]?.total || 0;

  // Gender Distribution (from UserProfile)
  const genderDistribution = await UserProfile.aggregate([
    { $group: { _id: "$gender", count: { $sum: 1 } } }
  ]);

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
    totalReviews,
    totalRevenue,
    genderDistribution,
    recentPayments: JSON.parse(JSON.stringify(recentPayments)),
    monthlyRevenue,
  };
}

export async function getSuperAdminStats() {
  await connectDB();

  // Super Admin sees everything + system health (simulated)
  const totalUsers = await User.countDocuments({ isDeleted: false });
  const totalStudents = await User.countDocuments({ roles: "STUDENT", isDeleted: false });
  const totalTeachers = await User.countDocuments({ roles: "TEACHER", isDeleted: false });
  const totalAdmins = await User.countDocuments({ roles: "ADMIN", isDeleted: false });
  
  const totalRevenueResult = await Payment.aggregate([
    { $match: { status: "PAID" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  const totalRevenue = totalRevenueResult[0]?.total || 0;

  // System health or other high-level metrics
  const recentActivity = await User.find().sort({ updatedAt: -1 }).limit(5).select("email roles updatedAt");

  return {
    totalUsers,
    totalStudents,
    totalTeachers,
    totalAdmins,
    totalRevenue,
    recentActivity: JSON.parse(JSON.stringify(recentActivity)),
  };
}

export async function getAccountantStats() {
  await connectDB();

  const totalRevenueResult = await Payment.aggregate([
    { $match: { status: "PAID" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  const totalRevenue = totalRevenueResult[0]?.total || 0;

  const pendingPaymentsCount = await Payment.countDocuments({ status: "PENDING" });
  
  // Daily revenue (last 7 days)
  const dailyRevenue = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const start = new Date(date.setHours(0, 0, 0, 0));
    const end = new Date(date.setHours(23, 59, 59, 999));

    const result = await Payment.aggregate([
      { 
        $match: { 
          status: "PAID",
          paidAt: { $gte: start, $lte: end }
        } 
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    dailyRevenue.push({
      date: format(start, "EEE"),
      revenue: result[0]?.total || 0,
    });
  }

  const recentTransactions = await Payment.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .populate({
      path: "profile",
      select: "name email",
      populate: { path: "user", select: "email" }
    });

  return {
    totalRevenue,
    pendingPaymentsCount,
    dailyRevenue,
    recentTransactions: JSON.parse(JSON.stringify(recentTransactions)),
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
