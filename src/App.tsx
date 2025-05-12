
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import NGOs from "./pages/NGOs";
import NGOProfile from "./pages/NGOProfile";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminLayout from "./components/layout/AdminLayout";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="care4all-theme">
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="ngos" element={<NGOs />} />
                <Route path="ngo/:id" element={<NGOProfile />} />
                <Route path="contact" element={<Contact />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              
              {/* Protected routes for regular users (donors) */}
              <Route element={<ProtectedRoute requiredPermission="user_dashboard" />}>
                <Route path="/" element={<Layout />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="profile" element={<Dashboard />} /> {/* Placeholder for profile page */}
                </Route>
              </Route>
              
              {/* Protected routes for admins with dedicated admin layout */}
              <Route element={<ProtectedRoute requiredPermission="admin_dashboard" />}>
                <Route path="admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route index element={<Navigate to="/admin/dashboard" replace />} />
                </Route>
              </Route>
              
              {/* Role-based redirects */}
              <Route path="/profile" element={<AuthenticatedRouteRedirect />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

// This component will redirect users to the appropriate dashboard based on their role
const AuthenticatedRouteRedirect = () => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  switch (user?.role) {
    case 'super_admin':
      return <Navigate to="/admin/dashboard" replace />;
    default: // donor or any other role
      return <Navigate to="/dashboard" replace />;
  }
};

export default App;
