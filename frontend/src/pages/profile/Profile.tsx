import { useAuth } from "../../hooks/useAuth";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-2xl bg-white p-8 shadow">
        <div className="flex items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white">
            {user?.fullName.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              {user?.fullName}
            </h1>

            <p className="mt-2 text-slate-500">
              {user?.email}
            </p>

            <span className="mt-4 inline-block rounded-full bg-blue-100 px-4 py-2 font-semibold text-blue-700">
              {user?.role}
            </span>
          </div>
        </div>

        <hr className="my-8" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-slate-100 p-5">
            <p className="text-sm text-slate-500">
              Full Name
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              {user?.fullName}
            </h2>
          </div>

          <div className="rounded-xl bg-slate-100 p-5">
            <p className="text-sm text-slate-500">
              Email
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              {user?.email}
            </h2>
          </div>

          <div className="rounded-xl bg-slate-100 p-5">
            <p className="text-sm text-slate-500">
              Role
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              {user?.role}
            </h2>
          </div>

          <div className="rounded-xl bg-slate-100 p-5">
            <p className="text-sm text-slate-500">
              Status
            </p>

            <h2 className="mt-2 text-xl font-semibold text-green-600">
              Active
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;