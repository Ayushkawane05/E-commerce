import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller));
        setBestSeller(bestProduct.slice(0, 10)); 
    }, [products])

    const scroll = (direction) => {
        const { current } = scrollRef;
        const scrollAmount = 250; 
        if (direction === 'left') {
            current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className='my-10 px-4 md:px-10 relative'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Our most loved pieces, chosen by our community.
                </p>
            </div>

            {/* Arrows: Only show if there are more than 4-5 items (optional logic) */}
            {bestSeller.length > 5 && (
                <>
                    <button 
                        onClick={() => scroll('left')}
                        className='absolute left-2 top-[60%] z-20 bg-white/90 p-2 rounded-full shadow-lg hover:bg-[#da6d42] hover:text-white transition-all hidden md:block'
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button 
                        onClick={() => scroll('right')}
                        className='absolute right-2 top-[60%] z-20 bg-white/90 p-2 rounded-full shadow-lg hover:bg-[#da6d42] hover:text-white transition-all hidden md:block'
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}

            {/* Container: 'justify-start' ensures they don't stretch */}
            <div 
                ref={scrollRef}
                className='flex overflow-x-auto gap-6 scroll-smooth no-scrollbar py-4 justify-start'
            >
                {
                    bestSeller.map((item, index) => (
                        /* Fixed width keeps cards perfect. flex-none prevents shrinking/growing */
                        <div key={index} className='flex-none w-[180px] sm:w-[200px] md:w-[220px]'>
                            <ProductItem id={item._id} name={item.name} image={item.image} price={item.price} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default BestSeller