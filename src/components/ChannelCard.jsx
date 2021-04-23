import { useHistory } from 'react-router-dom';
import style from '../css/ChannelCard.module.css';

const ShowCard = ({ channel }) => {
  const history = useHistory();

  return ( 
    <div className={style.channelCard} onClick={() => history.push(`/channels/${channel.id}`)}>
      <img src={channel.image} alt=""/>
      <p>{channel.name} - {channel.id}</p>
    </div>
   );
}
 
export default ShowCard;