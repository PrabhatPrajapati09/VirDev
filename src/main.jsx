import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import LoginForm from './components/auth/LoginForm.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: "/features",
    element: <h1>Features</h1>,
  },
  {
    path: "/How it works",
    element: <h1>How it works</h1>,
  },
  {
    path: "/Testimonials",
    element: <h1>Testimonials</h1>,
  },
  {
    path: "/about",
    element: <h1>About</h1>,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    
  </StrictMode>,
)
