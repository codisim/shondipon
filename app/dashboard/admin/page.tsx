import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { UserIcon, DollarSignIcon, MessageSquareIcon, BellIcon } from 'lucide-react'; // Assuming lucide-react for icons, install if needed: npm i lucide-react

// Mock data fetching functions (replace with actual API calls using your Mongoose models via API routes)
const fetchAdminData = async () => {
  // Simulate fetching: total users, payments, reviews, notices
  return {
    totalUsers: 150,
    totalStudents: 120,
    totalTeachers: 20,
    totalPayments: { paid: 80, unpaid: 30, partial: 10 },
    recentPayments: [
      { month: 'Jan', amount: 5000, status: 'PAID' },
      { month: 'Feb', amount: 4500, status: 'UNPAID' },
    ],
    reviews: [
      { comment: 'Great teaching!', profileName: 'John Doe' },
      { comment: 'Needs improvement.', profileName: 'Jane Smith' },
    ],
    notices: [
      { title: 'Holiday Notice', description: 'School closed on 20th.' },
    ],
    paymentChartData: [
      { name: 'Paid', value: 80 },
      { name: 'Unpaid', value: 30 },
      { name: 'Partial', value: 10 },
    ],
    userGrowthData: [
      { month: 'Jan', students: 100 },
      { month: 'Feb', students: 110 },
      { month: 'Mar', students: 120 },
    ],
  };
};

const fetchTeacherData = async () => {
  // Simulate for teacher: their students, payments, reviews
  return {
    myStudents: 30,
    pendingPayments: 5,
    averageExperience: 5,
    studentPayments: [
      { name: 'John Doe', month: 'Jan', status: 'PAID', amount: 500 },
    ],
    reviews: [
      { comment: 'Excellent class!', profileName: 'Student A' },
    ],
    paymentTrendData: [
      { month: 'Jan', paid: 20, unpaid: 5 },
      { month: 'Feb', paid: 25, unpaid: 3 },
    ],
    statusPieData: [
      { name: 'Active', value: 25 },
      { name: 'Inactive', value: 3 },
      { name: 'Alumni', value: 2 },
    ],
  };
};

const fetchStudentData = async () => {
  // Simulate for student: personal profile, payments, notices, reviews
  return {
    profile: { name: 'Alice Johnson', batch: '2023', status: 'ACTIVE', monthlyFee: 500 },
    myPayments: [
      { month: 'Jan', amount: 500, status: 'PAID' },
      { month: 'Feb', amount: 500, status: 'UNPAID' },
    ],
    notices: [
      { title: 'Exam Schedule', description: 'Exams start on 15th.' },
    ],
    myReviews: [
      { comment: 'Submitted review for teacher.' },
    ],
    feeTrendData: [
      { month: 'Jan', amount: 500 },
      { month: 'Feb', amount: 500 },
    ],
  };
};

// Colors for charts (eye-catching)
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// Main Dashboard Page
export default function DashboardPage() {
  const [role, setRole] = useState<string>('ADMIN'); // Assume fetched from auth, e.g., useUser().roles[0]
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Fetch based on role (in real app, use API routes to query Mongoose)
    const loadData = async () => {
      if (role === 'ADMIN') setData(await fetchAdminData());
      else if (role === 'TEACHER') setData(await fetchTeacherData());
      else if (role === 'STUDENT') setData(await fetchStudentData());
    };
    loadData();
  }, [role]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {role === 'ADMIN' && <AdminDashboard data={data} />}
      {role === 'TEACHER' && <TeacherDashboard data={data} />}
      {role === 'STUDENT' && <StudentDashboard data={data} />}
    </div>
  );
}

// Design 1: Admin Dashboard - Overview-focused with grids, bar/pie/line charts
function AdminDashboard({ data }: { data: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Stat Cards */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center"><UserIcon className="mr-2" /> Total Users</CardTitle>
        </CardHeader>
        <CardContent><p className="text-4xl font-bold">{data.totalUsers}</p></CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center"><DollarSignIcon className="mr-2" /> Total Payments</CardTitle>
        </CardHeader>
        <CardContent><p className="text-4xl font-bold">{data.totalPayments.paid + data.totalPayments.unpaid + data.totalPayments.partial}</p></CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center"><MessageSquareIcon className="mr-2" /> Reviews</CardTitle>
        </CardHeader>
        <CardContent><p className="text-4xl font-bold">{data.reviews.length}</p></CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center"><BellIcon className="mr-2" /> Notices</CardTitle>
        </CardHeader>
        <CardContent><p className="text-4xl font-bold">{data.notices.length}</p></CardContent>
      </Card>

      {/* Charts */}
      <Card className="col-span-2">
        <CardHeader><CardTitle>Payment Status Distribution (Pie Chart)</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data.paymentChartData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                {data.paymentChartData.map((_: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader><CardTitle>User Growth (Line Chart)</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="students" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tables */}
      <Card className="col-span-4">
        <CardHeader><CardTitle>Recent Payments</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.recentPayments.map((payment: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell>{payment.month}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// Design 2: Teacher Dashboard - Student-management focused with bars and pies
function TeacherDashboard({ data }: { data: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Stat Cards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><UserIcon className="mr-2" /> My Students</CardTitle>
        </CardHeader>
        <CardContent><p className="text-4xl font-bold">{data.myStudents}</p></CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><DollarSignIcon className="mr-2" /> Pending Payments</CardTitle>
        </CardHeader>
        <CardContent><p className="text-4xl font-bold">{data.pendingPayments}</p></CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><MessageSquareIcon className="mr-2" /> Reviews</CardTitle>
        </CardHeader>
        <CardContent><p className="text-4xl font-bold">{data.reviews.length}</p></CardContent>
      </Card>

      {/* Charts */}
      <Card className="col-span-2">
        <CardHeader><CardTitle>Payment Trends (Bar Chart)</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.paymentTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="paid" fill="#8884d8" />
              <Bar dataKey="unpaid" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader><CardTitle>Student Status (Pie Chart)</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data.statusPieData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                {data.statusPieData.map((_: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="col-span-3">
        <CardHeader><CardTitle>Student Payments</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.studentPayments.map((payment: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell>{payment.name}</TableCell>
                  <TableCell>{payment.month}</TableCell>
                  <TableCell>{payment.status}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// Design 3: Student Dashboard - Personal-focused with lines and simple stats
function StudentDashboard({ data }: { data: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Profile Card */}
      <Card className="col-span-1">
        <CardHeader><CardTitle>My Profile</CardTitle></CardHeader>
        <CardContent>
          <p><strong>Name:</strong> {data.profile.name}</p>
          <p><strong>Batch:</strong> {data.profile.batch}</p>
          <p><strong>Status:</strong> {data.profile.status}</p>
          <p><strong>Monthly Fee:</strong> {data.profile.monthlyFee}</p>
          <Button className="mt-4">Update Profile</Button>
        </CardContent>
      </Card>

      {/* Stat Card */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center"><DollarSignIcon className="mr-2" /> My Payments</CardTitle>
        </CardHeader>
        <CardContent><p className="text-4xl font-bold">{data.myPayments.length}</p></CardContent>
      </Card>

      {/* Chart */}
      <Card className="col-span-2">
        <CardHeader><CardTitle>Fee Payment Trend (Line Chart)</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.feeTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tables */}
      <Card className="col-span-1">
        <CardHeader><CardTitle>Notices</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.notices.map((notice: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell>{notice.title}</TableCell>
                  <TableCell>{notice.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader><CardTitle>My Reviews</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Comment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.myReviews.map((review: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell>{review.comment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}