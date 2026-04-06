export interface Transaction {
  id: number;
  date: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  description: string;
}

export const mockTransactions: Transaction[] = [
  { id: 1, date: "2026-04-01", amount: 5000, category: "Salary", type: "income", description: "Monthly salary" },
  { id: 2, date: "2026-04-02", amount: 120, category: "Food", type: "expense", description: "Grocery shopping" },
  { id: 3, date: "2026-04-03", amount: 60, category: "Transport", type: "expense", description: "Uber rides" },
  { id: 4, date: "2026-04-04", amount: 200, category: "Shopping", type: "expense", description: "New headphones" },
  { id: 5, date: "2026-04-05", amount: 1500, category: "Freelance", type: "income", description: "Web project" },
  { id: 6, date: "2026-04-06", amount: 85, category: "Entertainment", type: "expense", description: "Concert tickets" },
  { id: 7, date: "2026-04-07", amount: 950, category: "Rent", type: "expense", description: "Monthly rent" },
  { id: 8, date: "2026-04-08", amount: 45, category: "Food", type: "expense", description: "Restaurant dinner" },
  { id: 9, date: "2026-04-09", amount: 300, category: "Freelance", type: "income", description: "Logo design" },
  { id: 10, date: "2026-04-10", amount: 75, category: "Utilities", type: "expense", description: "Electric bill" },
  { id: 11, date: "2026-04-11", amount: 30, category: "Transport", type: "expense", description: "Gas station" },
  { id: 12, date: "2026-04-12", amount: 2000, category: "Salary", type: "income", description: "Bonus payment" },
  { id: 13, date: "2026-04-13", amount: 150, category: "Shopping", type: "expense", description: "Clothing" },
  { id: 14, date: "2026-04-14", amount: 40, category: "Entertainment", type: "expense", description: "Streaming subscription" },
  { id: 15, date: "2026-04-15", amount: 500, category: "Freelance", type: "income", description: "Consulting" },
  { id: 16, date: "2026-03-01", amount: 5000, category: "Salary", type: "income", description: "March salary" },
  { id: 17, date: "2026-03-05", amount: 180, category: "Food", type: "expense", description: "Weekly groceries" },
  { id: 18, date: "2026-03-10", amount: 950, category: "Rent", type: "expense", description: "March rent" },
  { id: 19, date: "2026-03-15", amount: 250, category: "Shopping", type: "expense", description: "Electronics" },
  { id: 20, date: "2026-03-20", amount: 800, category: "Freelance", type: "income", description: "App development" },
  { id: 21, date: "2026-02-01", amount: 5000, category: "Salary", type: "income", description: "Feb salary" },
  { id: 22, date: "2026-02-08", amount: 110, category: "Food", type: "expense", description: "Groceries" },
  { id: 23, date: "2026-02-14", amount: 200, category: "Entertainment", type: "expense", description: "Valentine dinner" },
  { id: 24, date: "2026-02-20", amount: 950, category: "Rent", type: "expense", description: "Feb rent" },
  { id: 25, date: "2026-02-25", amount: 600, category: "Freelance", type: "income", description: "Photography gig" },
];
