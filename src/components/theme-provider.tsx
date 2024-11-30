"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props} attribute="class">
      {children}
    </NextThemesProvider>
  );
}
