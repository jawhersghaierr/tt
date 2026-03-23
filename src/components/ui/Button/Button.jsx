import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg hover:opacity-95",
  secondary:
    "bg-white/5/10 text-white border border-white/10 hover:bg-white/5/15",
  outline:
    "border border-white/15 bg-transparent text-white hover:bg-white/5/5",
  ghost: "bg-transparent text-slate-300 hover:bg-white/5/5 hover:text-white",
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-2xl font-medium transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
