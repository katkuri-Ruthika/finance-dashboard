import { Download } from "lucide-react";
import { useApp } from "@/context/AppContext";

const ExportButton = () => {
  const { filteredTransactions } = useApp();

  const exportCSV = () => {
    const headers = "Date,Description,Category,Type,Amount\n";
    const rows = filteredTransactions.map(t =>
      `${t.date},"${t.description}","${t.category}",${t.type},${t.amount}`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportCSV}
      className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-card border border-border text-muted-foreground hover:text-card-foreground transition-colors font-medium"
    >
      <Download className="w-3.5 h-3.5" />
      Export CSV
    </button>
  );
};

export default ExportButton;
