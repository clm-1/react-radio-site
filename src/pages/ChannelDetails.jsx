import { useEffect, useContext, useState } from 'react';
import ProgramCard from '../components/ProgramCard';
import { RadioDataContext } from '../contexts/RadioDataContext';
import style from '../css/ChannelDetails.module.css';

const ChannelDetails = (props) => {
  const { getChannelById, getAllProgramsByChannel, oneChannel, programs, getChannelSchedule, channelSchedule, setPrograms } = useContext(RadioDataContext);
  const { channelId } = props.match.params;
  const [tab, setTab] = useState('all');

  useEffect(() => {
    // Get all data for this channel
    getChannelById(channelId);
    getAllProgramsByChannel(channelId);
    getChannelSchedule(channelId)

    return () => {
      // Clean-up on leaving
      setPrograms(null);
    }
  }, []);

  let content = 'Laddar...';
  if (oneChannel) {
    content = <div>
      <header>
        <div className={style.headerImgWrapper}>
          <img src={ oneChannel.image } alt=""/>
        </div>
        <div className={style.headerInfo}>
          <div className={style.titleRow}>
            <h3 className={style.title}>{ oneChannel.name }</h3>
            <i class="far fa-heart"></i>
          </div>
          <hr/>
          <p className={style.description}>{ oneChannel.tagline }</p>
        </div>
      </header>
    </div>
  }

  let programList = 'Laddar...';
  if (programs) {
    programList = 
      <div className={style.listWrapper}>
        {programs.map(program => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
  }

  let schedule = 'Laddar...';
  if (channelSchedule) {
    schedule = channelSchedule.map((episode, i) => (
      <div className={style.scheduleItem} key={i}>
        <span className={style.scheduleTime}>
          {new Date(Number(episode.starttimeutc.slice(6, 19)))
                .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        <div className={style.scheduleInfo}>
          <h4 className={style.scheduleTitle}>{episode.title}</h4>
          <p className={style.scheduleDesc}>{episode.description}</p>
        </div>
      </div>
    ))
  }

  return ( 
    <div className={style.detailsPageWrapper}>
      { content }
      <div className={style.tabLinks}>
        <h4 onClick={() => setTab('all')}>Alla program</h4>
        <h4 onClick={() => setTab('schedule')}>Tablå</h4>
      </div>
      <hr className={style.hrLine}/>
      { tab === 'all' ? programList : schedule }
    </div>
   );
}
 
export default ChannelDetails;