import { InvoiceState } from '../hooks/useInvoiceStore'

export const calculateInvoiceTotals = (state: InvoiceState) => {
  const { lineItems, taxDiscount, currency } = state
  const { taxRate, discountType, discountValue, taxInclusive } = taxDiscount

  const subtotal = lineItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  )

  let discountAmount = 0
  if (discountType === 'fixed') {
    discountAmount = discountValue
  } else {
    discountAmount = subtotal * (discountValue / 100)
  }

  const taxableAmount = subtotal - discountAmount

  let taxAmount = 0
  let grandTotal = 0

  if (taxInclusive) {
    // Tax is already included in prices
    const taxDivisor = 1 + taxRate / 100
    const preTaxAmount = taxableAmount / taxDivisor
    taxAmount = taxableAmount - preTaxAmount
    grandTotal = taxableAmount
  } else {
    // Tax is added on top
    taxAmount = taxableAmount * (taxRate / 100)
    grandTotal = taxableAmount + taxAmount
  }

  return {
    subtotal,
    discountAmount,
    taxableAmount,
    taxAmount,
    grandTotal,
    currency,
  }
}

export const formatCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}