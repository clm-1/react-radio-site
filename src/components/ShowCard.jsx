import style from '../css/ShowCard.module.css';

const ShowCard = ({ channel }) => {
  return ( 
    <div className={style.showCard}>
      <img src={channel.image} alt=""/>
      <p>{channel.name} - {channel.id}</p>
    </div>
   );
}
 
export default ShowCard;