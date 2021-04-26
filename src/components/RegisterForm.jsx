import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import style from '../css/RegisterForm.module.css';

const RegisterForm = () => {
  const { register } = useContext(UserContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  
  let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleEmailConfirmationChange = (e) => {
    setEmailConfirmation(e.target.value);
  }

  const handlePasswordChange = (e) => {
    if (e.target.value.match(pattern)) {
      console.log('lösenordet är bra nog');
    }
    setPassword(e.target.value);
  }

  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.match(pattern)) {
      console.log('kasst lösenord');
      return;
    }
    
    if (email !== emailConfirmation || password !== passwordConfirmation) {
      console.log('Blev strul!')
      if (email !== emailConfirmation) {
        console.log('Epost-fälten stämmer inte överens');
      }
      if (password !== passwordConfirmation) {
        console.log('Lösenorden stämmer inte')
      }
      return;

    } else {
      const userToRegister = {
        firstName,
        lastName,
        email,
        password,
      }
      console.log(userToRegister);
      let result = await register(userToRegister);
      if (result.success) {
        console.log(result.success);
      } else {
        console.log(result.error);
      }
  
      setFirstName('');
      setLastName('');
      setEmail('');
      setEmailConfirmation('');
      setPassword('');
      setPasswordConfirmation('');
    }
  }

  return ( 
      <form className={style.registerForm} onSubmit={handleSubmit}>
        <label htmlFor="first-name">Förnamn:</label>
        <input 
          id="first-name" 
          type="text"
          value={firstName} 
          onChange={handleFirstNameChange} 
          required />
        <label htmlFor="last-name">Efternamn:</label>
        <input 
          id="last-name" 
          type="text"
          value={lastName} 
          onChange={handleLastNameChange} 
          required />
        <label htmlFor="email">E-post:</label>
        <input 
          id="email" 
          type="email"
          value={email} 
          onChange={handleEmailChange} 
          required />
        <label htmlFor="email-confirmation">E-post (Bekräfta):</label>
        <input 
          id="email-confirmation" 
          type="email"
          value={emailConfirmation} 
          onChange={handleEmailConfirmationChange} 
          required />
        <label htmlFor="password">Lösenord:</label>
        <input 
          id="password" 
          type="password"
          value={password} 
          onChange={handlePasswordChange} 
          required />
        <label htmlFor="password-confirmation">Lösenord (Bekräfta):</label>
        <input 
          id="password-confirmation" 
          type="password"
          value={passwordConfirmation} 
          onChange={handlePasswordConfirmationChange} 
          required />
        <button className={style.registerBtn}>Registrera</button>
      </form>
   );
}
 
export default RegisterForm;