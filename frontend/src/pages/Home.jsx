import React from 'react'
// import Hero from '../components/Hero'
import Hero1 from '../components/Hero1'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
// import NewsletterBox from '../components/NewsletterBox'
import FeaturedSection from '../components/FeaturedSection.jsx';
import PromoBanner from '../components/PromoBanner.jsx';

const Home = () => {
  return (
    <div>
      <PromoBanner></PromoBanner>
      <Hero1 />
      <FeaturedSection />
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      {/* <NewsletterBox/> */}
    </div>
  )
}

export default Home
