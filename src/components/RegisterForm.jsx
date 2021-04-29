import { useState, useContext, useEffect } from 'react';
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
  const [emailCheck, setEmailCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  
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

  useEffect(() => {
    if (email === emailConfirmation) {
      setEmailCheck(true);
    } else {
      setEmailCheck(false);
    }
    // eslint-disable-next-line
  }, [email, emailConfirmation]);

  useEffect(() => {
    if (password === passwordConfirmation && password.match(pattern)) {
      setPasswordCheck(true);
    } else {
      setPasswordCheck(false);
    }
    // eslint-disable-next-line
  }, [password, passwordConfirmation]);

  const handlePasswordChange = (e) => {
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

  const checkMatch = (field) => {
    let input1, input2, check;
    if (field === 'email') {
      input1 = email;
      input2 = emailConfirmation;
      check = emailCheck;
    } else {
      input1 = password;
      input2 = passwordConfirmation;
      check = passwordCheck;
    }
    if (input1 || input2) {
      if (check) 
        return <i className={`fas fa-check ${style.match}`}></i>;
      if (!check) 
        return <i className={`fas fa-times ${style.noMatch}`}></i>;
    }
  }

  const renderPasswordInfo = () => {
    if (!passwordCheck) {
      if (password || passwordConfirmation) {
        return (
          <p className={`${style.passwordInfo}`}>Lösenordet måste vara minst 8 tecken långt samt innehålla minst en stor bokstav, en siffra och ett specialtecken</p>
        )
      }
    }
  }

  return ( 
      <div>
        <h4 className={style.formTitle}>Registrera ny användare</h4>
        <hr/>
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
        <div className={style.inputWrapper}>
          <input 
            id="email" 
            type="email"
            value={email} 
            onChange={handleEmailChange} 
            required />
          <div className={style.iconWrapper}>
            { checkMatch('email') }
          </div>
        </div>
        <label htmlFor="email-confirmation">E-post (Bekräfta):</label>
        <div className={style.inputWrapper}>
          <input 
            id="email-confirmation" 
            type="email"
            value={emailConfirmation} 
            onChange={handleEmailConfirmationChange} 
            required />
          <div className={style.iconWrapper}>
            { checkMatch('email') }
          </div>
        </div>
        <label htmlFor="password">Lösenord:</label>
        <div className={style.inputWrapper}>
          <input 
            id="password" 
            type="password"
            value={password} 
            onChange={handlePasswordChange} 
            required />
          <div className={style.iconWrapper}>
            { checkMatch('password') }
          </div>
        </div>
        <label htmlFor="password-confirmation">Lösenord (Bekräfta):</label>
        <div className={style.inputWrapper}>
          <input 
            id="password-confirmation" 
            type="password"
            value={passwordConfirmation} 
            onChange={handlePasswordConfirmationChange} 
            required />
          <div className={style.iconWrapper}>
              { checkMatch('password') }
          </div>
        </div>
        { renderPasswordInfo() }
        <button className={style.registerBtn}>Registrera</button>
      </form>
    </div>
   );
}
 
export default RegisterForm;