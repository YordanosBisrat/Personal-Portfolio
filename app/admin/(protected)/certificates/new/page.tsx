import { CertificateForm } from "@/components/admin/CertificateForm";
import { createCertificate } from "../actions";

export default function NewCertificatePage() {
  return (
    <div>
      <h1 className="font-display text-2xl">Add Certificate</h1>
      <div className="mt-6">
        <CertificateForm action={createCertificate} />
      </div>
    </div>
  );
}