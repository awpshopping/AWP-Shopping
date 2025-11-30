'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqItems = [
  {
    id: 1,
    question: 'What is the price range of AWP Shopping products?',
    answer: 'Our luxury collection is priced between ₹500 to ₹1500. Each piece is carefully crafted to ensure premium quality and sophistication.',
  },
  {
    id: 2,
    question: 'How long does shipping take?',
    answer: 'Standard delivery takes 5-7 business days within India. Express delivery options are available for urgent orders.',
  },
  {
    id: 3,
    question: 'What is your return policy?',
    answer: 'We offer a 14-day return policy on all products. Items must be unused and in original packaging. Full refunds are provided upon approval.',
  },
  {
    id: 4,
    question: 'Do you offer size customization?',
    answer: 'Yes! We offer custom sizes for most items. Please contact us at awpshipping197@gmail.com for customization inquiries.',
  },
  {
    id: 5,
    question: 'What fabric materials do you use?',
    answer: 'We exclusively use premium natural fabrics including silk, cotton blends, linen, and high-quality synthetic materials for durability and comfort.',
  },
  {
    id: 6,
    question: 'How do I care for my AWP Shopping garments?',
    answer: 'Each piece comes with detailed care instructions. Generally, we recommend gentle washing, dry cleaning for delicate items, and proper storage in cool, dry places.',
  },
  {
    id: 7,
    question: 'Can I pre-order items?',
    answer: 'Yes! We accept pre-orders for upcoming collections. Early birds get exclusive discounts. Contact us for pre-order details.',
  },
  {
    id: 8,
    question: 'Do you have a physical store?',
    answer: 'Currently, we operate online. However, we offer virtual consultations and exclusive viewing sessions. Contact us to schedule yours!',
  },
]

interface FAQItemProps {
  item: {
    id: number;
    question: string;
    answer: string;
  };
  index: number;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ item, index, isOpen, onClick }: FAQItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className="border-b border-pink-200"
  >
    <button
      onClick={onClick}
      className="w-full py-6 px-6 flex items-center justify-between hover:bg-pink-50 transition-colors group"
    >
      <span className="text-left font-serif text-lg font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
        {item.question}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="flex-shrink-0 ml-4"
      >
        <ChevronDown size={20} className="text-pink-600" />
      </motion.div>
    </button>

    <motion.div
      initial={{ height: 0 }}
      animate={{ height: isOpen ? 'auto' : 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div className="px-6 pb-6 text-gray-600 leading-relaxed">
        {item.answer}
      </div>
    </motion.div>
  </motion.div>
)

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1)

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
            <p className="text-pink-600 text-sm font-medium tracking-widest uppercase mb-4">Help & Support</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Find answers to common questions about AWP Shopping
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {faqItems.map((item) => (
              <FAQItem
                key={item.id}
                item={item}
                index={faqItems.indexOf(item)}
                isOpen={openId === item.id}
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
              />
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center bg-gradient-to-r from-pink-600 to-pink-500 rounded-2xl p-12 text-white"
          >
            <h3 className="text-3xl font-serif font-bold mb-4">Still have questions?</h3>
            <p className="text-lg opacity-90 mb-6 max-w-xl mx-auto">
              Our customer support team is here to help. Contact us anytime!
            </p>
            <a
              href="mailto:awpshipping197@gmail.com"
              className="inline-block px-8 py-3 bg-white text-pink-600 rounded-lg font-semibold hover:bg-pink-50 transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
