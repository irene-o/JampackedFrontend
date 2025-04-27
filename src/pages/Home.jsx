import React from 'react'
import Banner from '../components/Banner'
import Values from '../components/Values'
import Places from '../components/Places'
import { useAuthStore } from '../stores/useAuthStore'

const Home = () => {
  const { authUser } = useAuthStore();
  return (
    <div>
      <Banner/>
      { authUser ? <Places/> : <Values/> }

    </div>
  )
}

export default Home
