'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
      enableSystem={false}
      forcedTheme="dark"
    >
      {children}
    </NextThemesProvider>
  )
}

export const useTheme = useNextTheme
