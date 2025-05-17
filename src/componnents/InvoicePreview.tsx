import { forwardRef } from 'react'
import { useInvoiceStore } from '../hooks/useInvoiceStore'
import { formatCurrency, calculateInvoiceTotals } from '../utils/calculations'
import { motion } from 'framer-motion'

export const InvoicePreview = forwardRef<HTMLDivElement>((props, ref) => {
  const { lineItems, customer, company, meta, taxDiscount, currency } =
    useInvoiceStore()
  const totals = calculateInvoiceTotals(useInvoiceStore.getState())

  return (
    <div ref={ref} className="p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              {company.logo && (
                <img
                  src={company.logo}
                  alt="Company Logo"
                  className="h-12 mb-4"
                />
              )}
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {company.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {company.address}
              </p>
              <p className="text-gray-600 dark:text-gray-300">{company.email}</p>
            </div>

            <div className="text-right">
              <h2 className="text-3xl font-bold text-blue-600 mb-2">INVOICE</h2>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Invoice #:</span> {meta.invoiceNumber}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Date Issued:</span> {new Date(meta.issueDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Due Date:</span> {new Date(meta.dueDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Bill To */}
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">
              Bill To:
            </h3>
            <p className="text-gray-800 dark:text-white font-medium">
              {customer.name}
            </p>
            {customer.company && (
              <p className="text-gray-600 dark:text-gray-300">
                {customer.company}
              </p>
            )}
            <p className="text-gray-600 dark:text-gray-300">{customer.email}</p>
            <p className="text-gray-600 dark:text-gray-300">{customer.address}</p>
          </div>

          {/* Line Items Table */}
          <div className="mb-8 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300 font-medium">
                    Description
                  </th>
                  <th className="py-3 px-4 text-right text-gray-700 dark:text-gray-300 font-medium">
                    Qty
                  </th>
                  <th className="py-3 px-4 text-right text-gray-700 dark:text-gray-300 font-medium">
                    Unit Price
                  </th>
                  <th className="py-3 px-4 text-right text-gray-700 dark:text-gray-300 font-medium">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {lineItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`border-b border-gray-200 dark:border-gray-700 ${
                      index % 2 === 0
                        ? 'bg-white dark:bg-gray-800'
                        : 'bg-gray-50 dark:bg-gray-700'
                    }`}
                  >
                    <td className="py-3 px-4 text-gray-800 dark:text-white">
                      {item.description || 'No description'}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-600 dark:text-gray-300">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-600 dark:text-gray-300">
                      {formatCurrency(item.unitPrice, currency)}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-800 dark:text-white font-medium">
                      {formatCurrency(
                        item.quantity * item.unitPrice,
                        currency
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="ml-auto w-full md:w-1/2">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Subtotal:</span>
                <span className="font-medium">
                  {formatCurrency(totals.subtotal, currency)}
                </span>
              </div>

              {totals.discountAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Discount:
                    {taxDiscount.discountType === 'percentage'
                      ? ` (${taxDiscount.discountValue}%)`
                      : ''}
                  </span>
                  <span className="font-medium text-red-600">
                    -{formatCurrency(totals.discountAmount, currency)}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  Tax ({taxDiscount.taxRate}%):
                </span>
                <span className="font-medium">
                  {formatCurrency(totals.taxAmount, currency)}
                </span>
              </div>

              <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                <span className="text-lg font-bold text-gray-800 dark:text-white">
                  Total Due:
                </span>
                <span className="text-lg font-bold text-blue-600">
                  {formatCurrency(totals.grandTotal, currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {meta.notes && (
            <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-bold text-gray-800 dark:text-white mb-2">
                Notes
              </h4>
              <p className="text-gray-600 dark:text-gray-300">{meta.notes}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
})

InvoicePreview.displayName = 'InvoicePreview'