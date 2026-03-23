function ProfileSection({ title, description, children }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-white">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 text-sm leading-6 text-slate-300">{description}</p>
        ) : null}
      </div>

      <div className="mt-4">{children}</div>
    </section>
  );
}

export default ProfileSection;
