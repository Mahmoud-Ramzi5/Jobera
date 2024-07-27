import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ScrollUp from "../components/ScrollUp";


const Layout = () =>{
  return (
    <>
      <NavBar />
      <Outlet />
      <ScrollUp/>
      <Footer />
    </>
  )
};

export default Layout;