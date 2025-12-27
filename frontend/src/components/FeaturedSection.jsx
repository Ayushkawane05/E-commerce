import React from 'react';
import CardComponent from './Card1';
import img1 from '../assets/card_img_1.png';
import img2 from '../assets/card_img_2.png';
import img3 from '../assets/card_img_3.png';

const FeaturedSection = () => {
  return (
    <div className="container mx-auto p-4 my-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* OFFICE -> Mapped to 'Banner' */}
        <CardComponent 
          title="Office" 
          subtitle="Professional & Sleek" 
          linkText="Explore" 
          linkUrl="/collection"
          categoryName="Banner" 
          customBgColor='bg-[#ADBB91]' 
          imageUrl={img2}
        />

        {/* HOME -> Mapped to 'Handmade Decor' */}
        <CardComponent 
          title="Home" 
          subtitle="Warm & Artisanal" 
          linkText="Explore" 
          linkUrl="/collection"
          categoryName="Home Decor"
          customBgColor="bg-[#da6d42]" 
          imageUrl={img1}
        />

        {/* NEW -> Mapped to 'Pottery' */}
        <CardComponent 
          title="New" 
          subtitle="Latest Creations" 
          linkText="Explore" 
          linkUrl="/collection"
          categoryName="Pottery"
          customBgColor="bg-[#ccaa66]" 
          imageUrl={img3}
        />

      </div>
    </div>
  );
};

export default FeaturedSection;