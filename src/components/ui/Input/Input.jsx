import { cn } from "@/lib/cn";

function Input({ label, error, className, type = "text", ...props }) {
  return (
    <div className="w-full">
      {label ? (
        <label className="mb-2 block text-sm font-medium text-slate-200">
          {label}
        </label>
      ) : null}

      <input
        type={type}
        className={cn(
          "h-12 w-full rounded-2xl border border-white/10 bg-white/5/5 px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:bg-white/5/7",
          error && "border-red-400 focus:border-red-400",
          className,
        )}
        {...props}
      />

      {error ? <p className="mt-2 text-xs text-red-400">{error}</p> : null}
    </div>
  );
}

export default Input;
