import { useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Hash, AlertCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";

const Insights = () => {
  const { transactions } = useApp();

  const insights = useMemo(() => {
    const expenses = transactions.filter(t => t.type === "expense");
    const categoryMap = new Map<string, number>();
    for (const t of expenses) categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + t.amount);

    let highestCategory = "N/A";
    let highestAmount = 0;
    categoryMap.forEach((v, k) => { if (v > highestAmount) { highestAmount = v; highestCategory = k; } });

    const months = new Map<string, number>();
    for (const t of expenses) {
      const m = t.date.substring(0, 7);
      months.set(m, (months.get(m) || 0) + t.amount);
    }
    const sortedMonths = [...months.entries()].sort((a, b) => b[0].localeCompare(a[0]));
    const currentMonth = sortedMonths[0]?.[1] || 0;
    const prevMonth = sortedMonths[1]?.[1] || 0;
    const change = prevMonth ? ((currentMonth - prevMonth) / prevMonth * 100).toFixed(1) : "0";

    return [
      { icon: AlertCircle, label: "Top Expense Category", value: highestCategory, sub: `$${highestAmount.toLocaleString()} total`, color: "text-destructive" },
      { icon: TrendingUp, label: "Monthly Change", value: `${Number(change) >= 0 ? "+" : ""}${change}%`, sub: "vs last month", color: Number(change) >= 0 ? "text-destructive" : "text-success" },
      { icon: Hash, label: "Total Transactions", value: transactions.length.toString(), sub: `${expenses.length} expenses`, color: "text-primary" },
      { icon: BarChart3, label: "Avg Transaction", value: `$${transactions.length ? Math.round(transactions.reduce((s, t) => s + t.amount, 0) / transactions.length).toLocaleString() : 0}`, sub: "across all types", color: "text-primary" },
    ];
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {insights.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.08 }}
          className="rounded-xl bg-card p-4 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow"
        >
          <div className="flex items-center gap-2 mb-2">
            <item.icon className={`w-4 h-4 ${item.color}`} />
            <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
          </div>
          <p className="text-xl font-heading font-bold text-card-foreground">{item.value}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Insights;
