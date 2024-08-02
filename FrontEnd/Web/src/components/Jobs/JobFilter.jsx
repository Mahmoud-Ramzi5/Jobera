import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BsX } from 'react-icons/bs';
import { FetchAllSkills } from '../../apis/SkillsApis.jsx';
import { SlicedCheckBox } from '../../components/SlicingInput.jsx';
import Slider from '../../components/Slider.jsx';
import styles from '../../styles/jobs.module.css';


const JobFilter = ({ JobType, filter, setFilter, handleFilterSubmit, NoPublishedBy }) => {
  // Translations
  const { t } = useTranslation('global');
  // Define states
  const initialized = useRef(false);
  const [skills, setSkills] = useState([]);
  const [specific, setSpecific] = useState(5);
  const [choosedSkills, setChoosedSkills] = useState([]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      FetchAllSkills().then((response) => {
        if (response.status === 200) {
          setSkills(response.data.skills);
        }
        else {
          console.log(response.statusText);
        }
      });
    }
  }, []);

  const handleFilter = (event) => {
    const { name, value } = event.target;
    if (name === 'minSalary' || name === 'maxSalary') {
      if (value !== '') {
        setFilter({ ...filter, [name]: parseInt(value) });
      }
    }
    else {
      setFilter({ ...filter, [name]: value });
    }
  }

  const handleSkillsFilter = (event) => {
    const { value, checked } = event.target;
    // Case 1 : The user checks the box
    if (checked) {
      setChoosedSkills((prevState) => [...prevState, value]);
    }
    // Case 2  : The user unchecks the box
    else {
      setChoosedSkills((prevState) => prevState.filter((skill) => skill !== value));
    }
  }

  useEffect(() => {
    setFilter({ ...filter, skills: choosedSkills });
  }, [choosedSkills]);


  return (
    <div className={styles.left_container}>
      <label
        htmlFor="close_filter"
        className={`${styles.btn} ${styles.close_btn}`}
      >
        <BsX size={31} />
      </label>
      {NoPublishedBy ? <></> :
        <div>
          <label htmlFor={JobType === 'Freelancing' ? 'UserName' : 'CompanyName'}>
            {t('pages.jobs.job_filter.published_by1')}
          </label>
          <input
            type='text'
            placeholder={t('pages.jobs.job_filter.published_by2')}
            id={JobType === 'Freelancing' ? 'UserName' : 'CompanyName'}
            name={JobType === 'Freelancing' ? 'userName' : 'companyName'}
            value={JobType === 'Freelancing' ? filter.userName : filter.companyName}
            onChange={handleFilter}
            className={styles.search_input}
          />
        </div>
      }
      <br />
      <div>
        <label htmlFor='Salary'>
          {t('pages.jobs.job_filter.salary')}
        </label>
        <Slider values={[filter.minSalary, filter.maxSalary]} handler={setFilter} />
        <div className={styles.slider_area}>
          <input
            type='number'
            name='minSalary'
            min={0}
            max={10000}
            value={filter.minSalary}
            onChange={handleFilter}
            className={styles.slider_input}
          />
          <input
            type='number'
            name='maxSalary'
            min={0}
            max={10000}
            value={filter.maxSalary}
            onChange={handleFilter}
            className={styles.slider_input}
          />
        </div>
      </div>
      <br />
      {JobType === 'Freelancing' &&
        <div>
          <label htmlFor='Deadline'>
            {t('pages.jobs.job_filter.deadline.label')}
          </label>
          <div className={styles.deadlline_area}>
            <label htmlFor='FromDeadline'>
              {t('pages.jobs.job_filter.deadline.from')}
            </label>
            <input
              type='date'
              placeholder='Deadline'
              id='FromDeadline'
              name='fromDeadline'
              value={filter.fromDeadline}
              onChange={handleFilter}
            />
            <label htmlFor='ToDeadline'>
              {t('pages.jobs.job_filter.deadline.to')}
            </label>
            <input
              type='date'
              placeholder='Deadline'
              id='ToDeadline'
              name='toDeadline'
              value={filter.toDeadline}
              onChange={handleFilter}
            />
          </div>
        </div>
      }
      <br />
      <div>
        <label htmlFor='Skills'>
          {t('pages.jobs.job_filter.skills.label')}
        </label>
        <SlicedCheckBox
          dataArray={skills}
          first={0}
          last={specific}
          handleChange={handleSkillsFilter}
        />
        {specific >= skills.length ?
          <button
            type="button"
            className={styles.skills_button}
            onClick={() => setSpecific(5)}
          >
            {t('pages.jobs.job_filter.skills.see_less')}
          </button>
          :
          <button
            type="button"
            className={styles.skills_button}
            onClick={() => setSpecific(specific + 5)}
          >
            {t('pages.jobs.job_filter.skills.see_more')}
          </button>
        }
      </div>
      <br />
      <button type='submit' className={styles.submit_button} onClick={handleFilterSubmit}>
        {t('pages.jobs.job_filter.button')}
      </button>
    </div>
  );
}

export default JobFilter;