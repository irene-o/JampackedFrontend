import React, { useState, useEffect } from 'react'
import { useAuthStore } from '../stores/useAuthStore'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentState, setCurrentState] = useState('Log In');

  const { signup, login } = useAuthStore();

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Register') {
        signup(signupData);
      }
      else {
        login(loginData);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl'>{currentState === 'Register' ? 'Create an Account' : currentState}</p>
      </div>
      {
        currentState === 'Register'
        ? <input onChange={(e)=>setSignupData({ ...signupData, username: e.target.value })} value={signupData.username} type='text' className='w-full px-3 py-2 border border-gray-800' placeholder='Username' required/>
        : <input onChange={(e)=>setLoginData({ ...loginData, username: e.target.value })} value={loginData.username} type='text' className='w-full px-3 py-2 border border-gray-800' placeholder='Username' required/>
      }
      {currentState === 'Register' ? <input onChange={(e)=>setSignupData({ ...signupData, email: e.target.value })} value={signupData.email} type='email' className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/> : ''}
      {
        currentState === 'Register'
        ? <input onChange={(e)=>setSignupData({ ...signupData, password: e.target.value })} value={signupData.password} type='text' className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>
        : <input onChange={(e)=>setLoginData({ ...loginData, password: e.target.value })} value={loginData.password} type='text' className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>
      }

      <div className='w-full flex justify-between text-sm mb-3'>
        {
          currentState === 'Register'
          ? <p className='cursor-pointer' onClick={() => setCurrentState('Log In')}>Log In</p>
          : <p className='cursor-pointer' onClick={() => setCurrentState('Register')}>Create an Account</p>
        }
      </div>
      <button type='submit' className="rounded-md bg-pink-600 py-2 px-4 border-2 border-stone-300 text-center text-sm text-white font-bold shadow-md hover:bg-pink-800 m-4">{currentState === 'Register' ? 'Sign Up' : 'Sign In'}</button>
    </form>
  )
}

export default Login
