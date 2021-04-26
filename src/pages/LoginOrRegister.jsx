import { useState } from 'react';
import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"
import style from '../css/LoginOrRegister.module.css';

const LoginOrRegister = () => {
  const [registerForm, setRegisterForm] = useState(false);

  return ( 
    <div className={style.loginRegisterWrapper}>
      <div className={style.infoColumn}>
        <h2 className={style.welcome}>Välkommen!</h2>
        <h4 className={style.shortText}>Lorem ipsum dolor sit amet consectetur.</h4>
        <hr/>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, dolorum! Asperiores omnis saepe, maxime reiciendis minima perferendis aliquam quos praesentium facilis ad numquam animi facere itaque officia sapiente. Nam facilis qui repudiandae sequi delectus deleniti quaerat beatae aperiam illum eum iusto labore repellat vitae, sunt at ex facere quo officia.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora, ad. Aliquid dolorem eos voluptate dolor porro a. Sit, repellat similique.</p>
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