import { useQuery } from "@tanstack/react-query";

import DashboardCard from "../../components/dashboard/DashboardCard";
import { getUserDashboard } from "../../api/dashboard.api";

function UserDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["user-dashboard"],
    queryFn: getUserDashboard,
  });

  if (isLoading) return <h1>Loading...</h1>;

  if (!data) return <h1>No Data</h1>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        My Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        <DashboardCard
          title="My Tasks"
          value={data.myTasks}
        />

        <DashboardCard
          title="Pending"
          value={data.pending}
        />

        <DashboardCard
          title="In Progress"
          value={data.inProgress}
        />

        <DashboardCard
          title="Completed"
          value={data.completed}
        />
      </div>
    </div>
  );
}

export default UserDashboard;