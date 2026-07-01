import { useQuery } from "@tanstack/react-query";

import DashboardCard from "../../components/dashboard/DashboardCard";
import { getAdminDashboard } from "../../api/dashboard.api";

function AdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: getAdminDashboard,
  });

  if (isLoading) return <h1>Loading...</h1>;

  if (!data) return <h1>No Data</h1>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-6 lg:grid-cols-5">
        <DashboardCard
          title="Users"
          value={data.totalUsers}
        />

        <DashboardCard
          title="Tasks"
          value={data.totalTasks}
        />

        <DashboardCard
          title="Pending"
          value={data.pendingTasks}
        />

        <DashboardCard
          title="In Progress"
          value={data.inProgressTasks}
        />

        <DashboardCard
          title="Completed"
          value={data.completedTasks}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;