import { Outlet } from "react-router-dom"
import AppBar from "./appbar/appbar"
import { useState } from "react"
import SideDrawer from "./appbar/side_drawer"

const RootLayout = () => {
    const [toggleDrawer, setToggleDrawer] = useState(false)

    const toggleDrawerController = () => {
        setToggleDrawer(prev => !prev)
    }

    return <>
        <AppBar onClick={toggleDrawerController} />
        <SideDrawer toggleDrawer={toggleDrawer} />

        <Outlet />
    </>

}
export default RootLayout