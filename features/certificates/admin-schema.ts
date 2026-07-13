import { z } from "zod";

export const certificateFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  issuer: z.string().min(1, "Issuer is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  credentialUrl: z.union([z.string().url("Enter a valid URL"), z.literal("")]).optional(),
  sortOrder: z.coerce.number().int().default(0),
});

export type CertificateFormValues = z.infer<typeof certificateFormSchema>;

export interface ActionState {
  error: Record<string, string[]> | null;
}

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];