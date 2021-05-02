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
    // eslint-disable-next-line
  })

  const renderInfo = (hideSmall) => {
    return (
      <div className={`${hideSmall && style.hideSmall}`}>
        <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, dolorum! Asperiores omnis saepe, maxime reiciendis minima perferendis aliquam quos praesentium facilis ad numquam animi facere itaque officia sapient.</p>
        <p className={`${hideSmall && style.hideMedium}`}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora, ad. Aliquid dolorem eos voluptate dolor porro a. Sit, repellat similique.</p>
        <br/>
        <div >
          <h5 className={style.sectionTitle}>Illo eaque dolore libero at odio:</h5>
          <ul>
            <li>Lorem ipsum dolor sit amet consectetur.</li>
            <li>Distinctio earum sed eum nam iure quo odio facilis fugiat.</li>
            <li>Nostrum quia dicta repellendus.</li>
            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab accusamus est aliquid.</li>
          </ul>
        </div>
      </div>
    )
  }

  return ( 
    <div className={style.loginRegisterWrapper}>
      <div className={style.infoColumn}>
        <h2 className={style.welcome}>Välkommen!</h2>
        <h4 className={style.shortText}>Lorem ipsum dolor sit amet consectetur.</h4>
        <hr className={style.welcomeHr} />
        { renderInfo('hideSmall') }
      </div>
      <div className={style.formColumn}>
        { registerForm ? <RegisterForm /> : <LoginForm /> }
        <h5 className={style.infoTextBottom} onClick={() => setRegisterForm(!registerForm)}>{ registerForm ? 'Har du redan ett konto? Klicka här för att logga in' : 'Inget konto? Klicka här för att registrera dig' }</h5>
      </div>
        <div className={style.infoColumnBelow}>
          { renderInfo() }
        </div>
    </div>
   );
}
 
export default LoginOrRegister;