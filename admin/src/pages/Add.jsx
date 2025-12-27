import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'
import { assets } from '../assets/assets'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(""); // ✅ New Quantity State
  const [category, setCategory] = useState("Banner");
  const [subCategory, setSubCategory] = useState("Wall Art");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("quantity", quantity) // ✅ Appending Quantity
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setQuantity('') // ✅ Reset Quantity
        setSizes([])
        setBestseller(false)
        setCategory('Banner')
        setSubCategory('Wall Art')
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Product</h1>
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-6">

        {/* Image Upload Section */}
        <div>
          <p className="text-lg font-semibold text-gray-700 mb-3">Upload Product Images</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[{ id: 'image1', state: image1, setState: setImage1 },
            { id: 'image2', state: image2, setState: setImage2 },
            { id: 'image3', state: image3, setState: setImage3 },
            { id: 'image4', state: image4, setState: setImage4 }].map((img, index) => (
              <label key={index} htmlFor={img.id} className="border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center h-28 hover:border-blue-400 cursor-pointer transition">
                <img className="h-full w-full object-cover rounded-lg" src={!img.state ? assets.upload_area : URL.createObjectURL(img.state)} alt="" />
                <input onChange={(e) => img.setState(e.target.files[0])} type="file" id={img.id} hidden />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Product Name</label>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Enter product name" required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        {/* Product Description */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Product Description</label>
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Enter product description" required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        {/* Category, Price and Quantity */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Category</label>
            <select onChange={(e) => setCategory(e.target.value)} value={category}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="Banner">Banner</option>
              <option value="Office Decor">Office Decor</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Car Decor">Car Decor</option>
              <option value="Festival">Festival</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Sub Category</label>
            <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="Wall Art">Wall Art</option>
              <option value="Sculpture">Sculpture</option>
              <option value="Ceramics">Ceramics</option>
              <option value="Beadwork">Beadwork</option>
              <option value="Macrame">Macrame</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Price</label>
            <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" placeholder="Enter price" required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          {/* ✅ Quantity Field */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Quantity</label>
            <input onChange={(e) => setQuantity(e.target.value)} value={quantity} type="number" placeholder="Enter quantity" required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>

        {/* Bestseller Checkbox */}
        <div className="flex items-center">
          <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller"
            className="mr-2 w-4 h-4 text-blue-400 focus:ring-blue-400 border-gray-300 rounded" />
          <label htmlFor="bestseller" className="text-gray-700 cursor-pointer">Add to Bestseller</label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-10 rounded-lg transition">Add Product</button>
        </div>

      </form>
    </div>
  )
}

export default Add
