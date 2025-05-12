
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase, cleanupAuthState } from "@/integrations/supabase/client";
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

interface ProfileData {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  organization?: string;
  verification_status?: VerificationStatus;
  created_at?: string;
  updated_at?: string;
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
    // Set up auth state listener FIRST to prevent missing auth events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        
        if (session?.user) {
          setIsAuthenticated(true);
          // Defer data fetching to prevent deadlocks
          setTimeout(() => {
            getUserProfile(session.user);
          }, 0);
        } else {
          setUser(null);
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        setIsAuthenticated(true);
        getUserProfile(session.user);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const getUserProfile = async (authUser: User) => {
    try {
      // Get profile data from our profiles table
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        setUser({
          id: authUser.id,
          email: authUser.email || '',
          role: 'guest'
        });
        setIsLoading(false);
        return;
      }

      if (profile) {
        const userObject: AuthUser = {
          id: authUser.id,
          email: authUser.email || '',
          role: profile.role as UserRole,
          name: profile.name,
          organization: profile.organization,
          verification_status: profile.verification_status as VerificationStatus,
        };
        
        setUser(userObject);
      } else {
        setUser({
          id: authUser.id,
          email: authUser.email || '',
          role: 'guest'
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error processing user profile:", error);
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Clean up existing auth state to prevent auth limbo
      cleanupAuthState();
      
      // Try global sign out first
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast.success("Successfully signed in!");
      
      if (data.user) {
        // Force a page reload to ensure clean state
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      }
    } catch (error: any) {
      console.error("Login attempt failed:", error);
      let errorMessage = "Login failed";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.toString().includes("Unexpected end of JSON")) {
        errorMessage = "Authentication error. Please check your Supabase project configuration.";
      }
      
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      
      // Clean up auth state
      cleanupAuthState();
      
      // Attempt global sign out
      await supabase.auth.signOut({ scope: 'global' });
      
      toast.success("You have been signed out");
      
      // Force page reload for a clean state
      window.location.href = '/login';
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
      
      // Clean up existing auth state
      cleanupAuthState();
      
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
      
      // Clean up existing auth state
      cleanupAuthState();
      
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
      
      // Clean up existing auth state
      cleanupAuthState();
      
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
      const { data, error } = await supabase
        .from('profiles')
        .select('verification_status')
        .eq('id', ngoId)
        .eq('role', 'ngo_admin')
        .single();
        
      if (error || !data) {
        return false;
      }
      
      return data.verification_status === 'approved';
    } catch (error) {
      console.error("Error checking NGO verification:", error);
      return false;
    }
  };

  const getVerifiedNGOs = async (): Promise<any[]> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'ngo_admin')
        .eq('verification_status', 'approved');
        
      if (error || !data) {
        return [];
      }
      
      return data;
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
