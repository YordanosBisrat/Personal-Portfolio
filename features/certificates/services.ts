import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database.types";

type CertificateRow = Database["public"]["Tables"]["certificates"]["Row"];

export interface AdminCertificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string | null;
  filePath: string;
  fileUrl: string;
  sortOrder: number;
}

export async function getAllCertificatesAdmin(): Promise<AdminCertificate[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("certificates").select("*").order("sort_order", { ascending: true });

  if (error) throw new Error(`Failed to load certificates: ${error.message}`);

  return (data ?? []).map(mapCertificateRow);
}

export async function getCertificateByIdAdmin(id: string): Promise<AdminCertificate | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("certificates").select("*").eq("id", id).maybeSingle();

  if (error) throw new Error(`Failed to load certificate: ${error.message}`);

  return data ? mapCertificateRow(data) : null;
}

function mapCertificateRow(row: CertificateRow): AdminCertificate {
  return {
    id: row.id,
    title: row.title,
    issuer: row.issuer,
    issueDate: row.issue_date,
    credentialUrl: row.credential_url,
    filePath: row.file_path,
    fileUrl: row.file_url,
    sortOrder: row.sort_order,
  };
}