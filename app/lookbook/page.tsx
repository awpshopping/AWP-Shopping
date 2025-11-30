'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { motion } from 'framer-motion'

const lookbookImages = [
  'https://res.cloudinary.com/douvhybil/image/upload/v1764155711/AWP%20Shopping-products/p3e2wf8kgezejvyegthb.jpg',
  'https://res.cloudinary.com/douvhybil/image/upload/v1764155524/AWP%20Shopping-products/wwv8xexkthm2l09fduaq.jpg',
  'https://res.cloudinary.com/douvhybil/image/upload/v1764155338/AWP%20Shopping-products/c5yunz1frtzkzuamzk3g.jpg',
  'https://res.cloudinary.com/douvhybil/image/upload/v1764155758/AWP%20Shopping-products/te0vag1hc0rzwqfgnxj6.jpg',
  'https://res.cloudinary.com/douvhybil/image/upload/v1764155572/AWP%20Shopping-products/xol5aovmgzwswlad5p9a.jpg',
  'https://res.cloudinary.com/douvhybil/image/upload/v1764157233/AWP%20Shopping-products/uasdo9udmvrlwkhkcwoz.jpg',
]

export default function Lookbook() {
  return (
    <main className="overflow-hidden">
      <Header />

      {/* Hero */}
      <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-pink-400 text-sm font-medium tracking-widest uppercase mb-4">Visual Story</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              AWP Shopping Lookbook
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Experience the elegance and luxury of our latest collection through stunning editorial photography
            </p>
          </motion.div>
        </div>
      </section>

      {/* Magazine-Style Layout */}
<section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
  <div className="max-w-7xl mx-auto">
    
    {/* Section Heading */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
        Curated Visual Collection
      </h2>
      <p className="text-gray-500 max-w-xl mx-auto mt-4">
        Explore the sophisticated essence of our latest fashion drops
      </p>
    </div>

    {/* Magazine Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      
      {lookbookImages.map((image, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: i * 0.1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-xl shadow-xl group cursor-pointer"
        >
          <img
            src={image}
            alt={`Lookbook ${i + 1}`}
            className="w-full h-[450px] object-cover transition-all duration-[800ms] group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Content on Hover */}
          <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <p className="text-sm tracking-wide text-pink-300 uppercase mb-1">
              Collection
            </p>
            <h3 className="text-2xl font-serif font-semibold text-white leading-snug">
              Luxe Edition {i + 1}
            </h3>
          </div>
        </motion.div>
      ))}

    </div>
  </div>
</section>


      <Footer />
    </main>
  )
}
