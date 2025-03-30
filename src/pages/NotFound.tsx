
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center py-12 text-center">
      <h1 className="mb-2 text-7xl font-bold text-care-600">404</h1>
      <p className="mb-8 text-2xl font-medium">Page Not Found</p>
      <p className="mb-8 max-w-md text-muted-foreground">
        The page you are looking for doesn't exist or has been moved. Let's get
        you back on track.
      </p>
      <div className="flex flex-wrap gap-4">
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/ngos">Browse NGOs</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
