import styles from './redeem_code.module.css'

const RedeemCode = () => {




    return (
        <div className={styles.container}>
            <div className={styles.screen}>
                <div className={styles.screen__content}>
                    <img src={Logo} className={styles.logo} alt="logo" />
                    <div className={styles.title}></div>
                    <div className={styles.btn}>
                        <div className={styles.slider} style={RegisterType === 'individual' ? { left: 0 } : { left: '100px' }} />
                        <button onClick={() => setRegisterType('individual')}>{t('pages.Register.slider.individual')}</button>
                        <button onClick={() => setRegisterType('company')}>{t('pages.Register.slider.company')}</button>
                    </div>
                    {RegisterType === 'individual' ? <IndividualForm /> : <CompanyForm />}
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