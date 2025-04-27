import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='flex justify-center m-5 pb-10'>
        <div className='flex flex-col w-1/3'>
          <img className='m-auto border-2 border-pink-400 rounded' src={assets.about_irene} alt='Irene Ogbevoen' />
        </div>
        <div className='w-1/2 m-5 text-center ml-10'>
          <h1 className='cherry-bomb-one-regular text-3xl sm:py-2 lg:text-4xl leading-loose text-[#414141]'>About Me</h1>
          <p className='mb-5 mt-3 text-justify'>
            My name is Irene Ogbevoen and I'm a 4th Year Computing Student from TU Dublin Tallaght.
            I am passionate about creating and maintaining strong connections between friends, and that
            inspired me to come up with a sleek and fun solution to the everlasting problem of lining up schedules
            and planning activities with JamPacked!
          </p>
          <a href="https://irene-o.github.io/Portfolio/index.html" className='text-pink-400 hover:text-pink-600'>Learn more about me and what I'm up to here!</a>
        </div>
      </div>

      <div className='text-center'>
        <h1 className='cherry-bomb-one-regular text-3xl sm:py-2 lg:text-4xl leading-loose text-[#414141]'>Credits and References</h1>
        <div className='flex justify-center'><p className='w-80 md:w-100 mt-2 h-[1px] bg-[#414141]' /></div>
        <div className='my-7'>
          <ul>USER ICON: <a href="https://www.freepik.com/icons/user">Icon by HideMaru</a></ul>
          <ul>SEARCH ICON: <a href="https://www.freepik.com/search#uuid=f940462f-4a45-4a19-845e-df9b901cdab8">Icon by Zesan</a></ul>
          <ul>NOTIFICATION ICON: <a href="https://www.freepik.com/search#uuid=b50abdbb-05fc-47c2-b9f7-89048c2633f4">Icon by Freepik</a></ul>
          <ul>MENU ICON: <a href="https://www.freepik.com/search#uuid=d9801f62-c489-444d-8b6f-eb5e3176c19b">Icon by Phoenix Group</a></ul>
          <ul>BACK ICON: <a href="https://www.freepik.com/search">Icon by M.Z Vector</a></ul>
          <ul>TIME ICON: <a href="https://www.freepik.com/search">Icon by Freepik</a></ul>
          <ul>CONNECT ICON: <a href="https://www.freepik.com/search">Icon by Freepik</a></ul>
          <ul>MEMORIES ICON: <a href="https://www.freepik.com/search">Icon by Freepik</a></ul>
          <ul>SPACE IMAGE: <a href="https://www.freepik.com/free-photo/galaxy-space-textured-background_18835239.htm#fromView=search&page=1&position=38&uuid=991ae55e-9beb-4421-b0d7-861cf3ed15be">Image by rawpixel.com on Freepik</a></ul>
        </div>

      </div>
    </div>
  )
}

export default About
