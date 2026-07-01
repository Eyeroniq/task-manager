import {
  HomeIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  ClockIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Sidebar() {
  const { logout, user } = useAuth();

  return (
    <aside className="flex h-screen w-64 flex-col bg-slate-900 text-white">
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-2xl font-bold">
          Task Manager
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          {user?.fullName}
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-5">
        {user?.role === "ADMIN" ? (
          <NavLink
            to="/admin"
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-800"
          >
            <HomeIcon className="h-5 w-5" />
            Dashboard
          </NavLink>
        ) : (
          <NavLink
            to="/dashboard"
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-800"
          >
            <HomeIcon className="h-5 w-5" />
            Dashboard
          </NavLink>
        )}

        <NavLink
          to="/tasks"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-800"
        >
          <ClipboardDocumentListIcon className="h-5 w-5" />
          Tasks
        </NavLink>

        <NavLink
          to="/tasks/new"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-800"
        >
          <PlusCircleIcon className="h-5 w-5" />
          Create Task
        </NavLink>

        <NavLink
          to="/activities"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-800"
        >
          <ClockIcon className="h-5 w-5" />
          Activities
        </NavLink>

        <NavLink
          to="/profile"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-800"
        >
          <UserCircleIcon className="h-5 w-5" />
          Profile
        </NavLink>
      </nav>

      <button
        onClick={logout}
        className="m-5 flex items-center gap-3 rounded-lg bg-red-500 p-3 hover:bg-red-600"
      >
        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;