import { useState } from "react";
import { Link } from "react-router-dom";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const Register = () => {
  const { registerDonor, registerNGO, registerSuperAdmin, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("donor");
  const [showSuperAdminInfo, setShowSuperAdminInfo] = useState(false);
  
  // Donor form state
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPassword, setDonorPassword] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorAgreeTerms, setDonorAgreeTerms] = useState(false);
  
  // NGO form state
  const [ngoEmail, setNgoEmail] = useState("");
  const [ngoPassword, setNgoPassword] = useState("");
  const [ngoName, setNgoName] = useState("");
  const [ngoType, setNgoType] = useState("");
  const [ngoAgreeTerms, setNgoAgreeTerms] = useState(false);
  
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

  const handleNGORegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ngoName || !ngoEmail || !ngoPassword || !ngoType) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (!ngoAgreeTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }

    try {
      await registerNGO(ngoEmail, ngoPassword, ngoName, ngoType);
    } catch (error) {
      // Error handling is done in the auth context
      console.error("NGO registration error:", error);
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
    <div className="container my-12 max-w-md">
      <Card className="border-2">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Join Care4All to start supporting or receiving donations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="donor" onValueChange={setUserType}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="donor">Donor</TabsTrigger>
              <TabsTrigger value="ngo">NGO</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            <TabsContent value="donor">
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
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="ngo">
              <form onSubmit={handleNGORegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ngoName">Organization Name</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="ngoName"
                      placeholder="Organization Name"
                      value={ngoName}
                      onChange={(e) => setNgoName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ngoEmail">Official Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="ngoEmail"
                      type="email"
                      placeholder="organization@example.com"
                      value={ngoEmail}
                      onChange={(e) => setNgoEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ngoPassword">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="ngoPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={ngoPassword}
                      onChange={(e) => setNgoPassword(e.target.value)}
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
                  <Label htmlFor="ngoType">Organization Type</Label>
                  <Select value={ngoType} onValueChange={setNgoType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="health">Healthcare</SelectItem>
                      <SelectItem value="environment">Environment</SelectItem>
                      <SelectItem value="children">Children & Youth</SelectItem>
                      <SelectItem value="women">Women Empowerment</SelectItem>
                      <SelectItem value="disaster">Disaster Relief</SelectItem>
                      <SelectItem value="animal">Animal Welfare</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="ngoTerms" 
                    checked={ngoAgreeTerms} 
                    onCheckedChange={() => setNgoAgreeTerms(!ngoAgreeTerms)} 
                  />
                  <label
                    htmlFor="ngoTerms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      terms and conditions
                    </Link>
                  </label>
                </div>
                
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Submitting..." : "Register Organization"}
                </Button>
                
                <p className="text-sm text-muted-foreground text-center">
                  Your organization will be verified before being listed on Care4All
                </p>
              </form>
            </TabsContent>

            <TabsContent value="admin">
              <Alert className="mb-4">
                <AlertDescription className="flex items-start">
                  <InfoIcon className="mr-2 h-4 w-4 mt-0.5 shrink-0" />
                  <span>
                    Super Admin registration is restricted. You will need an approval code and will be subject to verification.
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
                      type="password"
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
                  {isLoading ? "Submitting..." : "Request Admin Access"}
                </Button>
                
                <p className="text-sm text-muted-foreground text-center">
                  Your application will be reviewed by existing administrators
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
          
          {userType === "donor" && (
            <div className="w-full">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/explore">
                  Explore NGOs without an account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
