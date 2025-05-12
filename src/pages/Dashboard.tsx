
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, CreditCard, Clock, BarChart3, AlertCircle, Filter } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Donation {
  id: string;
  ngo_name: string;
  amount: number;
  created_at: string;
  status: string;
}

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [recentDonations, setRecentDonations] = useState<Donation[]>([]);
  const [totalDonated, setTotalDonated] = useState(0);
  const [ngosSupported, setNgosSupported] = useState(0);
  
  // Monthly causes data
  const [monthlyCauses, setMonthlyCauses] = useState([
    { name: "Education", amount: 1500, percentage: 50 },
    { name: "Environment", amount: 900, percentage: 30 },
    { name: "Healthcare", amount: 600, percentage: 20 },
  ]);
  
  // Fetch user donations
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserDonations();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);
  
  const fetchUserDonations = async () => {
    try {
      setIsLoading(true);
      
      // Get recent donations for the user
      const { data: donations, error } = await supabase
        .from('donations')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5);
        
      if (error) throw error;
      
      if (donations) {
        setRecentDonations(donations as Donation[]);
        
        // Calculate total donated
        const total = donations.reduce((sum, donation) => sum + Number(donation.amount), 0);
        setTotalDonated(total);
        
        // Count unique NGOs supported
        const uniqueNgos = new Set(donations.map(donation => donation.ngo_name)).size;
        setNgosSupported(uniqueNgos);
      }
    } catch (error) {
      console.error("Error fetching donations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container flex min-h-[80vh] flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="mb-4 h-12 w-12 text-care-600" />
        <h1 className="mb-2 text-2xl font-bold">Authentication Required</h1>
        <p className="mb-6 text-muted-foreground">
          Please sign in to access your dashboard.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <a href="/login">Sign In</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/register">Create Account</a>
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container flex min-h-[80vh] flex-col items-center justify-center py-12 text-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="mb-6 text-3xl font-bold">My Dashboard</h1>
      
      {user?.role === 'ngo_admin' && user?.verification_status === 'pending' && (
        <Card className="mb-6 border-yellow-300 bg-yellow-50 dark:bg-yellow-950/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <p className="text-yellow-800 dark:text-yellow-300">
                Your NGO account is pending verification. Once approved, you'll have access to all features.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      
      {user?.role === 'super_admin' && user?.verification_status === 'pending' && (
        <Card className="mb-6 border-yellow-300 bg-yellow-50 dark:bg-yellow-950/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <p className="text-yellow-800 dark:text-yellow-300">
                Your admin account is pending approval. You'll be notified once your access is granted.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Donated</p>
              <p className="text-3xl font-bold">₹{totalDonated.toLocaleString()}</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <CreditCard className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">NGOs Supported</p>
              <p className="text-3xl font-bold">{ngosSupported}</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Heart className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Recurring Donations</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Clock className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="donations">
        <TabsList className="mb-8 grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="donations" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Donations</h2>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="space-y-4">
            {recentDonations.length > 0 ? (
              recentDonations.map((donation) => (
                <Card key={donation.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium">{donation.ngo_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(donation.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{Number(donation.amount).toLocaleString()}</p>
                      <Button variant="link" className="h-auto p-0 text-xs">
                        Receipt
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">You haven't made any donations yet.</p>
                  <Button className="mt-4" asChild>
                    <a href="/ngos">Explore NGOs</a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {recentDonations.length > 0 && (
            <Button variant="outline" className="w-full">
              View All Donations
            </Button>
          )}
        </TabsContent>
        
        <TabsContent value="impact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Impact</CardTitle>
              <CardDescription>
                See how your donations have made a difference
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Monthly Causes</h3>
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="space-y-4">
                  {monthlyCauses.map((cause) => (
                    <div key={cause.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{cause.name}</span>
                        <span className="text-sm text-muted-foreground">
                          ₹{cause.amount} ({cause.percentage}%)
                        </span>
                      </div>
                      <Progress value={cause.percentage} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-md bg-muted p-4">
                <h3 className="mb-2 text-lg font-medium">Impact Summary</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Helped educate 5 children for a month</li>
                  <li>• Contributed to planting 10 trees</li>
                  <li>• Provided medical supplies for 3 families</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your profile and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Profile Information</h3>
                <p className="text-sm text-muted-foreground">
                  {user?.name || 'User'} • {user?.email}
                </p>
                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Notification Preferences</h3>
                <p className="text-sm text-muted-foreground">
                  Configure how and when you receive updates
                </p>
                <Button variant="outline" size="sm">
                  Manage Notifications
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Payment Methods</h3>
                <p className="text-sm text-muted-foreground">
                  Add or update your UPI IDs and other payment methods
                </p>
                <Button variant="outline" size="sm">
                  Manage Payments
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
