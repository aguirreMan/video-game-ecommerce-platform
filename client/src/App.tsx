import { useState } from 'react'
import Navbar from './components/Navbar'
import ProductsPage from './components/ProductsPage'
import { BrowserRouter, Routes, Route } from 'react-router'
import { cartContext } from './context/CartProvider'

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('')


  return (
    <cartContext.Provider value={cart}>
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
        </Routes>
      </BrowserRouter>
    </cartContext.Provider>
  )
}