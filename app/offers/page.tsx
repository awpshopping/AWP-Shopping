'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { motion } from 'framer-motion'
import { Tag, Clock, Gift, Heart, Users, Sun, Sparkles, LucideIcon } from 'lucide-react'

const offers = [
  {
    id: 1,
    title: 'Welcome Offer',
    discount: '20%',
    description: 'New customer discount on your first purchase',
    code: 'WELCOME20',
    validity: 'Valid on all collections',
    icon: Gift,
  },
  {
    id: 2,
    title: 'Summer Sale',
    discount: '30%',
    description: 'Massive discount on summer collection',
    code: 'SUMMER30',
    validity: 'Limited time offer',
    icon: Sun,
  },
  {
    id: 3,
    title: 'Bundle Offer',
    discount: '25%',
    description: 'Buy 2 or more items and get 25% off',
    code: 'BUNDLE25',
    validity: 'On selected items',
    icon: Tag,
  },
  {
    id: 4,
    title: 'Loyalty Rewards',
    discount: '15%',
    description: 'Exclusive discount for regular customers',
    code: 'LOYAL15',
    validity: 'Every purchase',
    icon: Heart,
  },
  {
    id: 5,
    title: 'Festival Special',
    discount: '35%',
    description: 'Celebrate with us this season',
    code: 'FEST35',
    validity: 'Limited collection',
    icon: Sparkles,
  },
  {
    id: 6,
    title: 'Referral Program',
    discount: '₹500',
    description: 'Refer a friend and get voucher',
    code: 'REFER',
    validity: 'Per successful referral',
    icon: Users,
  },
]


interface Offer {
  id: number;
  title: string;
  discount: string;
  description: string;
  code: string;
  validity: string;
  icon: LucideIcon;
}

interface OfferCardProps {
  offer: Offer;
  index: number;
}

const OfferCard = ({ offer, index }: OfferCardProps) => {
  const IconComponent = offer.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600/5 to-pink-300/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="relative p-8">
        {/* Icon */}
        <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center text-white mb-4">
          <IconComponent size={32} />
        </div>

        {/* Discount Badge */}
        <div className="absolute top-4 right-4 bg-pink-600 text-white px-4 py-2 rounded-full font-bold text-lg">
          {offer.discount}
        </div>

        {/* Content */}
        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">{offer.title}</h3>
        <p className="text-gray-600 mb-4">{offer.description}</p>

        {/* Code */}
        <div className="bg-pink-50 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600 mb-1">Use Code:</p>
          <p className="font-mono font-bold text-pink-600 text-lg">{offer.code}</p>
        </div>

        {/* Validity */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock size={16} />
          <span>{offer.validity}</span>
        </div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
        >
          Shop Now
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function Offers() {
  return (
    <main className="overflow-hidden">
      <Header />

      {/* Hero */}
      <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-100 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-10 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 blur-xl"
        ></motion.div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-pink-600 text-sm font-medium tracking-widest uppercase mb-4">Save Big</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
              Special Offers
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Exclusive deals and discounts for our valued customers
            </p>
          </motion.div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer, index) => (
              <OfferCard key={offer.id} offer={offer} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">How to Use Our Offers</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Browse', desc: 'Explore our collection' },
              { step: '2', title: 'Select', desc: 'Choose your items' },
              { step: '3', title: 'Enter Code', desc: 'Apply discount code' },
              { step: '4', title: 'Checkout', desc: 'Complete purchase' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-pink-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Terms & Conditions</h2>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              <li>• Offers cannot be combined unless specified otherwise</li>
              <li>• Valid on purchases above ₹500</li>
              <li>• Codes are single-use per customer</li>
              <li>• Discounts apply on sale and regular-priced items</li>
              <li>• Offers are subject to change without notice</li>
              <li>• For more details, contact us at awpshipping197@gmail.com</li>
            </ul>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
