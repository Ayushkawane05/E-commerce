import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({id, image, name, price}) => {
    
    const {currency} = useContext(ShopContext);

    return (
      <Link 
        onClick={() => window.scrollTo(0,0)} 
        className='group block bg-white rounded-2xl overflow-hidden transition-all duration-300' 
        to={`/product/${id}`}
      >
        {/* Image Container with Fixed Aspect Ratio */}
        <div className='relative aspect-[4/5] overflow-hidden bg-[#f9f9f9]'>
          <img 
            className='h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110' 
            src={image[0]} 
            alt={name} 
          />
          
          {/* Subtle "View" Overlay on Hover */}
          <div className='absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
            <span className='bg-white/90 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm text-[#636b2f] translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
              VIEW PRODUCT
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className='p-3 text-center'>
          <p className='text-xs uppercase tracking-widest text-gray-400 mb-1'>New Collection</p>
          <h3 className='text-sm font-semibold text-gray-800 group-hover:text-[#da6d42] transition-colors truncate px-2'>
            {name}
          </h3>
          <div className='mt-2 flex items-center justify-center gap-1'>
            <span className='text-[#ccaa66] font-bold text-base'>
              {currency}{price}
            </span>
          </div>
        </div>
      </Link>
    )
}

export default ProductItem