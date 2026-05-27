import { Outlet } from "react-router-dom"
import React, { useContext } from "react"

import NavBar from "../pages/Nav"

export default function RootLayout() {
    return (
        <>
            <div className="sticky top-0 mb-5 z-(--z-nav-bar)">
                <NavBar />
            </div>

            <div className="px-5">
                <Outlet />
            </div>
        </>
    )
}