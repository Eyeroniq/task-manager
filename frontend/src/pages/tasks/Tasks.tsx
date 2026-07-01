import { useQuery } from "@tanstack/react-query";
import EmptyState from "../../components/tasks/EmptyState";
import TaskTable from "../../components/tasks/TaskTable";
import { getTasks } from "../../api/task.api";
import { Link } from "react-router-dom";
function Tasks() {
  const {
    data: tasks,
    isLoading,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

 return (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">
        Tasks
      </h1>

      <Link
        to="/tasks/new"
        className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
      >
        Create Task
      </Link>
    </div>

    {!tasks || tasks.length === 0 ? (
      <EmptyState />
    ) : (
      <TaskTable tasks={tasks} />
    )}
  </div>
);
}

export default Tasks;