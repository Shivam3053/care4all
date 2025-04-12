
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Scan } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import { getNGOById, type NGO } from "@/data/mockData";
import ExtensionDemo from "./ExtensionDemo";
import { toast } from "sonner";

const NGOAnalyzer = () => {
  const [showAnalyzer, setShowAnalyzer] = useState(false);
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
      const ngoData = getNGOById(ngoId);
      setCurrentNGO(ngoData || null);
    }
  }, [isNGOPage, ngoId]);
  
  const handleAnalyzerClick = () => {
    setIsLoading(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsLoading(false);
      
      if (currentNGO) {
        setShowAnalyzer(true);
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
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-cyan-500 hover:bg-cyan-600 text-white border-none"
        onClick={handleAnalyzerClick}
        disabled={isLoading}
      >
        <Scan className={`mr-2 h-4 w-4 ${isLoading ? 'animate-pulse' : ''}`} />
        {isLoading ? "Analyzing..." : "Analyze NGO"}
      </Button>
      
      {showAnalyzer && currentNGO && (
        <ExtensionDemo 
          ngo={currentNGO}
          isOpen={showAnalyzer} 
          onClose={() => setShowAnalyzer(false)} 
        />
      )}
    </>
  );
};

export default NGOAnalyzer;
