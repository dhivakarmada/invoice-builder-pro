import { motion } from 'framer-motion'
import { Trash2, Copy } from 'lucide-react'
import { useInvoiceActions } from '../hooks/useInvoiceStore'
import { Input } from './ui/input'
import { Button } from './ui/button'

export const LineItem = ({ item, index }: { item: any; index: number }) => {
  const { updateLineItem, removeLineItem, duplicateLineItem } =
    useInvoiceActions()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="grid grid-cols-12 gap-4 items-center"
    >
      <div className="col-span-5">
        <Input
          type="text"
          value={item.description}
          onChange={(e) =>
            updateLineItem(item.id, { description: e.target.value })
          }
          placeholder="Item description"
          className="w-full"
        />
      </div>
      <div className="col-span-2">
        <Input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) =>
            updateLineItem(item.id, { quantity: Number(e.target.value) })
          }
          className="w-full"
        />
      </div>
      <div className="col-span-2">
        <Input
          type="number"
          min="0"
          step="0.01"
          value={item.unitPrice}
          onChange={(e) =>
            updateLineItem(item.id, { unitPrice: Number(e.target.value) })
          }
          className="w-full"
        />
      </div>
      <div className="col-span-2 text-right font-medium">
        {(item.quantity * item.unitPrice).toFixed(2)}
      </div>
      <div className="col-span-1 flex justify-end gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => duplicateLineItem(item.id)}
          className="text-gray-500 hover:text-blue-600"
        >
          <Copy size={16} />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => removeLineItem(item.id)}
          className="text-gray-500 hover:text-red-600"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </motion.div>
  )
}