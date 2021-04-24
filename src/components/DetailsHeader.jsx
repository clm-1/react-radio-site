import style from '../css/DetailsHeader.module.css';

const DetailsHeader = ({ headerContent }) => {
  return ( 
    <div className={style.headerWrapper}>
      <header>
        <div className={style.headerImgWrapper}>
          <img src={ headerContent.image } alt=""/>
        </div>
        <div className={style.headerInfo}>
          <div className={style.titleRow}>
            <h3 className={style.title}>{ headerContent.name }</h3>
            <i className="far fa-heart"></i>
          </div>
          <hr/>
          <p className={style.description}>{ headerContent.desc }</p>
        </div>
      </header>
    </div>
   );
}
 
export default DetailsHeader;