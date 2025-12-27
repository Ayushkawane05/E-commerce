import React, { useEffect, useState } from 'react';
import Slider from 'react-slick'; 
import axios from 'axios';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Hero1 = () => {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ Fetch dynamic slides from Backend
    const fetchCarouselData = async () => {
        try {
            // Replace with your actual backend URL
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/carousel/list');
            if (response.data.success) {
                setSlides(response.data.slides);
            }
        } catch (error) {
            console.error("Error loading carousel:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCarouselData();
    }, []);

    const settings = {
        dots: true,
        infinite: slides.length > 1, // Only infinite if more than 1 slide
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
    };

    if (loading) {
        return <div className='h-[70vh] w-full bg-gray-100 animate-pulse flex items-center justify-center'>Loading...</div>;
    }

    // Fallback if no slides exist in database
    if (slides.length === 0) return null;

    return (
        <div className='w-full overflow-hidden relative'>
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div 
                        key={index} 
                        className='relative h-[70vh] md:h-[80vh] flex items-center justify-center outline-none'
                    >
                        {/* 1. Dynamic Background Image from Cloudinary */}
                        <img 
                            src={slide.image} 
                            alt={slide.title} 
                            className='w-full h-full object-cover absolute inset-0'
                        />

                        {/* 2. Text Overlay */}
                        <div className='absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center'>
                            <div className='text-white text-center p-4'>
                                <div className='flex items-center justify-center gap-2'>
                                    <p className='w-8 md:w-11 h-[2px] bg-white'></p>
                                    {/* Using slide.tag or a default value */}
                                    <p className='font-medium text-sm md:text-base tracking-widest uppercase'>
                                        {slide.tag || 'LATEST ARRIVALS'}
                                    </p>
                                </div>
                                <h1 className='prata-regular text-4xl sm:text-6xl lg:text-7xl leading-tight my-4'>
                                    {slide.title}
                                </h1>
                                
                                {/* Link to dynamic collection if provided */}
                                <a href={slide.link || '/collection'} className='flex items-center justify-center gap-2 mt-6 cursor-pointer hover:opacity-80 transition-opacity'>
                                    <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                                    <p className='w-8 md:w-11 h-[1px] bg-white'></p>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Hero1;