import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import team_1 from '../assets/Picture1.png'
import team_2 from '../assets/Picture2.png'
import team_3 from '../assets/Picture3.png'
// import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      {/* --- Existing "About Us" Section --- */}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[800px]' src={assets.logo} alt="About ARKLR" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-justify'>
          <p>ARKLR Enterprises is a design and manufacturing firm specialize in creating bespoke décor products and customized gifting solutions.  Our products embody timeless elegance, creativity, and ecofriendly practices. With a commitment to craftsmanship and innovation, we design and manufacture products that leave a lasting impression.
            We utilize advanced machineries in combination with skilled personnel to guarantee precision, durability, and flawless finish products.
            We take pride in dedication to detail, ensuring every piece speaks of authenticity and refinement.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          {/* Note: Changed <p> containing <li> to <ul> for proper semantics and styling */}
          <ul className='flex flex-col gap-2 md:w-3/4 text-gray-600 list-disc pl-5'>
            <li>Craftsmanship Excellence: We uphold the finest standards of design and workmanship in every product we create.</li>
            <li>Innovation & Customization: We innovate continuously to deliver personalized and exquisite designs. </li>
            <li>Integrity & Professionalism: We build lasting customer relationships through transparency and reliability. </li>
            <li>Sustainability: We follow sustainable production practices using eco-conscious materials. </li>
          </ul>
        </div>
      </div>

      {/* --- Existing "Why Choose Us" Section --- */}
      <div className=' text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20 border-500 rounded-lg overflow-hidden'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 bg-sub'>
          <b>Quality Assurance:</b>
          <p className=' text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 bg-sub'>
          <b>Convenience:</b>
          <p className=' text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 bg-sub'>
          <b>Exceptional Customer Service:</b>
          <p className=' text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>


      {/* --- NEW SECTION: OUR TEAM --- */}
      <div className='my-20'>
        <div className='text-xl py-4 text-center mb-10'>
          <Title text1={'OUR'} text2={'TEAM'} />
        </div>

        {/* Team Grid Container */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-4 md:px-0 '>

          {/* Team Member 1 */}
          <div className='flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-lg transition-shadow duration-300 bg-sub/80'>
            {/* REPLACE placeholder src with your asset: src={assets.team_1} */}
            <img
              className='w-40 h-40 rounded-full object-cover mb-4 bg-gray-200'
              src={team_1}
              alt="Praveen Dhanuskar"
            />            <h3 className='text-lg font-semibold text-gray-800'>Pravin Dhanuskar</h3>
            <p className='text-indigo-600 mb-3 font-medium'>Lead Consultant - Design & Production</p>
            <p className='text-sm text-gray-600'>
              <i>
                A pioneer in the industry. Founder of Artej Handicrafts India.
                Sir JJ school of Arts alumnus. With nearly two decades of
                experience in the field; Mr. Pravin Dhanuskar act as the
                Lead Consultant for designing and production at ARKLR
              </i>
            </p>
          </div>

          {/* Team Member 2 */}
          <div className='flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-lg transition-shadow duration-300 bg-sub/80'>
            {/* REPLACE placeholder src with your asset: src={assets.team_2} */}
            <img
              className='w-40 h-40 rounded-full object-cover mb-4 bg-gray-200'
              src={team_2}
              alt="Binukumar Pillai"
            />
            <h3 className='text-lg font-semibold text-gray-800'>Binukumar Pillai</h3>
            <p className='text-indigo-600 mb-3 font-medium'>Head of Manufacturing</p>
            <p className='text-sm text-gray-600'>
              <i>International certified professional. With his 20+ years of creative
                and technical experience in digital marketing in India and abroad,
                Mr. Binukumar Pillai heads the dynamic team of digital marketing at ARKLR.
              </i>
            </p>
          </div>

          {/* Team Member 3 */}
          <div className='flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-lg transition-shadow duration-300 bg-sub/80'>
            {/* REPLACE placeholder src with your asset: src={assets.team_3} */}
            <img
              className='w-40 h-40 rounded-full object-cover mb-4 bg-gray-200'
              src={team_3}
              alt="Praveen Kumar"
            />
            <h3 className='text-lg font-semibold text-gray-800'>Praveen Kumar</h3>
            <p className='text-indigo-600 mb-3 font-medium'>Head – Marketing & Operations</p>
            <p className='text-sm text-gray-600'>

              <i>Vastly experienced professional, a Bangalore University alumnus,
                with his wide-ranging 15+ years of domestic & abroad experience
                at various MNCs, leads the Marketing & Operations department at ARKLR.
              </i>            </p>
          </div>

        </div>
      </div>

      {/* <NewsletterBox /> */}

    </div>
  )
}

export default About