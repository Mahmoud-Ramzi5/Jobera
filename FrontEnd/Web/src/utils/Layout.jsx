import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import ScrollUp from '../components/ScrollUp.jsx';


const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <ScrollUp />
      <Footer />
    </>
  )
};

export default Layout;