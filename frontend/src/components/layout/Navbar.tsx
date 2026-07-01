import { useAuth } from "../../hooks/useAuth";

function Navbar() {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">
      <h2 className="text-2xl font-bold">
        Dashboard
      </h2>

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
          {user?.fullName.charAt(0)}
        </div>

        <div>
          <p className="font-semibold">
            {user?.fullName}
          </p>

          <p className="text-sm text-slate-500">
            {user?.role}
          </p>
        </div>
      </div>
    </header>
  );
}

export default Navbar;