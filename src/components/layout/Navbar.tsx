
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun, Menu, X, LogOut, User, Settings, Shield, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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

  // Get role-specific navigation links
  const getRoleBasedNavLinks = () => {
    const commonLinks = [
      { name: "Home", path: "/" },
    ];
    
    if (!isAuthenticated) {
      return [
        ...commonLinks,
        { name: "NGOs", path: "/ngos" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
      ];
    }
    
    // User is authenticated, show role-specific links
    switch(user?.role) {
      case 'super_admin':
        return [
          ...commonLinks,
          { name: "Admin Dashboard", path: "/admin/dashboard" },
          { name: "NGOs", path: "/ngos" },
          { name: "Users", path: "/admin/dashboard?tab=users" },
          { name: "Messages", path: "/admin/dashboard?tab=messages" },
        ];
      case 'ngo_admin':
        return [
          ...commonLinks,
          { name: "NGO Dashboard", path: "/ngo/dashboard" },
          { name: "Profile", path: "/ngo/profile" },
          { name: "Donations", path: "/ngo/donations" },
        ];
      case 'donor':
      default:
        return [
          ...commonLinks,
          { name: "Dashboard", path: "/dashboard" },
          { name: "NGOs", path: "/ngos" },
          { name: "Donations", path: "/dashboard?tab=donations" },
        ];
    }
  };

  const navLinks = getRoleBasedNavLinks();

  // Get the appropriate role display name and icon
  const getRoleDisplay = () => {
    if (!user) return { name: "Guest", icon: <User /> };
    
    switch(user.role) {
      case 'super_admin':
        return { name: "Admin", icon: <Shield className="h-4 w-4" /> };
      case 'ngo_admin':
        return { name: "NGO", icon: <Building className="h-4 w-4" /> };
      case 'donor':
      default:
        return { name: "Donor", icon: <User className="h-4 w-4" /> };
    }
  };
  
  const roleDisplay = getRoleDisplay();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-care-600 dark:text-care-400">
              Care<span className="text-impact-500">4</span>All
            </span>
          </Link>

          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.path
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="mr-2"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {isAuthenticated ? (
            <div className="hidden md:flex">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    {roleDisplay.icon}
                    <span>{user?.name || user?.email || "Account"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="flex items-center gap-2">
                    {roleDisplay.name} Account
                    {user?.role === 'ngo_admin' && user?.verification_status && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        user.verification_status === 'approved' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {user.verification_status === 'approved' ? 'Verified' : 'Pending'}
                      </span>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {/* Role-specific dropdown items */}
                  {user?.role === 'super_admin' && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin/dashboard" className="flex w-full cursor-pointer items-center">
                        <Shield className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {user?.role === 'ngo_admin' && (
                    <DropdownMenuItem asChild>
                      <Link to="/ngo/dashboard" className="flex w-full cursor-pointer items-center">
                        <Building className="mr-2 h-4 w-4" />
                        NGO Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {user?.role === 'donor' && (
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex w-full cursor-pointer items-center">
                        <User className="mr-2 h-4 w-4" />
                        My Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex w-full cursor-pointer items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="flex cursor-pointer items-center text-destructive focus:text-destructive" 
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button variant="outline" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Join Us</Link>
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="container md:hidden py-4 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary p-2 rounded",
                  location.pathname === link.path
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <>
                <div className="pt-2 pb-1 px-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    {roleDisplay.icon}
                    <span>{roleDisplay.name} Account</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {user?.email}
                  </div>
                </div>
                <Link 
                  to="/profile" 
                  className="flex items-center p-2 text-sm font-medium text-muted-foreground hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Profile Settings
                </Link>
                <Button 
                  variant="destructive" 
                  className="flex items-center justify-center w-full mt-2"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    Join Us
                  </Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
