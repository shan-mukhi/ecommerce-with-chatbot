import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function Layout() {
  return (
    <>
      <Header/>
      <ToastContainer/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Layout