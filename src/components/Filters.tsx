import { Search, ArrowUpDown } from "lucide-react";
import { useApp, TypeFilter } from "@/context/AppContext";

const Filters = () => {
  const { searchQuery, setSearchQuery, typeFilter, setTypeFilter, sortField, setSortField, sortOrder, setSortOrder } = useApp();

  const typeOptions: { value: TypeFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 rounded-lg bg-card border border-border text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div className="flex gap-1 bg-card border border-border rounded-lg p-0.5">
        {typeOptions.map(opt => (
          <button
            key={opt.value}
            onClick={() => setTypeFilter(opt.value)}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors font-medium ${
              typeFilter === opt.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-card-foreground"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          if (sortField === "date") {
            setSortField("amount");
          } else {
            setSortField("date");
          }
        }}
        className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg bg-card border border-border text-muted-foreground hover:text-card-foreground transition-colors"
      >
        <ArrowUpDown className="w-3.5 h-3.5" />
        Sort: {sortField === "date" ? "Date" : "Amount"}
      </button>
      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        className="px-3 py-2 text-sm rounded-lg bg-card border border-border text-muted-foreground hover:text-card-foreground transition-colors"
      >
        {sortOrder === "asc" ? "↑ Asc" : "↓ Desc"}
      </button>
    </div>
  );
};

export default Filters;
