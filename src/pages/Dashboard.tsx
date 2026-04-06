import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import SummaryCards from "@/components/SummaryCards";
import BalanceLineChart from "@/components/Charts/BalanceLineChart";
import ExpensePieChart from "@/components/Charts/ExpensePieChart";
import TransactionList from "@/components/TransactionList";
import Filters from "@/components/Filters";
import RoleSwitcher from "@/components/RoleSwitcher";
import Insights from "@/components/Insights";
import ExportButton from "@/components/ExportButton";

const Dashboard = () => {
  const [section, setSection] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeSection={section} onSectionChange={setSection} />
      <main className="lg:ml-60 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">Finance Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">Track your income, expenses, and financial health</p>
            </div>
            <div className="flex items-center gap-3">
              <ExportButton />
              <RoleSwitcher />
            </div>
          </div>

          {/* Overview */}
          {(section === "overview" || section === "insights") && (
            <>
              <SummaryCards />
              {section === "overview" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <BalanceLineChart />
                  <ExpensePieChart />
                </div>
              )}
              {section === "insights" && <Insights />}
            </>
          )}

          {/* Transactions */}
          {(section === "overview" || section === "transactions") && (
            <>
              <Filters />
              <TransactionList />
            </>
          )}

          {section === "insights" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <BalanceLineChart />
              <ExpensePieChart />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
