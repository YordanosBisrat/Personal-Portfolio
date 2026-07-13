import { Mail, MailOpen } from "lucide-react";
import { getAllMessagesAdmin } from "@/features/contact/services";
import { markMessageRead, deleteMessage } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminMessagesPage() {
  const messages = await getAllMessagesAdmin();

  return (
    <div>
      <h1 className="font-display text-2xl">Messages</h1>

      {messages.length === 0 && (
        <p className="mt-6 text-sm text-foreground-secondary">No messages yet.</p>
      )}

      <div className="mt-6 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="glass-card p-5"
            style={!msg.isRead ? { borderColor: "var(--color-accent)" } : undefined}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                {msg.isRead ? (
                  <MailOpen className="mt-0.5 h-4 w-4 shrink-0 text-foreground-secondary" />
                ) : (
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--color-accent)" }} />
                )}
                <div>
                  <p className="font-medium">
                    {msg.subject}
                    {!msg.isRead && (
                      <span className="ml-2 rounded-full px-2 py-0.5 text-xs" style={{ backgroundColor: "var(--color-accent)", color: "#151311" }}>
                        New
                      </span>
                    )}
                  </p>
                  <p className="mt-1 text-xs text-foreground-secondary">
                    {msg.name} · {msg.email} · {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-4">
                {!msg.isRead && (
                  <form action={markMessageRead.bind(null, msg.id)}>
                    <button type="submit" className="focus-ring text-sm text-foreground-secondary hover:text-foreground">
                      Mark read
                    </button>
                  </form>
                )}
                <form action={deleteMessage.bind(null, msg.id)}>
                  <DeleteButton />
                </form>
              </div>
            </div>

            <p className="mt-4 whitespace-pre-wrap text-sm text-foreground-secondary">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}