
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("donor");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate registration process
    setTimeout(() => {
      toast({
        title: "Registration successful",
        description: `Your ${userType} account has been created!`,
      });
      setIsLoading(false);
      // In a real app, we would redirect to dashboard or login page here
    }, 1500);
  };

  return (
    <div className="container flex min-h-[80vh] items-center justify-center py-12">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Join Care4All to {userType === "donor" ? "support causes you care about" : "showcase your NGO's work"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="user-type">I am a</Label>
              <Select
                value={userType}
                onValueChange={setUserType}
              >
                <SelectTrigger id="user-type">
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="donor">Donor</SelectItem>
                  <SelectItem value="ngo">NGO Representative</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">
                {userType === "donor" ? "Full Name" : "NGO Name"}
              </Label>
              <Input
                id="name"
                placeholder={userType === "donor" ? "John Doe" : "Organization Name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters long
              </p>
            </div>

            {userType === "ngo" && (
              <div className="rounded-md bg-secondary p-3">
                <p className="text-sm">
                  <strong>Note:</strong> NGO accounts require verification.
                  You'll need to provide additional documents after registration.
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-care-600 hover:text-care-800 dark:text-care-400 dark:hover:text-care-300"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
