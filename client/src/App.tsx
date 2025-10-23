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


  return (
    <>
      <Toaster position='top-center' />
      <CartProvider>
        <BrowserRouter>
          <Navbar
            searchQuery={searchQuery}
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
    </>
  )
}