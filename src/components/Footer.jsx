import style from '../css/Footer.module.css';

const Footer = () => {
  return ( 
    <div className={style.footerWrapper}>
      <div className={style.footerContent}>
        <h4 className={style.footerTitle}>RADIOnet</h4>
        <p>En inofficiell sida byggd på en öppen API från SR</p>
        <span>Copyright <>&copy;</> Lorem Ipsum</span>
      </div>
    </div>
   );
}
 
export default Footer;