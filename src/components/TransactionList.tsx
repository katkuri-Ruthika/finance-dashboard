import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import type { Transaction } from "@/data/transactions";

const TransactionList = () => {
  const { filteredTransactions, role, deleteTransaction, addTransaction } = useApp();
  const [showForm, setShowForm] = useState(false);
  const isAdmin = role === "admin";

  return (
    <div className="rounded-xl bg-card shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <h3 className="font-heading font-semibold text-card-foreground">Transactions</h3>
        {isAdmin && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium"
          >
            {showForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            {showForm ? "Cancel" : "Add"}
          </button>
        )}
      </div>

      <AnimatePresence>
        {showForm && isAdmin && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            <AddForm onAdd={(t) => { addTransaction(t); setShowForm(false); }} />
          </motion.div>
        )}
      </AnimatePresence>

      {filteredTransactions.length === 0 ? (
        <div className="p-12 text-center text-muted-foreground text-sm">No transactions available</div>
      ) : (
        <div className="divide-y divide-border">
          {filteredTransactions.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.02 }}
              className="flex items-center justify-between px-5 py-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground truncate">{t.description}</p>
                <p className="text-xs text-muted-foreground">{t.category} · {new Date(t.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-semibold ${t.type === "income" ? "text-success" : "text-destructive"}`}>
                  {t.type === "income" ? "+" : "-"}${t.amount.toLocaleString()}
                </span>
                {isAdmin && (
                  <button
                    onClick={() => deleteTransaction(t.id)}
                    className="p-1 rounded text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

const AddForm = ({ onAdd }: { onAdd: (t: Omit<Transaction, "id">) => void }) => {
  const [form, setForm] = useState({ description: "", amount: "", category: "", type: "expense" as "income" | "expense", date: new Date().toISOString().split("T")[0] });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description || !form.amount || !form.category) return;
    onAdd({ ...form, amount: Number(form.amount) });
  };

  const inputClass = "w-full px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <form onSubmit={handleSubmit} className="p-5 border-b border-border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <input placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className={inputClass} />
      <input type="number" placeholder="Amount" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} className={inputClass} />
      <input placeholder="Category" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className={inputClass} />
      <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className={inputClass} />
      <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as "income" | "expense" }))} className={inputClass}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionList;
