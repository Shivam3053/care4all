
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// Note: In production, these would be environment variables
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

type UserRole = 'donor' | 'ngo_admin' | 'super_admin' | 'guest';

interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  organization?: string;
  verification_status?: 'pending' | 'approved' | 'rejected';
}

interface AuthContextType {
  user: AuthUser | null;
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session on component mount
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
          const { data: { user: authUser } } = await supabase.auth.getUser();

          if (authUser) {
            // Fetch user profile based on role
            let userRole: UserRole = 'guest';
            let userData = null;

            // Check profiles table (for donors)
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', authUser.id)
              .single();

            if (!profileError && profile) {
              userRole = profile.user_role as UserRole;
              userData = profile;
            } else {
              // Check NGOs table
              const { data: ngo, error: ngoError } = await supabase
                .from('ngos')
                .select('*')
                .eq('id', authUser.id)
                .single();

              if (!ngoError && ngo) {
                userRole = 'ngo_admin';
                userData = ngo;
              } else {
                // Check admins table
                const { data: admin, error: adminError } = await supabase
                  .from('admins')
                  .select('*')
                  .eq('id', authUser.id)
                  .single();

                if (!adminError && admin) {
                  userRole = 'super_admin';
                  userData = admin;
                }
              }
            }

            if (userData) {
              setUser({
                id: authUser.id,
                email: authUser.email || '',
                role: userRole,
                name: userData.full_name || userData.name,
                organization: userData.organization_name,
                verification_status: userData.verification_status || userData.status,
              });
              setIsAuthenticated(true);
            }
          }
        }
      } catch (error) {
        console.error("Session check error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // User just signed in - similar logic as above, but we don't set isLoading
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (authUser) {
          // Fetch user profile
          // (Similar code as above to determine user role and data)
          // ...
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Get user profile to determine their role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (!profileError && profile) {
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          role: profile.user_role as UserRole,
          name: profile.full_name,
        });
        setIsAuthenticated(true);
        
        toast.success(`Welcome back, ${profile.full_name}!`);
        navigate('/dashboard');
        return;
      }

      // If profile not found, check NGOs table
      const { data: ngo, error: ngoError } = await supabase
        .from('ngos')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (!ngoError && ngo) {
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          role: 'ngo_admin',
          name: ngo.name,
          organization: ngo.name,
          verification_status: ngo.verification_status,
        });
        setIsAuthenticated(true);
        
        if (ngo.verification_status === 'pending') {
          toast.warning("Your NGO is pending verification. Limited access granted.");
        } else {
          toast.success("Welcome back to your NGO dashboard!");
        }
        
        navigate('/ngo/dashboard');
        return;
      }

      // If not found in NGOs, check admins table
      const { data: admin, error: adminError } = await supabase
        .from('admins')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (!adminError && admin) {
        if (admin.status === 'pending_approval') {
          throw new Error("Your admin account is pending approval");
        }
        
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          role: 'super_admin',
          name: admin.full_name,
          verification_status: admin.status,
        });
        setIsAuthenticated(true);
        
        toast.success("Welcome back, Admin!");
        navigate('/admin/dashboard');
        return;
      }

      // If we get here, the user exists in auth but not in any profile table
      throw new Error("User profile not found. Please contact support.");

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
      setUser(null);
      setIsAuthenticated(false);
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
      
      // Register user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: 'donor',
          }
        }
      });

      if (error) throw error;

      // Create user profile in database
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user?.id,
          full_name: name,
          email: email,
          user_role: 'donor',
        });

      if (profileError) throw profileError;
      
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
      
      // Register NGO with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            organization_name: name,
            role: 'ngo_admin',
          }
        }
      });

      if (error) throw error;

      // Create NGO profile in database
      const { error: ngoError } = await supabase
        .from('ngos')
        .insert({
          id: data.user?.id,
          name: name,
          email: email,
          ngo_type: ngoType,
          verification_status: 'pending',
        });

      if (ngoError) throw ngoError;
      
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

      // Register Super Admin with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: 'super_admin',
            status: 'pending_approval', // Requires manual approval
          }
        }
      });

      if (error) throw error;

      // Create admin profile in database
      const { error: adminError } = await supabase
        .from('admins')
        .insert({
          id: data.user?.id,
          full_name: name,
          email: email,
          status: 'pending_approval',
        });

      if (adminError) throw adminError;
      
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
