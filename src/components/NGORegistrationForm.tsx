
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Upload, Building, Mail, Phone, Globe, MapPin, FileText, Check } from "lucide-react";

// Form validation schema
const ngoFormSchema = z.object({
  organizationName: z.string().min(2, "Organization name is required"),
  email: z.string().email("Valid email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(5, "Address is required"),
  registrationNumber: z.string().min(2, "Registration number is required"),
  category: z.string().min(1, "Category is required"),
  upiId: z.string().optional(),
  description: z.string().min(10, "Description is required"),
  achievements: z.string().optional(),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
});

type NGOFormValues = z.infer<typeof ngoFormSchema>;

const NGORegistrationForm = () => {
  const { registerNGO, isLoading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [qrCodeFile, setQrCodeFile] = useState<File | null>(null);
  const [documentsFile, setDocumentsFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [qrCodePreview, setQrCodePreview] = useState<string | null>(null);

  const form = useForm<NGOFormValues>({
    resolver: zodResolver(ngoFormSchema),
    defaultValues: {
      organizationName: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      registrationNumber: "",
      category: "",
      upiId: "",
      description: "",
      achievements: "",
      website: "",
      facebook: "",
      instagram: "",
      twitter: "",
      agreeTerms: false,
    },
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQRCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setQrCodeFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setQrCodePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDocumentsFile(file);
      toast.success(`File "${file.name}" uploaded successfully`);
    }
  };

  const onSubmit = async (data: NGOFormValues) => {
    try {
      // For now, we'll just register with the basic info
      // In a real app, you would upload files to storage and save all form data
      await registerNGO(
        data.email, 
        data.password, 
        data.organizationName, 
        data.category
      );
      
      toast.success("NGO registration submitted successfully!");
      navigate("/login");
    } catch (error) {
      console.error("NGO registration error:", error);
    }
  };

  return (
    <div className="bg-card border rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">NGO Registration</h2>
        <p className="text-muted-foreground">
          Complete this form to register your organization with Care4All
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information Section */}
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <Separator />
            </div>

            {/* Organization Name */}
            <FormField
              control={form.control}
              name="organizationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name*</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-10" placeholder="e.g. Hope Foundation" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category*</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select organization type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="health">Healthcare</SelectItem>
                      <SelectItem value="environment">Environment</SelectItem>
                      <SelectItem value="children">Children & Youth</SelectItem>
                      <SelectItem value="women">Women Empowerment</SelectItem>
                      <SelectItem value="disaster">Disaster Relief</SelectItem>
                      <SelectItem value="animal">Animal Welfare</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Official Email*</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-10" placeholder="ngo@example.com" type="email" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password*</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="pr-10"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a secure password"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number*</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-10" placeholder="+91 98765 43210" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Registration Number */}
            <FormField
              control={form.control}
              name="registrationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Number*</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-10" placeholder="e.g. NGO/2023/12345" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Address*</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-10" placeholder="123 Main St, City, State, Pincode" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Donation Information Section */}
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-lg font-semibold">Donation Information</h3>
              <Separator />
            </div>

            {/* UPI ID */}
            <FormField
              control={form.control}
              name="upiId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>UPI ID</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. ngo@upi" {...field} />
                  </FormControl>
                  <FormDescription>Your UPI ID for receiving donations</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* QR Code Upload */}
            <div className="space-y-2">
              <Label htmlFor="qrCode">QR Code (For Donations)</Label>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="border border-input rounded-md px-3 py-2 relative">
                    <input
                      id="qrCode"
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleQRCodeChange}
                    />
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Upload className="h-4 w-4" />
                      <span>Upload QR Code</span>
                    </div>
                  </div>
                </div>
                {qrCodePreview && (
                  <div className="h-20 w-20 relative border rounded overflow-hidden">
                    <img
                      src={qrCodePreview}
                      alt="QR Code Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Organization Details Section */}
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-lg font-semibold">Organization Details</h3>
              <Separator />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Description*</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your organization's mission and work"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Achievements */}
            <FormField
              control={form.control}
              name="achievements"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Past Achievements</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your organization's achievements and impact"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Web & Social Presence Section */}
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-lg font-semibold">Web & Social Presence</h3>
              <Separator />
            </div>

            {/* Website */}
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-10" placeholder="https://www.example.org" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Facebook */}
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input placeholder="Facebook page URL or username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Instagram */}
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input placeholder="Instagram handle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Twitter */}
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <Input placeholder="Twitter handle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Organization Assets Section */}
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-lg font-semibold">Organization Assets</h3>
              <Separator />
            </div>

            {/* Logo Upload */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="logo">Organization Logo</Label>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="border border-input rounded-md px-3 py-2 relative">
                    <input
                      id="logo"
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleLogoChange}
                    />
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Upload className="h-4 w-4" />
                      <span>Upload Logo</span>
                    </div>
                  </div>
                </div>
                {logoPreview && (
                  <div className="h-20 w-20 relative border rounded overflow-hidden">
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Documents Upload */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="documents">Supporting Documents</Label>
              <div className="border border-input rounded-md px-3 py-2 relative">
                <input
                  id="documents"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleDocumentsChange}
                />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Upload className="h-4 w-4" />
                  <span>Upload Registration Certificate or Other Documents (PDF)</span>
                </div>
              </div>
              {documentsFile && (
                <div className="flex items-center text-sm text-green-600">
                  <Check className="h-4 w-4 mr-1" />
                  {documentsFile.name}
                </div>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="agreeTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the terms and conditions and certify that all information provided is accurate
                      </FormLabel>
                      <FormDescription>
                        By submitting this form, you agree to have your organization listed on Care4All after verification
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading} className="min-w-[150px]">
              {isLoading ? "Submitting..." : "Register Organization"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NGORegistrationForm;
