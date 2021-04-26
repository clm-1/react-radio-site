import { useState } from 'react';
import style from '../css/RegisterForm.module.css';

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  return ( 
    <div>
      <form className={style.registerForm}>
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
          type="text"
          value={email} 
          onChange={handleEmailChange} 
          required />
        <label htmlFor="password">Lösenord:</label>
        <input 
          id="password" 
          type="text"
          value={password} 
          onChange={handlePasswordChange} 
          required />
        <button className={style.registerBtn}>Registrera</button>
      </form>
    </div>
   );
}
 
export default RegisterForm;