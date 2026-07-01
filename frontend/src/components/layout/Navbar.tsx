import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Navbar() {
  const { user } = useAuth();
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.startsWith("/admin"))
      return "Admin Dashboard";

    if (location.pathname.startsWith("/dashboard"))
      return "Dashboard";

    if (location.pathname.startsWith("/tasks/new"))
      return "Create Task";

    if (location.pathname.startsWith("/tasks"))
      return "Tasks";

    if (location.pathname.startsWith("/activities"))
      return "Activity Logs";

    if (location.pathname.startsWith("/profile"))
      return "Profile";

    return "Task Manager";
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          {getTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-slate-800">
            {user?.fullName}
          </p>

          <p className="text-sm text-slate-500">
            {user?.role}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
          {user?.fullName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}

export default Navbar;