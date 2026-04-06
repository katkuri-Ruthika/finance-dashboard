import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { useApp } from "@/context/AppContext";

const cards = [
  { key: "balance", label: "Total Balance", icon: DollarSign, gradient: "var(--gradient-primary)" },
  { key: "income", label: "Total Income", icon: TrendingUp, gradient: "var(--gradient-success)" },
  { key: "expenses", label: "Total Expenses", icon: TrendingDown, gradient: "var(--gradient-expense)" },
] as const;

const SummaryCards = () => {
  const { balance, totalIncome, totalExpenses } = useApp();
  const values = { balance, income: totalIncome, expenses: totalExpenses };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
      {cards.map((card, i) => (
        <motion.div
          key={card.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="rounded-xl bg-card p-5 lg:p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">{card.label}</span>
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: card.gradient }}
            >
              <card.icon className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-heading font-bold text-card-foreground">
            ${values[card.key].toLocaleString()}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default SummaryCards;
