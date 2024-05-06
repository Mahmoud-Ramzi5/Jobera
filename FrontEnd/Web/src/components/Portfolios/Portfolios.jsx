import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../../assets/JoberaLogo.png';
import Portfolio from './Portfolio.jsx';
import styles from './portfolios.module.css';

const Portfolios = () => {
    const initialized = useRef(false);
    const navigate = useNavigate();
    const [portfolios, SetPortfolios] = useState([{
        id: 1,
        title: 'Portfolio 1',
        photo: Logo
    },
    {
        id: 2,
        title: 'Portfolio 2',
        photo: Logo
    },
    {
        id: 3,
        title: 'Portfolio 3',
        photo: Logo
    },
    {
        id: 4,
        title: 'portfolio 4',
        photo: Logo
    },
    {
        id: 5,
        title: 'portfolio 5',
        photo: Logo
    },
    {
        id: 6,
        title: 'Portfolio 6',
        photo: Logo
    },
    {
        id: 7,
        title: 'Portfolio 7',
        photo: Logo
    },
    {
        id: 8,
        title: 'portfolio 8',
        photo: Logo
    },
    {
        id: 9,
        title: 'portfolio 9',
        photo: Logo
    }
    ]);

    /*
        useEffect(() => {
            if (!initialized.current) {
                initialized.current = true;
                // Api Call to get portfolios 
                if (response.status === 200) {
                    SetPortfolios(response.data.portfolios)
                }
                else {
                    console.log(response.statusText);
                }
            }
        });
    */

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