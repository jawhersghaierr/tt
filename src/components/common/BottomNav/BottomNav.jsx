import { NavLink } from "react-router-dom";

const items = [
  { label: "Discover", to: "/" },
  { label: "Matches", to: "/matches" },
  { label: "Messages", to: "/messages" },
  { label: "Profile", to: "/profile" },
];

function BottomNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-md -translate-x-1/2">
      <div className="grid grid-cols-4 rounded-[28px] border border-white/10 bg-slate-900/70 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-3 text-[11px] font-medium transition ${
                isActive
                  ? "bg-gradient-to-br from-violet-500 to-pink-500 text-white shadow-lg"
                  : "text-slate-400 hover:bg-white/5/5 hover:text-slate-200"
              }`
            }
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default BottomNav;
