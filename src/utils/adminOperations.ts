
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Add a new NGO to the system
export const addNGO = async (ngoData: {
  email: string;
  password: string;
  name: string;
  category: string;
  description?: string;
  address?: string;
  phone?: string;
  website?: string;
  registrationNo?: string;
  upiId?: string;
}) => {
  try {
    // Step 1: Create auth user with ngo_admin role
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: ngoData.email,
      password: ngoData.password || Math.random().toString(36).slice(-8), // Generate random password if not provided
      options: {
        data: {
          organization_name: ngoData.name,
          user_role: 'ngo_admin',
          ngo_type: ngoData.category,
          verification_status: 'approved' // Auto-approve NGOs added by admin
        }
      }
    });
    
    if (authError) throw authError;
    
    // Step 2: Update the profile with additional information
    if (authData?.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          description: ngoData.description,
          location: ngoData.address,
          verification_status: 'approved',
          ngo_type: ngoData.category,
          contact_phone: ngoData.phone,
          website_url: ngoData.website,
          registration_number: ngoData.registrationNo,
          upi_id: ngoData.upiId
        })
        .eq('id', authData.user.id);
      
      if (profileError) throw profileError;
    }
    
    return { success: true, message: 'NGO added successfully' };
  } catch (error: any) {
    console.error('Error adding NGO:', error);
    throw new Error(error.message || 'Failed to add NGO');
  }
};

// Verify an NGO
export const verifyNGO = async (ngoId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ verification_status: 'approved' })
      .eq('id', ngoId)
      .eq('role', 'ngo_admin');
      
    if (error) throw error;
    
    return { data, error: null };
  } catch (error: any) {
    console.error('Error verifying NGO:', error);
    return { data: null, error };
  }
};

// Reject an NGO
export const rejectNGO = async (ngoId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ verification_status: 'rejected' })
      .eq('id', ngoId)
      .eq('role', 'ngo_admin');
      
    if (error) throw error;
    
    return { data, error: null };
  } catch (error: any) {
    console.error('Error rejecting NGO:', error);
    return { data: null, error };
  }
};

// Get all users (for admin panel)
export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return { data: null, error };
  }
};

// Get all donations (for admin panel)
export const getAllDonations = async () => {
  try {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching donations:', error);
    return { data: null, error };
  }
};

export default {
  addNGO,
  verifyNGO,
  rejectNGO,
  getAllUsers,
  getAllDonations
};
