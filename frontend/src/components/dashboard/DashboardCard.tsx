interface Props {
  title: string;
  value: number;
}

function DashboardCard({
  title,
  value,
}: Props) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg transition hover:scale-105">
      <p className="text-sm uppercase tracking-wider text-blue-100">
        {title}
      </p>

      <h2 className="mt-4 text-5xl font-bold">
        {value}
      </h2>
    </div>
  );
}

export default DashboardCard;