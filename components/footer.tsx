'use client'

import { motion } from 'framer-motion'
import { Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-pink-400 mb-4">AWP Shopping</h3>
            <p className="text-gray-400 leading-relaxed">
              Luxury fashion for the modern woman. Experience elegance, quality, and sophistication.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Collections', href: '/collections' },
                { name: 'About', href: '/about' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-pink-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-400">
                <Mail size={18} />
                <span>awpshipping197@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone size={18} />
                <span>+91 8854846782</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 ml-4">Follow Us</h4>
            <div className="flex gap-4 ml-4">
              {[
                { icon: Instagram, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.2 }}
                  className="p-2 bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className="border-t border-gray-800 py-8 ">
          <p className="text-center text-gray-400 text-sm">
  © 2025 AWP Shopping. All rights reserved. Made By{" "}
  <a
    href="https://mehrajdevportfolio.online"
    target="_blank"
    rel="noopener noreferrer"
    className="text-pink-400 hover:text-pink-500 transition-colors underline"
  >
    Mohammed Mehraj
  </a>.
</p>

        </div>
      </div>
    </footer>
  )
}
