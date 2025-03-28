import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

export default function RootLayout() {
    return (
        <div className="main">
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Outlet />
        </div>
    );
}
