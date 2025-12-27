import React from 'react';

const PromoBanner = () => {
    return (
        <div className="text-center p-4 mb-8 bg-red-50 text-gray-800 rounded-lg">
            <p className="text-base md:text-lg">
                Super discount for your <span className="font-bold underline text-red-700">first purchase.</span>

                <a href="/contact">
  <button className="mx-3 px-3 py-1 bg-red-700 text-white font-semibold text-sm rounded-md shadow-sm">
    VISIT OUR STORE
  </button>
</a>

                <span className="text-gray-500 text-sm">..</span>
            </p>
        </div>
    );
};

export default PromoBanner;