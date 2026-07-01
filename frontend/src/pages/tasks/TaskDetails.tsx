import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getTaskById } from "../../api/task.api";

import StatusBadge from "../../components/tasks/StatusBadge";
import PriorityBadge from "../../components/tasks/PriorityBadge";

function TaskDetails() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getTaskById(Number(id)),
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return <h1>Task not found.</h1>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold">
          {data.title}
        </h1>

        <p className="mb-6 text-slate-600">
          {data.description}
        </p>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="mb-2 font-semibold">
              Status
            </p>

            <StatusBadge status={data.status} />
          </div>

          <div>
            <p className="mb-2 font-semibold">
              Priority
            </p>

            <PriorityBadge priority={data.priority} />
          </div>

          <div>
            <p className="mb-2 font-semibold">
              Creator
            </p>

            <p>{data.creator.fullName}</p>
          </div>

          <div>
            <p className="mb-2 font-semibold">
              Due Date
            </p>

            <p>
              {new Date(data.dueDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold">
            Assigned Users
          </h2>

          <div className="space-y-3">
            {data.assignments.map((assignment) => (
              <div
                key={assignment.user.id}
                className="flex items-center gap-3 rounded-xl border p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                  {assignment.user.fullName
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <p className="font-medium">
                    {assignment.user.fullName}
                  </p>

                  <p className="text-sm text-slate-500">
                    {assignment.user.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;