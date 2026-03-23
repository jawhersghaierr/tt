import Chip from "@/components/ui/Chip/Chip";

const roles = ["All", "Candidate", "Recruiter"];

function DiscoverFilters({ selectedRole, onSelectRole }) {
  return (
    <div className="flex flex-wrap gap-2">
      {roles.map((role) => (
        <button
          key={role}
          type="button"
          onClick={() => onSelectRole(role)}
          className="bg-transparent"
        >
          <Chip active={selectedRole === role}>{role}</Chip>
        </button>
      ))}
    </div>
  );
}

export default DiscoverFilters;
