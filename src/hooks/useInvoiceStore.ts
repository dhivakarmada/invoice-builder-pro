import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import { calculateInvoiceTotals } from '../utils/calculations'

export type LineItem = {
  id: string
  description: string
  quantity: number
  unitPrice: number
}

type InvoiceMeta = {
  invoiceNumber: string
  issueDate: string
  dueDate: string
  notes: string
}

type CustomerDetails = {
  name: string
  email: string
  address: string
  company: string
}

type CompanyDetails = {
  name: string
  email: string
  address: string
  logo: string | null
}

type TaxDiscount = {
  taxRate: number
  discountType: 'fixed' | 'percentage'
  discountValue: number
  taxInclusive: boolean
}

type InvoiceState = {
  lineItems: LineItem[]
  customer: CustomerDetails
  company: CompanyDetails
  meta: InvoiceMeta
  taxDiscount: TaxDiscount
  currency: string
  actions: {
    addLineItem: () => void
    updateLineItem: (id: string, updates: Partial<LineItem>) => void
    removeLineItem: (id: string) => void
    duplicateLineItem: (id: string) => void
    reorderLineItems: (activeId: string, overId: string) => void
    updateCustomer: (updates: Partial<CustomerDetails>) => void
    updateCompany: (updates: Partial<CompanyDetails>) => void
    updateMeta: (updates: Partial<InvoiceMeta>) => void
    updateTaxDiscount: (updates: Partial<TaxDiscount>) => void
    setCurrency: (currency: string) => void
    resetInvoice: () => void
  }
}

const initialState: Omit<InvoiceState, 'actions'> = {
  lineItems: [
    {
      id: uuidv4(),
      description: 'Web Development Services',
      quantity: 1,
      unitPrice: 1200,
    },
  ],
  customer: {
    name: '',
    email: '',
    address: '',
    company: '',
  },
  company: {
    name: 'Acme Inc.',
    email: 'billing@acme.com',
    address: '123 Business St, City, Country',
    logo: null,
  },
  meta: {
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: 'Thank you for your business!',
  },
  taxDiscount: {
    taxRate: 10,
    discountType: 'percentage',
    discountValue: 0,
    taxInclusive: false,
  },
  currency: 'USD',
}

export const useInvoiceStore = create<InvoiceState>()(
  persist(
    (set, get) => ({
      ...initialState,
      actions: {
        addLineItem: () =>
          set((state) => ({
            lineItems: [
              ...state.lineItems,
              {
                id: uuidv4(),
                description: '',
                quantity: 1,
                unitPrice: 0,
              },
            ],
          })),
        updateLineItem: (id, updates) =>
          set((state) => ({
            lineItems: state.lineItems.map((item) =>
              item.id === id ? { ...item, ...updates } : item
            ),
          })),
        removeLineItem: (id) =>
          set((state) => ({
            lineItems: state.lineItems.filter((item) => item.id !== id),
          })),
        duplicateLineItem: (id) => {
          const itemToDuplicate = get().lineItems.find((item) => item.id === id)
          if (itemToDuplicate) {
            set((state) => ({
              lineItems: [
                ...state.lineItems,
                { ...itemToDuplicate, id: uuidv4() },
              ],
            }))
          }
        },
        reorderLineItems: (activeId, overId) => {
          const activeIndex = get().lineItems.findIndex(
            (item) => item.id === activeId
          )
          const overIndex = get().lineItems.findIndex(
            (item) => item.id === overId
          )
          if (activeIndex !== -1 && overIndex !== -1) {
            const newItems = [...get().lineItems]
            const [removed] = newItems.splice(activeIndex, 1)
            newItems.splice(overIndex, 0, removed)
            set({ lineItems: newItems })
          }
        },
        updateCustomer: (updates) =>
          set((state) => ({
            customer: { ...state.customer, ...updates },
          })),
        updateCompany: (updates) =>
          set((state) => ({
            company: { ...state.company, ...updates },
          })),
        updateMeta: (updates) =>
          set((state) => ({
            meta: { ...state.meta, ...updates },
          })),
        updateTaxDiscount: (updates) =>
          set((state) => ({
            taxDiscount: { ...state.taxDiscount, ...updates },
          })),
        setCurrency: (currency) => set({ currency }),
        resetInvoice: () => set(initialState),
      },
    }),
    {
      name: 'invoice-storage',
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => key !== 'actions')
        ),
    }
  )
)

export const useInvoiceActions = () => useInvoiceStore((state) => state.actions)