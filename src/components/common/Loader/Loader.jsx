function Loader({ label = "Chargement..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-slate-900" />
      <p className="mt-3 text-sm text-slate-500">{label}</p>
    </div>
  );
}

export default Loader;
