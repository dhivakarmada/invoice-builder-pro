import { useInvoiceStore, useInvoiceActions } from '../hooks/useInvoiceStore'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

export const MetaForm = () => {
  const { meta } = useInvoiceStore()
  const { updateMeta } = useInvoiceActions()

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
        Invoice Details
      </h2>

      <div className="space-y-2">
        <Label htmlFor="invoiceNumber">Invoice Number</Label>
        <Input
          id="invoiceNumber"
          value={meta.invoiceNumber}
          onChange={(e) => updateMeta({ invoiceNumber: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="issueDate">Issue Date</Label>
          <Input
            id="issueDate"
            type="date"
            value={meta.issueDate}
            onChange={(e) => updateMeta({ issueDate: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={meta.dueDate}
            onChange={(e) => updateMeta({ dueDate: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          value={meta.notes}
          onChange={(e) => updateMeta({ notes: e.target.value })}
          placeholder="Thank you for your business!"
          rows={3}
        />
      </div>
    </div>
  )
}