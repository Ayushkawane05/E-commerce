import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center justify-between py-4 px-[5%] bg-white shadow-md'>
      {/* Logo */}
      <img className='w-[max(10%, 100px)]' src={assets.logo} alt="Logo" />

      {/* Logout Button */}
      <button
        onClick={() => setToken('')}
        className='bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow hover:shadow-lg'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
