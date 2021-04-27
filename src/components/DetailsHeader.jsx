import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import style from '../css/DetailsHeader.module.css';

const DetailsHeader = ({ headerContent }) => {
  const { loggedInUser, addFavourite } = useContext(UserContext);
  
  const handleFavouriteClick = () => {
    addFavourite(headerContent.id, headerContent.type);
  }

  return ( 
    <div className={style.headerWrapper}>
      <header>
        <div className={style.headerImgWrapper}>
          <img src={ headerContent.image } alt=""/>
        </div>
        <div className={style.headerInfo}>
          <div className={style.titleRow}>
            <h3 className={style.title}>{ headerContent.name }</h3>
            { loggedInUser && <i onClick={handleFavouriteClick} className="far fa-heart"></i> }
          </div>
          <hr/>
          { headerContent.broadcastInfo && 
            <p className={style.broadcastInfo}>{ headerContent.broadcastInfo }</p>
          }
          <p className={style.description}>{ headerContent.desc }</p>
        </div>
      </header>
    </div>
   );
}
 
export default DetailsHeader;