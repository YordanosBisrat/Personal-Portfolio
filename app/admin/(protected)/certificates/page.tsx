import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllCertificatesAdmin } from "@/features/certificates/services";
import { deleteCertificate } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminCertificatesPage() {
  const certificates = await getAllCertificatesAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">Certificates</h1>
        <Link href="/admin/certificates/new" className="focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium" style={{ backgroundColor: "var(--color-accent)", color: "#151311" }}>
          <Plus className="h-4 w-4" /> Add Certificate
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {certificates.map((cert) => (
          <div key={cert.id} className="glass-card flex items-center justify-between p-4">
            <div>
              <p className="font-medium">{cert.title}</p>
              <p className="text-xs text-foreground-secondary">{cert.issuer} · {cert.issueDate}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/certificates/${cert.id}/edit`} className="focus-ring text-sm text-foreground-secondary hover:text-foreground">Edit</Link>
              <form action={deleteCertificate.bind(null, cert.id, cert.filePath)}>
                <DeleteButton />
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}