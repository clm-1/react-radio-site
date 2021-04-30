import { useHistory } from 'react-router-dom';
import style from '../css/ChannelCard.module.css';

const ChannelCard = ({ channel }) => {
  const history = useHistory();

  return ( 
    <div className={style.channelCard} onClick={() => history.push(`/channels/${channel.id}`)}>
      <img src={channel.image ? channel.image : 'https://static-cdn.sr.se/images/4866/92556cd3-3254-4424-91bb-6ba511f60f4c.jpg?preset=api-default-square'} alt=""/>
      <p>{channel.name} - {channel.id}</p>
    </div>
   );
}
 
export default ChannelCard;