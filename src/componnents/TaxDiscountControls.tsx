import { useInvoiceStore, useInvoiceActions } from '../hooks/useInvoiceStore'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Select } from './ui/select'
import { Switch } from './ui/switch'

export const TaxDiscountControls = () => {
  const { taxDiscount, currency } = useInvoiceStore()
  const { updateTaxDiscount } = useInvoiceActions()

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
        Tax & Discount
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="discountType">Discount Type</Label>
          <Select
            id="discountType"
            value={taxDiscount.discountType}
            onChange={(e) =>
              updateTaxDiscount({
                discountType: e.target.value as 'fixed' | 'percentage',
              })
            }
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="discountValue">
            Discount Value{' '}
            {taxDiscount.discountType === 'percentage' ? '(%)' : `(${currency})`}
          </Label>
          <Input
            id="discountValue"
            type="number"
            min="0"
            step={taxDiscount.discountType === 'percentage' ? '1' : '0.01'}
            value={taxDiscount.discountValue}
            onChange={(e) =>
              updateTaxDiscount({ discountValue: Number(e.target.value) })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="taxRate">Tax Rate (%)</Label>
          <Input
            id="taxRate"
            type="number"
            min="0"
            step="1"
            value={taxDiscount.taxRate}
            onChange={(e) =>
              updateTaxDiscount({ taxRate: Number(e.target.value) })
            }
          />
        </div>

        <div className="flex items-center space-x-2 pt-6">
          <Switch
            id="taxInclusive"
            checked={taxDiscount.taxInclusive}
            onCheckedChange={(checked) =>
              updateTaxDiscount({ taxInclusive: checked })
            }
          />
          <Label htmlFor="taxInclusive">Tax Inclusive Pricing</Label>
        </div>
      </div>
    </div>
  )
}