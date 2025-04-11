
import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarContextType {
  expanded: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  expanded: true,
  toggleSidebar: () => {},
});

export const SidebarProvider = ({
  children,
  defaultExpanded = true,
}: {
  children: React.ReactNode;
  defaultExpanded?: boolean;
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <SidebarContext.Provider
      value={{
        expanded,
        toggleSidebar: () => setExpanded((prev) => !prev),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const { expanded } = useSidebar();

  return (
    <aside
      className={cn(
        "h-screen bg-card border-r border-border transition-all duration-300 ease-in-out flex flex-col",
        expanded ? "w-64" : "w-16"
      )}
    >
      {children}
    </aside>
  );
};

export const SidebarHeader = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const { expanded } = useSidebar();

  return (
    <div className="p-4 border-b border-border">
      {children || (
        <div className="flex items-center justify-center h-10">
          {expanded ? (
            <h2 className="text-xl font-bold tracking-tight">Rockstar CRM</h2>
          ) : (
            <span className="text-xl font-bold">RP</span>
          )}
        </div>
      )}
    </div>
  );
};

export const SidebarContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex-1 overflow-auto py-2">{children}</div>;
};

export const SidebarFooter = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const { expanded, toggleSidebar } = useSidebar();

  return (
    <div className="p-4 border-t border-border flex justify-between items-center">
      {children || (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="ml-auto"
        >
          {expanded ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      )}
    </div>
  );
};

export const SidebarItem = ({
  icon,
  title,
  isActive = false,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
  href: string;
}) => {
  const { expanded } = useSidebar();

  return (
    <a
      href={href}
      className={cn(
        "flex items-center py-2 px-4 space-x-3 rounded-md transition-colors text-foreground/80 hover:text-foreground hover:bg-accent",
        isActive && "bg-accent/50 text-foreground font-medium",
        !expanded && "justify-center px-0"
      )}
    >
      {icon}
      {expanded && <span>{title}</span>}
    </a>
  );
};

export const SidebarTrigger = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleSidebar}
      className="fixed left-4 top-4 z-50 lg:hidden"
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  );
};
