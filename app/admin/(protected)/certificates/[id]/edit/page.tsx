import { notFound } from "next/navigation";
import { CertificateForm } from "@/components/admin/CertificateForm";
import { getCertificateByIdAdmin } from "@/features/certificates/services";
import { updateCertificate } from "../../actions";

export default async function EditCertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const certificate = await getCertificateByIdAdmin(id);
  if (!certificate) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl">Edit Certificate</h1>
      <div className="mt-6">
        <CertificateForm certificate={certificate} action={updateCertificate.bind(null, id)} />
      </div>
    </div>
  );
}