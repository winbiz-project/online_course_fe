import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './routes/authcontext'
import App from './routes'
import { ChakraProvider } from '@chakra-ui/react'
import '@/styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>,
)