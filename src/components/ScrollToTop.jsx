import { useState, useRef, useEffect } from 'react';
import style from '../css/ScrollToTop.module.css';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  let ref = useRef(false);

  useEffect(() => {
    ref.current = true;

    return () => {
      ref.current = false;
    }
  }, []);

  const toggleButton = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 350) {
      if (ref.current) setVisible(true);
    } else if (scrolled <= 350) {
      if (ref.current) setVisible(false);  
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