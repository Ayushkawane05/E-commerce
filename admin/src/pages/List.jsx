import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { backendUrl, currency } from '../App'

const List = ({ token }) => {

  const [list, setList] = useState([])
  const [searchQuery, setSearchQuery] = useState('') // ✅ Search state

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const updateQuantity = async (id, newQuantity) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/updateQuantity', { id, quantity: newQuantity }, { headers: { token } })

      if (response.data.success) {
        toast.success('Quantity updated successfully');
        await fetchList();
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  // ✅ Filter products based on search input
  const filteredList = list.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className='bg-white p-8 md:p-14 rounded-3xl shadow-2xl'>
      <h1 className='text-4xl font-bold text-gray-800 mb-10 text-center'>All Products List</h1>

      {/* ✅ Search Box */}
      <div className='flex justify-center mb-8'>
        <input
          type="text"
          placeholder="Search product by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
        />
      </div>

      <div className='flex flex-col gap-4'>

        {/* Table Header */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-4 px-6 bg-gray-200 text-gray-700 font-semibold rounded-xl text-lg'>
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Quantity</span>
          <span className='text-center'>Action</span>
        </div>

        {/* Product List */}
        {
          filteredList.map((item, index) => (
            <div
              key={index}
              className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-6 py-5 px-6 bg-gray-50 hover:bg-gray-100 border rounded-xl text-base transition-all duration-300 shadow hover:shadow-lg'
            >
              <img className='w-20 h-20 object-cover rounded-xl border' src={item.image[0]} alt={item.name} />
              <p className='font-semibold text-gray-800 text-lg'>{item.name}</p>
              <p className='text-gray-600 text-base'>{item.category}</p>
              <p className='font-bold text-gray-700 text-lg'>{currency}{item.price}</p>

              {/* Quantity Input */}
              <input
                type="number"
                value={item.quantity}
                min="0"
                onChange={(e) => updateQuantity(item._id, e.target.value)}
                className='w-20 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
              />

              {/* Remove Button */}
              <button
                onClick={() => removeProduct(item._id)}
                className='text-red-500 hover:text-red-700 font-bold text-3xl md:text-4xl text-right md:text-center transition-transform transform hover:scale-125'
              >
                ×
              </button>
            </div>
          ))
        }

        {/* Empty State */}
        {
          filteredList.length === 0 && (
            <p className='text-center text-gray-500 py-16 text-xl'>No matching products found.</p>
          )
        }

      </div>
    </div>
  )
}

export default List
