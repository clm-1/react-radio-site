import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import style from '../css/EditForm.module.css';

const EditForm = ({ user }) => {
  const { editUserInfo, setEditUser, setHideLatest } = useContext(UserContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [emailCheck, setEmailCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [emailExists, setEmailExists] = useState(false); 
  let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  }
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailExists(false);
  }
  const handleEmailConfirmationChange = (e) => {
    setEmailConfirmation(e.target.value);
    setEmailExists(false);
  }

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setEmail(user.email)
      setEmailConfirmation(user.email)
    }
    // eslint-disable-next-line
  }, [])

  // Check if email matches
  useEffect(() => {
    if (email === emailConfirmation) 
    { setEmailCheck(true); } else { setEmailCheck(false); }
    // eslint-disable-next-line
  }, [email, emailConfirmation]);

  // Check if password matches
  useEffect(() => {
    if (password === passwordConfirmation && password.match(pattern)) { setPasswordCheck(true); } else { setPasswordCheck(false); }
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
      return;
    }
    if (email !== emailConfirmation || password !== passwordConfirmation) {
      return;
    } else {
      const editedInfo = { firstName, lastName, email, password }
      let result = await editUserInfo(editedInfo);
      if (result.success) {
        setEditUser(false);
        setHideLatest(false);
      } else if (result.emailExists) {
        setEmailExists(true);
      } else {
        return;
      }
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
      if (check) return <i className={`fas fa-check ${style.match}`}></i>;
      if (!check) return <i className={`fas fa-times ${style.noMatch}`}></i>;
    }
  }

  const renderPasswordInfo = () => {
    if (!passwordCheck) {
      if (password || passwordConfirmation) {
        return (
          <p className={`${style.inputInfo}`}>L??senordet m??ste vara minst 8 tecken l??ngt samt inneh??lla minst en stor bokstav, en siffra och ett specialtecken</p>
        )
    }}}

  const handleCloseBtn = () => {
    setEditUser(false);
    setHideLatest(false);
  }

  const nameInputs = [
    { id: 'first-name', label: 'F??rnamn:', type: 'text', value: firstName, function: handleFirstNameChange },
    { id: 'last-name', label: 'Efternamn:', type: 'text', value: lastName, function: handleLastNameChange }];

  const emailInputs = [
    { id: 'email', label: 'E-post:', type: 'email', value: email, function: handleEmailChange },
    { id: 'email-confirmation', label: 'E-post (bekr??fta):', type: 'email', value: emailConfirmation, function: handleEmailConfirmationChange }];

  const passwordInputs = [
    { id: 'password', label: 'L??senord:', type: 'password', value: password, function: handlePasswordChange },
    { id: 'password-confirmation', label: 'L??senord (bekr??fta):', type: 'password', value: passwordConfirmation, function: handlePasswordConfirmationChange }];

  return ( 
      <div>
        <div className={style.editTitleRow}>
          <h4 className={style.formTitle}>Uppdatera dina uppgifter</h4>
          <i className={`fas fa-times ${style.closeEdit}`} onClick={() => handleCloseBtn()}></i>
        </div>
        <hr/>
        <form className={style.registerForm} onSubmit={handleSubmit}>
          <div className={style.inputRow}>
            { nameInputs.map((input, index) => (
              <div key={index} className={style.inputItem}>
                <label htmlFor={input.id}>{ input.label }</label>
                <input 
                  id={input.id} 
                  type={input.type}
                  value={input.value} 
                  onChange={input.function} 
                  required />
              </div>
            ))}
          </div>

          <div className={style.inputRow}>
            { emailInputs.map((input, index) => (
              <div key={index} className={style.inputItem}>
                <label htmlFor={input.id}>{ input.label }</label>
                <div className={style.inputWrapper}>
                  <input 
                    id={input.id} 
                    type={input.type}
                    value={input.value} 
                    onChange={input.function} 
                    required />
                  <div className={style.iconWrapper}>
                    { checkMatch('email') }
                  </div>
                </div>
              </div>
            ))}
          </div>
          { emailExists && <p className={style.inputInfo}>Den adressen finns redan registrerad</p> }

          <div className={style.inputRow}>
            { passwordInputs.map((input, index) => (
              <div key={index} className={style.inputItem}>
                <label htmlFor={input.id}>{ input.label }</label>
                <div className={style.inputWrapper}>
                  <input 
                    id={input.id} 
                    type={input.type}
                    value={input.value} 
                    onChange={input.function} 
                    required />
                  <div className={style.iconWrapper}>
                    { checkMatch('password') }
                  </div>
                </div>
              </div>
            ))}
          </div>
          
         <div className={style.btnRow}>
            <div> { renderPasswordInfo() } </div>
            <button className={style.registerBtn}>Uppdatera</button>
         </div>     
      </form>
    </div>
   );
}
 
export default EditForm;