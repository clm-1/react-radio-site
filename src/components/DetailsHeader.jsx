import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import style from '../css/DetailsHeader.module.css';

const DetailsHeader = ({ headerContent }) => {
  const { loggedInUser, addFavourite, userFavourites } = useContext(UserContext);
  
  const handleFavouriteClick = () => {
    addFavourite(headerContent.id, headerContent.type);
  }

  const renderHeart = () => {
    let inFavourites = false;
    if (userFavourites) {
      userFavourites.channels.forEach(favourite => {
        if (favourite.channel.id === headerContent.id) inFavourites = true;
      })
      userFavourites.programs.forEach(favourite => {
        if (favourite.program.id === headerContent.id) inFavourites = true;
      })
    }

    if (!inFavourites) {
      return <i onClick={handleFavouriteClick} className="far fa-heart"></i>
    } else {
      return <i className="fas fa-heart"></i>
    }
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
            { loggedInUser && renderHeart() }
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