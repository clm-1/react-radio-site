import { useState, useRef } from 'react';
import style from '../css/ScrollToTop.module.css';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);


  const toggleButton = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 350) {
      setVisible(true);
    } else if (scrolled <= 350) {
      setVisible(false);
    }
  };

  const scrollToTop = () =>{
    window.scroll({ top:0 ,behavior:'smooth' })
  };

  window.addEventListener('scroll', toggleButton);

  return ( 
    <div>
      <div onClick={() => scrollToTop()} className={`${style.scrollUpBtn} ${visible && style.showBtn}`}>
        <p>^</p>
      </div>
    </div>
   );
}
 
export default ScrollToTop;