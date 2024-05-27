import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { CreditCard, ChevronRight } from 'react-bootstrap-icons';
import NormalInput from '../../components/NormalInput';
import wallet from '../../assets/wallet.png';
import styles from './wallet.module.css';


const Wallet = ({ ProfileData }) => {
  // Define states
  const [redeemCode, SetRedeemCode] = useState('');
  const money = 6000;

  // Handle form submit
  const handleSubmit = (event) => {
    // TODO
  }

  return (
    <Card className={styles.wallet_card}>
      <div className={styles.wallet_inside}>
        <img src={wallet} className={styles.wallet_image} alt="wallet" />
        <div className={styles.wallet_info}>
          <div className={styles.wallet_title}>
            <h3>Personal Wallet</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.redeem_title}>
              <h5>Enter redeem code to increase your balance:</h5>
            </div>
            <div className={styles.redeem}>
              <NormalInput
                type='text'
                placeholder='Redeem code'
                icon={<CreditCard />}
                value={redeemCode}
                setChange={SetRedeemCode}
              />
              <button type="submit" className={styles.redeem_submit}>
                <span>Redeem</span>
                <i className={styles.button__icon}><ChevronRight /></i>
              </button>
            </div>
          </form>
          <div className={styles.wallet_body}>
            <h3>Current balance: ${ProfileData.wallet.available_balance}</h3>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Wallet;