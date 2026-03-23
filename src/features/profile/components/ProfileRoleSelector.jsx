import Chip from "@/components/ui/Chip/Chip";

const roles = [
  { label: "Candidate", value: "candidate" },
  { label: "Recruiter", value: "recruiter" },
  { label: "Hybrid", value: "hybrid" },
];

function ProfileRoleSelector({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {roles.map((role) => (
        <button
          key={role.value}
          type="button"
          onClick={() => onChange(role.value)}
          className="bg-transparent"
        >
          <Chip active={value === role.value}>{role.label}</Chip>
        </button>
      ))}
    </div>
  );
}

export default ProfileRoleSelector;
