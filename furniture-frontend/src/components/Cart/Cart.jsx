import { useState } from 'react'
import Header from '../Header/Header'
import CartItems from './CartItems'
import CartSummary from './CartSummary'
import Footer from '../Footer/Footer'

// Import mock images
import sofaImg from '../../assets/products/sofa.png'
import deskImg from '../../assets/products/desk.png'

function Cart() {
  const [items, setItems] = useState([
    {
      id: 'lr-1',
      name: 'Scandinavian Modular Sofa',
      category: 'living-room',
      price: 54999,
      qty: 1,
      image: sofaImg
    },
    {
      id: 'of-1',
      name: 'Minimalist Study Desk',
      category: 'office',
      price: 24999,
      qty: 1,
      image: deskImg
    }
  ])
  const [isCheckedOut, setIsCheckedOut] = useState(false)

  // Quantity updates
  const handleUpdateQty = (id, delta) => {
    setItems(prevItems =>
      prevItems
        .map(item => {
          if (item.id === id) {
            const nextQty = item.qty + delta
            return { ...item, qty: nextQty }
          }
          return item
        })
        .filter(item => item.qty > 0)
    )
  }

  // Remove item
  const handleRemoveItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  // Checkout confirmation
  const handleCheckout = () => {
    setIsCheckedOut(true)
    setItems([]) // Empty the cart
    setTimeout(() => {
      setIsCheckedOut(false)
      window.location.href = '/'
    }, 2200)
  }

  // Subtotal
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50/20 relative">
      
      {/* Checkout Success Overlay */}
      {isCheckedOut && (
        <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm z-50 flex items-center justify-center text-white">
          <div className="bg-white text-neutral-900 px-8 py-10 rounded-2xl border border-neutral-100 text-center max-w-sm mx-4 space-y-4 shadow-xl animate-fade-in">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold font-serif">Order Confirmed!</h3>
            <p className="text-sm text-neutral-500 leading-relaxed font-medium">
              Thank you for shopping with FURNI. We've sent a receipt to your email. Redirecting to home...
            </p>
          </div>
        </div>
      )}

      <Header />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-neutral-900 tracking-tight text-left mb-8 uppercase">
          Your Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <CartItems 
            items={items} 
            onUpdateQty={handleUpdateQty} 
            onRemoveItem={handleRemoveItem} 
          />
          
          {items.length > 0 && (
            <CartSummary 
              subtotal={subtotal} 
              onCheckout={handleCheckout} 
            />
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Cart
