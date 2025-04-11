
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  AlertCircle, 
  BarChart3, 
  Building, 
  Check, 
  ChevronDown,
  FileText, 
  Filter, 
  Search, 
  Shield, 
  Users, 
  X,
  Plus,
  Mail,
  MessageSquare
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

// Mock data - in a real app this would come from Supabase
const mockNGOs = [
  {
    id: "1",
    name: "Children First Foundation",
    ngo_type: "children",
    email: "contact@childrenfirst.org",
    created_at: "2023-06-15T10:30:00Z",
    verification_status: "pending"
  },
  {
    id: "2",
    name: "EcoLife Initiative",
    ngo_type: "environment",
    email: "info@ecolife.org",
    created_at: "2023-07-22T14:15:00Z",
    verification_status: "pending"
  }
];

const mockUsers = [
  {
    id: "1",
    full_name: "John Doe",
    email: "john@example.com",
    user_role: "donor",
    created_at: "2023-05-10T08:00:00Z"
  },
  {
    id: "2",
    full_name: "Jane Smith",
    email: "jane@example.com",
    user_role: "ngo_admin",
    created_at: "2023-05-15T09:30:00Z"
  },
  {
    id: "3",
    full_name: "Admin User",
    email: "admin@care4all.org",
    user_role: "super_admin",
    created_at: "2023-04-01T10:00:00Z"
  }
];

const mockCampaigns = [
  {
    id: "1",
    title: "Clean Water Initiative",
    ngo_name: "EcoLife Initiative",
    goal_amount: 50000,
    status: "pending"
  },
  {
    id: "2",
    title: "Education for All",
    ngo_name: "Children First Foundation",
    goal_amount: 75000,
    status: "approved"
  },
  {
    id: "3",
    title: "Healthcare Outreach",
    ngo_name: "Hope Healthcare",
    goal_amount: 100000,
    status: "pending"
  }
];

