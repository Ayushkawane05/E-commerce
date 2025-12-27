import React from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='mt-40'>
      {/* Top Border/Line */}
      <div className='border-t border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 py-16 flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-12 text-sm'>
          
          {/* Brand Section */}
          <div className='flex flex-col gap-6'>
            <img src={assets.logo} className='w-28 brightness-90' alt="Arklr Logo" />
            <p className='text-gray-500 leading-relaxed max-w-sm'>
              Arklr offers distinctive, curated gifts and decor to elevate your space and simplify your giving. We champion quality craftsmanship and a seamless shopping experience.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <p className='text-black font-semibold uppercase tracking-widest mb-6'>Company</p>
            <ul className='flex flex-col gap-3 text-gray-500'>
              <li>
                <NavLink to="/" className={({ isActive }) => `transition-all duration-300 hover:text-red-700 ${isActive ? "text-red-700" : ""}`}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={({ isActive }) => `transition-all duration-300 hover:text-red-700 ${isActive ? "text-red-700" : ""}`}>
                  About us
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin" className="transition-all duration-300 hover:text-red-700">
                  Admin Portal
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <p className='text-black font-semibold uppercase tracking-widest mb-6'>Get In Touch</p>
            <ul className='flex flex-col gap-3 text-gray-500'>
              <li className='hover:text-black transition-colors cursor-pointer'>+91 9027799799</li>
              <li className='hover:text-black transition-colors cursor-pointer'>contact@arklr.com</li>
              <li className='mt-2'>
                <a 
                  href="https://www.instagram.com/arklr.enterprises?igsh=MWtibTk5NXE2dXI3ZQ==" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all duration-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span className='font-medium'>Instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='bg-gray-50 py-6 border-t border-gray-100'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-gray-400'>
          <p>© 2024 Arklr.com — All Rights Reserved.</p>
          <div className='flex gap-6 uppercase tracking-tighter'>
            <span className='hover:text-gray-600 cursor-pointer'>Privacy</span>
            <span className='hover:text-gray-600 cursor-pointer'>Terms</span>
            <span className='hover:text-gray-600 cursor-pointer'>Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer