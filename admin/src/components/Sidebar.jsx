import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen bg-white border-r shadow-md'>
      <div className='flex flex-col gap-4 pt-8 pl-[15%] text-[15px]'>

        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-l-lg transition-all duration-300 
            ${isActive ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-blue-100 text-gray-700'}`
          }
        >
          <img className='w-5 h-5' src={assets.add_icon} alt="" />
          <p className='hidden md:block font-medium'>Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-l-lg transition-all duration-300 
            ${isActive ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-blue-100 text-gray-700'}`
          }
        >
          <img className='w-5 h-5' src={assets.order_icon} alt="" />
          <p className='hidden md:block font-medium'>List Items</p>
        </NavLink>

        {/* ✅ NEW: Manage Carousel Link */}
        <NavLink
          to="/addcarousel"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-l-lg transition-all duration-300 
            ${isActive ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-blue-100 text-gray-700'}`
          }
        >
          <img className='w-5 h-5' src={assets.upload_area} alt="" />
          <p className='hidden md:block font-medium'>Manage Carousel</p>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-l-lg transition-all duration-300 
            ${isActive ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-blue-100 text-gray-700'}`
          }
        >
          <img className='w-5 h-5' src={assets.order_icon} alt="" />
          <p className='hidden md:block font-medium'>Orders</p>
        </NavLink>
        <NavLink 
  to="/users" 
  className={({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-l-lg transition-all 
    ${isActive ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-blue-100 text-gray-700'}`
  }
>
    {/* You can use a profile or group icon here */}
    <img className='w-5 h-5' src={assets.order_icon} alt="Users" />
    <p className='hidden md:block font-medium'>All Users</p>
</NavLink>

      </div>
    </div>
  )
}

export default Sidebar