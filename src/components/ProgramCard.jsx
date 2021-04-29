import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import style from '../css/ProgramCard.module.css';

const ProgramCard = ({ program }) => {
  const { loggedInUser, userFavourites, addFavourite, removeFavourite } = useContext(UserContext);
  const history = useHistory();

  const handleAddFavourite = (e) => {
    e.stopPropagation();
    addFavourite(program.id, 'program');
  }

  const handleRemoveFavourite = (e) => {
    e.stopPropagation();
    removeFavourite(program.id, 'program');
  }

  const renderHeart = () => {
    let inFavourites = false;
    if (userFavourites) {
      userFavourites.channels.forEach(favourite => {
        if (favourite.channel.id === program.id) inFavourites = true;
      })
      userFavourites.programs.forEach(favourite => {
        if (favourite.program.id === program.id) inFavourites = true;
      })
    }

    if (!inFavourites) {
      return <i onClick={(e) => handleAddFavourite(e)} className="far fa-heart"></i>
    } else {
      return <i onClick={(e) => handleRemoveFavourite(e)} className="fas fa-heart"></i>
    }
  }

  return ( 
    <div className={style.programCard} onClick={() => history.push(`/programs/${program.id}`)}> 
      <div className={style.imgWrapper}>
        <img src={program.programimage} alt=""/>
      </div>
      <div className={style.infoText}>
        <div className={style.titleRow}>
          <h4 className={style.title}>{ program.name }</h4>
          { loggedInUser && renderHeart() }
        </div>
        <p className={style.description}>{ program.channel.name !== '[No channel]' ? `${program.channel.name}` : 'Kanal Ipsum' } { program.programcategory ? `- ${program.programcategory.name}` : ''}</p>
        <span className={style.broadcastInfo}>{ program.broadcastinfo && program.broadcastinfo }</span>
      </div>
    </div>
   );
}
 
export default ProgramCard;