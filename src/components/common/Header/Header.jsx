function Header({ title }) {
  return (
    <header className="sticky top-0 z-30 px-4 pt-4">
      <div className="mx-auto flex h-16 items-center justify-between rounded-3xl border border-white/10 bg-white/5/5 px-4 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-400">
            TINDER-ITT
          </p>
          <h1 className="text-lg font-semibold tracking-tight text-white">
            {title}
          </h1>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 text-sm font-semibold text-white shadow-lg">
          T
        </div>
      </div>
    </header>
  );
}

export default Header;
