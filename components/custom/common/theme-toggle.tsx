"use client";

import { useTheme } from "next-themes";

import { MoonStarIcon, SunMediumIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const newTheme = (theme: string | undefined) => {
    if (theme === "dark") return "light";
    return "dark";
  };

  const toggleTheme = () => {
    const nextTheme = newTheme(theme);
    setTheme(nextTheme);
  };

  return (
    <Button onClick={toggleTheme} variant="ghost" size="icon">
      <SunMediumIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonStarIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
