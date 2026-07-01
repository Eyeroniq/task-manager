import {
  forwardRef,
  type InputHTMLAttributes,
} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          {label}
        </label>

        <input
          ref={ref}
          className={`w-full rounded-xl border px-4 py-3 outline-none transition
            ${
              error
                ? "border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            }
            ${className}`}
          {...props}
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;