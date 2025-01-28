import { supabase } from './supabaseClient';
import { User } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  email: string;
  avatar_url: string;
  expires_at: string | null;
  generations_count: number;
}

export async function getFreshUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, avatar_url, expires_at, generations_count')
      .eq('id', userId)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

export async function checkProAccess(userId: string): Promise<boolean> {
  try {
    const profile = await getFreshUserProfile(userId);
    if (!profile?.expires_at) return false;

    const expiryDate = new Date(profile.expires_at);
    const currentDate = new Date();
    
    return currentDate <= expiryDate;
  } catch (error) {
    console.error('Error checking pro access:', error);
    return false;
  }
}

// Only track generations for authenticated users
export async function incrementGenerationCount(user: User) {
  try {
    const profile = await getFreshUserProfile(user.id);
    if (!profile) throw new Error('Could not fetch user profile');

    const { data, error } = await supabase
      .from('profiles')
      .update({ generations_count: (profile.generations_count || 0) + 1 })
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error incrementing generation count:', error);
    throw error;
  }
}
