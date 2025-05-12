
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun, LogOut, User, Building, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const AdminLayout = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("You've been logged out successfully");
      navigate('/');
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Header */}
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">Care4All Admin Panel</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{user?.email}</span>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </header>
      <div className="flex">
        {/* Admin Sidebar */}
        <aside className={`fixed z-20 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex h-full flex-col p-4">
            <nav className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate("/admin/dashboard")}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  const dashboardElement = document.getElementById("add-ngo-section");
                  if (dashboardElement) {
                    dashboardElement.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <Building className="mr-2 h-4 w-4" />
                Manage NGOs
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  const usersElement = document.getElementById("users-section");
                  if (usersElement) {
                    usersElement.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <User className="mr-2 h-4 w-4" />
                Manage Users
              </Button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 overflow-x-hidden p-4 md:p-6 ${isSidebarOpen ? "ml-64" : ""}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
