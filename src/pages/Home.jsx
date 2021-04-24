import { useContext, useState } from 'react';
import { RadioDataContext } from '../contexts/RadioDataContext';
import ChannelCard from '../components/ChannelCard';
import CategoryCard from '../components/CategoryCard';
import style from '../css/Home.module.css';
import Hero from '../components/Hero';
import CategoryProgramList from '../components/CategoryProgramList';

const Home = () => {
  const { channels, popularChannels, categories, tab, setTab } = useContext(RadioDataContext);

  let content = 'Laddar...';  
  if (channels && popularChannels && categories) {
    if (tab === 'all') {
      content = channels.map(channel => (
        <ChannelCard channel={channel} key={channel.id} />
      ))
    } else if (tab === 'popular') {
      content = popularChannels.map(channel => (
        <ChannelCard channel={channel} key={channel.id} />
      ))
    } else if (tab === 'categories') {
      content = categories.map(category => (
        <CategoryCard category={category} key={category.name} />
      ))
    } else if (tab === 'category') {
      content = <CategoryProgramList />
    }
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
      <div className={ tab !== 'category' ? style.cardsWrapper : '' }>
        { content }
      </div>
    </div>
   );
}
 
export default Home;