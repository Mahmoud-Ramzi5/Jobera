import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import logo from '../../assets/JoberaLogo.png';
import { ChevronRight} from 'react-bootstrap-icons';
import walletblack from '../../assets/walletblack.png';
import  styles from './wallet.module.css';

const Wallet = () => {
    const money = 6000;



    return (
        <Card className={styles.walletcard}>
            <div className={styles.cardinside}>
                <div className={styles.wallettitle}>
                    <h3>
                        Personal Wallet
                    </h3>
                </div>
                <div className={styles.big}>
                    <img src={walletblack} className={styles.walletimage} size="200px" alt="wallet" />
                    <div className={styles.redeemcode}>
                        <h5>
                            Enter redeem code to increase your balance:
                        </h5>
                        <input type="text" className={styles.redeemcodeinput} placeholder="Enter redeem code"/>
                        <button className={styles.register__submit}>
                            <span>send</span>
                            <i className={styles.button__icon}><ChevronRight /></i>
                        </button>
                    </div>
                    <div className={styles.walletbody}>
                        <h3>current balance:{money}</h3>
                    </div>
                </div>
            </div>
        </Card>

    );
};

export default Wallet;