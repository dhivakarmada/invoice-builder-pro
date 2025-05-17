import { motion } from 'framer-motion'
import { InvoiceForm } from '../components/InvoiceForm'
import { InvoicePreview } from '../components/InvoicePreview'
import { ExportButtons } from '../components/ExportButtons'
import { DarkModeToggle } from '../components/DarkModeToggle'
import { Logo } from '../components/Logo'

export const InvoicePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8 sticky top-0 bg-gray-50 dark:bg-gray-900 z-10 py-4">
        <Logo />
        <div className="flex items-center gap-4">
          <DarkModeToggle />
          <ExportButtons />
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <div className="space-y-6">
          <InvoiceForm />
        </div>
        <div className="sticky top-24 h-fit">
          <InvoicePreview />
        </div>
      </motion.div>
    </div>
  )
}