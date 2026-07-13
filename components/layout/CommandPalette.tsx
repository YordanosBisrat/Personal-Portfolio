"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { navItems, externalLinks } from "@/lib/nav-items";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { SunMoon, FileDown, Code2 } from "lucide-react";

export function CommandPalette({ resumeUrl }: { resumeUrl: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const runCommand = (action: () => void) => {
    setOpen(false);
    action();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pages, links, actions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigate">
          {navItems.map((item) => (
            <CommandItem
              key={item.href}
              onSelect={() => runCommand(() => router.push(item.href))}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Links">
          {externalLinks.map((link) => (
            <CommandItem
              key={link.href}
              onSelect={() => runCommand(() => window.open(link.href, "_blank"))}
            >
              {link.label === "GitHub" && <SiGithub className="mr-2 h-4 w-4" />}
              {link.label === "LinkedIn" && <LinkedInIcon className="mr-2 h-4 w-4" />}
              {link.label === "LeetCode" && <Code2 className="mr-2 h-4 w-4" />}
              {link.label}
            </CommandItem>
          ))}
          <CommandItem
            onSelect={() => runCommand(() => window.open(resumeUrl, "_blank"))}
          >
            <FileDown className="mr-2 h-4 w-4" />
            Download Resume
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() => runCommand(() => setTheme(theme === "dark" ? "light" : "dark"))}
          >
            <SunMoon className="mr-2 h-4 w-4" />
            Toggle Theme
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}