import React, { useEffect, useState } from 'react'
import { HeartHandshake } from 'lucide-react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const [visible, setVisible] = useState(false);
    const navigate = useNavigate()
    const { logout, authUser } = useAuthStore();

  return (
    <div className='flex items-center justify-between py-3 font-medium'>
        <Link to={'/'}><img src={assets.jampacked_logo} className='w-24' alt='JamPacked Navbar Logo'/></Link>
        {!authUser &&
        <ul className='hidden sm:flex gap-5 text-sm text-[#414141]'>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p className='cherry-bomb-one-regular'>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-pink-600 hidden' />
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p className='cherry-bomb-one-regular'>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-pink-600 hidden' />
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                <p className='cherry-bomb-one-regular'>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-pink-600 hidden' />
            </NavLink>
        </ul>}

        <div className='flex items-center gap-6'>
            {authUser &&
                <div className='flex items-center m-0 p-0 gap-6'>
                    <Link to='/newevent' className='relative text-3xl'>+</Link>
                    <Link to='/search' className='relative text-3xl'>
                        <img src={assets.search_icon} className='w-5 cursor-pointer' alt=''/>
                    </Link>
                    <Link to='/friends' className='relative'>
                        <HeartHandshake className='w-5'/>
                    </Link>
                </div>
            }
            <div className='group relative'>
                {authUser ? <img src={authUser.profilePic || assets.user_icon} className='w-5 cursor-pointer' alt='profile'/>
                    : <img onClick={() => navigate('/login')} src={assets.user_icon} className='w-5 cursor-pointer' alt='profile'/>
                }
                
                {authUser &&
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-pink-600 rounded'>
                            <Link to='/dashboard' className='relative'>
                                <p className='cursor-pointer hover:text-pink-900'>Dashboard</p>
                            </Link>
                            <Link to='/profile' className='relative'>
                                <p className='cursor-pointer hover:text-pink-900'>My Profile</p>
                            </Link>
                            <Link>
                                <p onClick={logout} className='cursor-pointer hover:text-pink-900'>Logout</p>
                            </Link>
                        </div>
                    </div>
                }

            </div>
            <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt=''/>
        </div>
            {/* Sidebar for small screens */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img className='h-4 rotate-90' src={assets.back_icon} alt=''/>
                        <p>Back</p>
                    </div>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
                </div>
            </div>  
    </div>
  )
}

export default Navbar
