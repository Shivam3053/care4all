
import { Button } from "@/components/ui/button";
import { ArrowRight, Chrome, QrCode, Zap } from "lucide-react";

const ExtensionPromo = () => {
  return (
    <section className="bg-gradient-to-r from-care-700 to-care-600 py-16 text-white">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Care4All Browser Extension
            </h2>
            <p className="mb-6 text-white/90">
              Enhance your donation experience with our powerful browser
              extension that works seamlessly with your web browsing.
            </p>

            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-white/10 p-2">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">AI Recommendations</h3>
                  <p className="text-sm text-white/80">
                    Get personalized NGO suggestions based on your interests
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-white/10 p-2">
                  <QrCode className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Instant UPI Donations</h3>
                  <p className="text-sm text-white/80">
                    Donate directly with just a few clicks while browsing
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                variant="outline"
                className="border-white bg-white text-care-700 hover:bg-white/90"
              >
                <Chrome className="mr-2 h-5 w-5" />
                Add to Chrome
              </Button>
              <Button
                variant="ghost"
                className="border border-white/20 text-white hover:bg-white/10"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative order-first md:order-last">
            <div className="relative aspect-square max-w-md overflow-hidden rounded-2xl border-4 border-white/20 bg-care-800 shadow-xl md:ml-auto">
              <div className="absolute right-4 top-4 h-12 w-12">
                <Chrome className="h-full w-full text-white/80" />
              </div>
              <div className="mt-16 p-6">
                <div className="mb-4 h-4 w-1/3 rounded-full bg-white/20"></div>
                <div className="mb-6 h-6 w-2/3 rounded-full bg-white/30"></div>
                
                <div className="space-y-3">
                  <div className="h-12 rounded-lg bg-white/10 p-3">
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-1/3 rounded-full bg-white/30"></div>
                      <div className="h-6 w-6 rounded-full bg-care-500"></div>
                    </div>
                  </div>
                  <div className="h-12 rounded-lg bg-white/10 p-3">
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-2/5 rounded-full bg-white/30"></div>
                      <div className="h-6 w-6 rounded-full bg-impact-500"></div>
                    </div>
                  </div>
                  <div className="h-12 rounded-lg bg-white/10 p-3">
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-1/4 rounded-full bg-white/30"></div>
                      <div className="h-6 w-6 rounded-full bg-care-500"></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 rounded-lg bg-impact-500 p-3 text-center text-sm font-medium text-white">
                  Donate Now
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-care-500 opacity-50 blur-2xl"></div>
              <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-impact-500 opacity-50 blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExtensionPromo;
