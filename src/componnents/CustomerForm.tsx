import { useInvoiceStore, useInvoiceActions } from '../hooks/useInvoiceStore'
import { Input } from './ui/input'
import { Label } from './ui/label'

export const CustomerForm = () => {
  const { customer } = useInvoiceStore()
  const { updateCustomer } = useInvoiceActions()

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
        Customer Details
      </h2>

      <div className="space-y-2">
        <Label htmlFor="customerName">Name</Label>
        <Input
          id="customerName"
          value={customer.name}
          onChange={(e) => updateCustomer({ name: e.target.value })}
          placeholder="Customer name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="customerEmail">Email</Label>
        <Input
          id="customerEmail"
          type="email"
          value={customer.email}
          onChange={(e) => updateCustomer({ email: e.target.value })}
          placeholder="customer@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="customerCompany">Company (Optional)</Label>
        <Input
          id="customerCompany"
          value={customer.company}
          onChange={(e) => updateCustomer({ company: e.target.value })}
          placeholder="Company name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="customerAddress">Address</Label>
        <Input
          id="customerAddress"
          value={customer.address}
          onChange={(e) => updateCustomer({ address: e.target.value })}
          placeholder="Street, City, Country"
        />
      </div>
    </div>
  )
}