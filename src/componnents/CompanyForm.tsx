import { useInvoiceStore, useInvoiceActions } from '../hooks/useInvoiceStore'
import { Input } from './ui/input'
import { Label } from './ui/label'

export const CompanyForm = () => {
  const { company } = useInvoiceStore()
  const { updateCompany } = useInvoiceActions()

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        updateCompany({ logo: event.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
        Your Company Details
      </h2>

      <div className="space-y-2">
        <Label htmlFor="companyLogo">Logo (Optional)</Label>
        <Input
          id="companyLogo"
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          className="cursor-pointer"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          value={company.name}
          onChange={(e) => updateCompany({ name: e.target.value })}
          placeholder="Your company name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyEmail">Email</Label>
        <Input
          id="companyEmail"
          type="email"
          value={company.email}
          onChange={(e) => updateCompany({ email: e.target.value })}
          placeholder="billing@company.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyAddress">Address</Label>
        <Input
          id="companyAddress"
          value={company.address}
          onChange={(e) => updateCompany({ address: e.target.value })}
          placeholder="Street, City, Country"
        />
      </div>
    </div>
  )
}