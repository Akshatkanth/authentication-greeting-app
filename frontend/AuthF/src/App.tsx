import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'
import Home from './Components/Home/Home'
import RootLayout from './RootLayout'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import ProtectedRoute from './Components/protectedRoutes/ProtectedRoute'

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      children:[
        {
          path:'/',
          element: <Navigate to="/home" />
        },
        {
          path:'/home', 
          element: <Home/>
        },
        {
          path:'/login', 
          element: <Login/>
        },
        {
          path:'/protected', 
          element: <ProtectedRoute><div>Protected Content</div></ProtectedRoute>
        },
        {
          path:'/admin', 
          element: <ProtectedRoute requiredUserType="Admin"><div>Admin Content</div></ProtectedRoute>
        },
      ]
    },
    {
      path:'/signup', 
      element: <Signup/>
    },
  ])

  return (
    <StrictMode>
      <RouterProvider router={router}/>
    </StrictMode>
  )
}

export default App
