import type { Metadata } from "next";
import { playfairDisplay, inter } from "./fonts";
import { ThemeProvider } from "@/components/layout/theme-provider";
import "./globals.css";
import "highlight.js/styles/github-dark.css";

export const metadata: Metadata = {
  title: {
    default: "Yordanos Bisrat — Software Engineer",
    template: "%s | Yordanos Bisrat",
  },
  description:
    "Software Engineering student building full-stack products — Next.js, Flutter, and systems programming.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}