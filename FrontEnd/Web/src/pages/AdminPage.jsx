import { useState } from 'react';
import Header from '../components/Admin/Header';
import Sidebar from '../components/Admin/Sidebar';
import Home from '../components/Admin/Home';
import styles from '../styles/AdminPage.module.css';
import AdminJobs from '../components/Admin/AdminJobs';
import AdminSkills from '../components/Admin/AdminSkills';
import AdminUsers from '../components/Admin/AdminUsers';
import AdminWalet from '../components/Admin/AdminWallet';

const Admin = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [activeComponent, setActiveComponent] = useState('Home');

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Home/>;
      case 'Jobs':
        return <AdminJobs />;
      case 'Skills':
        return <AdminSkills />;
      case 'Users':
        return <AdminUsers />;
      case 'Wallet':
        return <AdminWalet/>;
      case 'Reports':
        return <></>;
      case 'Settings':
        return <></>;
      default:
        return <Home />;
    }
  };

  return (
      <div className={styles.grid_container}>
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} setActiveComponent={setActiveComponent} />
        <div className={styles.main_container}>
        {renderComponent()}
      </div>
      </div>
  );
};

export default Admin;
