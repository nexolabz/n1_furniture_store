import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Shop from './components/Shop/Shop.jsx'
import Collections from './components/Collections/Collections.jsx'
import CollectionDetail from './components/Collections/CollectionDetail.jsx'
import ProductDetail from './components/Shop/ProductDetail.jsx'
import Arrivals from './components/Arrivals/Arrivals.jsx'
import Sale from './components/Sale/Sale.jsx'
import About from "./components/About/About"
import Contact from "./components/Contact/Contact"
import Profile from "./components/Profile/Profile"
import Cart from "./components/Cart/Cart"
import Home from './components/Home/Home.jsx'
import Auth from './components/Auth/Auth.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collection/:categoryId" element={<CollectionDetail />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/arrivals" element={<Arrivals />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Auth />} />
            {/* Fallback route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
