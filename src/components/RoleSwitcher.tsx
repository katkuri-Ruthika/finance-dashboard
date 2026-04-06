import { Shield, Eye } from "lucide-react";
import { useApp, Role } from "@/context/AppContext";

const RoleSwitcher = () => {
  const { role, setRole } = useApp();

  const options: { value: Role; label: string; icon: typeof Shield }[] = [
    { value: "admin", label: "Admin", icon: Shield },
    { value: "viewer", label: "Viewer", icon: Eye },
  ];

  return (
    <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-0.5">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => setRole(opt.value)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors font-medium ${
            role === opt.value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-card-foreground"
          }`}
        >
          <opt.icon className="w-3.5 h-3.5" />
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default RoleSwitcher;
