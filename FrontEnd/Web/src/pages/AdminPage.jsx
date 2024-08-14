import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Home from '../components/Admin/Home';
import Header from '../components/Admin/Header';
import Sidebar from '../components/Admin/Sidebar';
import AdminJobs from '../components/Admin/AdminJobs';
import AdminUsers from '../components/Admin/AdminUsers';
import AdminSkills from '../components/Admin/AdminSkills';
import AdminWalet from '../components/Admin/AdminWallet';
import Reports from '../components/Admin/Reports';
import styles from '../styles/AdminPage.module.css';


const Admin = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [activeComponent, setActiveComponent] = useState('Home');
  const { currentState } = useParams();

  console.log(openSidebarToggle);
  useEffect(() => {
    if (currentState != null)
      setActiveComponent(currentState);
  }, []);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Home />;
      case 'Jobs':
        return <AdminJobs />;
      case 'Skills':
        return <AdminSkills />;
      case 'Users':
        return <AdminUsers />;
      case 'Wallet':
        return <AdminWalet />;
      case 'Reports':
        return <Reports />;
      default:
        return <Home />;
    }
  };


  return (
    <div className={styles.grid_container}>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        setActiveComponent={setActiveComponent}
      />
      <div className={styles.main_container}>
        {renderComponent()}
      </div>
    </div>
  );
};

export default Admin;
