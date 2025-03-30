
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Github, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-care-600 dark:text-care-400">
              Care<span className="text-impact-500">4</span>All
            </span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Connecting donors with verified NGOs for maximum impact through
            transparent giving.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Support</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              About Us
            </Link>
            <Link
              to="/ngos"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Find NGOs
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">For NGOs</h3>
          <div className="flex flex-col gap-2">
            <Link
              to="/register"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Register Your NGO
            </Link>
            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              NGO Login
            </Link>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Verification Process
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Subscribe to our Newsletter</h3>
          <p className="text-sm text-muted-foreground">
            Get the latest updates on NGOs and impact stories.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            />
            <Button size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Subscribe</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mt-8 flex flex-col items-center justify-between gap-4 pt-4 text-center md:flex-row border-t">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Care4All. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-foreground">
            Terms of Service
          </a>
          <a href="#" className="hover:text-foreground">
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
