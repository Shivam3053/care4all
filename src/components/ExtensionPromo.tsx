
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ExtensionDemo from "./ExtensionDemo";
import { Chrome, Info } from "lucide-react";

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
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Instant NGO Details</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    View UPI IDs, QR codes, and contact information of any NGO directly through your browser.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 text-primary shrink-0">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Verified Information</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    All NGO details are verified by our team to ensure legitimacy and accuracy.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 text-primary shrink-0">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Quick Donations</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Make instant donations using UPI or contact NGOs directly for larger contributions.
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
                    src="https://images.unsplash.com/photo-1551198297-094dd118a5e3?q=80&w=500&auto=format&fit=crop"
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
              <Card className="w-32 shadow-lg">
                <CardContent className="p-3 text-center">
                  <div className="text-xl font-bold text-primary">100%</div>
                  <p className="text-xs">Verified</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="absolute -top-8 -right-8 hidden md:block transition-all duration-500 opacity-100 transform scale-100">
              <Card className="w-40 shadow-lg">
                <CardContent className="p-3 text-center">
                  <div className="text-xl font-bold text-primary">Coming Soon</div>
                  <p className="text-xs">Join the waitlist</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {showDemo && <ExtensionDemo onClose={() => setShowDemo(false)} />}
    </section>
  );
};

export default ExtensionPromo;
