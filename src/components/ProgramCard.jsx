import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import style from '../css/ProgramCard.module.css';

const ProgramCard = ({ program }) => {
  const { loggedInUser } = useContext(UserContext);
  const history = useHistory();

  return ( 
    <div className={style.programCard} onClick={() => history.push(`/programs/${program.id}`)}> 
      <div className={style.imgWrapper}>
        <img src={program.programimage} alt=""/>
      </div>
      <div className={style.infoText}>
        <div className={style.titleRow}>
          <h4 className={style.title}>{ program.name }</h4>
          { loggedInUser && <i className="far fa-heart"></i> }
        </div>
        <p className={style.description}>{ program.channel.name !== '[No channel]' ? `${program.channel.name}` : 'Kanal Ipsum' } { program.programcategory ? `- ${program.programcategory.name}` : ''}</p>
        <span className={style.broadcastInfo}>{ program.broadcastinfo && program.broadcastinfo }</span>
      </div>
    </div>
   );
}
 
export default ProgramCard;