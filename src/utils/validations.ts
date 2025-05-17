import { z } from 'zod'

export const lineItemSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  unitPrice: z.number().min(0, 'Price must be positive'),
})

export const customerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  address: z.string().min(5, 'Address is too short'),
})

export const companySchema = z.object({
  name: z.string().min(2, 'Company name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Address is too short'),
})

export const metaSchema = z.object({
  invoiceNumber: z.string().min(3, 'Invoice number is required'),
  issueDate: z.string().date('Invalid date'),
  dueDate: z.string().date('Invalid date'),
  notes: z.string().optional(),
})

export const taxDiscountSchema = z.object({
  taxRate: z.number().min(0, 'Tax rate cannot be negative'),
  discountType: z.enum(['fixed', 'percentage']),
  discountValue: z.number().min(0, 'Discount cannot be negative'),
  taxInclusive: z.boolean(),
})