import type {
  SelectHTMLAttributes,
} from "react";

interface Props
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

function Select({
  label,
  error,
  children,
  ...props
}: Props) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        {label}
      </label>

      <select
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
        {...props}
      >
        {children}
      </select>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default Select;