import { ContactForm } from "@/components/contact/ContactForm";
import { Mail, MapPin } from "lucide-react";
import { profile } from "@/lib/mock-data";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-sm uppercase tracking-widest text-foreground-secondary">Contact</p>
<h1 className="mt-2 font-display text-3xl md:text-4xl">Let&apos;s talk</h1>
      <p className="mt-4 max-w-xl text-foreground-secondary">
        Have a project in mind, an internship opportunity, or just want to connect? Send a message below.
      </p>

      <div className="mt-6 flex flex-wrap gap-6 text-sm text-foreground-secondary">
        <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" /> {profile.email}</span>
        <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {profile.location}</span>
      </div>

      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}