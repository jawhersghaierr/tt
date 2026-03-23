function PremiumBadge({ plan }) {
  if (!plan || plan === "free") return null;

  const labels = {
    plus: "Plus",
    gold: "Gold",
    platinum: "Platinum",
  };

  return (
    <span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
      {labels[plan] || "Premium"}
    </span>
  );
}

export default PremiumBadge;
