import React from 'react';
import styles from './stats.module.css';

const Stats = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.content}>
          <img className="block" src="saturn-assets/images/stats/chat-icon-1.svg" alt="" />
          <div>
            <span className={styles.number}>289</span>
            <span className={styles.label}>Items Downloaded</span>
          </div>
        </div>
      </div>
      <div className={`${styles.card} ${styles.selfEnd}`}>
        <div className={styles.content}>
          <img className="block" src="saturn-assets/images/stats/chat-icon-3.svg" alt="" />
          <div>
            <span className={styles.number}>687</span>
            <span className={styles.label}>Deals this month</span>
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.content}>
          <img className="block" src="saturn-assets/images/stats/chat-icon-2.svg" alt="" />
          <div>
            <span className={styles.number}>40</span>
            <span className={styles.label}>Project Running</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;