import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';
import { BsChevronRight } from 'react-icons/bs';
import { ProfileContext } from '../../utils/Contexts';
import wallet from '../../assets/wallet.png';
import styles from './wallet.module.css';


const Wallet = ({ ProfileData }) => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { profile } = useContext(ProfileContext);
  const Navigate = useNavigate();

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
          {profile.user_id === ProfileData.user_id && profile.user_id !== 1 && <>
            <div className={styles.wallet_buttons}>
              <button type="submit" className={styles.transactions}
                onClick={() => Navigate('/transactions')}
              >
                <span>{t('components.profile_cards.wallet.button1')}</span>
              </button>
              <button type="submit" className={styles.redeem_code}
                onClick={() => Navigate('/redeemcode')}
              >
                <span>{t('components.profile_cards.wallet.button2')}</span>
                <i className={styles.button__icon}><BsChevronRight /></i>
              </button>
            </div>
          </>}
          {profile.user_id === 1 &&
            <button type="submit" className={styles.generate_redeem_code}
              onClick={() => Navigate('/redeemcode')}
            >
              <span>{t('components.profile_cards.wallet.admin_button')}</span>
              <i className={styles.button__icon}><BsChevronRight /></i>
            </button>
          }
        </div>
      </div>
    </Card>
  );
};

export default Wallet;
