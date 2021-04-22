import style from '../css/ChannelCard.module.css';

const ShowCard = ({ channel }) => {
  return ( 
    <div className={style.channelCard}>
      <img src={channel.image} alt=""/>
      <p>{channel.name} - {channel.id}</p>
    </div>
   );
}
 
export default ShowCard;