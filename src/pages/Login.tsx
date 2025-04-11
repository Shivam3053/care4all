
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, User, Building, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Login = () => {
  const { signIn, isLoading, isAuthenticated, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userRole, setUserRole] = useState(searchParams.get("role") || "donor");

  useEffect(() => {
    // Redirect based on user role if already logged in
    if (isAuthenticated && user) {
      redirectBasedOnRole(user.role);
    }
  }, [isAuthenticated, user, navigate]);

  const redirectBasedOnRole = (role: string) => {
    switch(role) {
      case 'super_admin':
        navigate('/admin/dashboard');
        break;
      case 'ngo_admin':
        navigate('/ngo/dashboard');
        break;
      default: // donor or any other role
        navigate('/dashboard');
        break;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      await signIn(email, password);
      // Redirection is handled in the useEffect
    } catch (error) {
      // Error handling is done in the auth context
      console.error("Login error:", error);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container my-12 max-w-md">
      <Card className="border-2">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>
            Select your user type and enter your credentials
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs 
            defaultValue={userRole} 
            onValueChange={setUserRole} 
            className="mb-6"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="donor" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Donor</span>
              </TabsTrigger>
              <TabsTrigger value="ngo" className="flex items-center space-x-2">
                <Building className="h-4 w-4" />
                <span>NGO</span>
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Admin</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="donor">
              <p className="text-sm text-muted-foreground mb-4">
                Sign in as a donor to support NGOs and track your donation history.
              </p>
            </TabsContent>
            
            <TabsContent value="ngo">
              <p className="text-sm text-muted-foreground mb-4">
                Sign in as an NGO to manage your profile, campaigns, and view donations.
              </p>
            </TabsContent>
            
            <TabsContent value="admin">
              <p className="text-sm text-muted-foreground mb-4">
                Sign in as an admin to verify NGOs, manage platform content, and view analytics.
              </p>
            </TabsContent>
          </Tabs>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  to="/forgot-password" 
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button 
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 top-3 text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center">
            Don't have an account?{" "}
            <Link 
              to={userRole === "ngo" ? "/register?tab=ngo" : 
                  userRole === "admin" ? "/register?tab=admin" : 
                  "/register"} 
              className="text-primary hover:underline"
            >
              Create an account
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
