import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/manage.module.css';


const JobSlider = ({ filter, manageType, profileType, handleJobType }) => {
  // Translations
  const { t } = useTranslation('global');


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
          <label htmlFor="FullTime">{t('pages.jobs.job_slider.full_time')}</label>
          <input
            type="radio"
            id="PartTime"
            value="PartTime"
            checked={filter.type === "PartTime"}
            onChange={() => handleJobType("PartTime")}
          />
          <label htmlFor="PartTime">{t('pages.jobs.job_slider.part_time')}</label>
        </>
      }
      <input
        type="radio"
        id="Freelancing"
        value="Freelancing"
        checked={filter.type === "Freelancing"}
        onChange={() => handleJobType("Freelancing")}
      />
      <label htmlFor="Freelancing">{t('pages.jobs.job_slider.freelancing')}</label>
    </div>
  );
};

export default JobSlider;
