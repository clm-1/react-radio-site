import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import style from '../css/RegisterForm.module.css';

const LoginForm = () => {
  const { login } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userToLogin = {
      email,
      password,
    }
    let result = await login(userToLogin);
    if (result.success) {
      console.log(result.success);
      history.push('/user');
    } else {
      console.log(result.error);
    }
  }

  return ( 
      <div>
        <h4 className={style.formTitle}>Logga in</h4>
        <hr/>
        <form className={style.registerForm} onSubmit={handleSubmit}>
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
    </div>
   );
}
 
export default LoginForm;