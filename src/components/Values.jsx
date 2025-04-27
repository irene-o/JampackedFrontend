import React from 'react'
import { assets } from '../assets/assets'

const Values = () => {
    return (
        <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
            <div>
                <img src={assets.time_icon} className='w-12 m-auto mb-5' alt=''/>
                <p className='font-semibold text-[#414141]'>Quick and Easy Event Planning</p>
                <p className='text-gray-500'>With no fees, forever</p>
            </div>
            <div>
                <img src={assets.connect_icon} className='w-12 m-auto mb-5' alt=''/>
                <p className='font-semibold text-[#414141]'>Connect with Friends</p>
                <p className='text-gray-500'>To begin planning your dream events</p>
            </div>
            <div>
                <img src={assets.memories_icon} className='w-12 m-auto mb-5' alt=''/>
                <p className='font-semibold text-[#414141]'>Save and Share Memories</p>
                <p className='text-gray-500'>Cherish special moments in your live chats</p>
            </div>
        </div>
        
    )
}

export default Values