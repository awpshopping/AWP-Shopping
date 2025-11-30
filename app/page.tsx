'use client'

import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import FeaturedProducts from '@/components/featured-products'
import Testimonials from '@/components/testimonials'
import Footer from '@/components/footer'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Header />
      <HeroSection />
      
      {/* Parallax Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-600 to-pink-500 text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Luxury Meets Accessibility
          </h2>
          <p className="text-xl opacity-90 leading-relaxed">
            Premium quality clothing at prices between ₹500 - ₹1500. Because elegance should be accessible to everyone.
          </p>
        </div>
      </motion.section>

      <FeaturedProducts />
      <Testimonials />
      <Footer />
    </main>
  )
}
