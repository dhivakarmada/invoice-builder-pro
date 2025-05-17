import { useReactToPrint } from 'react-to-print'
import { useRef, useState } from 'react'
import { Button } from './ui/button'
import { toast } from 'react-hot-toast'
import { InvoicePreview } from './InvoicePreview'
import { motion } from 'framer-motion'
import { Download, Printer, Share2 } from 'lucide-react'

export const ExportButtons = () => {
  const previewRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
    onBeforeGetContent: () => toast.loading('Preparing print...'),
    onAfterPrint: () => {
      toast.dismiss()
      toast.success('Invoice printed!')
    },
  })

  const handlePDF = async () => {
    setIsExporting(true)
    toast.loading('Generating PDF...')
    
    try {
      const { jsPDF } = await import('jspdf')
      const { html2canvas } = await import('html2canvas')
      
      const canvas = await html2canvas(previewRef.current!)
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      pdf.save('invoice.pdf')
      toast.dismiss()
      toast.success('PDF downloaded!')
    } catch (error) {
      toast.dismiss()
      toast.error('Failed to generate PDF')
    } finally {
      setIsExporting(false)
    }
  }

  const handleShare = () => {
    toast('Share feature would be implemented in production', {
      icon: 'ℹ️',
    })
  }

  return (
    <>
      <div className="hidden">
        <InvoicePreview ref={previewRef} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex gap-2"
      >
        <Button
          onClick={handlePDF}
          disabled={isExporting}
          className="flex items-center gap-2"
          variant="outline"
        >
          <Download size={16} />
          PDF
        </Button>
        <Button
          onClick={handlePrint}
          className="flex items-center gap-2"
          variant="outline"
        >
          <Printer size={16} />
          Print
        </Button>
        <Button
          onClick={handleShare}
          className="flex items-center gap-2"
          variant="outline"
        >
          <Share2 size={16} />
          Share
        </Button>
      </motion.div>
    </>
  )
}