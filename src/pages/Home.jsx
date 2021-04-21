import { useContext } from 'react';
import { RadioDataContext } from '../contexts/RadioDataContext';
import style from '../css/Home.module.css';

const Home = () => {
  const { channels } = useContext(RadioDataContext);

  let content = 'Loading...';
  if (channels) {
    content = channels.map(channel => (
      <div>{ channel.name }</div>
    ))
  }
  

  return ( 
    <div className={style.homeWrapper}>
      Hemsidan
      { content }
    </div>
   );
}
 
export default Home;