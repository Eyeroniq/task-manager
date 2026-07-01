import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";

import type { UserOption } from "../../types/user";

interface Props {
  users: UserOption[];
  selected: number[];
  onChange: (ids: number[]) => void;
}

function MultiSelect({
  users,
  selected,
  onChange,
}: Props) {
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.fullName
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [users, search]);

  const toggleUser = (id: number) => {
    if (selected.includes(id)) {
      onChange(
        selected.filter((userId) => userId !== id)
      );
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-semibold text-slate-700">
        Assign Team Members
      </label>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Search */}
        <div className="border-b p-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-slate-400" />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 py-2 pl-10 pr-4 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Users */}
        <div className="max-h-64 overflow-y-auto">
          {filteredUsers.length === 0 ? (
            <div className="p-6 text-center text-slate-500">
              No users found
            </div>
          ) : (
            filteredUsers.map((user) => (
              <label
                key={user.id}
                className="flex cursor-pointer items-center justify-between border-b px-5 py-4 transition hover:bg-slate-50"
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selected.includes(
                      user.id
                    )}
                    onChange={() =>
                      toggleUser(user.id)
                    }
                    className="h-4 w-4"
                  />

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                    {user.fullName
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <p className="font-medium text-slate-800">
                      {user.fullName}
                    </p>

                    <p className="text-sm text-slate-500">
                      ID: {user.id}
                    </p>
                  </div>
                </div>

              <span
  className={`rounded-full px-3 py-1 text-xs font-semibold ${
    user.role === "ADMIN"
      ? "bg-purple-100 text-purple-700"
      : "bg-blue-100 text-blue-700"
  }`}
>
  {user.role}
</span>
              </label>

              
            ))
          )}
        </div>

        <div className="border-t bg-slate-50 px-5 py-3 text-sm text-slate-600">
          Selected:{" "}
          <span className="font-semibold">
            {selected.length}
          </span>{" "}
          user{selected.length !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}

export default MultiSelect;