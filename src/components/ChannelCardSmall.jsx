import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import style from '../css/ProgramCard.module.css';

const ChannelCardSmall = ({ channel }) => {
  const { loggedInUser, userFavourites, addFavourite, removeFavourite } = useContext(UserContext);
  const history = useHistory();

  const handleAddFavourite = (e) => {
    e.stopPropagation();
    addFavourite(channel.id, 'channel');
  }

  const handleRemoveFavourite = (e) => {
    e.stopPropagation();
    removeFavourite(channel.id, 'channel');
  }

  const renderHeart = () => {
    let inFavourites = false;
    if (userFavourites) {
      userFavourites.channels.forEach(favourite => {
        if (favourite.channel.id === channel.id) inFavourites = true;
      })
      userFavourites.channels.forEach(favourite => {
        if (favourite.channel.id === channel.id) inFavourites = true;
      })
    }

    if (!inFavourites) {
      return <i onClick={(e) => handleAddFavourite(e)} className="far fa-heart"></i>
    } else {
      return <i onClick={(e) => handleRemoveFavourite(e)} className="fas fa-heart"></i>
    }
  }

  return ( 
    <div className={style.programCard} onClick={() => history.push(`/programs/${channel.id}`)}> 
      <div className={style.imgWrapper}>
        <img src={channel.image} alt=""/>
      </div>
      <div className={style.infoText}>
        <div className={style.titleRow}>
          <h4 className={style.title}>{ channel.name }</h4>
          { loggedInUser && renderHeart() }
        </div>
        <p className={style.description}>{ channel.channeltype }</p>
        <span className={style.broadcastInfo}>{ channel.tagline && channel.tagline }</span>
      </div>
    </div>
   );
}
 
export default ChannelCardSmall;