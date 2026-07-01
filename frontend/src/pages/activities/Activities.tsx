import { useQuery } from "@tanstack/react-query";
import { getActivities } from "../../api/activity.api";

function Activities() {
  const { data, isLoading } = useQuery({
    queryKey: ["activities"],
    queryFn: getActivities,
  });

  if (isLoading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Activity Logs
      </h1>

      {data?.map((activity) => (
        <div
          key={activity.id}
          className="rounded-2xl border-l-4 border-blue-600 bg-white p-6 shadow"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold text-lg">
                {activity.user.fullName}
              </p>

              <span className="mt-1 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                {activity.action}
              </span>

              <p className="mt-3 text-slate-600">
                {activity.details}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Task:
                {" "}
                <span className="font-medium">
                  {activity.task?.title ?? "Deleted Task"}
                </span>
              </p>
            </div>

            <div className="text-right text-sm text-slate-500">
              {new Date(activity.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Activities;