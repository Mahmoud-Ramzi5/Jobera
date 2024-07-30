import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './tops.module.css';


const Tops = ({ jobs, title }) => {
  return (
    <div className={styles.tops_card}>
      <h2>{title}</h2>
      <ul className={styles.jobs_list}>
        {jobs.map((job, index) => (
          <Job job={job} key={index} />
        ))}
      </ul>
    </div>
  );
};


const Job = ({ job }) => {
  // Translations
  const { t } = useTranslation('global');

  return (
    <li className={styles.job_item}>
      <Link to={job.skill_id ? '/edit-skills'
        : job.company_id ? `/profile/${job.company_id}/${job.title}`
          : `/job/${job.id}`}>
        <h4>{job.title}</h4>
        <p>
          {job.salary ? `${t('pages.job_feed.tops.salary')} $${job.salary}`
            : `${t('pages.job_feed.tops.count')} ${job.count}`}
        </p>
      </Link>
    </li>
  );
};

export default Tops;
