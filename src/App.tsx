import { Toaster } from 'react-hot-toast'
import { AppProvider } from './providers'
import { InvoicePage } from './pages'

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <InvoicePage />
        <Toaster position="bottom-right" />
      </div>
    </AppProvider>
  )
}

export default App