import React from 'react'
import ShopClient from './ShopClient'

export default function Page() {
  return (
    <React.Suspense fallback={null}>
      <ShopClient />
    </React.Suspense>
  )
}

