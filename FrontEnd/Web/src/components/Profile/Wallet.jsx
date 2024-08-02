import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';
import { BsChevronRight } from 'react-icons/bs';
import { ProfileContext } from '../../utils/Contexts';
import wallet from '../../assets/wallet.png';
import styles from './wallet.module.css';
import { useNavigate } from 'react-router-dom';


const Wallet = ({ ProfileData }) => {
  // Translations
  const { t } = useTranslation('global');
  // Define states
  const { profile } = useContext(ProfileContext);
  const Navigate = useNavigate();

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    Navigate('/redeemcode')
  }

  return (
    <Card className={styles.wallet_card}>
      <div className={styles.wallet_inside}>
        <img src={wallet} className={styles.wallet_image} alt="wallet" />
        <div className={styles.wallet_info}>
          <div className={styles.wallet_title}>
            <h3>{t('components.profile_cards.wallet.wallet_title')}</h3>
          </div>
          <div className={styles.wallet_body}>
            <h3>{t('components.profile_cards.wallet.wallet_body1')}
              {' $'}{ProfileData.wallet.available_balance}
            </h3>
            <h3>{t('components.profile_cards.wallet.wallet_body2')}
              {' $'}{ProfileData.wallet.total_balance}
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            {profile.user_id === ProfileData.user_id ?
              <div className={styles.redeem}>
                <button type="submit" className={styles.redeem_submit}>
                  <span>{t('components.profile_cards.wallet.button')}</span>
                  <i className={styles.button__icon}><BsChevronRight /></i>
                </button>
              </div>
              : <></>}
          </form>
        </div>
      </div>
    </Card>
  );
};

export default Wallet;