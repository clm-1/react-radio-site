import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"
import style from '../css/LoginOrRegister.module.css';

const LoginOrRegister = () => {
  const [registerForm, setRegisterForm] = useState(false);
  const history = useHistory();

  const checkLoggedIn = async () => {
    let result = await fetch('/api/v1/users/whoami');
    result = await result.json();
    if (result) {
      history.push('/user');
    }
  }

  useEffect(() => {
    checkLoggedIn();
  })

  return ( 
    <div className={style.loginRegisterWrapper}>
      <div className={style.infoColumn}>
        <h2 className={style.welcome}>Välkommen!</h2>
        <h4 className={style.shortText}>Lorem ipsum dolor sit amet consectetur.</h4>
        <hr/>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, dolorum! Asperiores omnis saepe, maxime reiciendis minima perferendis aliquam quos praesentium facilis ad numquam animi facere itaque officia sapient.</p>
        <p className={style.hidePtag}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora, ad. Aliquid dolorem eos voluptate dolor porro a. Sit, repellat similique.</p>
        <br/>
        <h5 className={style.sectionTitle}>Detta kan du göra med ett konto:</h5>
        <ul>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit..</li>
          <li>Lorem, ipsum dolor.</li>
          <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab accusamus est aliquid.</li>
        </ul>
      </div>
      <div className={style.formColumn}>
        { registerForm ? <RegisterForm /> : <LoginForm /> }
        <h5 className={style.infoTextBottom} onClick={() => setRegisterForm(!registerForm)}>{ registerForm ? 'Har du redan ett konto? Klicka här för att logga in' : 'Inget konto? Klicka här för att registrera dig' }</h5>
      </div>
    </div>
   );
}
 
export default LoginOrRegister;