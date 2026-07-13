import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('furni_cart')
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart))
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error)
      }
    }
  }, [])

  // Sync cart with localStorage whenever it changes
  const saveCart = (items) => {
    setCartItems(items)
    localStorage.setItem('furni_cart', JSON.stringify(items))
  }

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    const existingIndex = cartItems.findIndex((item) => item.id === product.id)
    if (existingIndex > -1) {
      const updated = [...cartItems]
      updated[existingIndex].qty += quantity
      saveCart(updated)
    } else {
      // Clean product image and details to avoid storing circular refs or huge assets if any, though it is fine as is
      saveCart([...cartItems, { ...product, qty: quantity }])
    }
  }

  // Update item quantity
  const updateQty = (id, delta) => {
    const updated = cartItems
      .map((item) => {
        if (item.id === id) {
          const nextQty = item.qty + delta
          return { ...item, qty: nextQty }
        }
        return item
      })
      .filter((item) => item.qty > 0)
    saveCart(updated)
  }

  // Remove item from cart
  const removeFromCart = (id) => {
    const updated = cartItems.filter((item) => item.id !== id)
    saveCart(updated)
  }

  // Clear cart
  const clearCart = () => {
    saveCart([])
  }

  // Calculated values
  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0)
  const cartSubtotal = cartItems.reduce((total, item) => total + item.price * item.qty, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
