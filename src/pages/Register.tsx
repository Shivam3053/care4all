
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, User, Building, ArrowRight } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("donor");
  
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

  const handleDonorRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!donorName || !donorEmail || !donorPassword) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (!donorAgreeTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }

    setIsLoading(true);

    // Simulate registration process
    setTimeout(() => {
      toast.success("Registration successful! Please check your email to verify your account.");
      setIsLoading(false);
      navigate("/login");
    }, 1500);
  };

  const handleNGORegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ngoName || !ngoEmail || !ngoPassword || !ngoType) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (!ngoAgreeTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }

    setIsLoading(true);

    // Simulate registration process
    setTimeout(() => {
      toast.success("Registration submitted! Your NGO profile is pending verification.");
      setIsLoading(false);
      navigate("/login");
    }, 1500);
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
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="donor">Donor</TabsTrigger>
              <TabsTrigger value="ngo">NGO</TabsTrigger>
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
