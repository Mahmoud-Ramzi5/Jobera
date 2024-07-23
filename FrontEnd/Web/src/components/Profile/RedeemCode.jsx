import { useState, useContext } from 'react';
import { LoginContext, ProfileContext } from '../../utils/Contexts';
import NormalInput from '../NormalInput';
import Logo from '../../assets/JoberaLogo.png'
import { ChevronRight, CreditCard, CheckLg, X } from 'react-bootstrap-icons';
import { UseRedeemCode } from '../../apis/TransactionsApis';
import styles from './redeem_code.module.css'

const RedeemCode = () => {

    const { accessToken } = useContext(LoginContext);
    const { profile } = useContext(ProfileContext);

    const [redeemCode, setRedeemCode] = useState('')
    const [message, setMessage] = useState('');

    const handleSubmitCode = (event) => {
        event.preventDefault();
        UseRedeemCode(
            accessToken,
            redeemCode
        ).then((response) => {
            if (response.status == 200) {
                console.log(response)
                setMessage('success')
            } else {
                console.log(response);
                setMessage('failed')
            }
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.screen}>
                <div className={styles.screen__content}>
                    {message ? message === 'success' ?
                        <div className={styles.message}>
                            <i className={styles.check}><CheckLg size={60} /></i>
                            <br />
                            <span>Charged your wallet sucessfully</span>
                        </div> :
                        <div className={styles.message}>
                            <i className={styles.xmark}><X size={60} /></i>
                            <br />
                            <span>sorry something went wrong please try again later</span>
                        </div>
                        : <>
                            <img src={Logo} className={styles.logo} alt="logo" />
                            <div className={styles.title}>Redeem code</div>
                            <div className={styles.redeem_code}>
                                <form className={styles.submit_code} onSubmit={handleSubmitCode}>
                                    <h3>Enter the code to charge your wallet</h3>
                                    <NormalInput
                                        type="text"
                                        placeholder='Redeem code'
                                        icon={<CreditCard />}
                                        value={redeemCode}
                                        setChange={setRedeemCode}
                                    />
                                    <button type="submit" className={styles.form__submit}>
                                        <span>Submit</span>
                                        <i className={styles.button__icon}><ChevronRight /></i>
                                    </button>
                                </form>
                            </div>
                        </>}
                    <div className={styles.no_reason}>
                        {profile.type === 'individual' ?
                            <a href={`/profile/${profile.user_id}/${profile.full_name}`} className={styles.anchor}>
                                return to profile</a> :
                            <a href={`/profile/${profile.user_id}/${profile.name}`} className={styles.anchor}>return to profile</a>}
                    </div>
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