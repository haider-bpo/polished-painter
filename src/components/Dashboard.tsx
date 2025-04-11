
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter, 
  SidebarItem 
} from "@/components/ui/sidebar";
import { 
  FileText, 
  Users, 
  Plus, 
  LogOut, 
  Home
} from "lucide-react";

interface DashboardProps {
  children: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background overflow-hidden">
        <Sidebar>
          <SidebarHeader />
          <SidebarContent>
            <nav className="space-y-1 px-2">
              <SidebarItem 
                icon={<Home className="h-5 w-5" />} 
                title="Dashboard" 
                href="/" 
                isActive={currentPath === "/"} 
              />
              <SidebarItem 
                icon={<FileText className="h-5 w-5" />} 
                title="Invoices" 
                href="/invoices" 
                isActive={currentPath === "/invoices"} 
              />
              <SidebarItem 
                icon={<Users className="h-5 w-5" />} 
                title="Users" 
                href="/users" 
                isActive={currentPath === "/users"} 
              />
            </nav>
          </SidebarContent>
          <SidebarFooter>
            <div className="px-3 flex justify-between w-full">
              <button 
                className="flex items-center text-sm text-muted-foreground hover:text-foreground"
                onClick={() => {
                  // Handle logout here
                  console.log("Logout clicked");
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
