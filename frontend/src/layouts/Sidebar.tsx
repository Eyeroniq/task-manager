import {
  HomeIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  ClockIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside className="flex h-screen w-64 flex-col bg-slate-900">
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-2xl font-bold text-white">
          Task Manager
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          {user?.role}
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        <NavLink
          to={user?.role === "ADMIN" ? "/admin" : "/dashboard"}
          className={linkClass}
        >
          <HomeIcon className="h-5 w-5" />
          Dashboard
        </NavLink>

        <NavLink
          to="/tasks"
          className={linkClass}
        >
          <ClipboardDocumentListIcon className="h-5 w-5" />
          Tasks
        </NavLink>

        <NavLink
          to="/tasks/new"
          className={linkClass}
        >
          <PlusCircleIcon className="h-5 w-5" />
          Create Task
        </NavLink>

        <NavLink
          to="/activities"
          className={linkClass}
        >
          <ClockIcon className="h-5 w-5" />
          Activities
        </NavLink>

        <NavLink
          to="/profile"
          className={linkClass}
        >
          <UserCircleIcon className="h-5 w-5" />
          Profile
        </NavLink>
      </nav>

      <div className="border-t border-slate-800 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl bg-red-600 px-4 py-3 text-white transition hover:bg-red-700"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;