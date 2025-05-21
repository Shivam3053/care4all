import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import { 
  AlertCircle, PlusCircle, Building, Trash2, Edit, X, Check, Mail, Upload, Image, Users
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

import { useAuth } from "@/contexts/AuthContext";
import adminOperations from "@/utils/adminOperations";

const AdminDashboard = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
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
  
  // NGO image state
  const [ngoLogo, setNgoLogo] = useState<File | null>(null);
  const [ngoTeamImage, setNgoTeamImage] = useState<File | null>(null);
  const [ngoGalleryImages, setNgoGalleryImages] = useState<FileList | null>(null);
  const [ngoAchievementImage, setNgoAchievementImage] = useState<File | null>(null);
  
  // Manage NGOs state
  const [isDeleteNgoDialogOpen, setIsDeleteNgoDialogOpen] = useState(false);
  const [selectedNgoId, setSelectedNgoId] = useState<string | null>(null);
  const [selectedNgoName, setSelectedNgoName] = useState("");
  const [isProcessingNgoAction, setIsProcessingNgoAction] = useState(false);
  const [isEditNgoDialogOpen, setIsEditNgoDialogOpen] = useState(false);
  const [editingNgo, setEditingNgo] = useState<any>(null);

  // Email dialog state
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Fetch all users (to get NGOs)
  const { data: users, isLoading: isLoadingUsers, error: usersError, refetch: refetchUsers } = useQuery({
    queryKey: ['admin-users'],
    queryFn: adminOperations.getAllUsers,
  });
  
  // Fetch all donations
  const { data: donations, isLoading: isLoadingDonations, error: donationsError } = useQuery({
    queryKey: ['admin-donations'],
    queryFn: adminOperations.getAllDonations,
  });

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files.length > 0) {
      setter(e.target.files[0]);
    }
  };

  // Handle multiple file change
  const handleMultipleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNgoGalleryImages(e.target.files);
    }
  };

  // Handler to add a new NGO
  const handleAddNGO = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ngoName || !ngoEmail || !ngoCategory || !ngoPassword || !ngoLogo || !ngoTeamImage || !ngoAchievementImage || !ngoGalleryImages) {
      toast.error("Please fill in all required fields and upload all required images");
      return;
    }
    
    try {
      setIsAddingNgo(true);
      
      // In a production app, you would upload the images to storage here
      // For now, we'll just demonstrate collecting the files
      console.log("Logo:", ngoLogo?.name);
      console.log("Team image:", ngoTeamImage?.name);
      console.log("Achievement image:", ngoAchievementImage?.name);
      console.log("Gallery images:", ngoGalleryImages.length);
      
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
        upiId: ngoUpiId,
        logo: ngoLogo,
        teamImage: ngoTeamImage,
        achievementImage: ngoAchievementImage,
        galleryImages: ngoGalleryImages
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
      setNgoLogo(null);
      setNgoTeamImage(null);
      setNgoAchievementImage(null);
      setNgoGalleryImages(null);
      
      // Refresh user list
      refetchUsers();
      
    } catch (error: any) {
      toast.error(error.message || "Failed to add NGO");
      console.error("Error adding NGO:", error);
    } finally {
      setIsAddingNgo(false);
    }
  };

  // Open delete NGO confirmation dialog
  const confirmDeleteNgo = (ngoId: string, ngoName: string) => {
    setSelectedNgoId(ngoId);
    setSelectedNgoName(ngoName || 'this NGO');
    setIsDeleteNgoDialogOpen(true);
  };

  // Handle NGO deletion
  const handleDeleteNgo = async () => {
    if (!selectedNgoId) return;
    
    setIsProcessingNgoAction(true);
    try {
      await adminOperations.deleteNGO(selectedNgoId);
      toast.success("NGO deleted successfully");
      refetchUsers();
      setIsDeleteNgoDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete NGO");
      console.error("Error deleting NGO:", error);
    } finally {
      setIsProcessingNgoAction(false);
      setSelectedNgoId(null);
    }
  };

  // Open edit NGO dialog
  const openEditNgoDialog = (ngo: any) => {
    setEditingNgo(ngo);
    setIsEditNgoDialogOpen(true);
  };

  // Handle NGO update
  const handleUpdateNgo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNgo) return;

    setIsProcessingNgoAction(true);
    try {
      await adminOperations.updateNGO(editingNgo.id, {
        organization: editingNgo.organization,
        email: editingNgo.email,
        verification_status: editingNgo.verification_status
      });
      
      toast.success("NGO updated successfully");
      refetchUsers();
      setIsEditNgoDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to update NGO");
      console.error("Error updating NGO:", error);
    } finally {
      setIsProcessingNgoAction(false);
    }
  };

  // Open email dialog
  const openEmailDialog = (recipientEmail: string) => {
    setEmailRecipient(recipientEmail);
    setEmailSubject("");
    setEmailBody("");
    setIsEmailDialogOpen(true);
  };

  // Handle send email
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailRecipient || !emailSubject || !emailBody) {
      toast.error("Please fill all email fields");
      return;
    }

    setIsSendingEmail(true);
    try {
      // Simulate email sending (replace with actual implementation)
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Email sent to ${emailRecipient}`);
      setIsEmailDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to send email");
    } finally {
      setIsSendingEmail(false);
    }
  };

  const getNgos = () => {
    if (!users?.data) return [];
    return users.data.filter((user: any) => user.role === 'ngo_admin');
  };

  // Toggle NGO verification status
  const toggleNgoVerification = async (ngoId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'approved' ? 'pending' : 'approved';
    
    try {
      if (newStatus === 'approved') {
        await adminOperations.verifyNGO(ngoId);
      } else {
        await adminOperations.rejectNGO(ngoId);
      }
      
      toast.success(`NGO ${newStatus === 'approved' ? 'approved' : 'unapproved'} successfully`);
      refetchUsers();
    } catch (error: any) {
      toast.error(error.message || `Failed to ${newStatus === 'approved' ? 'approve' : 'unapprove'} NGO`);
      console.error("Error updating NGO status:", error);
    }
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
              
              {/* Logo Upload */}
              <div className="space-y-2">
                <Label htmlFor="ngoLogo">NGO Logo *</Label>
                <div className="border-2 border-dashed rounded-md p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  <input
                    id="ngoLogo"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setNgoLogo)}
                    required
                  />
                  <label htmlFor="ngoLogo" className="cursor-pointer flex flex-col items-center">
                    <Upload className="h-5 w-5 text-muted-foreground mb-1" />
                    <span className="text-sm font-medium">
                      {ngoLogo ? ngoLogo.name : "Upload NGO Logo"}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      PNG, JPG (max 2MB)
                    </span>
                  </label>
                </div>
              </div>
              
              {/* Team Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="ngoTeamImage">Team Image *</Label>
                <div className="border-2 border-dashed rounded-md p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  <input
                    id="ngoTeamImage"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setNgoTeamImage)}
                    required
                  />
                  <label htmlFor="ngoTeamImage" className="cursor-pointer flex flex-col items-center">
                    <Users className="h-5 w-5 text-muted-foreground mb-1" />
                    <span className="text-sm font-medium">
                      {ngoTeamImage ? ngoTeamImage.name : "Upload Team Photo"}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      PNG, JPG (max 2MB)
                    </span>
                  </label>
                </div>
              </div>
              
              {/* Achievement Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="ngoAchievementImage">Achievement Image *</Label>
                <div className="border-2 border-dashed rounded-md p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  <input
                    id="ngoAchievementImage"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setNgoAchievementImage)}
                    required
                  />
                  <label htmlFor="ngoAchievementImage" className="cursor-pointer flex flex-col items-center">
                    <Image className="h-5 w-5 text-muted-foreground mb-1" />
                    <span className="text-sm font-medium">
                      {ngoAchievementImage ? ngoAchievementImage.name : "Upload Achievement Photo"}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      PNG, JPG (max 2MB)
                    </span>
                  </label>
                </div>
              </div>
              
              {/* Gallery Images Upload */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="ngoGalleryImages">Gallery Images *</Label>
                <div className="border-2 border-dashed rounded-md p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  <input
                    id="ngoGalleryImages"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleMultipleFileChange}
                    required
                  />
                  <label htmlFor="ngoGalleryImages" className="cursor-pointer flex flex-col items-center">
                    <Upload className="h-5 w-5 text-muted-foreground mb-1" />
                    <span className="text-sm font-medium">
                      {ngoGalleryImages ? `${ngoGalleryImages.length} images selected` : "Upload Gallery Images"}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      PNG, JPG (max 2MB each)
                    </span>
                  </label>
                </div>
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
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Registered NGOs</CardTitle>
              <CardDescription>View and manage all registered NGOs</CardDescription>
            </div>
          </div>
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
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getNgos().map((ngo: any) => (
                    <TableRow key={ngo.id}>
                      <TableCell className="font-medium">{ngo.organization || ngo.name}</TableCell>
                      <TableCell>{ngo.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className={`mr-2 ${ngo.verification_status === 'approved' ? 'text-green-600' : 'text-amber-600'}`}>
                            {ngo.verification_status === 'approved' ? 'Approved' : 'Pending'}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => toggleNgoVerification(ngo.id, ngo.verification_status)}
                            title={ngo.verification_status === 'approved' ? 'Unapprove NGO' : 'Approve NGO'}
                          >
                            {ngo.verification_status === 'approved' ? (
                              <X className="h-4 w-4 text-red-600" />
                            ) : (
                              <Check className="h-4 w-4 text-green-600" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEmailDialog(ngo.email)}
                            title="Send Email"
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditNgoDialog(ngo)}
                            title="Edit NGO"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => confirmDeleteNgo(ngo.id, ngo.organization || ngo.name)}
                            title="Delete NGO"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete NGO Dialog */}
      <Dialog open={isDeleteNgoDialogOpen} onOpenChange={setIsDeleteNgoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete NGO</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedNgoName}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteNgoDialogOpen(false)}
              disabled={isProcessingNgoAction}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteNgo}
              disabled={isProcessingNgoAction}
            >
              {isProcessingNgoAction ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  Deleting...
                </>
              ) : (
                "Delete NGO"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit NGO Dialog */}
      <Dialog open={isEditNgoDialogOpen} onOpenChange={setIsEditNgoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit NGO</DialogTitle>
            <DialogDescription>
              Update the NGO information
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateNgo}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-ngo-name">Organization Name</Label>
                <Input 
                  id="edit-ngo-name" 
                  value={editingNgo?.organization || ''} 
                  onChange={(e) => setEditingNgo({...editingNgo, organization: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-ngo-email">Email</Label>
                <Input 
                  id="edit-ngo-email" 
                  type="email"
                  value={editingNgo?.email || ''} 
                  onChange={(e) => setEditingNgo({...editingNgo, email: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-ngo-status">Status</Label>
                <Select 
                  value={editingNgo?.verification_status || 'pending'} 
                  onValueChange={(value) => setEditingNgo({...editingNgo, verification_status: value})}
                  required
                >
                  <SelectTrigger id="edit-ngo-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                type="button"
                onClick={() => setIsEditNgoDialogOpen(false)}
                disabled={isProcessingNgoAction}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isProcessingNgoAction}
              >
                {isProcessingNgoAction ? (
                  <>
                    <span className="animate-spin mr-2">⟳</span>
                    Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Email Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Email</DialogTitle>
            <DialogDescription>
              Compose an email to {emailRecipient}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSendEmail}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email-subject">Subject</Label>
                <Input 
                  id="email-subject" 
                  value={emailSubject} 
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Email subject"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-body">Message</Label>
                <Textarea 
                  id="email-body" 
                  value={emailBody} 
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Your message"
                  rows={5}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                type="button"
                onClick={() => setIsEmailDialogOpen(false)}
                disabled={isSendingEmail}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSendingEmail}
              >
                {isSendingEmail ? (
                  <>
                    <span className="animate-spin mr-2">⟳</span>
                    Sending...
                  </>
                ) : (
                  "Send Email"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
