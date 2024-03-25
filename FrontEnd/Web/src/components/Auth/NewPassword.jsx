import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/JoberaLogo.png'
import styles from './NewPassword.module.css'

    const NewPassword = () => {
    // Define states
    const initialized = useRef(false);
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirm_password, setconfirm_Password] = useState('');

    useEffect(() => {
    }, []);

    // Handle form submit
    const handleSubmit = (event) => {
        /*The preventDefault() method cancels the event if it is cancelable, 
        meaning that the default action that belongs to the event will not occur.
        -> For example, this can be useful when:
        Clicking on a "Submit" button, prevent it from submitting a form*/
        event.preventDefault();

        // Perform Login logic (Call api)
        fetch("http://127.0.0.1:8000/api/NewPassword", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': "application/json",
            'connection': 'keep-alive',
            'Accept-Encoding': 'gzip, deflate, br'
        },
        body: JSON.stringify(
            {
            "password": password,
            "confirm_password":confirm_password
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

            // Redirect to dashboard
            navigate('/');
        })
        .catch(error => {
            // Handle errors
            console.log(error);
        });

        // Reset the form fields
        setPassword('');
        setconfirm_Password('');
    };

    return (
        <div className={styles.container}>
        <div className={styles.screen}>
            <div className={styles.screen__content}>
            <img src={Logo} className={styles.logo} alt="logo" />
            <form className={styles.login} onSubmit={handleSubmit}>
                <div className={styles.login__field}>
                <i className={`${styles.login__icon} fas fa-lock`}></i>
                <input
                    type="password"
                    className={styles.login__input}
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <input
                    type="password"
                    className={styles.login__input2}
                    placeholder="confirm password"
                    value={confirm_password}
                    onChange={(event) => setconfirm_Password(event.target.value)}
                />
                </div>

                <button type="submit" className={styles.login__submit}>
                <span className={styles.button__text}>Change password</span>
                <i className={`${styles.button__icon} fas fa-chevron-right`}></i>
                </button>
            </form>
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

    export default NewPassword;
