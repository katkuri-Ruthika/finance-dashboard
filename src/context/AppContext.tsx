import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Transaction, mockTransactions } from "@/data/transactions";

export type Role = "viewer" | "admin";
export type TypeFilter = "all" | "income" | "expense";
export type SortField = "date" | "amount";
export type SortOrder = "asc" | "desc";

interface AppContextType {
  transactions: Transaction[];
  role: Role;
  setRole: (role: Role) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  typeFilter: TypeFilter;
  setTypeFilter: (f: TypeFilter) => void;
  sortField: SortField;
  setSortField: (f: SortField) => void;
  sortOrder: SortOrder;
  setSortOrder: (o: SortOrder) => void;
  addTransaction: (t: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: number) => void;
  updateTransaction: (t: Transaction) => void;
  filteredTransactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = "finance_dashboard_transactions";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : mockTransactions;
  });
  const [role, setRole] = useState<Role>("admin");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = useCallback((t: Omit<Transaction, "id">) => {
    setTransactions(prev => [...prev, { ...t, id: Date.now() }]);
  }, []);

  const deleteTransaction = useCallback((id: number) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const updateTransaction = useCallback((updated: Transaction) => {
    setTransactions(prev => prev.map(t => t.id === updated.id ? updated : t));
  }, []);

  const filteredTransactions = React.useMemo(() => {
    let result = [...transactions];
    if (typeFilter !== "all") result = result.filter(t => t.type === typeFilter);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.category.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => {
      const mult = sortOrder === "asc" ? 1 : -1;
      if (sortField === "date") return mult * (new Date(a.date).getTime() - new Date(b.date).getTime());
      return mult * (a.amount - b.amount);
    });
    return result;
  }, [transactions, typeFilter, searchQuery, sortField, sortOrder]);

  const totalIncome = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <AppContext.Provider value={{
      transactions, role, setRole, searchQuery, setSearchQuery,
      typeFilter, setTypeFilter, sortField, setSortField, sortOrder, setSortOrder,
      addTransaction, deleteTransaction, updateTransaction,
      filteredTransactions, totalIncome, totalExpenses, balance,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
