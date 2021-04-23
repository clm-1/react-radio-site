import style from '../css/ChannelDetails.module.css';

const ChannelDetails = () => {
  return ( 
    <div className={style.detailsPageWrapper}>
      <header>
        <div className={style.headerImgWrapper}>

        </div>
        <div className={style.headerInfo}>
          <div className={style.titleRow}>
            <h3 className={style.title}>Channel Name</h3>
            <h3 className={style.icon}>ICON</h3>
          </div>
          <hr/>
          <p className={style.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ad similique error sapiente? Illo provident illum blanditiis porro maxime? Consequuntur!</p>
        </div>
      </header>
      <div className={style.tabLinks}>
        <h4>Alla program</h4>
        <h4>Tablå</h4>
      </div>
      <hr/>
    </div>
   );
}
 
export default ChannelDetails;