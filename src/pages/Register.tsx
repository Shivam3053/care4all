
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, User, Building, ArrowRight, Shield, InfoIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import NGORegistrationForm from "@/components/NGORegistrationForm";

const Register = () => {
  const { registerDonor, registerSuperAdmin, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const [userType, setUserType] = useState(searchParams.get("tab") || "donor");
  const [showSuperAdminInfo, setShowSuperAdminInfo] = useState(false);
  
  // Set initial tab based on URL parameter
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && ["donor", "ngo", "admin"].includes(tabParam)) {
      setUserType(tabParam);
    }
  }, [searchParams]);
  
  // Donor form state
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPassword, setDonorPassword] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorAgreeTerms, setDonorAgreeTerms] = useState(false);
  
  // Super Admin form state
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminSecretCode, setAdminSecretCode] = useState("");
  const [adminAgreeTerms, setAdminAgreeTerms] = useState(false);

  const handleDonorRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!donorName || !donorEmail || !donorPassword) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (!donorAgreeTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }

    try {
      await registerDonor(donorEmail, donorPassword, donorName);
    } catch (error) {
      // Error handling is done in the auth context
      console.error("Donor registration error:", error);
    }
  };

  const handleSuperAdminRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!adminName || !adminEmail || !adminPassword || !adminSecretCode) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (!adminAgreeTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }

    try {
      await registerSuperAdmin(adminEmail, adminPassword, adminName, adminSecretCode);
    } catch (error) {
      // Error handling is done in the auth context
      console.error("Super Admin registration error:", error);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container my-12">
      <Tabs defaultValue={userType} onValueChange={setUserType} className="space-y-6">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
          <TabsTrigger value="donor" className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>Donor</span>
          </TabsTrigger>
          <TabsTrigger value="ngo" className="flex items-center space-x-1">
            <Building className="h-4 w-4" />
            <span>NGO</span>
          </TabsTrigger>
          <TabsTrigger value="admin" className="flex items-center space-x-1">
            <Shield className="h-4 w-4" />
            <span>Admin</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="donor">
          <div className="max-w-md mx-auto">
            <Card className="border-2">
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">Create a Donor Account</CardTitle>
                <CardDescription>
                  Join Care4All to start supporting organizations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDonorRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="donorName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="donorName"
                        placeholder="John Doe"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="donorEmail">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="donorEmail"
                        type="email"
                        placeholder="name@example.com"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="donorPassword">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="donorPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={donorPassword}
                        onChange={(e) => setDonorPassword(e.target.value)}
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
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="donorTerms" 
                      checked={donorAgreeTerms} 
                      onCheckedChange={() => setDonorAgreeTerms(!donorAgreeTerms)} 
                    />
                    <label
                      htmlFor="donorTerms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link to="/terms" className="text-primary hover:underline">
                        terms and conditions
                      </Link>
                    </label>
                  </div>
                  
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <span className="animate-spin mr-2">⟳</span>
                        Creating account...
                      </>
                    ) : (
                      "Create account"
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-sm text-center">
                  Already have an account?{" "}
                  <Link to="/login?role=donor" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </div>
                
                <div className="w-full">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/ngos">
                      Explore NGOs without an account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ngo">
          <div className="max-w-4xl mx-auto">
            <NGORegistrationForm />
          </div>
        </TabsContent>

        <TabsContent value="admin">
          <div className="max-w-md mx-auto">
            <Card className="border-2">
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">Super Admin Registration</CardTitle>
                <CardDescription>
                  Create an admin account to manage the Care4All platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4">
                  <AlertDescription className="flex items-start">
                    <InfoIcon className="mr-2 h-4 w-4 mt-0.5 shrink-0" />
                    <span>
                      Super Admin registration code: <strong>admin123</strong>
                    </span>
                  </AlertDescription>
                </Alert>

                <form onSubmit={handleSuperAdminRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="adminName"
                        placeholder="Admin Full Name"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="adminEmail"
                        type="email"
                        placeholder="admin@example.com"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="adminPassword">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="adminPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a secure password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
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
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="adminSecretCode">Admin Registration Code</Label>
                      <Dialog open={showSuperAdminInfo} onOpenChange={setShowSuperAdminInfo}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <InfoIcon className="h-4 w-4" />
                            <span className="sr-only">Info</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>About Super Admin Registration</DialogTitle>
                            <DialogDescription>
                              Super Admin registration requires a valid registration code. This code is provided only to authorized personnel who will manage the Care4All platform. Your registration will be subject to manual verification by existing administrators.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex flex-col space-y-2 mt-4">
                            <p className="text-sm font-medium">Super Admin Responsibilities:</p>
                            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                              <li>Verify and approve NGO registrations</li>
                              <li>Monitor donations and platform activity</li>
                              <li>Manage users and handle reports</li>
                              <li>Review and approve fundraising campaigns</li>
                              <li>Access and analyze platform metrics</li>
                            </ul>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="relative">
                      <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="adminSecretCode"
                        type="text"
                        placeholder="Enter registration code"
                        value={adminSecretCode}
                        onChange={(e) => setAdminSecretCode(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="adminTerms" 
                      checked={adminAgreeTerms} 
                      onCheckedChange={() => setAdminAgreeTerms(!adminAgreeTerms)} 
                    />
                    <label
                      htmlFor="adminTerms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link to="/terms" className="text-primary hover:underline">
                        terms and conditions
                      </Link>
                      {" "}and understand my responsibilities
                    </label>
                  </div>
                  
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <span className="animate-spin mr-2">⟳</span>
                        Submitting...
                      </>
                    ) : (
                      "Request Admin Access"
                    )}
                  </Button>
                  
                  <p className="text-sm text-muted-foreground text-center">
                    Your application will be reviewed by existing administrators
                  </p>
                </form>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-center w-full">
                  Already have an account?{" "}
                  <Link to="/login?role=admin" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Register;
