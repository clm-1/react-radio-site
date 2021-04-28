import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import style from '../css/RegisterForm.module.css';

const LoginForm = () => {
  const { login } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);

  const handleEmailChange = (e) => {
    setLoginFailed(false);
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setLoginFailed(false);
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
      setLoginFailed(true);
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
        { loginFailed &&
          <p className={style.loginFailedMessage}>Inloggningsuppgifterna stämde inte, var god försök igen.</p> 
        }
        <button className={style.registerBtn}>Logga in</button>
      </form>
    </div>
   );
}
 
export default LoginForm;