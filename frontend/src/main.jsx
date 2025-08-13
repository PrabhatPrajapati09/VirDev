import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginForm from './components/auth/LoginForm.jsx'
import SignupForm from './components/auth/SignupForm.jsx'
import Home from './pages/Home.jsx'
import Home_Navbar from './pages/Home_Navbar.jsx'
import { AppContextProvider } from './context/appContext.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/home',
    element: <><Home_Navbar /><Home /></>,
  },
  {
    path: "/features",
    element: <App scrollTo={"features"} />,
  },
  {
    path: "/How it works",
    element: <App scrollTo={"how-it-works"} />,
  },
  {
    path: "/Testimonials",
    element: <App scrollTo={"testimonials"} />,
  },
  {
    path: "/about",
    element: <App scrollTo={"about"} />,
  },
  {
    path: "/login",
    element: <LoginForm />
  },
  {
    path: "/register",
    element: <SignupForm />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContextProvider>

      <RouterProvider router={router} />
    </AppContextProvider>

  </StrictMode>,
)
