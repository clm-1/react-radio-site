import { useContext } from 'react';
import { RadioDataContext } from '../contexts/RadioDataContext';
import style from '../css/Hero.module.css';

const Hero = () => {
  const { inFocus } = useContext(RadioDataContext);
  console.log(inFocus)
  return ( 
    <div className={style.heroWrapper}>
      { inFocus &&
        <div className={style.cardsWrapper}>
          <div className={style.programCard}>
            <img src={inFocus.programimage} alt=""/>
          </div>
          <div className={style.programCard}>
            <img src={inFocus.programimage} alt=""/>
          </div>
          <div className={style.programCard}>
            <img src={inFocus.programimage} alt=""/>
          </div>
        </div>
      }
    </div>
   );
}
 
export default Hero;