import { useContext, useState } from 'react';
import { RadioDataContext } from '../contexts/RadioDataContext';
import ShowCard from '../components/ShowCard';
import style from '../css/Home.module.css';
import Hero from '../components/Hero';

const Home = () => {
  const { channels, popularChannels, categories } = useContext(RadioDataContext);
  const [tab, setTab] = useState('popular');

  let allChannelsTab = 'Loading...';
  let popularChannelsTab = 'Loading...';
  let categoryTab = 'Loading...';
  let content = 'Loading...';
  
  if (channels && popularChannels && categories) {
    if (tab === 'all') {
      content = channels.map(channel => (
        <ShowCard channel={channel} key={channel.id} />
      ))
    } else if (tab === 'popular') {
      content = popularChannels.map(channel => (
        <ShowCard channel={channel} key={channel.id} />
      ))
    } else if (tab === 'categories') {
      content = categories.map(category => (
        <ShowCard channel={category} key={category.name} />
      ))
    }
  }

  if (popularChannels) {
    popularChannelsTab = popularChannels.map(channel => (
      <ShowCard channel={channel} key={channel.id} />
    ))
  }

  if (categories) {
    categoryTab = categories.map(category => (
      <ShowCard channel={category} key={category.name} />
    ))
  }
  

  return ( 
    <div className={style.homeWrapper}>
      <Hero />
      <div className={style.tabLinks}>
        <h4 className={`${tab !== 'popular' && style.notActive}`} onClick={() => setTab('popular')}>Populära kanaler</h4>
        <h4 className={`${tab !== 'all' && style.notActive}`} onClick={() => setTab('all')}>Alla kanaler</h4>
        <h4 className={`${tab !== 'categories' && style.notActive}`} onClick={() => setTab('categories')}>Kategorier</h4>
      </div>
      <hr/>
      <div className={style.cardsWrapper}>
        { content }
      </div>
    </div>
   );
}
 
export default Home;