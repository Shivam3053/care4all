
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import adminOperations from "@/utils/adminOperations";

const AdminDashboard = () => {
  const { user } = useAuth();
  
  // Fetch all donations
  const { data: donations, isLoading: isLoadingDonations, error: donationsError } = useQuery({
    queryKey: ['admin-donations'],
    queryFn: adminOperations.getAllDonations,
  });

  return (
    <div className="space-y-8">
      {/* Admin Dashboard Overview */}
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{donations?.data?.length || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Welcome Message */}
      <Card>
        <CardHeader>
          <CardTitle>Welcome to the Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is a simplified admin dashboard. Additional administrative features will be implemented in future updates.
          </p>
        </CardContent>
      </Card>

      {/* Donations Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Platform Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingDonations ? (
            <p>Loading platform statistics...</p>
          ) : donationsError ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load donation data. Please try again.
              </AlertDescription>
            </Alert>
          ) : donations?.data?.length === 0 ? (
            <p className="text-muted-foreground">No donation activity recorded yet.</p>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Total donations processed: {donations?.data?.length || 0}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
