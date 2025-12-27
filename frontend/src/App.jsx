import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
// import Card1 from './components/Card1'
// import CardCarousel from './components/CardCarousel';
// import PromoBanner from './components/PromoBanner.jsx';
// import FeaturedSection from './components/FeaturedSection.jsx';
import Profile from './pages/MyProfile';
const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-primary/30'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/profile' element={<Profile />} /> {/* My Profile Page */}
      </Routes>
      {/* <PromoBanner></PromoBanner> */}
      {/* <FeaturedSection /> */}
      
      {/* <CardCarousel></CardCarousel> */}
      {/* <Card1 /> */}
      <Footer />
    </div>
  )
}

export default App
