
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProtectedRouteProps {
  requiredPermission?: string;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredPermission,
  redirectTo = "/login",
}) => {
  const { isAuthenticated, isLoading, hasPermission, user, getUserDashboardPath } = useAuth();
  const location = useLocation();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if user has required permission
  if (requiredPermission && !hasPermission(requiredPermission)) {
    // Determine where to redirect the user based on their role
    let redirectPath = '/';
    
    if (isAuthenticated && user) {
      redirectPath = getUserDashboardPath();
    }
    
    return (
      <div className="container flex min-h-[80vh] flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="mb-4 h-12 w-12 text-destructive" />
        <h1 className="mb-2 text-2xl font-bold">Access Denied</h1>
        <p className="mb-6 text-muted-foreground">
          You don't have permission to access this page.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <a href={isAuthenticated ? redirectPath : "/login"}>
              {isAuthenticated ? "Go to Dashboard" : "Sign In"}
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/">Return Home</a>
          </Button>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  // If all checks pass, render the protected content
  return <Outlet />;
};

export default ProtectedRoute;
