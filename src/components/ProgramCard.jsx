import { useHistory } from 'react-router-dom';
import style from '../css/ProgramCard.module.css';

const ProgramCard = ({ program }) => {
  const history = useHistory();
  // "this is a longish string of text".replace(/^(.{11}[^\s]*).*/, "$1"); 

  // let temp = [];
  // let string = program.description.split(' ');
  // for (let i = 0; i < string.length; i++) {
  //   if (string[i][string[i].length - 1] === '-' && temp.length > 3) {
  //     temp[i - 1] = temp[i - 1] + '.';
  //     break;
  //   }
  //   if (temp.length > 4 && 
  //       string[i][string[i].length - 1] === '.' || 
  //       string[i][string[i].length - 1] === '?' 
  //       ) {

  //     temp.push(string[i]);
  //     break;
  //   }
  //   temp.push(string[i]);
  // }
  // string = temp.join(' ')
  // if (string.length > 170) {
  //   string = string.replace(/^(.{170}[^\s]*).*/, "$1") + '...'
  // }

  return ( 
    <div className={style.programCard} onClick={() => history.push(`/programs/${program.id}`)}> 
      <div className={style.imgWrapper}>
        <img src={program.programimage} alt=""/>
      </div>
      <div className={style.infoText}>
        <div className={style.titleRow}>
          <h4 className={style.title}>{ program.name }</h4>
          <i className="far fa-heart"></i>
        </div>
        <hr/>
        <p className={style.description}>{ program.channel.name !== '[No channel]' ? `${program.channel.name}` : 'Kanal Ipsum' } { program.programcategory ? `- ${program.programcategory.name}` : ''}</p>
      </div>
    </div>
   );
}
 
export default ProgramCard;