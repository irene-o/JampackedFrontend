import React from 'react'
import { Loader } from "lucide-react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import CreateEvent from './pages/CreateEvent'
import Navbar from './components/Navbar'
import Contact from './pages/Contact'
import Friends from './pages/Friends'
import SearchUsers from './pages/SearchUsers';
import Footer from './components/Footer'

import { useAuthStore } from "./stores/useAuthStore";
import { useEffect } from "react";

const App = () => {

  const { authUser, checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <Navbar />
        <ToastContainer position='top-left' autoClose={3000} style={{ marginTop: "50px" }}/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/login' element={!authUser ? <Login/> : <Navigate to="/dashboard"/>} />
          <Route path='/profile' element={authUser ? <Profile/> : <Navigate to="/login"/>} />
          <Route path='/dashboard' element={authUser ? <Dashboard/> : <Navigate to="/login"/>} />
          <Route path='/newevent' element={authUser ? <CreateEvent/> : <Navigate to="/login"/>} />
          <Route path='/friends' element={authUser ? <Friends/> : <Navigate to="/login"/>} />
          <Route path='/search' element={authUser ? <SearchUsers/> : <Navigate to="/login"/>} />
        </Routes>
        <Footer/>
      </div>
  )
}

export default App

