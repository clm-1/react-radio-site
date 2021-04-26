import { useState, useContext } from 'react';
import style from '../css/RegisterForm.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.email);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  return ( 
      <form className={style.registerForm}>
        <label htmlFor="email">E-post:</label>
        <input 
          id="email" 
          type="email"
          value={email} 
          onChange={handleEmailChange} 
          required />
        <label htmlFor="password">Lösenord:</label>
        <input 
          id="password" 
          type="password"
          value={password} 
          onChange={handlePasswordChange} 
          required />
        <button className={style.registerBtn}>Logga in</button>
      </form>
   );
}
 
export default LoginForm;