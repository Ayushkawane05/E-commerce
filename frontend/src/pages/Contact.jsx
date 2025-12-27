import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
// import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 border-t bg-sub'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className=' text-gray-500'>Arklr Enterprises, A4, 'The Office' 4th floor,

            Jos Annex Building <br /> Jos Junction, MG road, Kochi 682016</p>
          <p className=' text-gray-500'>Tel:  +91 9027799799 <br /> Email:contact@arklr.com</p>
          {/* <p className='font-semibold text-xl text-gray-600'>Careers at Arklr</p>
          <p className=' text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button> */}
        </div>
      </div>

      {/* <NewsletterBox/> */}
    </div>
  )
}

export default Contact
