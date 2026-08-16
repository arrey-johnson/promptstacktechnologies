import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type SupabaseServerConfig = {
  url: string;
  serviceRoleKey: string;
};

export function getSupabaseServerConfig(): SupabaseServerConfig | null {
  const url = (
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    ""
  ).trim();
  const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();

  if (!url || !serviceRoleKey) {
    return null;
  }

  return { url, serviceRoleKey };
}

export function createSupabaseServiceClient(
  config: SupabaseServerConfig = getSupabaseServerConfig()!,
): SupabaseClient {
  return createClient(config.url, config.serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseServerConfig() !== null;
}
