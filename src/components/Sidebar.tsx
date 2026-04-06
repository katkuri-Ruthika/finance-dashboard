import { useState } from "react";
import { LayoutDashboard, ArrowLeftRight, Lightbulb, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (s: string) => void;
}

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "insights", label: "Insights", icon: Lightbulb },
];

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavContent = () => (
    <nav className="flex flex-col gap-1 px-3">
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => { onSectionChange(item.id); setMobileOpen(false); }}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeSection === item.id
              ? "bg-[hsl(var(--sidebar-active))] text-[hsl(var(--sidebar-active-fg))]"
              : "text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--sidebar-hover))]"
          }`}
        >
          <item.icon className="w-4 h-4" />
          {item.label}
        </button>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border shadow-sm"
      >
        <Menu className="w-5 h-5 text-foreground" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-foreground/20 z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", damping: 25 }}
              className="lg:hidden fixed inset-y-0 left-0 w-60 z-50 flex flex-col"
              style={{ backgroundColor: "hsl(var(--sidebar-bg))" }}
            >
              <div className="flex items-center justify-between p-4">
                <h2 className="font-heading font-bold text-lg text-[hsl(var(--sidebar-active-fg))]">FinDash</h2>
                <button onClick={() => setMobileOpen(false)} className="text-[hsl(var(--sidebar-fg))]">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <NavContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-60 min-h-screen fixed left-0 top-0"
        style={{ backgroundColor: "hsl(var(--sidebar-bg))" }}
      >
        <div className="p-6">
          <h2 className="font-heading font-bold text-xl text-[hsl(var(--sidebar-active-fg))]">FinDash</h2>
        </div>
        <NavContent />
      </aside>
    </>
  );
};

export default Sidebar;
