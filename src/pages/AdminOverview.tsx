// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { 
//   Users, 
//   Package, 
//   IndianRupee, 
//   ShieldCheck,
//   TrendingUp,
//   Clock,
//   CheckCircle,
//   XCircle,
//   AlertCircle
// } from "lucide-react";
// import { useQuery } from "@tanstack/react-query";
// import api from "@/lib/api";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// export default function AdminOverview() {
//   const { data: stats, isLoading } = useQuery({
//     queryKey: ['adminStats'],
//     queryFn: async () => {
//       const response = await api.get('/admin/stats');
//       return response.data;
//     },
//     refetchInterval: 30000 // Refresh every 30 seconds
//   });

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   const kpis = [
//     {
//       title: "Total Users",
//       value: stats?.totalUsers?.toLocaleString() || "0",
//       icon: Users,
//       color: "text-blue-500",
//       bg: "bg-blue-500/10"
//     },
//     {
//       title: "Total Projects",
//       value: stats?.totalProjects?.toLocaleString() || "0",
//       icon: Package,
//       color: "text-green-500",
//       bg: "bg-green-500/10"
//     },
//     {
//       title: "Credits Issued",
//       value: stats?.totalCreditsIssued?.toLocaleString() || "0",
//       icon: ShieldCheck,
//       color: "text-purple-500",
//       bg: "bg-purple-500/10"
//     },
//     {
//       title: "Transaction Volume",
//       value: `₹${(stats?.totalVolume || 0).toLocaleString()}`,
//       icon: IndianRupee,
//       color: "text-orange-500",
//       bg: "bg-orange-500/10"
//     }
//   ];

//   const projectStatusData = [
//     { name: "Pending", value: stats?.pendingProjects || 0, color: "#f59e0b" },
//     { name: "Verified", value: stats?.verifiedProjects || 0, color: "#10b981" },
//     { name: "Rejected", value: stats?.rejectedProjects || 0, color: "#ef4444" },
//     { name: "Flagged", value: stats?.flaggedProjects || 0, color: "#8b5cf6" }
//   ];

//   const userRoleData = stats?.userBreakdown ? [
//     { name: "Admins", value: stats.userBreakdown.admins, color: "#ef4444" },
//     { name: "Auditors", value: stats.userBreakdown.auditors, color: "#f59e0b" },
//     { name: "Sellers", value: stats.userBreakdown.sellers, color: "#10b981" },
//     { name: "Buyers", value: stats.userBreakdown.buyers, color: "#3b82f6" }
//   ] : [];

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
//         <p className="text-muted-foreground">Platform statistics and insights</p>
//       </div>

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {kpis.map((kpi) => {
//           const Icon = kpi.icon;
//           return (
//             <Card key={kpi.title} className="hover:shadow-lg transition-shadow">
//               <CardHeader className="flex flex-row items-center justify-between pb-2">
//                 <CardTitle className="text-sm font-medium text-muted-foreground">
//                   {kpi.title}
//                 </CardTitle>
//                 <div className={`p-2 rounded-lg ${kpi.bg}`}>
//                   <Icon className={`w-5 h-5 ${kpi.color}`} />
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-3xl font-bold text-foreground">{kpi.value}</div>
//                 <p className="text-xs text-muted-foreground mt-2">
//                   Last 30 days
//                 </p>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Project Status Distribution</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={projectStatusData}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                   >
//                     {projectStatusData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>User Role Distribution</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={userRoleData}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                   >
//                     {userRoleData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Activity */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Projects</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {stats?.recentActivities?.projects?.slice(0, 5).map((project: any) => (
//                 <div key={project._id} className="flex items-center justify-between py-2 border-b last:border-0">
//                   <div>
//                     <p className="text-sm font-medium text-foreground">{project.title}</p>
//                     <p className="text-xs text-muted-foreground">by {project.seller?.name}</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className={`text-xs px-2 py-1 rounded-full ${
//                       project.status === 'verified' ? 'bg-green-100 text-green-800' :
//                       project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                       project.status === 'rejected' ? 'bg-red-100 text-red-800' :
//                       'bg-purple-100 text-purple-800'
//                     }`}>
//                       {project.status}
//                     </span>
//                     <span className="text-xs text-muted-foreground">
//                       {new Date(project.createdAt).toLocaleDateString()}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Transactions</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {stats?.recentActivities?.transactions?.slice(0, 5).map((tx: any) => (
//                 <div key={tx._id} className="flex items-center justify-between py-2 border-b last:border-0">
//                   <div>
//                     <p className="text-sm font-medium text-foreground">₹{tx.amount.toLocaleString()}</p>
//                     <p className="text-xs text-muted-foreground">{tx.type}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs text-muted-foreground">
//                       {new Date(tx.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Package, 
  IndianRupee, 
  ShieldCheck,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function AdminOverview() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const response = await api.get('/admin/stats');
      return response.data;
    },
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-50 border-red-200">
        <CardContent className="pt-6">
          <div className="text-center text-red-600">
            <p className="font-semibold">Error loading dashboard data</p>
            <p className="text-sm mt-2">Please check your connection and try again</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const kpis = [
    {
      title: "Total Users",
      value: stats?.totalUsers?.toLocaleString() || "0",
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Total Projects",
      value: stats?.totalProjects?.toLocaleString() || "0",
      icon: Package,
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      title: "Credits Issued",
      value: stats?.totalCreditsIssued?.toLocaleString() || "0",
      icon: ShieldCheck,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      title: "Transaction Volume",
      value: `₹${(stats?.totalVolume || 0).toLocaleString()}`,
      icon: IndianRupee,
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    }
  ];

  const projectStats = [
    {
      title: "Pending",
      value: stats?.pendingProjects || 0,
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-100"
    },
    {
      title: "Verified",
      value: stats?.verifiedProjects || 0,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100"
    },
    {
      title: "Rejected",
      value: stats?.rejectedProjects || 0,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-100"
    },
    {
      title: "Flagged",
      value: stats?.flaggedProjects || 0,
      icon: AlertCircle,
      color: "text-purple-600",
      bg: "bg-purple-100"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Platform statistics and insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${kpi.bg}`}>
                  <Icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{kpi.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Project Status Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Project Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {projectStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.title} className={`p-4 rounded-lg ${stat.bg}`}>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                    <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                  <p className={`text-sm font-medium ${stat.color}`}>{stat.title}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* User Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>User Role Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">{stats?.userBreakdown?.admins || 0}</p>
              <p className="text-sm text-red-600">Admins</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">{stats?.userBreakdown?.auditors || 0}</p>
              <p className="text-sm text-yellow-600">Auditors</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{stats?.userBreakdown?.sellers || 0}</p>
              <p className="text-sm text-green-600">Sellers</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{stats?.userBreakdown?.buyers || 0}</p>
              <p className="text-sm text-blue-600">Buyers</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.recentActivities?.projects?.length > 0 ? (
                stats.recentActivities.projects.map((project: any) => (
                  <div key={project._id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{project.title}</p>
                      <p className="text-xs text-muted-foreground">by {project.seller?.name || 'Unknown'}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        project.status === 'verified' ? 'bg-green-100 text-green-800' :
                        project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        project.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {project.status}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">No recent projects</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.recentActivities?.transactions?.length > 0 ? (
                stats.recentActivities.transactions.map((tx: any) => (
                  <div key={tx._id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">₹{tx.amount?.toLocaleString() || 0}</p>
                      <p className="text-xs text-muted-foreground">{tx.type || 'Transaction'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">No recent transactions</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}