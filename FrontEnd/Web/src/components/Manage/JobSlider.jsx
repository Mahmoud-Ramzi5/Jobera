import React from 'react';
import styles from '../../styles/manage.module.css';


const JobSlider = ({ filter, manageType, profileType, handleJobType }) => {

  return (
    <div className={styles.slider}>
      {(manageType === 'Posts' && profileType === 'company')
        || (manageType === 'Offers' && profileType === 'individual')
        && <>
          <input
            type="radio"
            id="FullTime"
            value="FullTime"
            checked={filter.type === "FullTime"}
            onChange={() => handleJobType("FullTime")}
          />
          <label htmlFor="FullTime">FullTime</label>
          <input
            type="radio"
            id="PartTime"
            value="PartTime"
            checked={filter.type === "PartTime"}
            onChange={() => handleJobType("PartTime")}
          />
          <label htmlFor="PartTime">PartTime</label>
        </>
      }
      <input
        type="radio"
        id="Freelancing"
        value="Freelancing"
        checked={filter.type === "Freelancing"}
        onChange={() => handleJobType("Freelancing")}
      />
      <label htmlFor="Freelancing">Freelancing</label>
    </div>
  );
};

export default JobSlider;
