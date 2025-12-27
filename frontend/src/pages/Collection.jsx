import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // ✅ Import this
import { assets } from '../assets/assets';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const location = useLocation(); // ✅ Initialize location

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  // ✅ Catch Category from Home Cards (Redirection Logic)
  useEffect(() => {
    if (location.state && location.state.category) {
      setCategory([location.state.category]);
      // Optional: Clear the state so refreshing doesn't keep the filter forced
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  // ✅ Unified Filter and Sort Logic
  const applyFilterAndSort = () => {
    let productsCopy = products.slice();

    // Search Filter
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Category Filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    // SubCategory Filter
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    // Sorting Logic
    switch (sortType) {
      case 'low-high':
        productsCopy.sort((a, b) => (a.price - b.price));
        break;
      case 'high-low':
        productsCopy.sort((a, b) => (b.price - a.price));
        break;
      default:
        // 'relavent' sorting usually maintains original order
        break;
    }

    setFilterProducts(productsCopy);
  };

  // Run filtering whenever any dependency changes
  useEffect(() => {
    applyFilterAndSort();
  }, [category, subCategory, search, showSearch, products, sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t'>

      {/* Filter Sidebar */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2 font-black tracking-widest text-gray-800 uppercase'>
          Filters
          <img className={`h-3 sm:hidden transform transition-transform duration-300 ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-200 p-6 mt-4 rounded-3xl bg-white shadow-sm transition-all duration-300 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-4 text-[10px] font-black tracking-[0.3em] text-gray-400 uppercase'>Categories</p>
          <div className='flex flex-col gap-3 text-sm font-medium text-gray-700'>
            {['Banner', 'Office Decor', 'Home Decor', 'Car Decor', 'Festival'].map((cat, idx) => (
              <label key={idx} className='flex items-center gap-3 cursor-pointer hover:text-[#da6d42] transition-colors'>
                <input 
                  className='w-4 h-4 accent-[#da6d42]' 
                  type="checkbox" 
                  value={cat} 
                  onChange={toggleCategory} 
                  checked={category.includes(cat)} // ✅ Crucial for auto-check
                /> 
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-200 p-6 mt-4 rounded-3xl bg-white shadow-sm transition-all duration-300 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-4 text-[10px] font-black tracking-[0.3em] text-gray-400 uppercase'>Type</p>
          <div className='flex flex-col gap-3 text-sm font-medium text-gray-700'>
            {['Wall Art', 'Sculpture', 'Ceramics', 'Beadwork', 'Macrame'].map((sub, idx) => (
              <label key={idx} className='flex items-center gap-3 cursor-pointer hover:text-[#da6d42] transition-colors'>
                <input 
                  className='w-4 h-4 accent-[#da6d42]' 
                  type="checkbox" 
                  value={sub} 
                  onChange={toggleSubCategory} 
                  checked={subCategory.includes(sub)}
                /> 
                {sub}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product Display Section */}
      <div className='flex-1'>

        {/* Header & Sorting */}
        <div className='flex flex-col sm:flex-row sm:items-center justify-between text-base sm:text-2xl mb-8'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          
          <select 
            onChange={(e) => setSortType(e.target.value)} 
            className='mt-2 sm:mt-0 border-none bg-gray-100 text-[11px] font-bold uppercase tracking-widest px-5 py-3 rounded-full focus:ring-2 focus:ring-[#da6d42] outline-none'
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Price Low to High</option>
            <option value="high-low">Sort by: Price High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10'>
          {
            filterProducts.length > 0 ? (
              filterProducts.map((item, index) => (
                <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
              ))
            ) : (
              <div className='col-span-full py-20 text-center text-gray-400 uppercase tracking-widest text-xs'>
                No products found matching your search.
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Collection;