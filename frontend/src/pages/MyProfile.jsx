import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Profile = () => {
    // ✅ Extract userData directly from Context
    // This is faster as the data is already fetched when the app loads/logs in
    const { userData } = useContext(ShopContext);

    // Optional: Show a loading state only if userData hasn't arrived yet
    if (!userData) {
        return <div className='p-20 text-center animate-pulse text-gray-400 uppercase tracking-widest'>Loading your profile...</div>;
    }

    return (
        <div className='border-t pt-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
            
            <div className='text-2xl'>
                <Title text1={'MY'} text2={'PROFILE'} />
            </div>

            <div className='mt-10 flex flex-col gap-6 bg-white p-8 rounded-3xl shadow-sm max-w-2xl border border-gray-100'>
                
                {/* Full Name */}
                <div className='flex flex-col gap-1 border-b border-gray-50 pb-4'>
                    <p className='text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]'>Full Name</p>
                    <p className='text-lg font-semibold text-gray-800 italic'>
                        {userData.name}
                    </p>
                </div>

                {/* Email Address */}
                <div className='flex flex-col gap-1 border-b border-gray-50 pb-4'>
                    <p className='text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]'>Email Address</p>
                    <p className='text-lg font-medium text-gray-700'>
                        {userData.email}
                    </p>
                </div>

                {/* Account Status */}
                <div className='flex flex-col gap-1'>
                    <p className='text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]'>Account Status</p>
                    <div className='flex items-center gap-2 mt-1'>
                        <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></span>
                        <p className='text-sm text-green-700 font-bold'>Verified Customer</p>
                    </div>
                    <p className='text-[9px] text-gray-300 font-mono mt-2'>UID: {userData._id}</p>
                </div>

                {/* Edit Button */}
                <button 
                    className='bg-black text-white px-10 py-3 text-xs font-bold tracking-widest rounded-full mt-6 hover:bg-gray-800 transition-all w-fit active:scale-95 shadow-lg'
                >
                    EDIT PROFILE
                </button>
            </div>
        </div>
    );
};

export default Profile;