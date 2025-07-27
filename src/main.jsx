import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AuthPage from './pages/AuthPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/home',
    element: <Home scrollTo={"home"} />,
  },
  {
    path: "/features",
    element: <Home scrollTo={"features"} />,
  },
  {
    path: "/How it works",
    element: <Home scrollTo={"how-it-works"} />,
  },
  {
    path: "/Testimonials",
    element: <Home scrollTo={"testimonials"} />,
  },
  {
    path: "/about",
    element: <Home scrollTo={"about"} />,
  },
  {
    path: "/auth/:mode",
    element: <AuthPage />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    
  </StrictMode>,
)
