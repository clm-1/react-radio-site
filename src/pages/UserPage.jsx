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
          <h3 className={style.fullName}>{ loggedInUser.firstName } { loggedInUser.lastName }</h3>
          {/* <span>{ loggedInUser.email }</span> */}
        </div>
        <div className={style.userBtns}>
          <div>Ändra uppgifter</div>
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