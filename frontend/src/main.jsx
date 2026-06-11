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
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { authLoader } from "./loader/authLoader";
import { AuthProvider } from "./context/authContext";
import Profile from './pages/Profile.jsx';
import Requests_page from './pages/Requests_page.jsx';
import Connections_page from './pages/Connections_page.jsx';
import VerifyEmail from './pages/VerifyEmail.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import Ideas_Page from './pages/Ideas_Page.jsx';
import Create_Idea from './pages/Create_Idea.jsx';
import Users_Ideas from './pages/Users_Ideas.jsx';
import Chat from './pages/Chat.jsx'
import { SocketProvider } from "./context/socketContext";
import IdeaInterest from '../../backend/models/IdeaInterest.js'
import Devroom from './pages/Devroom.jsx'
import EditorPage from './pages/EditorPage.jsx'


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
    element: <Profile />,
    loader: authLoader
  },
  {
    path: "/requests",
    element: <Requests_page />,
    loader: authLoader
  },
  {
    path: "/connections",
    element: <Connections_page />,
    loader: authLoader
  },
  {
    path: "/verify-otp",
    element: <VerifyEmail />,
    loader: authLoader
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
    loader: authLoader
  },
  {
    path: "/ideas",
    element: <Ideas_Page />,
    loader: authLoader
  },
  {
    path: "/create-idea",
    element: <Create_Idea />,
    loader: authLoader
  },
  {
    path: "/my-ideas",
    element: <Users_Ideas />,
    loader: authLoader
  },
  {
    path: "/messages",
    element: <Chat />,
    loader: authLoader
  },
  {
    path: "/my-idea-interests",
    element: <IdeaInterest />,
    loader: authLoader
  },
  {
    path: "/devroom",
    element: <Devroom />,
    loader: authLoader,
  },
  {
    path: "/devroom/editor/:roomId",
    element: <EditorPage />,
    loader: authLoader
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AppContextProvider>
        <SocketProvider>
          <ToastContainer />
          <Toaster
            position='top-right'
            toastOptions={{
              success: {
                theme: {
                  primary: 'green',
                  secondary: 'black'
                }
              }
            }}
          />
          <RouterProvider router={router} />
        </SocketProvider>
      </AppContextProvider>
    </AuthProvider>

  </StrictMode>,
)
