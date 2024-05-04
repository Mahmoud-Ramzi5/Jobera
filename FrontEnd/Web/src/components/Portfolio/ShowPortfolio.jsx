import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import img_holder from '../../assets/upload.png';
import styles from './portfolio.module.css';
import Inputstyles from '../../styles/Input.module.css';


const ShowPortfolio = () => {
  const initialized = useRef(false);

  var Data = {
    title: "title",
    description: "description",
    photo: "",
    link: "link",
    files: [
      { name: "IT" },
      { name: "GG" },
    ],
    skills: [
      "IT",
    ]
  }

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen_content}>
          <h2 className={styles.heading}>Portfolio item</h2>
          <div className={styles.submit_div}>
            <button className={styles.submit_button}>edit</button>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <div className={styles.data_field}>
                <div className={styles.data}>
                  <h5>{Data.title}</h5>
                </div>
                <div className={styles.data}>
                  <p>{Data.description}</p>
                </div>
                <div className={styles.data}>
                  <h6>{Data.link}</h6>
                </div>
                <h4 className={styles.heading}>Skills used:</h4>
                <div className={styles.data}>
                  {Data.skills.map((skill) => (
                    <div className={styles.used_skills}>
                      <div className={styles.used_skill}>{skill}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.data_field}>
                <div className={styles.img_holder}>
                  {Data.photo ? (
                    <img src={URL.createObjectURL(Data.photo)} alt="Uploaded Photo" style={{ pointerEvents: 'none' }} />
                  ) : (
                    <img src={img_holder} alt="Photo Placeholder" style={{ pointerEvents: 'none' }} />
                  )}
                </div>
              </div>
              <h4 className={styles.heading}>Files:</h4>
              <div className={Inputstyles.field}>
                {Data.files.map((file) => (
                  <div className={styles.files}>
                    <div className={styles.file}>
                      <span>{file.name}</span>
                      <button>Browse</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPortfolio;
