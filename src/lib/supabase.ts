import { createClient } from '@supabase/supabase-js';

/**
 * Supabase Client for PlannrAI Web
 * Uses the same Supabase project as the mobile app
 * 
 * SECURITY: Keys are from environment variables
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Add email to waitlist
 */
export async function joinWaitlist(email: string, name?: string, referralSource?: string) {
    const { data, error } = await supabase
        .from('waitlist')
        .insert({
            email: email.toLowerCase().trim(),
            name,
            referral_source: referralSource || 'organic',
        })
        .select()
        .single();

    if (error) {
        // Handle duplicate email
        if (error.code === '23505') {
            return { success: false, error: 'You\'re already on the list! 🎉' };
        }
        return { success: false, error: 'Something went wrong. Please try again.' };
    }

    return { success: true, data };
}

/**
 * Get waitlist count
 */
export async function getWaitlistCount(): Promise<number> {
    const { count, error } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error('Error fetching waitlist count:', error);
        return 0;
    }

    return count || 0;
}
