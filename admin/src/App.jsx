import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import AddCarousel from './pages/AddCarousel' // ✅ Import the new page
import UsersList from './pages/UsersList'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className='bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen font-sans'>
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken} />
        : <>
          <Navbar setToken={setToken} />
          <div className='flex'>
            <Sidebar />
            <main className='flex-1 p-4 md:p-8 lg:p-12 bg-white shadow-inner min-h-screen rounded-tl-3xl transition-all'>
              <div className='max-w-6xl mx-auto'>
                <Routes>
                  <Route path='/add' element={<Add token={token} />} />
                  <Route path='/list' element={<List token={token} />} />
                  <Route path='/orders' element={<Orders token={token} />} />
                  {/* ✅ New Route for Carousel Management */}
                  <Route path='/addcarousel' element={<AddCarousel token={token} />} />
                  <Route path='/users' element={<UsersList token={token} />} />
                </Routes>
              </div>
            </main>
          </div>
        </>
      }
    </div>
  )
}

export default App