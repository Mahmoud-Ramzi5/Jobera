import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './register.module.css'

const Register = () => {
  // Define states
  const navigate = useNavigate();
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [date, setDate] = useState('');
  const [gender, setGender] = useState('');

  const genders = [
    { value: 'male', label: 'Male', icon: 'fa-person' },
    { value: 'female', label: 'Female', icon: 'fa-person-dress' },
  ];

  // Handle form submit
  const handleSubmit = (event) => {
    /*The preventDefault() method cancels the event if it is cancelable, 
    meaning that the default action that belongs to the event will not occur.
    -> For example, this can be useful when:
      Clicking on a "Submit" button, prevent it from submitting a form*/
    event.preventDefault();


    // Perform Login logic (Call api)
    fetch("http://127.0.0.1:8000/api/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "application/json",
        'connection': 'keep-alive',
        'Accept-Encoding': 'gzip, deflate, br'
      },
      body: JSON.stringify(
        {
          "fullName": FirstName + " " + LastName,
          "email": email,
          "phoneNumber": PhoneNumber,
          "password": password,
          "confirmPassword": ConfirmPassword,
          "birthDate": date,
          "gender": gender
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
        // Reset the form fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
        setConfirmPassword('');
        setDate('');
        setGender('');
        // Redirect to dashboard
        navigate('/')
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
          <form className={styles.register} onSubmit={handleSubmit}>
            <div className={styles.register__row}>
              <div className={styles.register__field}>
                <i className={`${styles.login__icon} fas fa-user`}></i>
                <input
                  type="text"
                  className={styles.register__input}
                  placeholder="First Name"
                  value={FirstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>
              <div className={styles.register__field}>
                <i className={`${styles.login__icon} fas fa-user`}></i>
                <input
                  type="text"
                  className={styles.register__input}
                  placeholder="Last Name"
                  value={LastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
            </div>
            <div className={styles.register__row}>
              <div className={styles.register__field}>
                <i className={`${styles.login__icon} fas fa-envelope`}></i>
                <input
                  type="text"
                  className={styles.register__input}
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className={styles.register__field}>
                <i className={`${styles.login__icon} fas fa-phone`}></i>
                <input
                  type="text"
                  className={styles.register__input}
                  placeholder="Phone Numer"
                  value={PhoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
              </div>
            </div>
            <div className={styles.register__row}>
              <div className={styles.register__field}>
                <i className={`${styles.login__icon} fas fa-lock`}></i>
                <input
                  type="password"
                  className={styles.register__input}
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className={styles.register__field}>
                <i className={`${styles.login__icon} fas fa-lock`}></i>
                <input
                  type="password"
                  className={styles.register__input}
                  placeholder="Confirm Password"
                  value={ConfirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
            </div>
            <div className={styles.register__row}>
              <div className={styles.register__field}>
                <i className={`${styles.login__icon} fas fa-calendar-days`}></i>
                <input
                  type="date"
                  className={styles.register__input}
                  placeholder="Birthdate"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </div>
              <div className={styles.register__field__radio}>
                {genders.map((G) => (
                  <div className={styles.register__input__radio} key={G.value}>
                    <input
                      type="radio"
                      value={G.value}
                      checked={gender === G.value}
                      onChange={(event) => setGender(event.target.value)}
                    />
                    <i className={`${styles.login__icon} fas ${G.icon}`}></i>
                    <label >{G.label}</label>
                  </div>
                ))}
              </div>
            </div >
            <button type="submit" className={styles.register__submit}>
              <span className={styles.button__text}>Register now</span>
              <i className={`${styles.button__icon} fas fa-chevron-right`}></i>
            </button>
          </form>
          <div className={styles.social__register}>
            <h3>register via</h3>
            <div className={styles.social__icons}>
              <a href='#' className={`${styles.social__register__icon} fab fa-google`}></a>
              <a href='#' className={`${styles.social__register__icon} fab fa-facebook`}></a>
              <a href='#' className={`${styles.social__register__icon} fab fa-linkedin`}></a>
            </div>
          </div>
          <div className={styles.register__login}>
            Already have an account? <a href='/login'>Log in</a>
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

export default Register;
