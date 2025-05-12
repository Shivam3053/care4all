
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, PlusCircle, Users, Building } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import adminOperations from "@/utils/adminOperations";

const AdminDashboard = () => {
  const { user } = useAuth();
  
  // NGO form state
  const [ngoName, setNgoName] = useState("");
  const [ngoEmail, setNgoEmail] = useState("");
  const [ngoPassword, setNgoPassword] = useState("");
  const [ngoCategory, setNgoCategory] = useState("");
  const [ngoDescription, setNgoDescription] = useState("");
  const [ngoPhone, setNgoPhone] = useState("");
  const [ngoAddress, setNgoAddress] = useState("");
  const [ngoWebsite, setNgoWebsite] = useState("");
  const [ngoRegistrationNo, setNgoRegistrationNo] = useState("");
  const [ngoUpiId, setNgoUpiId] = useState("");
  const [isAddingNgo, setIsAddingNgo] = useState(false);

  // Fetch all users
  const { data: users, isLoading: isLoadingUsers, error: usersError, refetch: refetchUsers } = useQuery({
    queryKey: ['admin-users'],
    queryFn: adminOperations.getAllUsers,
  });
  
  // Fetch all donations
  const { data: donations, isLoading: isLoadingDonations, error: donationsError } = useQuery({
    queryKey: ['admin-donations'],
    queryFn: adminOperations.getAllDonations,
  });

  // Handler to add a new NGO
  const handleAddNGO = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ngoName || !ngoEmail || !ngoCategory || !ngoPassword) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      setIsAddingNgo(true);
      
      await adminOperations.addNGO({
        name: ngoName,
        email: ngoEmail,
        password: ngoPassword,
        category: ngoCategory,
        description: ngoDescription,
        address: ngoAddress,
        phone: ngoPhone,
        website: ngoWebsite,
        registrationNo: ngoRegistrationNo,
        upiId: ngoUpiId
      });
      
      toast.success("NGO added successfully!");
      
      // Reset form fields
      setNgoName("");
      setNgoEmail("");
      setNgoPassword("");
      setNgoCategory("");
      setNgoDescription("");
      setNgoPhone("");
      setNgoAddress("");
      setNgoWebsite("");
      setNgoRegistrationNo("");
      setNgoUpiId("");
      
      // Refresh user list
      refetchUsers();
      
    } catch (error: any) {
      toast.error(error.message || "Failed to add NGO");
      console.error("Error adding NGO:", error);
    } finally {
      setIsAddingNgo(false);
    }
  };

  const getNgos = () => {
    if (!users?.data) return [];
    return users.data.filter(user => user.role === 'ngo_admin');
  };

  const getDonors = () => {
    if (!users?.data) return [];
    return users.data.filter(user => user.role === 'donor');
  };

  return (
    <div className="space-y-8">
      {/* Admin Dashboard Overview */}
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">NGOs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getNgos().length}</div>
          </CardContent>
        </Card>
        
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getDonors().length}</div>
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
      </div>

      {/* Add NGO Section */}
      <Card id="add-ngo-section">
        <CardHeader>
          <CardTitle>Add New NGO</CardTitle>
          <CardDescription>Register a new NGO on the Care4All platform</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddNGO} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ngoName">Organization Name *</Label>
                <Input
                  id="ngoName"
                  placeholder="NGO Name"
                  value={ngoName}
                  onChange={(e) => setNgoName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ngoEmail">Email Address *</Label>
                <Input
                  id="ngoEmail"
                  type="email"
                  placeholder="ngo@example.org"
                  value={ngoEmail}
                  onChange={(e) => setNgoEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ngoPassword">Password *</Label>
                <Input
                  id="ngoPassword"
                  type="password"
                  placeholder="Set a password"
                  value={ngoPassword}
                  onChange={(e) => setNgoPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ngoCategory">Category *</Label>
                <Select value={ngoCategory} onValueChange={setNgoCategory} required>
                  <SelectTrigger id="ngoCategory">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="environment">Environment</SelectItem>
                    <SelectItem value="children">Children & Youth</SelectItem>
                    <SelectItem value="women">Women Empowerment</SelectItem>
                    <SelectItem value="elderly">Elderly Care</SelectItem>
                    <SelectItem value="disabilities">Disabilities & Inclusion</SelectItem>
                    <SelectItem value="animals">Animal Welfare</SelectItem>
                    <SelectItem value="disaster">Disaster Relief</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="ngoDescription">Description</Label>
                <Textarea
                  id="ngoDescription"
                  placeholder="Describe the NGO's mission and work"
                  value={ngoDescription}
                  onChange={(e) => setNgoDescription(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ngoAddress">Address</Label>
                <Input
                  id="ngoAddress"
                  placeholder="Full address"
                  value={ngoAddress}
                  onChange={(e) => setNgoAddress(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ngoPhone">Phone Number</Label>
                <Input
                  id="ngoPhone"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={ngoPhone}
                  onChange={(e) => setNgoPhone(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ngoWebsite">Website</Label>
                <Input
                  id="ngoWebsite"
                  type="url"
                  placeholder="https://example.org"
                  value={ngoWebsite}
                  onChange={(e) => setNgoWebsite(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ngoRegistrationNo">Registration Number</Label>
                <Input
                  id="ngoRegistrationNo"
                  placeholder="Official registration number"
                  value={ngoRegistrationNo}
                  onChange={(e) => setNgoRegistrationNo(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ngoUpiId">UPI ID for Donations</Label>
                <Input
                  id="ngoUpiId"
                  placeholder="yourname@bank"
                  value={ngoUpiId}
                  onChange={(e) => setNgoUpiId(e.target.value)}
                />
              </div>
            </div>
            
            <Button type="submit" disabled={isAddingNgo} className="w-full">
              {isAddingNgo ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  Adding NGO...
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add NGO
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* NGO Management Section */}
      <Card>
        <CardHeader>
          <CardTitle>Registered NGOs</CardTitle>
          <CardDescription>View and manage all registered NGOs</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingUsers ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center space-x-4 py-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <Skeleton className="h-8 w-20" />
                </div>
              ))}
            </div>
          ) : usersError ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load NGOs. Please try again.
              </AlertDescription>
            </Alert>
          ) : getNgos().length === 0 ? (
            <div className="text-center py-6">
              <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No NGOs Yet</h3>
              <p className="text-muted-foreground">
                Add an NGO using the form above
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getNgos().map((ngo: any) => (
                    <TableRow key={ngo.id}>
                      <TableCell className="font-medium">{ngo.organization || ngo.name}</TableCell>
                      <TableCell>{ngo.email}</TableCell>
                      <TableCell>{ngo.verification_status === 'approved' ? 'Approved' : 'Pending'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Users Management Section */}
      <Card id="users-section">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>View all registered users</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingUsers ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center space-x-4 py-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : usersError ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load users. Please try again.
              </AlertDescription>
            </Alert>
          ) : getDonors().length === 0 ? (
            <div className="text-center py-6">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No donors registered yet</h3>
              <p className="text-muted-foreground">
                Users will appear here after registration
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getDonors().map((donor: any) => (
                    <TableRow key={donor.id}>
                      <TableCell className="font-medium">{donor.name || 'Unknown'}</TableCell>
                      <TableCell>{donor.email}</TableCell>
                      <TableCell>{new Date(donor.created_at || '').toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
