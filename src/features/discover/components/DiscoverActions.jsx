import Button from "@/components/ui/Button/Button";

function DiscoverActions({
  onPass,
  onLike,
  onRewind,
  onSuperLike,
  onBoost,
  disabled = false,
  canUseRewind = false,
  boostsRemaining = 0,
  superLikesRemaining = 0,
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={onPass}
          disabled={disabled}
          className="rounded-2xl border-rose-200 text-rose-600 hover:bg-rose-50"
        >
          Pass
        </Button>

        <Button
          size="lg"
          onClick={onLike}
          disabled={disabled}
          className="rounded-2xl bg-emerald-600 hover:bg-emerald-700"
        >
          Like
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onRewind}
          disabled={!canUseRewind}
        >
          Rewind
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={onSuperLike}
          disabled={disabled || superLikesRemaining <= 0}
        >
          Super Like
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={onBoost}
          disabled={boostsRemaining <= 0}
        >
          Boost
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 text-center text-xs text-slate-500">
        <div>Super Likes: {superLikesRemaining}</div>
        <div>Boosts: {boostsRemaining}</div>
      </div>
    </div>
  );
}

export default DiscoverActions;
