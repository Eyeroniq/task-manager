import type { TaskStatus } from "../../types/task";

interface Props {
  status: TaskStatus;
}

function StatusBadge({ status }: Props) {
  const styles = {
    PENDING: "bg-yellow-100 text-yellow-700",
    IN_PROGRESS: "bg-blue-100 text-blue-700",
    COMPLETED: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}

export default StatusBadge;