function ProfileMediaPicker({
  avatar,
  introVideo,
  onAvatarChange,
  onVideoChange,
  error,
}) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block cursor-pointer rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-4 transition hover:border-slate-400 hover:bg-slate-100">
          <span className="block text-sm font-medium text-white">
            Photo principale
          </span>
          <span className="mt-1 block text-xs text-slate-500">
            JPG, PNG ou WebP
          </span>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onAvatarChange}
          />

          <div className="mt-4 overflow-hidden rounded-2xl bg-white/5">
            {avatar ? (
              <img
                src={avatar}
                alt="Avatar preview"
                className="h-48 w-full object-cover"
              />
            ) : (
              <div className="flex h-48 items-center justify-center text-sm text-slate-400">
                Ajouter une image
              </div>
            )}
          </div>
        </label>

        <label className="block cursor-pointer rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-4 transition hover:border-slate-400 hover:bg-slate-100">
          <span className="block text-sm font-medium text-white">
            Vidéo de présentation
          </span>
          <span className="mt-1 block text-xs text-slate-500">
            Optionnel, format court
          </span>

          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={onVideoChange}
          />

          <div className="mt-4 overflow-hidden rounded-2xl bg-white/5">
            {introVideo ? (
              <video
                src={introVideo}
                controls
                className="h-48 w-full object-cover"
              />
            ) : (
              <div className="flex h-48 items-center justify-center text-sm text-slate-400">
                Ajouter une vidéo
              </div>
            )}
          </div>
        </label>
      </div>

      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </div>
  );
}

export default ProfileMediaPicker;
