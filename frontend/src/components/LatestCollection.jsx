import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        setLatestProducts(products.slice(0, 15)); 
    }, [products]);

    const scroll = (direction) => {
        const { current } = scrollRef;
        // Using a fixed scroll amount for a smoother "per-card" feel
        const scrollAmount = 280; 
        if (direction === 'left') {
            current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className='my-10 px-4 md:px-10 relative group'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Handpicked favorites from our workshop, delivered to your door.
                </p>
            </div>

            {/* Navigation Arrows - Only show if there are enough items to scroll */}
            {latestProducts.length > 5 && (
                <>
                    <button 
                        onClick={() => scroll('left')}
                        className='absolute left-2 top-1/2 z-20 bg-white/90 p-2 rounded-full shadow-md hover:bg-[#da6d42] hover:text-white transition-all -translate-y-1/2 hidden md:block'
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button 
                        onClick={() => scroll('right')}
                        className='absolute right-2 top-1/2 z-20 bg-white/90 p-2 rounded-full shadow-md hover:bg-[#da6d42] hover:text-white transition-all -translate-y-1/2 hidden md:block'
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}

            {/* Scrollable Container */}
            <div 
                ref={scrollRef}
                className='flex overflow-x-auto gap-5 scroll-smooth no-scrollbar py-4 justify-start'
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {latestProducts.map((item, index) => (
                    /* flex-none: stops the card from growing to fill space 
                       w-[...] : sets the exact width so cards look uniform
                    */
                    <div key={index} className='flex-none w-[180px] sm:w-[200px] md:w-[220px]'>
                        <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LatestCollection;