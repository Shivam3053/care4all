
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Scan, Loader2 } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import { getNGOById, type NGO } from "@/data/mockData";
import ExtensionDemo from "./ExtensionDemo";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const NGOAnalyzer = () => {
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const location = useLocation();
  const params = useParams();
  const [currentNGO, setCurrentNGO] = useState<NGO | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if we're on an NGO profile page
  const isNGOPage = location.pathname.startsWith('/ngo/');
  
  // Get the NGO ID from URL params
  const ngoId = params.id;

  // Load NGO data on mount if we're on an NGO page
  useEffect(() => {
    if (isNGOPage && ngoId) {
      try {
        const ngoData = getNGOById(ngoId);
        console.log("NGOAnalyzer - NGO data loaded:", ngoData);
        setCurrentNGO(ngoData || null);
      } catch (error) {
        console.error("Error loading NGO data:", error);
        toast.error("Failed to load NGO data");
      }
    }
  }, [isNGOPage, ngoId]);
  
  const handleAnalyzerClick = () => {
    setIsLoading(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsLoading(false);
      
      if (currentNGO) {
        setDialogOpen(true);
        toast.success("NGO information successfully analyzed!");
      } else {
        toast.error("Could not analyze NGO information. Please try again.");
      }
    }, 800);
  };

  // Only show button on NGO pages
  if (!isNGOPage) return null;

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-cyan-500 hover:bg-cyan-600 text-white border-none"
            onClick={handleAnalyzerClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Scan className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Analyzing..." : "Analyze NGO"}
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 border-none bg-transparent max-w-[350px]">
          {currentNGO && (
            <ExtensionDemo 
              ngo={currentNGO}
              onClose={() => setDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NGOAnalyzer;
