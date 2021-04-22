import { NavLink, useHistory } from 'react-router-dom';
import style from '../css/Navbar.module.css';

const Navbar = () => {
  const history = useHistory();
  
  return ( 
      <nav className={style.navbarWrapper}>
        <div className={style.logo} onClick={() => history.push('/')}>
          A LOGO
        </div>
        <div className={style.linkWrapper}>
          <NavLink exact to="/" activeClassName={style.activeLink}>Hem</NavLink>
          <NavLink exact to="/about" activeClassName={style.activeLink}>Om sidan</NavLink>
          <NavLink exact to="/account" activeClassName={style.activeLink}>Mina sidor</NavLink>
        </div>
      </nav>
   );
}
 
export default Navbar;