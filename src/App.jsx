import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Navbar from './pages/Navbar'
import Home from './pages/Home'



function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
     
      
      <Home />


    </>
  )
}

export default App