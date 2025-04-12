
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Scan } from "lucide-react";
import { useLocation } from "react-router-dom";
import { getNGOById, type NGO } from "@/data/mockData";
import ExtensionDemo from "./ExtensionDemo";

const NGOAnalyzer = () => {
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const location = useLocation();
  const [currentNGO, setCurrentNGO] = useState<NGO | null>(null);

  // Check if we're on an NGO profile page
  const isNGOPage = location.pathname.startsWith('/ngo/');
  
  const handleAnalyzerClick = () => {
    if (isNGOPage) {
      // Extract NGO ID from URL
      const ngoId = location.pathname.split('/').pop();
      
      if (ngoId) {
        // Get NGO data using the ID
        const ngoData = getNGOById(ngoId);
        setCurrentNGO(ngoData || null);
        setShowAnalyzer(true);
      }
    }
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
      >
        <Scan className="mr-2 h-4 w-4" />
        Analyze NGO
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
