import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores/useAuthStore'

const Banner = () => {
    const { authUser } = useAuthStore();
    
    return (
        <div className='flex sm:flex-row border border-gray-400'>
            {/* Banner Left */}
            <div className='w-1/2 flex items-center justify-center py-10 sm:py-0'>
                <div className='text-[#414141] text-center'>
                    <img src={assets.jampacked_logo_caption} className='w-96' alt='JamPacked With Caption'/>
                    {!authUser &&
                        <div>
                            <Link to="/login" state={{ mode: "register" }}><button className="rounded-md bg-pink-600 py-2 px-4 border-2 border-stone-300 text-center text-sm text-white font-bold shadow-md hover:bg-pink-800 m-4" type="button">Sign Up</button></Link>
                            <Link to="/login" state={{ mode: "login" }}><button className="rounded-md bg-white py-2 px-4 border border-black text-center text-sm text-[#414141] font-bold shadow-md hover:bg-gray-300 m-4" type="button">Log In</button></Link>
                        </div>
                    }
                    {authUser &&
                        <div>
                            <Link to="/dashboard"><button className="rounded-md bg-pink-600 py-2 px-4 border-2 border-stone-300 text-center text-sm text-white font-bold shadow-md hover:bg-pink-800 m-4" type="button">Dashboard</button></Link>
                        </div>
                    }
                    
                </div>
            </div>
            {/* Banner Right */}
            <div className='w-1/2 flex-auto items-center justify-center'>
                <img className='w-full object-cover' src={assets.banner_img} alt='banner'/>
            </div>
        </div>
    )
}

export default Banner
