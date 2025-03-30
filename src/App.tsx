
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { AuthProvider } from "./contexts/AuthContext";
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
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              
              {/* Protected routes for regular users */}
              <Route element={<ProtectedRoute requiredPermission="view_dashboard" />}>
                <Route path="/" element={<Layout />}>
                  <Route path="dashboard" element={<Dashboard />} />
                </Route>
              </Route>
              
              {/* Protected routes for admins */}
              <Route element={<ProtectedRoute requiredPermission="admin_dashboard" />}>
                <Route path="/" element={<Layout />}>
                  <Route path="admin/dashboard" element={<AdminDashboard />} />
                </Route>
              </Route>
              
              {/* Protected routes for NGO admins */}
              <Route element={<ProtectedRoute requiredPermission="ngo_dashboard" />}>
                <Route path="/" element={<Layout />}>
                  <Route path="ngo/dashboard" element={<Dashboard />} />
                </Route>
              </Route>
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
