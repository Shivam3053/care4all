
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        
        // Don't fetch profile data in the callback to prevent authentication deadlocks
        if (session?.user) {
          setIsAuthenticated(true);
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        setIsAuthenticated(true);
        fetchUserProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      // Check profiles table (for donors)
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!profileError && profile) {
        setUser({
          id: userId,
          email: profile.email,
          role: profile.user_role as UserRole,
          name: profile.full_name,
        });
        setIsLoading(false);
        return;
      }

      // Check NGOs table
      const { data: ngo, error: ngoError } = await supabase
        .from('ngos')
        .select('*')
        .eq('id', userId)
        .single();

      if (!ngoError && ngo) {
        setUser({
          id: userId,
          email: ngo.email,
          role: 'ngo_admin',
          name: ngo.name,
          organization: ngo.name,
          verification_status: ngo.verification_status as VerificationStatus,
        });
        setIsLoading(false);
        return;
      }

      // Check admins table
      const { data: admin, error: adminError } = await supabase
        .from('admins')
        .select('*')
        .eq('id', userId)
        .single();

      if (!adminError && admin) {
        setUser({
          id: userId,
          email: admin.email,
          role: 'super_admin',
          name: admin.full_name,
          verification_status: admin.status as VerificationStatus,
        });
        setIsLoading(false);
        return;
      }

      // If no profile found
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
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

      if (error) throw error;

      // Auth listener will handle setting the user state
      toast.success("Successfully signed in!");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
      console.error("Sign in error:", error);
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
      navigate('/login');
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
          }
        }
      });

      if (error) throw error;
      
      toast.success("Registration submitted! Your NGO profile is pending verification.");
      navigate('/login');
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
      
      // Verify admin secret code (in a real app, this would be a secure process)
      if (secretCode !== "CARE4ALL-ADMIN-2023") {
        throw new Error("Invalid admin registration code");
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            user_role: 'super_admin',
            status: 'pending_approval', // Requires manual approval
          }
        }
      });

      if (error) throw error;
      
      toast.success("Super Admin registration submitted! Your account will be reviewed by existing administrators.");
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Permission checking function for RBAC
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    // Define permission mappings based on roles
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
    
    // Check if the user's role has the requested permission
    return rolePermissions[user.role]?.includes(permission) || false;
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
    hasPermission
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
