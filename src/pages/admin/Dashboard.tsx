import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, X, AlertTriangle, Search, Plus, UserCheck, Building, Mail, RefreshCcw, Filter } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import VerifiedBadge from "@/components/VerifiedBadge";
import { toast } from "sonner";
import { supabase, adminOperations } from "@/integrations/supabase/client";

const mockContactMessages = [
  {
    id: "201",
    name: "Rahul Sharma",
    email: "rahul.s@example.com",
    message: "I would like to know more about volunteer opportunities at Care4All.",
    date: "2023-06-15T10:30:00",
    status: "unread"
  },
  {
    id: "202",
    name: "Priya Patel",
    email: "priya.p@example.com",
    message: "How can I organize a fundraising event for NGOs listed on your platform?",
    date: "2023-06-14T14:45:00",
    status: "read"
  },
  {
    id: "203",
    name: "Amit Verma",
    email: "amit.v@example.com",
    message: "I'm experiencing issues with the donation process. The payment gateway times out after selecting UPI.",
    date: "2023-06-13T09:15:00",
    status: "resolved"
  }
];

const AdminDashboard = () => {
  const { user, isAuthenticated, hasPermission } = useAuth();
  const [pendingNGOs, setPendingNGOs] = useState([]);
  const [verifiedNGOs, setVerifiedNGOs] = useState([]);
  const [contactMessages, setContactMessages] = useState(mockContactMessages);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("pending-ngos");
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const [newNGO, setNewNGO] = useState({
    name: "",
    category: "",
    description: "",
    location: "",
    email: "",
    phone: "",
    website: ""
  });

  useEffect(() => {
    fetchNGOData();
    fetchUserData();
  }, []);

  const fetchNGOData = async () => {
    setIsLoading(true);
    setApiError(null);
    
    try {
      const { pendingNGOs: pending, verifiedNGOs: verified, error } = await adminOperations.getAllNGOs();
      
      if (error) {
        console.error("Error fetching NGO data:", error);
        setApiError("Failed to load NGO data. Please try again.");
        return;
      }
      
      setPendingNGOs(pending);
      setVerifiedNGOs(verified);
    } catch (error) {
      console.error("Error in NGO data fetch:", error);
      setApiError("An unexpected error occurred while loading NGO data.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const { data, error } = await adminOperations.getAllUsers();
      
      if (error) {
        console.error("Error fetching user data:", error);
        return;
      }
      
      setUsers(data);
    } catch (error) {
      console.error("Error in user data fetch:", error);
    }
  };

  const verifyNGO = async (ngoId: string) => {
    try {
      const { error } = await adminOperations.verifyNGO(ngoId);
      
      if (error) {
        toast.error("Failed to verify NGO: " + error.message);
        return;
      }
      
      const ngoToVerify = pendingNGOs.find(ngo => ngo.id === ngoId);
      if (ngoToVerify) {
        setPendingNGOs(pendingNGOs.filter(ngo => ngo.id !== ngoId));
        setVerifiedNGOs([...verifiedNGOs, { ...ngoToVerify, verified: true }]);
        toast.success(`${ngoToVerify.name} has been verified successfully`);
      }
    } catch (error) {
      console.error("Error verifying NGO:", error);
      toast.error("An error occurred while verifying the NGO.");
    }
  };

  const rejectNGO = async (ngoId: string) => {
    try {
      const { error } = await adminOperations.rejectNGO(ngoId);
      
      if (error) {
        toast.error("Failed to reject NGO: " + error.message);
        return;
      }
      
      const ngoToReject = pendingNGOs.find(ngo => ngo.id === ngoId);
      if (ngoToReject) {
        setPendingNGOs(pendingNGOs.filter(ngo => ngo.id !== ngoId));
        toast.success(`${ngoToReject.name} has been rejected`);
      }
    } catch (error) {
      console.error("Error rejecting NGO:", error);
      toast.error("An error occurred while rejecting the NGO.");
    }
  };

  const deleteNGO = (ngoId: string) => {
    const updatedVerifiedNGOs = verifiedNGOs.filter(ngo => ngo.id !== ngoId);
    const ngoToDelete = verifiedNGOs.find(ngo => ngo.id === ngoId);
    
    setVerifiedNGOs(updatedVerifiedNGOs);
    if (ngoToDelete) {
      toast.success(`${ngoToDelete.name} has been deleted`);
    }
  };

  const updateMessageStatus = (messageId: string, status: string) => {
    const updatedMessages = contactMessages.map(message => 
      message.id === messageId ? { ...message, status } : message
    );
    
    setContactMessages(updatedMessages);
    toast.success(`Message status updated to ${status}`);
  };

  const handleAddNGO = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const newNGOWithId = {
        ...newNGO,
        id: Math.random().toString(36).substr(2, 9),
        logo: "/placeholder.svg",
        registrationDate: new Date().toISOString().split('T')[0],
        verified: true
      };
      
      setVerifiedNGOs([...verifiedNGOs, newNGOWithId]);
      
      setNewNGO({
        name: "",
        category: "",
        description: "",
        location: "",
        email: "",
        phone: "",
        website: ""
      });
      
      toast.success("New NGO added successfully");
    } catch (error) {
      console.error("Error adding NGO:", error);
      toast.error("Failed to add NGO. Please try again.");
    }
  };

  const handleNGOInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewNGO(prev => ({ ...prev, [name]: value }));
  };

  if (!isAuthenticated || !hasPermission("admin_dashboard")) {
    return (
      <div className="container py-12 text-center">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="mb-6 text-muted-foreground">
          You don't have permission to access the admin dashboard.
        </p>
        <Button asChild>
          <a href="/">Return to Home</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage NGOs, users, and platform settings
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 px-3 py-1 rounded-full text-primary text-sm flex items-center">
            <UserCheck className="h-4 w-4 mr-1" />
            Admin
          </div>
          <Avatar className="h-10 w-10">
            <div className="bg-primary text-primary-foreground h-full w-full flex items-center justify-center text-lg font-semibold">
              {user?.name?.[0] || 'A'}
            </div>
          </Avatar>
        </div>
      </div>

      {apiError && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <AlertDescription>{apiError}</AlertDescription>
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-auto"
            onClick={() => {
              setApiError(null);
              fetchNGOData();
              fetchUserData();
            }}
          >
            Retry
          </Button>
        </Alert>
      )}

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="pending-ngos" className="flex items-center gap-1">
            <Building className="h-4 w-4" />
            <span>Pending NGOs</span>
            {pendingNGOs.length > 0 && (
              <span className="bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1">
                {pendingNGOs.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="verified-ngos" className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            <span>Verified NGOs</span>
          </TabsTrigger>
          <TabsTrigger value="add-ngo" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span>Add NGO</span>
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <span>Messages</span>
            {contactMessages.filter(m => m.status === "unread").length > 0 && (
              <span className="bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1">
                {contactMessages.filter(m => m.status === "unread").length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-1">
            <UserCheck className="h-4 w-4" />
            <span>Users</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending-ngos" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">NGOs Awaiting Verification</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={fetchNGOData}
                disabled={isLoading}
              >
                <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{isLoading ? 'Loading...' : 'Refresh'}</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : pendingNGOs.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="pt-6 text-center">
                <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Pending NGOs</h3>
                <p className="text-muted-foreground mb-4">
                  All NGO verification requests have been processed.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pendingNGOs.map((ngo) => (
                <Card key={ngo.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                        <img 
                          src={ngo.logo} 
                          alt={ngo.name} 
                          className="h-12 w-12 object-contain"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{ngo.name}</h3>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => verifyNGO(ngo.id)}
                              className="text-green-500 border-green-500 hover:bg-green-50"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Verify
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => rejectNGO(ngo.id)}
                              className="text-destructive border-destructive hover:bg-destructive/10"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{ngo.description}</p>
                        <div className="text-sm">
                          <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs mr-2">{ngo.category}</span>
                          <span className="text-muted-foreground">{ngo.location}</span>
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm mt-2">
                          <span>📧 {ngo.email}</span>
                          <span>📞 {ngo.phone}</span>
                          <span>📅 Registered: {ngo.registrationDate}</span>
                        </div>
                        {ngo.documents && ngo.documents.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs font-medium mb-1">Documents:</p>
                            <div className="flex gap-2">
                              {ngo.documents.map(doc => (
                                <span 
                                  key={doc} 
                                  className="text-xs bg-muted px-2 py-1 rounded flex items-center"
                                >
                                  {doc}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="verified-ngos" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Verified NGOs</h2>
            <div className="flex gap-2 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search NGOs..." 
                  className="pl-9 w-[250px]"
                />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={fetchNGOData}
                disabled={isLoading}
              >
                <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{isLoading ? 'Loading...' : 'Refresh'}</span>
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {verifiedNGOs.map((ngo) => (
                <Card key={ngo.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-14 w-14 rounded-lg bg-muted flex items-center justify-center">
                        <img 
                          src={ngo.logo} 
                          alt={ngo.name} 
                          className="h-10 w-10 object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{ngo.name}</h3>
                            <VerifiedBadge className="text-xs" />
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNGO(ngo.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{ngo.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">{ngo.category}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{ngo.location}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="add-ngo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New NGO</CardTitle>
              <CardDescription>
                Manually add a new NGO to the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddNGO} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">NGO Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newNGO.name}
                      onChange={handleNGOInputChange}
                      placeholder="Enter NGO name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select 
                      name="category" 
                      value={newNGO.category}
                      onValueChange={(value) => setNewNGO(prev => ({ ...prev, category: value }))}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Children & Youth">Children & Youth</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Environment">Environment</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Women Empowerment">Women Empowerment</SelectItem>
                        <SelectItem value="Animal Welfare">Animal Welfare</SelectItem>
                        <SelectItem value="Elderly Care">Elderly Care</SelectItem>
                        <SelectItem value="Disaster Relief">Disaster Relief</SelectItem>
                        <SelectItem value="Rural Development">Rural Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={newNGO.email}
                      onChange={handleNGOInputChange}
                      placeholder="contact@ngo.org"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={newNGO.phone}
                      onChange={handleNGOInputChange}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      name="location"
                      value={newNGO.location}
                      onChange={handleNGOInputChange}
                      placeholder="City, State"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      value={newNGO.website}
                      onChange={handleNGOInputChange}
                      placeholder="https://www.example.org"
                    />
                  </div>
                  
                  <div className="space-y-2 col-span-full">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newNGO.description}
                      onChange={handleNGOInputChange}
                      placeholder="Describe the NGO's mission and work"
                      rows={4}
                      required
                    />
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button type="submit" className="w-full">Add NGO</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Contact Messages</h2>
            <div className="flex gap-2 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search messages..." 
                  className="pl-9 w-[250px]"
                />
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {contactMessages.map((message) => (
              <Card key={message.id} className={message.status === "unread" ? "border-primary" : ""}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{message.name}</h3>
                        {message.status === "unread" && (
                          <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-primary">{message.email}</p>
                      <p className="text-sm">{message.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(message.date).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2 self-end md:self-center">
                      {message.status === "unread" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateMessageStatus(message.id, "read")}
                        >
                          Mark as Read
                        </Button>
                      )}
                      {message.status !== "resolved" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateMessageStatus(message.id, "resolved")}
                          className="text-green-500 border-green-500 hover:bg-green-50"
                        >
                          Mark as Resolved
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Manage Users</h2>
            <div className="flex gap-2 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search users..." 
                  className="pl-9 w-[250px]"
                />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={fetchUserData}
                disabled={isLoading}
              >
                <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{isLoading ? 'Loading...' : 'Refresh'}</span>
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-10 w-10">
                            <div className="bg-primary text-primary-foreground h-full w-full flex items-center justify-center text-lg font-semibold">
                              {user.name[0]}
                            </div>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                          <div className="flex items-center">
                            <span className="font-medium mr-1">Role:</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              user.role === 'super_admin' 
                                ? 'bg-primary text-primary-foreground' 
                                : user.role === 'ngo_admin'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-green-100 text-green-700'
                            }`}>
                              {user.role === 'super_admin' 
                                ? 'Admin' 
                                : user.role === 'ngo_admin'
                                  ? 'NGO Admin'
                                  : 'Donor'
                              }
                            </span>
                          </div>
                          <div>
                            <span className="font-medium mr-1">Joined:</span>
                            <span>{user.joinDate}</span>
                          </div>
                          {user.role === 'donor' && (
                            <div>
                              <span className="font-medium mr-1">Donations:</span>
                              <span>{user.donations}</span>
                            </div>
                          )}
                          {user.role === 'ngo_admin' && user.ngoName && (
                            <div>
                              <span className="font-medium mr-1">NGO:</span>
                              <span>{user.ngoName}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 self-end md:self-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          View Details
                        </Button>
                        {user.role !== 'super_admin' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-destructive border-destructive hover:bg-destructive/10"
                          >
                            {user.status === 'banned' ? 'Enable Account' : 'Disable Account'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
