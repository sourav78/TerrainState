import React from 'react'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <>
            <div className="h-screen flex flex-col">
                <NavBar />
                <Outlet />
            </div>
        </>
    )
}

export default Layout