import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LoginContext } from '../../App.jsx';
import { ShowPortfoliosAPI } from '../../apis/ProfileApis.jsx';
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
          <button className={styles.add_button} onClick={() => navigate('/edit-portfolio')}>+ Add Portfolio</button>
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
    </div>
  );
}

export default Portfolios;