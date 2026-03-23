function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-sm rounded-3xl bg-white/5 p-6 text-center shadow-sm ring-1 ring-slate-200">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          404
        </h1>
        <p className="mt-2 text-sm text-slate-300">Cette page n’existe pas.</p>
      </div>
    </div>
  );
}

export default NotFoundPage;
