import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // Define states
  const navigate = useNavigate();
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [AccountType, setAccountType] = useState('');

  const accounts = [
    { value: 'Company', label: 'Company' },
    { value: 'Indivdual', label: 'Indivdual' },
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
                "FirstName": FirstName,
                "LastName": LastName,
                "email": email,
                "password": password,
                "ConfirmPassword": ConfirmPassword,
                "AccountType": AccountType
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
          navigate('/')
        })
        .catch(error => {
          // Handle errors
          console.log(error);
        });
    
    // Reset the form fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setAccountType('');
  };

  return (
    <form onSubmit={handleSubmit}>
        <div>
        <label>First Name:</label>
        <input
          type="text"
          value={FirstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <label>Last Name:</label>
        <input
          type="text"
          value={LastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </div>
      <div>
      {accounts.map((type) => (
        <label key={type.value}>
          <input
            type="radio"
            value={type.value}
            checked={AccountType === type.value}
            onChange={(event) => setAccountType(event.target.value)}
          />
          {type.label}
        </label>
      ))}
    </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Register;
