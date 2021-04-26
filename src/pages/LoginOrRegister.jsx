import { useState } from 'react';
import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"
import style from '../css/LoginOrRegister.module.css';

const LoginOrRegister = () => {
  const [registerForm, setRegisterForm] = useState(false);

  return ( 
    <div className={style.loginRegisterWrapper}>
      { registerForm ? <RegisterForm /> : <LoginForm /> }

      <button onClick={() => setRegisterForm(!registerForm)}>Byt</button>
    </div>
   );
}
 
export default LoginOrRegister;