
import { CheckCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface VerifiedBadgeProps {
  className?: string;
  showTooltip?: boolean;
}

const VerifiedBadge = ({ className = "", showTooltip = true }: VerifiedBadgeProps) => {
  const badge = (
    <span className={`inline-flex items-center ${className}`}>
      <CheckCircle className="h-4 w-4 text-green-600 mr-1 fill-green-100" />
      <span className="text-xs font-medium text-green-700">Verified</span>
    </span>
  );

  if (!showTooltip) return badge;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badge}
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">This NGO has been verified by Care4All administrators</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VerifiedBadge;
