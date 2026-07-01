import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-slate-900 text-white p-4">
        Sidebar
      </aside>

      <div className="flex-1">
        <header className="h-16 border-b bg-white flex items-center px-6">
          Navbar
        </header>

        <main className="p-6 bg-slate-100 min-h-[calc(100vh-64px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;