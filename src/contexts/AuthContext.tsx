import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from '@supabase/supabase-js';

type UserRole = 'donor' | 'ngo_admin' | 'super_admin' | 'guest';
type VerificationStatus = 'pending' | 'approved' | 'rejected';

interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  organization?: string;
  verification_status?: VerificationStatus;
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  registerDonor: (email: string, password: string, name: string) => Promise<void>;
  registerNGO: (email: string, password: string, name: string, ngoType: string) => Promise<void>;
  registerSuperAdmin: (email: string, password: string, name: string, secretCode: string) => Promise<void>;
  hasPermission: (permission: string) => boolean;
  isNGOVerified: (ngoId: string) => Promise<boolean>;
  getVerifiedNGOs: () => Promise<any[]>;
  getUserRoleLabel: () => string;
  getUserDashboardPath: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        
        if (session?.user) {
          setIsAuthenticated(true);
          setTimeout(() => {
            getUserDataFromMetadata(session.user);
          }, 0);
        } else {
          setUser(null);
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        setIsAuthenticated(true);
        getUserDataFromMetadata(session.user);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const getUserDataFromMetadata = (user: User) => {
    try {
      const metadata = user.user_metadata;
      
      if (!metadata) {
        setUser({
          id: user.id,
          email: user.email || '',
          role: 'guest'
        });
        setIsLoading(false);
        return;
      }

      const role = metadata.user_role as UserRole || 'guest';
      
      const userObject: AuthUser = {
        id: user.id,
        email: user.email || '',
        role: role,
        name: metadata.full_name || metadata.organization_name,
      };
      
      if (role === 'ngo_admin') {
        userObject.organization = metadata.organization_name;
        userObject.verification_status = metadata.verification_status || 'pending';
      }
      
      if (role === 'super_admin') {
        userObject.verification_status = metadata.verification_status || 'pending';
      }
      
      setUser(userObject);
      setIsLoading(false);
    } catch (error) {
      console.error("Error processing user metadata:", error);
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error);
        throw error;
      }

      toast.success("Successfully signed in!");
    } catch (error: any) {
      console.error("Login attempt failed:", error);
      let errorMessage = "Login failed";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.toString().includes("Unexpected end of JSON")) {
        errorMessage = "Authentication error. Please check your Supabase project configuration.";
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      toast.success("You have been signed out");
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || "Sign out failed");
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });

      if (error) throw error;
      toast.success("Password reset instructions sent to your email");
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset instructions");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registerDonor = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            user_role: 'donor',
          }
        }
      });

      if (error) throw error;
      
      toast.success("Registration successful! Please check your email to verify your account.");
      navigate('/login?role=donor');
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registerNGO = async (email: string, password: string, name: string, ngoType: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            organization_name: name,
            user_role: 'ngo_admin',
            ngo_type: ngoType,
            verification_status: 'pending'
          }
        }
      });

      if (error) throw error;
      
      toast.success("Registration submitted! Your NGO profile is pending verification.");
      navigate('/login?role=ngo');
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registerSuperAdmin = async (email: string, password: string, name: string, secretCode: string) => {
    try {
      setIsLoading(true);
      
      if (secretCode !== "admin123") {
        throw new Error("Invalid admin registration code");
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            user_role: 'super_admin',
            verification_status: 'pending',
          }
        }
      });

      if (error) throw error;
      
      toast.success("Super Admin registration submitted! Your account will be reviewed by existing administrators.");
      navigate('/login?role=admin');
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    const rolePermissions: Record<UserRole, string[]> = {
      super_admin: [
        'approve_ngo', 'reject_ngo', 'manage_donations', 
        'manage_users', 'manage_campaigns', 'view_analytics',
        'edit_platform', 'view_dashboard', 'admin_dashboard'
      ],
      ngo_admin: [
        'edit_ngo_profile', 'view_ngo_donations', 'create_campaign',
        'view_ngo_analytics', 'view_dashboard', 'ngo_dashboard'
      ],
      donor: [
        'make_donation', 'view_donation_history', 'follow_ngo',
        'view_dashboard', 'user_dashboard'
      ],
      guest: ['view_ngos', 'register', 'login']
    };
    
    return rolePermissions[user.role]?.includes(permission) || false;
  };

  const isNGOVerified = async (ngoId: string): Promise<boolean> => {
    try {
      return new Promise(resolve => {
        setTimeout(() => {
          const isVerified = Math.random() > 0.3;
          resolve(isVerified);
        }, 300);
      });
    } catch (error) {
      console.error("Error checking NGO verification:", error);
      return false;
    }
  };

  const getVerifiedNGOs = async (): Promise<any[]> => {
    try {
      return new Promise(resolve => {
        setTimeout(() => {
          const mockNGOs = [
            {
              id: "1",
              name: "Children First Foundation",
              type: "children",
              description: "Supporting underprivileged children with education and healthcare",
              location: "Mumbai, Maharashtra",
              is_verified: true
            },
            {
              id: "2",
              name: "EcoLife Initiative",
              type: "environment",
              description: "Working towards a sustainable future through conservation efforts",
              location: "Bengaluru, Karnataka",
              is_verified: true
            }
          ];
          resolve(mockNGOs);
        }, 500);
      });
    } catch (error) {
      console.error("Error fetching verified NGOs:", error);
      return [];
    }
  };

  const getUserRoleLabel = (): string => {
    if (!user) return 'Guest';

    switch(user.role) {
      case 'super_admin':
        return 'Admin';
      case 'ngo_admin':
        return 'NGO';
      case 'donor':
        return 'Donor';
      default:
        return 'User';
    }
  };

  const getUserDashboardPath = (): string => {
    if (!user) return '/';

    switch(user.role) {
      case 'super_admin':
        return '/admin/dashboard';
      case 'ngo_admin':
        return '/ngo/dashboard';
      case 'donor':
        return '/dashboard';
      default:
        return '/';
    }
  };

  const value = {
    user,
    session,
    isLoading,
    isAuthenticated,
    signIn,
    signOut,
    resetPassword,
    registerDonor,
    registerNGO,
    registerSuperAdmin,
    hasPermission,
    isNGOVerified,
    getVerifiedNGOs,
    getUserRoleLabel,
    getUserDashboardPath
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
