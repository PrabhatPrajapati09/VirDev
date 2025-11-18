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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authLoader } from "./loader/authLoader";
import { AuthProvider } from "./context/authContext";
import Profile from './pages/Profile.jsx';
import Requests_page from './pages/Requests_page.jsx';
import Connections_page from './pages/Connections_page.jsx';
import VerifyEmail from './pages/VerifyEmail.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import Ideas_Page from './pages/Ideas_Page.jsx';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/home',
    element: <><Home_Navbar /><Home /></>,
    loader: authLoader
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
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/requests",
    element: <Requests_page />
  },
  {
    path: "/connections",
    element: <Connections_page />
  },
  {
    path: "/verify-otp",
    element: <VerifyEmail />
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
  },
  {
    path: "/ideas",
    element:<Ideas_Page />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AppContextProvider>
        <ToastContainer />
        <RouterProvider router={router} />
      </AppContextProvider>
    </AuthProvider>

  </StrictMode>,
)
