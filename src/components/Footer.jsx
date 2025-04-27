import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <hr />
            <div className='text-center mb-10 mt-5'>
                <img className='w-52 m-auto' src={assets.jampacked_logo} alt='JamPacked' />
            </div>
            <div className='flex flex-col sm:grid grid-cols-[2fr_2fr] gap-10 text-sm'>
                <div className='text-center'>
                    <p className='text-2xl font-medium mb-5 cherry-bomb-one-regular text-[#414141]'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-700'>
                        <Link to='/' className='relative'>
                            <li className='cursor-pointer hover:text-pink-600'>Home</li>
                        </Link>
                        <Link to='/about' className='relative'>
                            <li className='cursor-pointer hover:text-pink-600'>About Us</li>
                        </Link>
                    </ul>
                </div>
                <div className='text-center'>
                    <p className='text-2xl font-medium mb-5 cherry-bomb-one-regular text-[#414141]'>NEED TO GET IN TOUCH?</p>
                    <ul className='flex flex-col gap-1 text-gray-700'>
                        <li>+353-81-234-5678</li>
                        <li>irenevoen@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div>
                <p className='py-5 text-xs text-center text-gray-500 mt-10'>Copyright 2024 JamPacked Planning Ltd - All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Footer
