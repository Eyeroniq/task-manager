import { useQuery } from "@tanstack/react-query";

import { getActivities } from "../../api/activity.api";

function Activities() {
  const { data, isLoading } = useQuery({
    queryKey: ["activities"],
    queryFn: getActivities,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Activity Logs
      </h1>

      <div className="space-y-4">
        {data?.map((activity) => (
          <div
            key={activity.id}
            className="rounded-xl bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  {activity.user.fullName}
                </p>

                <p className="text-slate-600">
                  {activity.action}
                </p>

                <p className="text-sm text-blue-600">
                  {activity.task.title}
                </p>
              </div>

              <div className="text-sm text-slate-500">
                {new Date(
                  activity.createdAt
                ).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Activities;