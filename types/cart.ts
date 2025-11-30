import { Product } from './product'

export interface CartItem {
    id: string // Unique ID for the cart item (e.g., productID + size + color)
    product: Product
    size: string
    color: string
    quantity: number
}

export interface CartContextType {
    items: CartItem[]
    addToCart: (product: Product, size: string, color: string) => void
    removeFromCart: (itemId: string) => void
    updateQuantity: (itemId: string, quantity: number) => void
    clearCart: () => void
    isCartOpen: boolean
    setIsCartOpen: (isOpen: boolean) => void
    cartCount: number
    cartTotal: number
}
