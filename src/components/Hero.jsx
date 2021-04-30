import { useContext } from 'react';
import { RadioDataContext } from '../contexts/RadioDataContext';
import style from '../css/Hero.module.css';

const Hero = () => {
  const { inFocus } = useContext(RadioDataContext);

  return ( 
    <div className={style.heroWrapper}>
      { inFocus ? 
        <div>{ inFocus.name }</div> : ''}
    </div>
   );
}
 
export default Hero;