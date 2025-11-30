'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { motion } from 'framer-motion'
import { useState } from 'react'

const galleryImages = [
  { id: 1, image: '/placeholder.svg?key=gallery1' },
  { id: 2, image: '/placeholder.svg?key=gallery2' },
  { id: 3, image: '/placeholder.svg?key=gallery3' },
  { id: 4, image: '/placeholder.svg?key=gallery4' },
  { id: 5, image: '/placeholder.svg?key=gallery5' },
  { id: 6, image: '/placeholder.svg?key=gallery6' },
  { id: 7, image: '/placeholder.svg?key=gallery7' },
  { id: 8, image: '/placeholder.svg?key=gallery8' },
]

interface GalleryImage {
  id: number;
  image: string;
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  return (
    <main className="overflow-hidden">
      <Header />

      {/* Hero */}
      <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-pink-600 text-sm font-medium tracking-widest uppercase mb-4">Visual Gallery</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
              Gallery
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our collection through beautiful imagery
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(item as GalleryImage)}
                className="relative h-64 rounded-lg overflow-hidden cursor-pointer group shadow-lg"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            src={selectedImage.image || "/placeholder.svg"}
            alt="Full view"
            className="max-w-4xl max-h-[90vh] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}

      <Footer />
    </main>
  )
}
