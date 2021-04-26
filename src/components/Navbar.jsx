import { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import style from '../css/Navbar.module.css';

const Navbar = () => {
  const { loggedInUser, logout } = useContext(UserContext);
  const history = useHistory();
  
  let userContent = 'Inte inloggad';
  if (loggedInUser) {
    userContent = <p>Inloggad som: {loggedInUser.firstName} {loggedInUser.lastName}</p>
  }

  return ( 
      <div className={style.navbarWrapper}>
        <nav>
          <div className={style.logo} onClick={() => history.push('/')}>
            A LOGO
          </div>
          <div className={style.linkWrapper}>
            <NavLink exact to="/" activeClassName={style.activeLink}>Hem</NavLink>
            <NavLink exact to="/about" activeClassName={style.activeLink}>Om sidan</NavLink>
            <NavLink exact to="/account" activeClassName={style.activeLink}>Mina sidor</NavLink>
            <NavLink exact to="/login" activeClassName={style.activeLink}>Logga in</NavLink>
          </div>
          <div>
            { userContent }
          </div>
          <button onClick={() => logout()}>Logga ut</button>
      </nav>
    </div>
   );
}
 
export default Navbar;