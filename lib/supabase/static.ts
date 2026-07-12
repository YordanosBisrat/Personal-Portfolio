import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

// For build-time contexts (generateStaticParams, generateMetadata at build)
// where no HTTP request exists yet, so cookies() cannot be called. Public
// RLS-governed reads work identically through this client since no session
// is needed for published-content queries.
export function createStaticClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}