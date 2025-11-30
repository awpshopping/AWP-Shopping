export interface WishlistContextType {
    items: string[] // Array of product IDs
    addToWishlist: (productId: string) => void
    removeFromWishlist: (productId: string) => void
    isInWishlist: (productId: string) => boolean
    wishlistCount: number
    isWishlistOpen: boolean
    setIsWishlistOpen: (isOpen: boolean) => void
}
