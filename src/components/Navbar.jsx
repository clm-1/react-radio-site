import { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { RadioDataContext } from '../contexts/RadioDataContext';
import { UserContext } from '../contexts/UserContext';
import style from '../css/Navbar.module.css';

const Navbar = () => {
  const { setTab } = useContext(RadioDataContext);
  const { loggedInUser } = useContext(UserContext);
  const history = useHistory();

  const logoClick = () => {
    history.push('/');
    setTab('popular');
  }

  return ( 
      <div className={style.navbarWrapper}>
        <nav>
          <div className={style.logo} onClick={() => logoClick()}>
            RADIO
          </div>
          <div className={style.linkWrapper}>
            <NavLink exact to="/" activeClassName={style.activeLink}>Kanaler {`&`} Program</NavLink>
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