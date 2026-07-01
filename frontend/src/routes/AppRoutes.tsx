import { Navigate, Route, Routes } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import AdminDashboard from "../pages/dashboard/AdminDashboard";
import UserDashboard from "../pages/dashboard/UserDashboard";

import Tasks from "../pages/tasks/Tasks";
import CreateTask from "../pages/tasks/CreateTask";
import TaskDetails from "../pages/tasks/TaskDetails";
import EditTask from "../pages/tasks/EditTask";

import Activities from "../pages/activities/Activities";
import Profile from "../pages/profile/Profile";

import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {/* Dashboards */}
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Tasks */}
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/new" element={<CreateTask />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="/tasks/:id/edit" element={<EditTask />} />

          {/* Activities */}
          <Route path="/activities" element={<Activities />} />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;