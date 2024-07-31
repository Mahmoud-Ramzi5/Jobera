import { useState } from 'react';
import Posts from '../components/Manage/Posts';
import Offers from '../components/Manage/Offers';
import Bookmarks from '../components/Manage/Bookmarks';
import styles from '../styles/manage.module.css';


const Manage = () => {
  // Define states
  const [currentPage, setCurrentPage] = useState("Posts");


  return (
    <div className={styles.manage}>
      <div className={styles.tab_container}>
        <button
          className={`${styles.tab_button} ${currentPage === "Posts" ? styles.tab_button_active : ""}`}
          onClick={() => setCurrentPage("Posts")}
        >
          Posts
        </button>
        <button
          className={`${styles.tab_button} ${currentPage === "Offers" ? styles.tab_button_active : ""}`}
          onClick={() => setCurrentPage("Offers")}
        >
          Offers
        </button>
        <button
          className={`${styles.tab_button} ${currentPage === "Bookmarks" ? styles.tab_button_active : ""}`}
          onClick={() => setCurrentPage("Bookmarks")}
        >
          Bookmarks
        </button>
      </div>
      {currentPage === "Posts" ? <Posts />
        : currentPage === "Offers" ? <Offers />
          : currentPage === "Bookmarks" && <Bookmarks />}
    </div>
  );
};

export default Manage;
