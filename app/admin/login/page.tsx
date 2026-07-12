"use client";

import { useActionState } from "react";
import { signIn, type LoginState } from "./actions";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(signIn, { error: null });

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form action={formAction} className="glass-card w-full max-w-sm space-y-5 p-8">
        <h1 className="font-display text-xl">Admin Sign In</h1>

        <div>
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input id="email" name="email" type="email" required className="focus-ring mt-1.5 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm" style={{ borderColor: "var(--color-border-glass)" }} />
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <input id="password" name="password" type="password" required className="focus-ring mt-1.5 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm" style={{ borderColor: "var(--color-border-glass)" }} />
        </div>

        {state.error && <p className="text-sm text-red-400">{state.error}</p>}

        <button type="submit" disabled={isPending} className="focus-ring w-full rounded-full px-6 py-3 text-sm font-medium disabled:opacity-60" style={{ backgroundColor: "var(--color-accent)", color: "#151311" }}>
          {isPending ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}