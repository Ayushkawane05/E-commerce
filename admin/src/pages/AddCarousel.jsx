import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const AddCarousel = ({ token }) => {

  const [image, setImage] = useState(false)
  const [title, setTitle] = useState("")
  const [tag, setTag] = useState("")
  const [link, setLink] = useState("")
  const [list, setList] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("tag", tag)
      formData.append("link", link)
      image && formData.append("image", image)

      const response = await axios.post(backendUrl + "/api/carousel/add", formData, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        setTitle('')
        setTag('')
        setLink('')
        setImage(false)
        fetchCarousel()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const fetchCarousel = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/carousel/list")
      if (response.data.success) {
        setList(response.data.slides)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const removeSlide = async (id) => {
    try {
      const response = await axios.post(backendUrl + "/api/carousel/remove", { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        fetchCarousel()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchCarousel()
  }, [])

  return (
    <div className='p-8'>
      <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3 bg-white p-8 rounded-xl shadow-sm'>
        <p className='text-2xl font-bold mb-4'>Add Carousel Slide</p>
        
        <div className='flex gap-4 mb-4'>
          <p className='mb-2'>Upload Slide Image</p>
          <label htmlFor="image">
            <img className='w-40 h-24 object-cover border-2 border-dashed border-gray-300 rounded-lg cursor-pointer' src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
          </label>
        </div>

        <div className='w-full max-w-[500px]'>
          <p className='mb-2'>Slide Title (Main Heading)</p>
          <input onChange={(e) => setTitle(e.target.value)} value={title} className='w-full px-3 py-2 border rounded' type="text" placeholder='e.g. Latest Arrivals' required />
        </div>

        <div className='w-full max-w-[500px]'>
          <p className='mb-2'>Slide Tag (Small Label)</p>
          <input onChange={(e) => setTag(e.target.value)} value={tag} className='w-full px-3 py-2 border rounded' type="text" placeholder='e.g. OUR BESTSELLERS' required />
        </div>

        <div className='w-full max-w-[500px]'>
          <p className='mb-2'>Redirect Link (Optional)</p>
          <input onChange={(e) => setLink(e.target.value)} value={link} className='w-full px-3 py-2 border rounded' type="text" placeholder='/collection' />
        </div>

        <button type="submit" className='w-28 py-3 mt-4 bg-black text-white rounded-md'>ADD</button>
      </form>

      <hr className='my-10' />

      <p className='text-2xl font-bold mb-6'>Current Slides</p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {list.map((item, index) => (
          <div key={index} className='bg-white p-4 rounded-xl shadow-sm relative group'>
            <img className='w-full h-40 object-cover rounded-lg mb-4' src={item.image} alt="" />
            <p className='font-bold'>{item.title}</p>
            <p className='text-sm text-gray-500'>{item.tag}</p>
            <button onClick={() => removeSlide(item._id)} className='absolute top-6 right-6 bg-red-500 text-white w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'>X</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddCarousel