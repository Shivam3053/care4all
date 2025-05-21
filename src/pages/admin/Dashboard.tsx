
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
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
            <CardTitle className="text-lg">NGOs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{donations?.data?.filter((donation: any) => donation.ngo_id).length || 0}</div>
          </CardContent>
        </Card>
        
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{donations?.data?.length || 0}</div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{donations?.data?.reduce((sum: number, donation: any) => sum + Number(donation.amount), 0) || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Donations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingDonations ? (
            <div className="text-center py-6">Loading donations...</div>
          ) : donationsError ? (
            <div className="flex items-center justify-center py-6 text-red-500">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>Failed to load donations data</span>
            </div>
          ) : donations?.data?.length > 0 ? (
            <div className="space-y-4">
              {donations.data.slice(0, 5).map((donation: any) => (
                <div key={donation.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{donation.donor_name || "Anonymous"}</p>
                    <p className="text-sm text-muted-foreground">to {donation.ngo_name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{donation.amount}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(donation.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No donations recorded yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
