
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home, Monitor, Tv, Video, BarChart4, Settings, Hospital } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex h-14 items-center px-4 border-b">
        {!collapsed && (
          <span className="font-bold text-xl text-health-blue">
            HEBMS
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("ml-auto", collapsed && "mx-auto")}
          onClick={toggleSidebar}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid gap-1 px-2 py-4">
          <NavItem
            to="/"
            icon={Home}
            label="Dashboard"
            collapsed={collapsed}
          />
          <NavItem
            to="/hospitals"
            icon={Hospital}
            label="Hospitals"
            collapsed={collapsed}
          />
          <NavItem
            to="/tvs"
            icon={Tv}
            label="TV Devices"
            collapsed={collapsed}
          />
          <NavItem
            to="/monitoring"
            icon={Monitor}
            label="Monitoring"
            collapsed={collapsed}
          />
          <NavItem
            to="/content"
            icon={Video}
            label="Content"
            collapsed={collapsed}
          />
          <NavItem
            to="/analytics"
            icon={BarChart4}
            label="Analytics"
            collapsed={collapsed}
          />
          <NavItem
            to="/settings"
            icon={Settings}
            label="Settings"
            collapsed={collapsed}
          />
        </nav>
      </ScrollArea>
      <div className="h-14 border-t flex items-center">
        {!collapsed && (
          <div className="px-4 text-xs text-muted-foreground">
            HEBMS v1.0.0
          </div>
        )}
      </div>
    </div>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  collapsed: boolean;
}

function NavItem({ to, icon: Icon, label, collapsed }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
          collapsed ? "justify-center" : "",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
        )
      }
    >
      <Icon size={18} />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}
