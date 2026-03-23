function ProfileSectionStatus({ title, items }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-50 p-4">
      <h3 className="text-sm font-semibold text-white">{title}</h3>

      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <span className={item.done ? "text-white" : "text-slate-500"}>
              {item.label}
            </span>

            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                item.done
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-200 text-slate-300"
              }`}
            >
              {item.done ? "OK" : "À faire"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileSectionStatus;
