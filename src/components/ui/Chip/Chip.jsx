import { cn } from "@/lib/cn";

function Chip({ children, className, active = false }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium transition",
        active
          ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-md"
          : "border border-white/10 bg-white/5/5 text-slate-300",
        className,
      )}
    >
      {children}
    </span>
  );
}

export default Chip;
