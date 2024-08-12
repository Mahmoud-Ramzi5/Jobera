import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { BsChevronRight, BsCreditCard, BsCheckLg, BsX } from 'react-icons/bs';
import { LoginContext, ProfileContext } from '../../utils/Contexts';
import { UseRedeemCode } from '../../apis/TransactionsApis';
import { GenerateRedeemCode } from '../../apis/AdminApis';
import NormalInput from '../NormalInput';
import Logo from '../../assets/JoberaLogo.png'
import styles from './redeemcode.module.css'


const RedeemCode = () => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);
  // Define states
  const [redeemCode, setRedeemCode] = useState('');
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('');
  const [generateMessage, setGenerateMessage] = useState('');

  const handleSubmitCode = (event) => {
    event.preventDefault();
    UseRedeemCode(
      accessToken,
      redeemCode,
    ).then((response) => {
      if (response.status === 200) {
        console.log(response);
        setMessage('success');
      } else {
        console.log(response);
        setMessage('failed');
      }
    });
  }

  const handleGenerate = (event) => {
    event.preventDefault();
    GenerateRedeemCode(
      accessToken,
      amount,
    ).then((response) => {
      if (response.status === 201) {
        console.log(response);
        setGenerateMessage('success');
      } else {
        console.log(response);
        setGenerateMessage('failed');
      }
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen__content}>
          {profile.user_id === 1 ? <>
          {generateMessage ? generateMessage ==='success' ? <div className={styles.message}>
              <i className={styles.check}><BsCheckLg size={60} /></i>
              <br />
              <span>{t('components.redeem_code.message1_generate')}</span>
            </div>
            :
            <div className={styles.message}>
              <i className={styles.xmark}><BsX size={60} /></i>
              <br />
              <span>{t('components.redeem_code.messsge2')}</span>
            </div>: 
            <>
            <img src={Logo} className={styles.logo} alt="logo" />
            <div className={styles.title}>
              {t('components.redeem_code.title_generate')}
            </div>
            <div className={styles.redeem_code}>
              <form className={styles.submit_code} onSubmit={handleGenerate}>
                <h3>{t('components.redeem_code.h3_generate')}</h3>
                <NormalInput
                  type="number"
                  placeholder={t('components.redeem_code.generate')}
                  icon={<BsCreditCard />}
                  value={amount}
                  setChange={setAmount}
                />
                <button type="submit" className={styles.form__submit}>
                  <span>{t('components.redeem_code.button')}</span>
                  <i className={styles.button__icon}><BsChevronRight /></i>
                </button>
              </form>
            </div>
          </>
          }
          </>:
          <>
          {message ? message === 'success' ?
            <div className={styles.message}>
              <i className={styles.check}><BsCheckLg size={60} /></i>
              <br />
              <span>{t('components.redeem_code.message1')}</span>
            </div>
            :
            <div className={styles.message}>
              <i className={styles.xmark}><BsX size={60} /></i>
              <br />
              <span>{t('components.redeem_code.message2')}</span>
            </div>
            : <>
              <img src={Logo} className={styles.logo} alt="logo" />
              <div className={styles.title}>
                {t('components.redeem_code.title')}
              </div>
              <div className={styles.redeem_code}>
                <form className={styles.submit_code} onSubmit={handleSubmitCode}>
                  <h3>{t('components.redeem_code.h3')}</h3>
                  <NormalInput
                    type="text"
                    placeholder={t('components.redeem_code.input')}
                    icon={<BsCreditCard />}
                    value={redeemCode}
                    setChange={setRedeemCode}
                  />
                  <button type="submit" className={styles.form__submit}>
                    <span>{t('components.redeem_code.button')}</span>
                    <i className={styles.button__icon}><BsChevronRight /></i>
                  </button>
                </form>
              </div>
            </>
          }
          <div className={styles.no_reason}>
            {profile.type === 'individual' ?
              <a href={`/profile/${profile.user_id}/${profile.full_name}`} className={styles.anchor}>
                {t('components.redeem_code.anchor')}
              </a>
              :
              <a href={`/profile/${profile.user_id}/${profile.name}`} className={styles.anchor}>
                {t('components.redeem_code.anchor')}
              </a>}
          </div>
          </>
          }
        </div>
        <div className={styles.screen__background}>
          <span className={styles.screen__shape}></span>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape4}`}></span>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape3}`}></span>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape2}`}></span>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape1}`}></span>
        </div>
      </div>
    </div>
  );
};

export default RedeemCode;