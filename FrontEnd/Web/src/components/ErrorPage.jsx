import { useContext } from 'react';
import { ProfileContext } from '../utils/Contexts';
import ErrorPicture from '../assets/error icon.png'
import styles from './error_page.module.css'


const ErrorPage = () => {

    const { profile } = useContext(ProfileContext);

    return (
        <div className={styles.container}>
            <div className={styles.screen}>
                <div className={styles.screen__content}>
                    <div className={styles.img_holder}>
                        <img src={ErrorPicture} className={styles.image}></img>
                        <h2 className={styles.error}>Error</h2>
                    </div>
                    <div className={styles.title}>
                    <h4>An error has occured please try again later</h4>
                    </div>
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
}

export default ErrorPage;