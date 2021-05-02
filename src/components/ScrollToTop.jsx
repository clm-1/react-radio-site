import { useState, useRef, useEffect } from 'react';
import style from '../css/ScrollToTop.module.css';

// Scroll to top-button that appears in lower right corner of screen
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  let ref = useRef(false);

  useEffect(() => {
    ref.current = true;

    return () => {
      ref.current = false;
    }
  }, []);

  // Show/hide button depending on how far you've scrolled
  const toggleButton = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 350) {
      if (ref.current) setVisible(true);
    } else if (scrolled <= 350) {
      if (ref.current) setVisible(false);  
    } 
  };

  const scrollToTop = () =>{
    window.scroll({ top: 0, behavior: 'smooth' })
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