const mockMessages = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    message: "I'm interested in volunteering with your organization. Could you please provide more information?",
    created_at: "2023-08-15T14:30:00Z",
    status: "unread"
  },
  {
    id: "2",
    name: "Priya Singh",
    email: "priya@example.com",
    message: "I'm having trouble making a donation through the website. The payment isn't going through.",
    created_at: "2023-08-14T09:15:00Z",
    status: "read"
  },
  {
    id: "3",
    name: "Amit Patel",
    email: "amit@example.com",
    message: "I'd like to organize a fundraising event for your platform. How can we collaborate?",
    created_at: "2023-08-10T16:45:00Z",
    status: "resolved"
  }
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, hasPermission } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [pendingNGOs, setPendingNGOs] = useState(mockNGOs);
  const [users, setUsers] = useState(mockUsers);
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [messages, setMessages] = useState(mockMessages);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Add NGO form state
  const [showAddNGOForm, setShowAddNGOForm] = useState(false);
  const [newNGO, setNewNGO] = useState({
    name: "",
    email: "",
    type: "education",
    description: ""
  });
  
  useEffect(() => {
    if (!hasPermission('admin_dashboard')) {
      navigate('/');
      return;
    }
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [navigate, hasPermission]);
  
  const handleNGOApproval = (ngoId, status) => {
    try {
      if (!hasPermission('approve_ngo')) {
        toast.error("You don't have permission to approve NGOs");
        return;
      }

      // In a real app, we would update the NGO's status in Supabase
      // For now, we'll just remove it from the pending list to simulate approval
      setPendingNGOs(prevNGOs => 
        prevNGOs.filter(ngo => ngo.id !== ngoId)
      );
      
      toast.success(`NGO ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
    } catch (error) {
      console.error(`Failed to ${status} NGO:`, error);
      toast.error(`Failed to ${status === 'approved' ? 'approve' : 'reject'} NGO`);
    }
  };
  
  const handleCampaignApproval = (campaignId, status) => {
    try {
      if (!hasPermission('manage_campaigns')) {
        toast.error("You don't have permission to manage campaigns");
        return;
      }

      // In a real app, we would update the campaign status in Supabase
      setCampaigns(prevCampaigns => 
        prevCampaigns.map(campaign => 
          campaign.id === campaignId ? { ...campaign, status } : campaign
        )
      );
      
      toast.success(`Campaign ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
    } catch (error) {
      console.error(`Failed to ${status} campaign:`, error);
      toast.error(`Failed to ${status === 'approved' ? 'approve' : 'reject'} campaign`);
    }
  };
  
  const handleMessageStatusChange = (messageId, status) => {
    try {
      // In a real app, we would update the message status in Supabase
      setMessages(prevMessages => 
        prevMessages.map(message => 
          message.id === messageId ? { ...message, status } : message
        )
      );
      
      toast.success(`Message marked as ${status}`);
    } catch (error) {
      console.error(`Failed to update message status:`, error);
      toast.error("Failed to update message status");
    }
  };
  
  const handleAddNGO = (e) => {
    e.preventDefault();
    
    if (!newNGO.name || !newNGO.email || !newNGO.type) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      // In a real app, we would add the NGO to Supabase
      const newNGOWithId = {
        id: Math.random().toString(36).substr(2, 9),
        name: newNGO.name,
        ngo_type: newNGO.type,
        email: newNGO.email,
        created_at: new Date().toISOString(),
        verification_status: "approved" // Auto-approve when added by admin
      };
      
      // Add to NGOs list (not pending since it's pre-approved)
      setPendingNGOs(prevNGOs => [...prevNGOs, newNGOWithId]);
      
      // Reset form
      setNewNGO({
        name: "",
        email: "",
        type: "education",
        description: ""
      });
      setShowAddNGOForm(false);
      
      toast.success("NGO added successfully");
    } catch (error) {
      console.error("Failed to add NGO:", error);
      toast.error("Failed to add NGO");
    }
  };
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    return matchesSearch && user.user_role === activeFilter;
  });
  
  if (isLoading) {
    return (
      <div className="container py-12 flex justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
        <Button variant="outline" onClick={() => navigate("/")}>
          View Public Site
        </Button>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Pending NGOs</p>
              <p className="text-3xl font-bold">{pendingNGOs.length}</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Building className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-3xl font-bold">{users.length}</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Users className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Pending Campaigns</p>
              <p className="text-3xl font-bold">
                {campaigns.filter(c => c.status === 'pending').length}
              </p>
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <FileText className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Unread Messages</p>
              <p className="text-3xl font-bold">
                {messages.filter(m => m.status === 'unread').length}
              </p>
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <MessageSquare className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Admin Tasks</p>
              <p className="text-3xl font-bold">
                {pendingNGOs.length + 
                campaigns.filter(c => c.status === 'pending').length +
                messages.filter(m => m.status === 'unread').length}
              </p>
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Shield className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ngo-approvals" className="space-y-6">
        <TabsList className="mb-8 grid w-full grid-cols-5 lg:w-[750px]">
          <TabsTrigger value="ngo-approvals">NGO Approvals</TabsTrigger>
          <TabsTrigger value="add-ngo">Add NGO</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ngo-approvals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending NGO Approvals</CardTitle>
              <CardDescription>
                Review and verify NGO applications before approving them to appear on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingNGOs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No pending NGO approvals at this time</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Organization</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Date Applied</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingNGOs.map((ngo) => (
                      <TableRow key={ngo.id}>
                        <TableCell className="font-medium">{ngo.name}</TableCell>
                        <TableCell>
                          {ngo.ngo_type.charAt(0).toUpperCase() + ngo.ngo_type.slice(1)}
                        </TableCell>
                        <TableCell>{ngo.email}</TableCell>
                        <TableCell>
                          {new Date(ngo.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 text-green-600 border-green-600"
                              onClick={() => handleNGOApproval(ngo.id, 'approved')}
                            >
                              <Check className="h-4 w-4 mr-1" /> Approve
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 text-destructive border-destructive"
                              onClick={() => handleNGOApproval(ngo.id, 'rejected')}
                            >
                              <X className="h-4 w-4 mr-1" /> Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="add-ngo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Manually Add NGO</CardTitle>
              <CardDescription>
                Add a new NGO directly to the platform with verified status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddNGO} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ngoName">Organization Name *</Label>
                    <Input
                      id="ngoName"
                      placeholder="NGO name"
                      value={newNGO.name}
                      onChange={(e) => setNewNGO({...newNGO, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ngoEmail">Email Address *</Label>
                    <Input
                      id="ngoEmail"
                      type="email"
                      placeholder="contact@ngo.org"
                      value={newNGO.email}
                      onChange={(e) => setNewNGO({...newNGO, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ngoType">Category *</Label>
                    <select
                      id="ngoType"
                      className="w-full px-3 py-2 border rounded-md"
                      value={newNGO.type}
                      onChange={(e) => setNewNGO({...newNGO, type: e.target.value})}
                      required
                    >
                      <option value="education">Education</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="environment">Environment</option>
                      <option value="children">Children & Youth</option>
                      <option value="women">Women Empowerment</option>
                      <option value="elderly">Elderly Care</option>
                      <option value="disabilities">Disabilities & Inclusion</option>
                      <option value="animals">Animal Welfare</option>
                      <option value="disaster">Disaster Relief</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ngoPassword">Create Password *</Label>
                    <Input
                      id="ngoPassword"
                      type="password"
                      placeholder="Create a secure password"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      This will be used by the NGO to log in to their account
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ngoDescription">Description</Label>
                  <Textarea
                    id="ngoDescription"
                    placeholder="Describe the NGO's mission and activities"
                    rows={4}
                    value={newNGO.description}
                    onChange={(e) => setNewNGO({...newNGO, description: e.target.value})}
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button type="submit" className="px-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add NGO
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                View and manage all registered users on the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="space-x-1">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <select
                    className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                    value={activeFilter}
                    onChange={(e) => setActiveFilter(e.target.value)}
                  >
                    <option value="all">All Users</option>
                    <option value="donor">Donors</option>
                    <option value="ngo_admin">NGO Admins</option>
                    <option value="super_admin">Super Admins</option>
                  </select>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.full_name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {user.user_role === 'donor' ? 'Donor' : 
                           user.user_role === 'ngo_admin' ? 'NGO Admin' : 
                           user.user_role === 'super_admin' ? 'Super Admin' : 'Unknown'}
                        </TableCell>
                        <TableCell>
                          {new Date(user.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="messages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Messages & Contact Form Submissions</CardTitle>
              <CardDescription>
                View and respond to messages from the Contact Us page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search messages..."
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="space-x-1">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <select
                      className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                    >
                      <option value="all">All Messages</option>
                      <option value="unread">Unread</option>
                      <option value="read">Read</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>
              
                {messages.map((message) => (
                  <Card key={message.id} className={`mt-4 ${message.status === 'unread' ? 'border-primary' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold flex items-center">
                            {message.name}
                            {message.status === 'unread' && (
                              <Badge className="ml-2 bg-primary">New</Badge>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground">{message.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            {new Date(message.created_at).toLocaleDateString()}
                          </p>
                          <p className="text-sm">
                            {message.status === 'read' ? 'Read' : 
                             message.status === 'resolved' ? 'Resolved' : 'Unread'}
                          </p>
                        </div>
                      </div>
                      <div className="border-l-4 pl-3 py-1 my-2 border-muted">
                        <p className="text-sm">{message.message}</p>
                      </div>
                      <div className="flex justify-end space-x-2 mt-3">
                        {message.status === 'unread' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleMessageStatusChange(message.id, 'read')}
                          >
                            Mark as Read
                          </Button>
                        )}
                        {message.status !== 'resolved' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleMessageStatusChange(message.id, 'resolved')}
                          >
                            Mark as Resolved
                          </Button>
                        )}
                        <Button 
                          variant="default" 
                          size="sm"
                        >
                          <Mail className="h-4 w-4 mr-1" />
                          Reply
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Analytics</CardTitle>
              <CardDescription>
                Overview of platform metrics and donation statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Donation Analytics</h3>
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-muted-foreground">Total Donations</div>
                    <div className="text-2xl font-bold mt-1">₹325,600</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-muted-foreground">This Month</div>
                    <div className="text-2xl font-bold mt-1">₹42,890</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-muted-foreground">Average Donation</div>
                    <div className="text-2xl font-bold mt-1">₹1,250</div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Top Performing NGOs</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>NGO Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Total Raised</TableHead>
                      <TableHead className="text-right">Donors</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Children First Foundation</TableCell>
                      <TableCell>Children & Youth</TableCell>
                      <TableCell className="text-right">₹86,400</TableCell>
                      <TableCell className="text-right">124</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">EcoLife Initiative</TableCell>
                      <TableCell>Environment</TableCell>
                      <TableCell className="text-right">₹75,230</TableCell>
                      <TableCell className="text-right">98</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Hope Healthcare</TableCell>
                      <TableCell>Healthcare</TableCell>
                      <TableCell className="text-right">₹54,890</TableCell>
                      <TableCell className="text-right">87</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Women Empowerment Trust</TableCell>
                      <TableCell>Women Empowerment</TableCell>
                      <TableCell className="text-right">₹48,750</TableCell>
                      <TableCell className="text-right">72</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
