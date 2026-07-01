import type { TaskPriority } from "../../types/task";

interface Props {
  priority: TaskPriority;
}

function PriorityBadge({ priority }: Props) {
  const styles = {
    LOW: "bg-green-100 text-green-700",
    MEDIUM: "bg-orange-100 text-orange-700",
    HIGH: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}

export default PriorityBadge;