import { createClient } from "@supabase/supabase-js";

declare const process: {
  env: {
    NEXT_PUBLIC_SUPABASE_URL?: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
  };
};

const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const rawSupabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

const isPlaceholderValue = (value?: string) =>
  !value ||
  value === "YOUR_SUPABASE_URL" ||
  value === "YOUR_SUPABASE_KEY" ||
  value.toLowerCase().includes("your_supabase");

export const isSupabaseConfigured =
  !isPlaceholderValue(rawSupabaseUrl) &&
  !isPlaceholderValue(rawSupabaseAnonKey);

const supabaseUrl = isPlaceholderValue(rawSupabaseUrl)
  ? "https://placeholder.supabase.co"
  : rawSupabaseUrl || "https://placeholder.supabase.co";

const supabaseAnonKey = isPlaceholderValue(rawSupabaseAnonKey)
  ? "placeholder-anon-key"
  : rawSupabaseAnonKey || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    flowType: "pkce",
    detectSessionInUrl: true,
  },
});