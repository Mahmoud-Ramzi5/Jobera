import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Portfolio from './Portfolio.jsx';
import styles from './portfolios.module.css';

const Portfolios = ({ step }) => {
  const initialized = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [portfolios, SetPortfolios] = useState([]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      if (location.state !== null) {
        SetPortfolios(location.state.portfolios);
      }
      else {
        navigate('/profile');
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
              <Link to={`/portfolio/${portfolio.id}`} state={ { portfolio } }>
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