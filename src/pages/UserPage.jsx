import { useContext } from 'react';
import { RadioDataContext } from '../contexts/RadioDataContext';
import { UserContext } from '../contexts/UserContext';
import style from '../css/UserPage.module.css';

const UserPage = () => {
  const { loggedInUser, userFavourites, logout } = useContext(UserContext);
  const { getProgramById } = useContext(RadioDataContext);

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

  if (userFavourites) {
    console.log(userFavourites);
  }

  return ( 
    <div>
      { welcomeMessage }
    </div>
   );
}
 
export default UserPage;