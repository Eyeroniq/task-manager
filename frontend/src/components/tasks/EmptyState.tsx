function EmptyState() {
  return (
    <div className="rounded-2xl bg-white py-16 text-center shadow-sm">
      <div className="text-6xl">📋</div>

      <h2 className="mt-4 text-2xl font-bold">
        No Tasks Found
      </h2>

      <p className="mt-2 text-slate-500">
        Create your first task to get started.
      </p>
    </div>
  );
}

export default EmptyState;