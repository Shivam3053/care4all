
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [totalDonated, setTotalDonated] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user's donations
  useEffect(() => {
    const fetchDonations = async () => {
      if (!isAuthenticated || !user) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('donations')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        setDonations(data || []);
        
        // Calculate total donations
        const total = data?.reduce((sum, donation) => sum + Number(donation.amount), 0) || 0;
        setTotalDonated(total);
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonations();
    
    // Set up real-time subscription for donations
    const channel = supabase
      .channel('public:donations')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'donations',
          filter: `user_id=eq.${user?.id}` 
        }, 
        (payload) => {
          setDonations(current => [payload.new, ...current]);
          setTotalDonated(current => current + Number(payload.new.amount));
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated, user]);

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

      <div className="mb-8">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Donated</p>
              <p className="text-3xl font-bold">₹{totalDonated}</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <CreditCard className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">My Donation History</h2>
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="space-y-2">
                    <div className="h-5 w-40 bg-muted rounded"></div>
                    <div className="h-4 w-24 bg-muted rounded"></div>
                  </div>
                  <div className="h-6 w-16 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : donations.length > 0 ? (
          <div className="space-y-4">
            {donations.map((donation) => (
              <Card key={donation.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">{donation.ngo_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(donation.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{donation.amount}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <p className="mb-4 text-muted-foreground">You haven't made any donations yet.</p>
              <Button asChild>
                <a href="/ngos">Explore NGOs</a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
