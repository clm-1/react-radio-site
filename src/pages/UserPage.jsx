import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import style from '../css/UserPage.module.css';

const UserPage = () => {
  const { loggedInUser, userFavourites, logout } = useContext(UserContext);

  let welcomeMessage = 'Inte inloggad';
  if (loggedInUser) {
    welcomeMessage = 
      <div className={style.userHeader}>
        <div className={style.userInfo}>
          <span>Inloggad som:</span>
          <h3 className={style.fullName}>{ loggedInUser.firstName } { loggedInUser.lastName }</h3>
        </div>
        <div className={style.userBtns}>
          <div>Redigera uppgifter</div>
          <div onClick={() => logout()}>Logga ut</div>
        </div>
      </div>
  }

  return ( 
    <div>
      { welcomeMessage }
    </div>
   );
}
 
export default UserPage;