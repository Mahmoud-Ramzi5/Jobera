import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LoginContext, ProfileContext } from '../../utils/Contexts';
import { FetchImage, FetchFile } from '../../apis/FileApi';
import { ShowPortfolioAPI, DeletePortfolioAPI } from '../../apis/ProfileApis/PortfolioApis.jsx';
import Clock from '../../utils/Clock.jsx';
import img_holder from '../../assets/noImage.jpg';
import styles from './portfolio.module.css';
import Inputstyles from '../../styles/Input.module.css';


const ShowPortfolio = () => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);
  // Params
  const { id } = useParams();
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [photo, setPhoto] = useState(null);
  const [portfolio, SetPortfolio] = useState(
    {
      title: "",
      description: "",
      photo: "",
      link: "",
      files: [],
      skills: []
    }
  );


  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);

      ShowPortfolioAPI(accessToken, id).then((response) => {
        if (response.status === 200) {
          SetPortfolio(response.data.portfolio);

          if (response.data.portfolio.photo) {
            FetchImage("", response.data.portfolio.photo).then((response) => {
              setPhoto(response);
            });
          }
        }
        else if (response.status === 404) {
          setNotFound(true);
          navigate('/notfound');
        }
        else {
          console.log(response.statusText);
        }
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, []);


  if (isLoading) {
    return <Clock />
  }
  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen_content}>
          <h2 className={styles.heading}>
            {t('components.show_portfolio.h2_heading')}
          </h2>
          {portfolio.user_id === profile.user_id ?
            <div className={styles.submit_div}>
              <button
                className={styles.submit_button}
                onClick={() => navigate('/edit-portfolio', {
                  state: { edit: true, portfolio }
                })}
              >
                {t('components.show_portfolio.edit_button')}
              </button>
              <button
                className={styles.submit_button}
                onClick={() => {
                  DeletePortfolioAPI(accessToken, portfolio.id).then((response) => {
                    if (response.status == 204) {
                      console.log(response);

                      if (profile.type === 'individual') {
                        navigate(`/portfolios/${profile.user_id}/${profile.full_name}`, {
                          state: { edit: true }
                        });
                      }
                      else if (profile.type === 'company') {
                        navigate(`/portfolios/${profile.user_id}/${profile.name}`, {
                          state: { edit: true }
                        });
                      }
                      else {
                        console.log('error')
                      }
                    }
                    else {
                      console.log(response.statusText);
                    }
                  });
                }}
              >
                {t('components.show_portfolio.delete_button')}
              </button>
            </div>
            : <></>}
          <div className={styles.row}>
            <div className={styles.column}>
              <div className={styles.data_field}>
                <div className={styles.data}>
                  <h5>{portfolio.title}</h5>
                </div>
                <div className={styles.data}>
                  <p>{portfolio.description}</p>
                </div>
                <div className={styles.data}>
                  <h6>{portfolio.link}</h6>
                </div>
                <h4 className={styles.heading}>
                  {t('components.show_portfolio.h4_heading1')}
                </h4>
                <div className={styles.data}>
                  {portfolio.skills.map((skill) => (
                    <div key={skill.id} className={styles.used_skills}>
                      <div className={styles.used_skill}>{skill.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.data_field}>
                <div className={styles.img_holder}>
                  {photo ? (
                    <img src={URL.createObjectURL(photo)} alt="Uploaded Photo" style={{ pointerEvents: 'none' }} />
                  ) : (
                    <img src={img_holder} alt="Photo Placeholder" style={{ pointerEvents: 'none' }} />
                  )}
                </div>
              </div>
              <h4 className={styles.heading}>
                {t('components.show_portfolio.h4_heading2')}
              </h4>
              <div className={Inputstyles.field}>
                {portfolio.files.map((file) => (
                  <div className={styles.files} key={file.id}>
                    <div className={styles.file}>
                      <span>{file.name}</span>
                      <button
                        onClick={async () => { FetchFile("", file.path); }}
                      >
                        {t('components.show_portfolio.browse_button')}
                      </button>
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
