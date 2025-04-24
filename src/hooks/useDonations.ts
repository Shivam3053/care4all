
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Donation {
  id: string;
  amount: number;
  ngo_name: string;
  created_at: string;
  status: string;
}

export const useDonations = () => {
  const [recentDonations, setRecentDonations] = useState<Donation[]>([]);
  const [totalDonated, setTotalDonated] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch initial donations
  useEffect(() => {
    if (!user) return;

    const fetchDonations = async () => {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching donations:', error);
        return;
      }

      setRecentDonations(data);
      const total = data.reduce((sum, donation) => sum + Number(donation.amount), 0);
      setTotalDonated(total);
    };

    fetchDonations();
  }, [user]);

  // Subscribe to real-time updates
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('donations-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'donations',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const newDonation = payload.new as Donation;
          setRecentDonations((prev) => [newDonation, ...prev]);
          setTotalDonated((prev) => prev + Number(newDonation.amount));
          
          toast({
            title: "Donation Successful!",
            description: `Thank you for donating ₹${newDonation.amount} to ${newDonation.ngo_name}`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, toast]);

  return { recentDonations, totalDonated };
};
