import { useState } from 'react'
import Header from '../components/Admin/Header'
import Sidebar from '../components/Admin/Sidebar'
import Home from '../components/Admin/Home'
import styles from '../styles/AdminPage.module.css';


const Admin= () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className={styles.grid_container}>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
    </div>
  )
}

export default Admin;