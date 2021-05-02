import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RadioDataContext } from '../contexts/RadioDataContext';
import style from '../css/Hero.module.css';

const Hero = () => {
  const { inFocus } = useContext(RadioDataContext);
  const history = useHistory();

  return ( 
    <div className={style.heroWrapper}>
      { inFocus &&
        <div className={style.cardsWrapper}>
          { inFocus.map((item, index) => (
            <div onClick={() => history.push(`/programs/${item.id}`)} key={item.id} className={`${style.programCard} ${index === 2 && style.hideOnSmall}`}>
              <img src={item.programimage} alt={item.name}/>
            </div>
          ))}
        </div>
      }
    </div>
   );
}
 
export default Hero;