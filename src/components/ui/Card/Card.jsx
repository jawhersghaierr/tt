import { cn } from "@/lib/cn";

function Card({ children, className }) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/10 bg-white/5/5 p-5 text-slate-50 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Card;
