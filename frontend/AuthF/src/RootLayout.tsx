import Navbar from './Components/Navbar'
import { Outlet } from 'react-router-dom'
// In RootLayout.tsx or another appropriate component
import ConnectionControl from './Components/connectioncontrol/ConnectionControl';




function RootLayout() {
  return (
    <>
      <Navbar/>
      <Outlet />
      <ConnectionControl />
    </>
  )
}

export default RootLayout
