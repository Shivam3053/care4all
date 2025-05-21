
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
  logo?: File;
  teamImage?: File;
  achievementImage?: File;
  galleryImages?: FileList;
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
    
    // Step 2: Create or update the profile with additional information
    if (authData?.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: authData.user.id,
          email: ngoData.email,
          role: 'ngo_admin',
          name: ngoData.name,
          organization: ngoData.name,
          verification_status: 'approved',
          updated_at: new Date().toISOString()
        });
      
      if (profileError) throw profileError;
      
      // Handle image uploads if storage is available
      if (ngoData.logo || ngoData.teamImage || ngoData.achievementImage || ngoData.galleryImages) {
        console.log('Images provided but storage implementation not complete');
        // TODO: In a production application, upload the images to storage here
        // This would typically involve:
        // 1. Create a folder for the NGO
        // 2. Upload each image with proper naming
        // 3. Store the image paths in the database
      }
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

// Update an NGO
export const updateNGO = async (ngoId: string, updateData: {
  organization?: string;
  email?: string;
  verification_status?: string;
  logo?: File;
  teamImage?: File;
  achievementImage?: File;
  galleryImages?: FileList;
}) => {
  try {
    // First update the profile data
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', ngoId)
      .eq('role', 'ngo_admin');
      
    if (error) throw error;
    
    // Handle image updates if provided
    if (updateData.logo || updateData.teamImage || updateData.achievementImage || updateData.galleryImages) {
      console.log('Images provided for update but storage implementation not complete');
      // TODO: If images are provided in the updateData, upload them to storage
      // and update the corresponding paths in the database
    }
    
    return { data, error: null };
  } catch (error: any) {
    console.error('Error updating NGO:', error);
    throw new Error(error.message || 'Failed to update NGO');
  }
};

// Delete an NGO
export const deleteNGO = async (ngoId: string) => {
  try {
    // First delete the profile
    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', ngoId)
      .eq('role', 'ngo_admin');
      
    if (profileError) throw profileError;
    
    // Then use admin API to delete the user (this would typically be done via an admin function)
    // Note: In a real implementation, you would use Supabase Edge Functions with admin rights
    // or a dedicated backend endpoint to delete the auth user
    
    return { success: true, message: 'NGO deleted successfully' };
  } catch (error: any) {
    console.error('Error deleting NGO:', error);
    throw new Error(error.message || 'Failed to delete NGO');
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
  updateNGO,
  deleteNGO,
  getAllUsers,
  getAllDonations
};
