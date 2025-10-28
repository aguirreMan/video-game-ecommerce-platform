import { useState } from 'react'
import Navbar from './components/Navbar'
import ProductsPage from './pages/ProductsPage'
import { BrowserRouter, Routes, Route } from 'react-router'
import CartProvider from './context/CartProvider'
import CheckoutPage from './pages/CheckoutPage'
import GamesDetailsPage from './pages/GamesDetailsPage'
import { Toaster } from 'sonner'

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('')

  function handleSearchChange(query: string) {
    setSearchQuery(query)
    if (query.length > 0) {
      setSelectedGenre('')
      setSelectedPlatform('')
    }
  }


  return (
    <>
      <div className='min-h-screen bg-base-grid'>
        <Toaster
          position='top-center'
          richColors={false}
          theme='dark'
          toastOptions={{
            style: {
              background: '#1a1c23',
              color: '#E5E7EB',
              border: '1px solid #374151',
              borderRadius: '0.75rem',
              padding: '1rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }
          }}
        />
        <CartProvider>
          <BrowserRouter>
            <Navbar
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
              setSearchQuery={setSearchQuery}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              selectedPlatform={selectedPlatform}
              setSelectedPlatform={setSelectedPlatform}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <ProductsPage
                    searchQuery={searchQuery}
                    selectedGenre={selectedGenre}
                    selectedPlatform={selectedPlatform}
                  />
                }
              />
              <Route
                path="Checkout" element={<CheckoutPage />}
              />
              <Route
                path='GameDetails/:gameId' element={<GamesDetailsPage />}
              />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </div>
    </>
  )
}