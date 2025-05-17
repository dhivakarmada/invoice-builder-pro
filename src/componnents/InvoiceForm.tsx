import { motion } from 'framer-motion'
import { Plus, Trash2, Copy } from 'lucide-react'
import { useInvoiceStore, useInvoiceActions } from '../hooks/useInvoiceStore'
import { LineItem } from './LineItem'
import { CustomerForm } from './CustomerForm'
import { CompanyForm } from './CompanyForm'
import { MetaForm } from './MetaForm'
import { TaxDiscountControls } from './TaxDiscountControls'
import { Button } from './ui/button'

export const InvoiceForm = () => {
  const { lineItems } = useInvoiceStore()
  const { addLineItem, resetInvoice } = useInvoiceActions()

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
      >
        <CompanyForm />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
      >
        <CustomerForm />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
      >
        <MetaForm />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
      >
        <TaxDiscountControls />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Line Items
          </h2>
          <Button
            onClick={addLineItem}
            className="flex items-center gap-2"
            variant="outline"
          >
            <Plus size={16} />
            Add Item
          </Button>
        </div>

        <div className="space-y-4">
          {lineItems.map((item, index) => (
            <LineItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="flex justify-end gap-4"
      >
        <Button
          onClick={resetInvoice}
          variant="outline"
          className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          Reset Invoice
        </Button>
      </motion.div>
    </div>
  )
}