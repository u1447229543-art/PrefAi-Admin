import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useSelector } from "react-redux";
import { UserPlus, NotebookPen, ScrollText, BookOpenCheck } from "lucide-react";
import { useGetDashboardDataQuery } from "../../services/api";

const AnalyticsDashboard = () => {
  const user = useSelector((state) => state.user);
  const role = user.role;

  const { data: getDashboardData } = useGetDashboardDataQuery({ role });
  const month = new Date().getMonth() + 1;

  console.log(month, "month");

  const [dashboardData, setDashboardData] = useState();

  const monthlyData2 = [
    { name: "Jan", users: dashboardData?.chart2Data?.[0] },
    { name: "Feb", users: dashboardData?.chart2Data?.[1] },
    { name: "Mar", users: dashboardData?.chart2Data?.[2] },
    { name: "Apr", users: dashboardData?.chart2Data?.[3] },
    { name: "May", users: dashboardData?.chart2Data?.[4] },
    { name: "Jun", users: dashboardData?.chart2Data?.[5] },
    { name: "July", users: dashboardData?.chart2Data?.[6] },
    { name: "Aug", users: dashboardData?.chart2Data?.[7] },
    { name: "Sep", users: dashboardData?.chart2Data?.[8] },
    { name: "Oct", users: dashboardData?.chart2Data?.[9] },
    { name: "Nov", users: dashboardData?.chart2Data?.[10] },
    { name: "Dec", users: dashboardData?.chart2Data?.[11] },
  ];
  const monthlyData = [
    { name: "Jan", revenue: dashboardData?.monthlyInterviews?.[0]?.attended },
    { name: "Feb", revenue: dashboardData?.monthlyInterviews?.[1]?.attended },
    { name: "Mar", revenue: dashboardData?.monthlyInterviews?.[2]?.attended },
    { name: "Apr", revenue: dashboardData?.monthlyInterviews?.[3]?.attended },
    { name: "May", revenue: dashboardData?.monthlyInterviews?.[4]?.attended },
    { name: "Jun", revenue: dashboardData?.monthlyInterviews?.[5]?.attended },
    { name: "July", revenue: dashboardData?.monthlyInterviews?.[6]?.attended },
    { name: "Aug", revenue: dashboardData?.monthlyInterviews?.[7]?.attended },
    { name: "Sep", revenue: dashboardData?.monthlyInterviews?.[8]?.attended },
    { name: "Oct", revenue: dashboardData?.monthlyInterviews?.[9]?.attended },
    { name: "Nov", revenue: dashboardData?.monthlyInterviews?.[10]?.attended },
    { name: "Dec", revenue: dashboardData?.monthlyInterviews?.[11]?.attended },
  ];

  const summaryCards = [
    {
      title: role === "ADMIN" ? "Total Agency" : "Total Employees",
      value:
        role === "ADMIN"
          ? dashboardData?.companyCount
          : dashboardData?.employeeCount,
      gradient: "from-[#FF6B6B] to-[#FFE66D]",
      icon: <UserPlus />,
    },
    {
      title: "Total Categories",
      value: dashboardData?.categoriesCount,
      gradient: "from-[#4ECDC4] to-[#556270]",
      icon: <ScrollText />,
    },
    {
      title: "Total Questions",
      value: dashboardData?.questionsCount,
      gradient: "from-[#A8E6CF] to-[#3EECAC]",
      icon: <NotebookPen />,
    },
    {
      title: "Total Test Taken",
      value: dashboardData?.feedbacksCount,
      gradient: "from-[#FFD93D] to-[#FF6B6B]",
      icon: <BookOpenCheck />,
    },
  ];

  useEffect(() => {
    if (getDashboardData?.data) {
      console.log(getDashboardData?.data, "getDashboardData?.data");
      setDashboardData(getDashboardData?.data);
    }
  }, [getDashboardData]);

  return (
    <div className="p-8 bg-white rounded-2xl min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <Typography
          sx={{ fontSize: "24px", fontWeight: 600 }}
          className="text-primary-2"
        >
          Analytics Dashboard
        </Typography>
      </div>

      {/* Summary Cards */}
      <div className="flex flex-wrap gap-6 mb-8">
        {summaryCards.map((item, index) => {
          if (role === "INTERVIEWER" && index === 0) return;
          if ((role === "COMPANY" || role === "RECRUITER") && index === 3)
            return;

          return (
            <div key={item.title} className="flex-1 min-w-[240px]">
              <div
                className={`h-full rounded-2xl bg-gradient-to-r ${item.gradient} p-[2px] shadow-lg`}
              >
                <div className="h-full bg-white rounded-2xl p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <Typography className="text-gray-600 text-sm mb-2">
                        {item.title}
                      </Typography>
                      <Typography
                        variant="h4"
                        className="text-gray-800 font-bold mb-4"
                      >
                        {item.value}
                      </Typography>
                    </div>
                    <span className="text-4xl">{item.icon}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="flex flex-col gap-6">
        {/* Line Chart */}
        <div className="flex-1 min-w-[calc(50%-1.5rem)]">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-[2px] rounded-2xl shadow-lg">
            <Card sx={{ borderRadius: "15px" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ marginBottom: "16px", color: "#424242 " }}
                >
                  Monthly Test Taken By User
                </Typography>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#FF6B6B"
                        strokeWidth={3}
                        dot={{ fill: "#FF6B6B" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Area Chart */}
        {role !== "INTERVIEWER" && <div className="flex-1 min-w-[calc(50%-1.5rem)]">
          <div className="bg-gradient-to-r from-green-400 to-teal-500 p-[2px] rounded-2xl shadow-lg">
            <Card sx={{ borderRadius: "15px" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ marginBottom: "16px", color: "#424242 " }}
                >
                  {role === "ADMIN" ? "Monthly Agency SignUp" : "Monthly Employee SignUp"}
                </Typography>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData2}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="users"
                        fill="#A8E6CF"
                        stroke="#3EECAC"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
