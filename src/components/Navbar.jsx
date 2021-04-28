import { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { RadioDataContext } from '../contexts/RadioDataContext';
import { UserContext } from '../contexts/UserContext';
import style from '../css/Navbar.module.css';

const Navbar = () => {
  const { setTab } = useContext(RadioDataContext);
  const { loggedInUser, logout } = useContext(UserContext);
  const history = useHistory();
  
  let userContent = 'Inte inloggad';
  if (loggedInUser) {
    userContent = <p>Inloggad som: {loggedInUser.firstName} {loggedInUser.lastName}</p>
  }

  const logoClick = () => {
    history.push('/');
    setTab('popular');
  }

  return ( 
      <div className={style.navbarWrapper}>
        <nav>
          <div className={style.logo} onClick={() => logoClick()}>
            A LOGO
          </div>
          <div className={style.linkWrapper}>
            <NavLink exact to="/" activeClassName={style.activeLink}>Kanaler {`&`} Program</NavLink>
            <NavLink exact to="/about" activeClassName={style.activeLink}>Om sidan</NavLink>
          </div>
          <div className={style.accountLinks}>
            { loggedInUser ? 
              <span className={style.navName}>Inloggad som: { loggedInUser.firstName }</span> : ''}
            { loggedInUser ? 
              <button className={style.registerBtn} onClick={() => history.push('/user')}>Mina sidor</button> :
              <button className={style.registerBtn} onClick={() => history.push('/login')}>Logga in</button>}
            {/* <button onClick={() => logout()}>Logga ut</button> */}
          </div>
      </nav>
    </div>
   );
}
 
export default Navbar;