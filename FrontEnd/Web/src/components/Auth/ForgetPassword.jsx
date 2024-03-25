import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/JoberaLogo.png'
import styles from './ForgetPassword.module.css'

const ForgetPassword = () => {
  // Define states
    const initialized = useRef(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Handle form submit
    const handleSubmit = (event) => {
        /*The preventDefault() method cancels the event if it is cancelable, 
        meaning that the default action that belongs to the event will not occur.
        -> For example, this can be useful when:
        Clicking on a "Submit" button, prevent it from submitting a form*/
        event.preventDefault();

        // Perform ForgetPassword logic (Call api)
        fetch("http://127.0.0.1:8000/api/password/reset-link", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': "application/json",
            'connection': 'keep-alive',
            'Accept-Encoding': 'gzip, deflate, br'
        },
        body: JSON.stringify(
            {
            "email": email,
            })
        })
        .then((response) => {
            if (!response.ok) {
            throw new Error(response.status);
            }
            else {
            return response.json();
            }
        })
        .then((data) => {
            // Do somthing with the token return from Server data['token'] 
            console.log(data)
            setSuccessMessage('Reset password email has been sent.');
        })
        .catch(error => {
            // Handle errors
            console.log(error);
        });
    };

    return (
        
        <div className={styles.container}>
        <div className={styles.screen}>
            <div className={styles.screen__content}>
            <img src={Logo} className={styles.logo} alt="logo" />
            {successMessage? (<>
                <div className={`${styles.check} fa-solid fa-check`}></div>
            <div className={styles.success}>
                {successMessage}
            </div>
            </>
        ) : (
            <form className={styles.login} onSubmit={handleSubmit}>
                <label className={styles.label1}>Enter your email address and we'll send you an email with instructions to reset your password. </label>
                <div className={styles.box1}>
                    <div className={styles.login__field}>
                    <i className={`${styles.login__icon} fas fa-user`}></i>
                    <input
                        type="text"
                        className={styles.login__input}
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    </div>
                    <button type="submit" className={styles.login__submit}>
                    <span className={styles.button__text}>reset password</span>
                    <i className={`${styles.button__icon} fas fa-chevron-right`}></i>
                    </button>
                </div>
            </form>
            )}
            </div>
            <div className={styles.screen__background}>
            <span className={`${styles.screen__background__shape} ${styles.screen__background__shape4}`}></span>
            <span className={`${styles.screen__background__shape} ${styles.screen__background__shape3}`}></span>
            <span className={`${styles.screen__background__shape} ${styles.screen__background__shape2}`}></span>
            <span className={`${styles.screen__background__shape} ${styles.screen__background__shape1}`}></span>
            </div>
            
        </div>
        </div>
    );
    };

    export default ForgetPassword;
