import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { LoginContext, ProfileContext } from '../../utils/Contexts.jsx';
import { FetchImage } from '../../apis/FileApi.jsx';
import { ShowPortfoliosAPI } from '../../apis/ProfileApis.jsx';
import img_holder from '../../assets/upload.png';
import styles from './portfolios.module.css';
import portfolio_style from './portfolio.module.css';


const Portfolios = ({ step }) => {
  // Context
  const { accessToken } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [edit, setEdit] = useState(true);
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);
      ShowPortfoliosAPI(accessToken).then((response) => {
        if (response.status === 200) {
          response.data.portfolios.map((portfolio) => {
            if (portfolio.photo) {
              FetchImage("", portfolio.photo).then((response) => {
                portfolio.photo = response;
                setPortfolios((prevState) => ([...prevState, portfolio]));
              });
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

      if (location.state !== null) {
        setEdit(location.state.edit);
      }
    }
  }, [location.pathname]);

  if (isLoading) {
    return <div id='loader'><div className="clock-loader"></div></div>
  }
  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1>Portfolios</h1>
          <button
            className={styles.add_button}
            onClick={() => navigate('/edit-portfolio', { state: { edit: false } })}
          >
            + Add Portfolio
          </button>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.portfolios}>
          {portfolios.map((portfolio) => (
            <div className={styles.portfolio_card} key={portfolio.id}>
              <Link to={`/portfolio/${portfolio.id}`} state={{ portfolio }}>
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
            navigate('/profile');
          }}
        >
          Back to profile
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