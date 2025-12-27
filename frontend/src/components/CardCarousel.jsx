import React, { useState } from 'react';

const cardData = [
    { id: 1, title: 'Card 1', content: 'Content for the first card...' },
    { id: 2, title: 'Card 2', content: 'Content for the second card...' },
    { id: 3, title: 'Card 3', content: 'Content for the third card...' },
    { id: 4, title: 'Card 4', content: 'Content for the fourth card, the active card.' },
    { id: 5, title: 'Card 5', content: 'Content for the final card...' },
];

const CardCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(3); // Start at Card 4

    const nextCard = () => {
        setActiveIndex((prevIndex) => (prevIndex === cardData.length - 1 ? 0 : prevIndex + 1));
    };

    const prevCard = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? cardData.length - 1 : prevIndex - 1));
    };

    const CARD_WIDTH_PX = 300;
    const ARROW_OFFSET_PX = 180;

    return (
        // ✨ Key Change: Replaced 'h-screen' with 'py-12' (padding vertical) and removed 'items-center'
        <div className="flex justify-center w-full relative py-12">

            <div className="relative" style={{ width: `${CARD_WIDTH_PX}px`, height: '400px' }}>
                {cardData.map((card, index) => {
                    const diff = index - activeIndex;
                    let transformClass = '';
                    let opacityClass = '';
                    let filterClass = '';
                    let zIndexStyle = { zIndex: cardData.length - Math.abs(diff) };

                    if (diff === 0) {
                        transformClass = 'translate-x-0 scale-100';
                        opacityClass = 'opacity-100';
                        filterClass = 'blur-none';
                    } else if (diff === 1 || diff === 1 - cardData.length) {
                        transformClass = 'translate-x-[50%] scale-[0.9]';
                        opacityClass = 'opacity-70';
                        filterClass = 'blur-md';
                    } else if (diff === -1 || diff === cardData.length - 1) {
                        transformClass = '-translate-x-[50%] scale-[0.9]';
                        opacityClass = 'opacity-70';
                        filterClass = 'blur-md';
                    } else {
                        transformClass = 'scale-[0.8]';
                        opacityClass = 'opacity-0';
                        filterClass = 'blur-lg';
                        zIndexStyle.pointerEvents = 'none';
                    }

                    return (
                        <div
                            key={card.id}
                            className={`absolute top-0 left-0 w-full h-full p-6 
                        rounded-xl bg-white shadow-2xl 
                        transition-all duration-500 ease-in-out
                        ${transformClass} ${opacityClass} ${filterClass}`}
                            style={zIndexStyle}
                        >
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">{card.title}</h2>
                            <p className="text-gray-600 text-sm">{card.content}</p>
                        </div>
                    );
                })}
            </div>

            {/* Navigation Arrows */}
            <button
                className={`absolute z-20 top-1/2 -translate-y-1/2 
                  bg-indigo-600/70 text-white font-bold text-3xl 
                  p-3 rounded-full shadow-lg hover:bg-indigo-700 
                  transition-colors flex items-center justify-center`}
                onClick={prevCard}
                aria-label="Previous Card"
                style={{ left: `calc(50% - ${ARROW_OFFSET_PX}px)` }}
            >
                &lt;
            </button>

            <button
                className={`absolute z-20 top-1/2 -translate-y-1/2 
                  bg-indigo-600/70 text-white font-bold text-3xl 
                  p-3 rounded-full shadow-lg hover:bg-indigo-700 
                  transition-colors flex items-center justify-center`}
                onClick={nextCard}
                aria-label="Next Card"
                style={{ right: `calc(50% - ${ARROW_OFFSET_PX}px)` }}
            >
                &gt;
            </button>
        </div>
    );
};

export default CardCarousel;