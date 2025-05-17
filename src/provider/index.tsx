import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { InvoiceStoreProvider } from '../hooks/useInvoiceStore'

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <InvoiceStoreProvider>{children}</InvoiceStoreProvider>
    </ThemeProvider>
  )
}