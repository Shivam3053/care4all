
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Building, Upload, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const NGORegistrationForm = () => {
  const { registerNGO, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Form state
  const [ngoName, setNgoName] = useState("");
  const [ngoEmail, setNgoEmail] = useState("");
  const [ngoPhone, setNgoPhone] = useState("");
  const [ngoAddress, setNgoAddress] = useState("");
  const [ngoRegistrationNo, setNgoRegistrationNo] = useState("");
  const [ngoCategory, setNgoCategory] = useState("");
  const [ngoUpiId, setNgoUpiId] = useState("");
  const [ngoDescription, setNgoDescription] = useState("");
  const [ngoWebsite, setNgoWebsite] = useState("");
  const [ngoAchievements, setNgoAchievements] = useState("");
  const [ngoSocial, setNgoSocial] = useState("");
  const [ngoPassword, setNgoPassword] = useState("");
  const [ngoAgreeTerms, setNgoAgreeTerms] = useState(false);
  const [ngoLogo, setNgoLogo] = useState<File | null>(null);
  const [ngoQrCode, setNgoQrCode] = useState<File | null>(null);
  const [ngoDocuments, setNgoDocuments] = useState<FileList | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ngoName || !ngoEmail || !ngoPassword || !ngoCategory) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (!ngoAgreeTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }

    try {
      await registerNGO(ngoEmail, ngoPassword, ngoName, ngoCategory);
      // For now, we're just capturing the basic info required for auth
      // In a production app, we would also upload the files and additional info to storage and database
      toast.success("Registration submitted successfully! Your NGO profile is pending verification.");
    } catch (error) {
      console.error("NGO registration error:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files.length > 0) {
      setter(e.target.files[0]);
    }
  };

  const handleMultipleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNgoDocuments(e.target.files);
    }
  };

  return (
    <Card className="border-2">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">NGO Registration</CardTitle>
        <CardDescription>
          Register your organization on Care4All to receive donations and support
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ngoName">Organization Name *</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="ngoName"
                    placeholder="Your NGO name"
                    value={ngoName}
                    onChange={(e) => setNgoName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
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
                <Label htmlFor="ngoAddress">Office Address</Label>
                <Textarea
                  id="ngoAddress"
                  placeholder="Full address with city, state and pin code"
                  value={ngoAddress}
                  onChange={(e) => setNgoAddress(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ngoRegistrationNo">Registration Number</Label>
                <Input
                  id="ngoRegistrationNo"
                  placeholder="Your official registration number"
                  value={ngoRegistrationNo}
                  onChange={(e) => setNgoRegistrationNo(e.target.value)}
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
            </div>
            
            {/* Right Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ngoUpiId">UPI ID for Donations</Label>
                <Input
                  id="ngoUpiId"
                  placeholder="yourname@bank"
                  value={ngoUpiId}
                  onChange={(e) => setNgoUpiId(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ngoDescription">Organization Description *</Label>
                <Textarea
                  id="ngoDescription"
                  placeholder="Tell potential donors about your mission and work"
                  value={ngoDescription}
                  onChange={(e) => setNgoDescription(e.target.value)}
                  rows={3}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ngoAchievements">Past Achievements</Label>
                <Textarea
                  id="ngoAchievements"
                  placeholder="Share your organization's key achievements"
                  value={ngoAchievements}
                  onChange={(e) => setNgoAchievements(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ngoWebsite">Website</Label>
                <Input
                  id="ngoWebsite"
                  type="url"
                  placeholder="https://your-ngo-website.org"
                  value={ngoWebsite}
                  onChange={(e) => setNgoWebsite(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ngoSocial">Social Media Links</Label>
                <Input
                  id="ngoSocial"
                  placeholder="Instagram, Facebook, Twitter links"
                  value={ngoSocial}
                  onChange={(e) => setNgoSocial(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ngoPassword">Password *</Label>
                <Input
                  id="ngoPassword"
                  type="password"
                  placeholder="Create a secure password"
                  value={ngoPassword}
                  onChange={(e) => setNgoPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          
          {/* File Upload Section - Full Width */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium">Upload Documents</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="ngoLogo">Organization Logo</Label>
                <div className="border-2 border-dashed rounded-md p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  <input
                    id="ngoLogo"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setNgoLogo)}
                  />
                  <label htmlFor="ngoLogo" className="cursor-pointer flex flex-col items-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm font-medium">
                      {ngoLogo ? ngoLogo.name : "Click to upload logo"}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      PNG, JPG or SVG (max 2MB)
                    </span>
                  </label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ngoQrCode">Payment QR Code</Label>
                <div className="border-2 border-dashed rounded-md p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  <input
                    id="ngoQrCode"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setNgoQrCode)}
                  />
                  <label htmlFor="ngoQrCode" className="cursor-pointer flex flex-col items-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm font-medium">
                      {ngoQrCode ? ngoQrCode.name : "Click to upload QR code"}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      PNG, JPG or SVG (max 2MB)
                    </span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ngoDocuments">Supporting Documents</Label>
              <div className="border-2 border-dashed rounded-md p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                <input
                  id="ngoDocuments"
                  type="file"
                  className="hidden"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={handleMultipleFileChange}
                />
                <label htmlFor="ngoDocuments" className="cursor-pointer flex flex-col items-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm font-medium">
                    {ngoDocuments ? `${ngoDocuments.length} files selected` : "Click to upload documents"}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    PDF, DOC or DOCX (max 5MB each)
                  </span>
                </label>
              </div>
              <p className="text-xs text-muted-foreground pt-1">
                Please upload registration certificate, 80G certificate, annual reports, etc.
              </p>
            </div>
          </div>
          
          {/* Agreement and Submit - Full Width */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center space-x-2">
              <input
                id="ngoAgreeTerms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                checked={ngoAgreeTerms}
                onChange={() => setNgoAgreeTerms(!ngoAgreeTerms)}
              />
              <label
                htmlFor="ngoAgreeTerms"
                className="text-sm text-muted-foreground"
              >
                I certify that I am authorized to register this organization and all information provided is accurate. I agree to the{" "}
                <a href="/terms" className="text-primary hover:underline">
                  terms and conditions
                </a>
                .
              </label>
            </div>
            
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  Submitting...
                </>
              ) : (
                <>
                  Register Organization
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            
            <p className="text-sm text-center text-muted-foreground">
              Your registration will be reviewed by our team before approval.
              This process typically takes 1-3 business days.
            </p>
          </div>
        </form>
      </CardContent>
      <CardFooter className="justify-center text-center">
        <p className="text-sm text-muted-foreground">
          Need help with registration?{" "}
          <a href="/contact" className="text-primary hover:underline">
            Contact our support team
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default NGORegistrationForm;
