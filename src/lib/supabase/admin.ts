import { createClient } from "@supabase/supabase-js";

// Check for required keys
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn("⚠️ SUPABASE_SERVICE_ROLE_KEY is missing! Server-side onboarding will fail.");
}

// Supabase Admin client using Service Role Key
// This client bypasses RLS and is used for server-side management/onboarding
export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || "", // Fallback to avoid immediate crash // This MUST be in your .env
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);
