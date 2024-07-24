import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';
import { LoginContext, ProfileContext } from '../../utils/Contexts.jsx';
import { FetchImage } from '../../apis/FileApi.jsx';
import { ShowPortfoliosAPI } from '../../apis/ProfileApis/PortfolioApis.jsx';
import Clock from '../../utils/Clock.jsx';
import img_holder from '../../assets/upload.png';
import styles from './portfolios.module.css';
import portfolio_style from './portfolio.module.css';


const Portfolios = ({ step }) => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);
  // Params
  const { user_id, user_name } = useParams();
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [edit, setEdit] = useState(true);
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);

      if (typeof user_id !== 'undefined' || typeof user_name !== 'undefined') {
        ShowPortfoliosAPI(accessToken, user_id, user_name).then((response) => {
          if (response.status === 200) {
            response.data.portfolios.map((portfolio) => {
              if (portfolio.photo) {
                FetchImage("", portfolio.photo).then((response) => {
                  portfolio.photo = response;
                  setPortfolios((prevState) => ([...prevState, portfolio]));
                });
              }
              else if (response.status === 404) {
                setNotFound(true);
                navigate('/notfound');
              }
              else {
                setPortfolios((prevState) => ([...prevState, portfolio]));
              }
            });
          }
          else {
            console.log(response.statusText);
          }
        }).then(() => {
          setIsLoading(false);
        });
      }
      else {
        setIsLoading(false);
      }

      if (location.state !== null) {
        setEdit(location.state.edit);
      }
    }
  }, []);


  if (isLoading) {
    return <Clock />
  }
  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1>{user_name}{t('components.portfolios.h1')}</h1>
          {profile.user_id == user_id || typeof user_id === 'undefined' ?
            <button
              className={styles.add_button}
              onClick={() => navigate('/edit-portfolio', { state: { edit: false } })}
            >
              {t('components.portfolios.button')}
            </button>
            : <></>}
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.portfolios}>
          {portfolios.map((portfolio) => (
            <div className={styles.portfolio_card} key={portfolio.id}>
              <Link to={`/portfolio/${portfolio.id}`}>
                <Portfolio title={portfolio.title} photo={portfolio.photo} />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.container}>
        <button
          className={styles.back_button}
          onClick={() => {
            if (!edit) {
              step('DONE');
            }
            if (profile.type === 'individual') {
              navigate(`/profile/${profile.user_id}/${profile.full_name}`);
            }
            else if (profile.type === 'company') {
              navigate(`/profile/${profile.user_id}/${profile.name}`);
            }
            else {
              console.log('error')
            }
          }}
        >
          {t('components.portfolios.back_button')}
        </button>
      </div>
    </div>
  );
}

const Portfolio = ({ title, photo }) => {

  return (
    <Card>
      <div className={portfolio_style.portfolio_background}>
        {photo ? (
          <Card.Img
            className={portfolio_style.Card_Img}
            variant="top"
            src={URL.createObjectURL(photo)}
            alt={title + "picture"}
          />
        ) : (
          <Card.Img
            className={portfolio_style.Card_Img}
            variant="top"
            src={img_holder}
            alt={title + "picture"}
          />
        )}
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
      </div>
    </Card>
  );
};

export default Portfolios;