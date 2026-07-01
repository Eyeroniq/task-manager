import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import type { Task } from "../../types/task";

import {
  deleteTask,
  updateTaskStatus,
} from "../../api/task.api";

import PriorityBadge from "./PriorityBadge";

interface Props {
  tasks: Task[];
}

function TaskTable({ tasks }: Props) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTask,

    onSuccess: () => {
      toast.success("Task deleted");

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number;
      status:
        | "PENDING"
        | "IN_PROGRESS"
        | "COMPLETED";
    }) => updateTaskStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-6 py-4 text-left">
              Title
            </th>

            <th className="px-6 py-4 text-left">
              Assignees
            </th>

            <th className="px-6 py-4 text-left">
              Priority
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-left">
              Due
            </th>

            <th className="px-6 py-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="border-t"
            >
              <td className="px-6 py-4 font-medium">
                {task.title}
              </td>

              <td className="px-6 py-4">
                <div className="flex -space-x-2">
                  {task.assignments.map(
                    (assignment) => (
                      <div
                        key={assignment.user.id}
                        title={
                          assignment.user.fullName
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-sm font-semibold text-white"
                      >
                        {assignment.user.fullName
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                    )
                  )}
                </div>
              </td>

              <td className="px-6 py-4">
                <PriorityBadge
                  priority={task.priority}
                />
              </td>

              <td className="px-6 py-4">
                <select
                  value={task.status}
                  onChange={(e) =>
                    statusMutation.mutate({
                      id: task.id,
                      status: e.target
                        .value as Task["status"],
                    })
                  }
                  className="rounded-lg border px-2 py-1"
                >
                  <option value="PENDING">
                    PENDING
                  </option>

                  <option value="IN_PROGRESS">
                    IN PROGRESS
                  </option>

                  <option value="COMPLETED">
                    COMPLETED
                  </option>
                </select>
              </td>

              <td className="px-6 py-4">
                {new Date(
                  task.dueDate
                ).toLocaleDateString()}
              </td>

              <td className="px-6 py-4">
                <div className="flex gap-3">
                  <Link
                    to={`/tasks/${task.id}`}
                  >
                    <EyeIcon className="h-5 w-5 text-blue-600" />
                  </Link>

                  <Link
                    to={`/tasks/${task.id}/edit`}
                  >
                    <PencilSquareIcon className="h-5 w-5 text-green-600" />
                  </Link>

                  <button
                    onClick={() => {
                      if (
                        confirm(
                          "Delete this task?"
                        )
                      ) {
                        deleteMutation.mutate(
                          task.id
                        );
                      }
                    }}
                  >
                    <TrashIcon className="h-5 w-5 text-red-600" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;