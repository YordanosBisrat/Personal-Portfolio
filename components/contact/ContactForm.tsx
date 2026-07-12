"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(3, "Subject is too short"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type ContactValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    } = useForm<ContactValues>({
    // @hookform/resolvers' Zod 4 type definitions lag behind Zod's internal
    // version marker on recent patch releases (tracked upstream, no fix yet as
    // of this Zod version). Validation works correctly at runtime — this is a
    // compile-time-only type mismatch, so the schema is cast to `any` at the
    // call boundary to bypass strict overload resolution.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(contactSchema as any) as Resolver<ContactValues>,
    });
  const onSubmit = async (values: ContactValues) => {
    // Phase 5: POST to /api/contact, which inserts into contact_messages via the server Supabase client.
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log("Contact form submitted:", values);
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="glass-card flex flex-col items-center gap-3 p-12 text-center">
        <CheckCircle2 className="h-8 w-8" style={{ color: "var(--color-accent)" }} />
        <p className="font-medium">Message sent</p>
<p className="text-sm text-foreground-secondary">Thanks for reaching out — I&apos;ll get back to you soon.</p>
        <button onClick={() => setSubmitted(false)} className="focus-ring mt-2 text-sm underline" style={{ color: "var(--color-accent)" }}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-card space-y-5 p-8">
      <div>
        <label htmlFor="name" className="text-sm font-medium">Name</label>
        <input id="name" {...register("name")} className="focus-ring mt-1.5 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm" style={{ borderColor: "var(--color-border-glass)" }} />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input id="email" type="email" {...register("email")} className="focus-ring mt-1.5 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm" style={{ borderColor: "var(--color-border-glass)" }} />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="text-sm font-medium">Subject</label>
        <input id="subject" {...register("subject")} className="focus-ring mt-1.5 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm" style={{ borderColor: "var(--color-border-glass)" }} />
        {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">Message</label>
        <textarea id="message" rows={5} {...register("message")} className="focus-ring mt-1.5 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm" style={{ borderColor: "var(--color-border-glass)" }} />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="focus-ring inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium disabled:opacity-60" style={{ backgroundColor: "var(--color-accent)", color: "#151311" }}>
        {isSubmitting ? "Sending..." : "Send Message"} <Send className="h-4 w-4" />
      </button>
    </form>
  );
}