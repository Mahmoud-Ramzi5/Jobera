import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LoginContext } from '../../utils/Contexts.jsx';
import { ShowPortfoliosAPI, AdvanceRegisterStep } from '../../apis/ProfileApis.jsx';
import Portfolio from './Portfolio.jsx';
import styles from './portfolios.module.css';


const Portfolios = ({ step }) => {
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [edit, setEdit] = useState(true);
  const [portfolios, SetPortfolios] = useState([]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      ShowPortfoliosAPI(accessToken).then((response) => {
        if (response.status === 200) {
          SetPortfolios(response.data.portfolios);
        }
        else {
          console.log(response.statusText);
        }
      });

      if (location.state !== null) {
        setEdit(location.state.edit);
      }
    }
  });


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
            AdvanceRegisterStep(accessToken).then((response) => {
              if (response.status != 200) {
                console.log(response);
              }
            });
            navigate('/profile');
          }}
        >
          Back to profile
        </button>
      </div>
    </div>
  );
}

export default Portfolios;