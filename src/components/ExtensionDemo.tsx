import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  Copy, 
  ExternalLink, 
  Flag, 
  QrCode,
  Phone, 
  Mail, 
  CheckCircle2
} from "lucide-react";
import WhatsappIcon from "./icons/WhatsappIcon";

interface ExtensionDemoProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const ExtensionDemo: React.FC<ExtensionDemoProps> = ({ 
  isOpen = true, 
  onClose 
}) => {
  const [copied, setCopied] = useState<string | null>(null);

  const mockNGO = {
    name: "Children First Foundation",
    logo: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?q=80&w=100&auto=format&fit=crop",
    upiId: "childrenfirst@ybl",
    phone: "+91-9876543210",
    email: "donate@childrenfirst.org",
    website: "https://childrenfirst.org",
    qrCode: "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    
    setTimeout(() => {
      setCopied(null);
    }, 2000);
    
    toast.success(`${type} copied to clipboard!`);
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${mockNGO.phone.replace(/[^0-9]/g, '')}`, '_blank');
  };

  const handleViewOnCare4All = () => {
    toast.success('Redirecting to NGO profile on Care4All');
    // In a real extension, this would redirect to the NGO profile page
  };

  const handleReportInfo = () => {
    toast.success('Report submitted. Our team will review the information.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <Card className="w-full max-w-[350px] shadow-lg border-2 relative">
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            ✕
          </button>
        )}
        
        <CardHeader className="border-b pb-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md overflow-hidden">
              <img 
                src={mockNGO.logo} 
                alt={`${mockNGO.name} logo`} 
                className="h-full w-full object-cover" 
              />
            </div>
            <div>
              <CardTitle className="text-base font-medium">
                {mockNGO.name}
              </CardTitle>
              <Badge className="bg-green-600 text-white mt-1 text-xs">
                <CheckCircle2 className="mr-1 h-3 w-3" /> Verified on Care4All
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-4 space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center gap-1">
              <QrCode className="h-4 w-4 text-muted-foreground" />
              QR Code for UPI Donation
            </h3>
            <div className="flex justify-center">
              <div className="border p-2 rounded-md bg-white">
                <img 
                  src={mockNGO.qrCode} 
                  alt="UPI QR Code" 
                  className="w-[120px] h-[120px]" 
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">UPI ID</h3>
            <div className="flex">
              <Input 
                value={mockNGO.upiId} 
                readOnly 
                className="rounded-r-none bg-muted"
              />
              <Button 
                variant="secondary" 
                size="sm"
                className="rounded-l-none"
                onClick={() => handleCopy(mockNGO.upiId, "UPI ID")}
              >
                {copied === "UPI ID" ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="flex gap-2 items-center flex-1">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mockNGO.phone}</span>
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={handleWhatsApp}
                  >
                    <WhatsappIcon className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleCopy(mockNGO.phone, "Phone")}
                  >
                    {copied === "Phone" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex gap-2 items-center flex-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mockNGO.email}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => handleCopy(mockNGO.email, "Email")}
                >
                  {copied === "Email" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="pt-2 space-y-2">
            <Button 
              className="w-full"
              onClick={handleViewOnCare4All}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View on Care4All
            </Button>
            <Button 
              variant="outline" 
              className="w-full text-destructive"
              onClick={handleReportInfo}
            >
              <Flag className="mr-2 h-4 w-4" />
              Report Incorrect Information
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground text-center pt-2">
            Powered by Care4All NGO Analyzer
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExtensionDemo;
