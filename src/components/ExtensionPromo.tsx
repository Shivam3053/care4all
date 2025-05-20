
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ExtensionDemo from "./ExtensionDemo";
import { 
  Chrome, 
  Info, 
  QrCode, 
  Copy, 
  ExternalLink, 
  Flag 
} from "lucide-react";

const ExtensionPromo = () => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Coming Soon: Care4All Browser Extension
              </h2>
              <p className="text-muted-foreground mt-2">
                Easily access donation details of any NGO from anywhere on the web
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 text-primary shrink-0">
                  <QrCode className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">One-Click NGO Details</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    A convenient button appears in the corner of every NGO website or profile. Click it to instantly access verified donation information.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 text-primary shrink-0">
                  <Copy className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Quick Copy Functionality</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Easily copy UPI IDs, phone numbers, and email addresses with one click to make donations without any hassle.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 text-primary shrink-0">
                  <ExternalLink className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">View Complete NGO Profile</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Access the full NGO profile on Care4All with a single click for more detailed information and verification.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 text-primary shrink-0">
                  <Flag className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Report Incorrect Information</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Help maintain data accuracy by reporting any incorrect or outdated NGO information directly through the extension.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <Button size="lg" onClick={() => setShowDemo(true)}>
                <Chrome className="mr-2 h-5 w-5" />
                Preview Extension
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full max-w-[300px] mx-auto transition-all duration-500 opacity-100 transform translate-y-0">
              <Card className="shadow-xl border-2">
                <CardContent className="p-0">
                  <img 
                    src="/lovable-uploads/0c83c38b-4718-4dcd-a4bf-f9c0afcd09a9.png"
                    alt="Browser Extension Preview"
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="p-4 text-center">
                    <h3 className="font-semibold">NGO Analyzer Extension</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Access NGO donation details anywhere online
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="absolute -bottom-12 -left-12 hidden md:block transition-all duration-500 opacity-100 transform scale-100">
              <Card className="w-36 shadow-lg">
                <CardContent className="p-3 text-center">
                  <div className="text-xs text-muted-foreground">Look for the</div>
                  <div className="text-base font-bold text-primary">Care4All Button</div>
                  <p className="text-xs">On any NGO website</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="absolute -top-8 -right-8 hidden md:block transition-all duration-500 opacity-100 transform scale-100">
              <Card className="w-40 shadow-lg">
                <CardContent className="p-3 text-center">
                  <div className="text-xl font-bold text-primary">One-Click</div>
                  <p className="text-xs">Instant NGO information</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t">
          <h3 className="text-2xl font-bold text-center mb-6">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <div className="text-lg font-bold text-primary">1</div>
                </div>
                <h4 className="font-semibold mb-2">Browse to any NGO Website</h4>
                <p className="text-sm text-muted-foreground">
                  The Care4All button automatically appears in the corner of the screen when you visit any NGO website.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <div className="text-lg font-bold text-primary">2</div>
                </div>
                <h4 className="font-semibold mb-2">Click the Care4All Button</h4>
                <p className="text-sm text-muted-foreground">
                  The button opens a popup with the NGO's critical information including UPI ID, QR code, and contact details.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <div className="text-lg font-bold text-primary">3</div>
                </div>
                <h4 className="font-semibold mb-2">Donate or Contact Instantly</h4>
                <p className="text-sm text-muted-foreground">
                  Scan the QR code, copy the UPI ID, or contact the NGO directly — all without leaving the page you're on.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {showDemo && <ExtensionDemo onClose={() => setShowDemo(false)} />}
    </section>
  );
};

export default ExtensionPromo;
