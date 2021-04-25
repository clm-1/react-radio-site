import { useEffect, useContext, useState } from 'react';
import { RadioDataContext } from '../contexts/RadioDataContext';
import ProgramCard from '../components/ProgramCard';
import style from '../css/ChannelDetails.module.css';
import DetailsHeader from '../components/DetailsHeader';

const ChannelDetails = (props) => {
  const { getChannelById, getAllProgramsByChannel, oneChannel, programs, getChannelSchedule, channelSchedule, setPrograms } = useContext(RadioDataContext);
  const { channelId } = props.match.params;
  const [tab, setTab] = useState('all');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

  useEffect(() => {
    // Get all data for this channel
    getChannelById(channelId);
    getAllProgramsByChannel(channelId);
    getChannelSchedule(channelId);

    return () => {
      // Clean-up on leaving
      setPrograms(null);
    }
  }, []);

  let header = 'Laddar...';
  if (oneChannel) {
    const headerContent = {
      id: oneChannel.id,
      type: 'channel',
      name: oneChannel.name,
      image: oneChannel.image,
      desc: oneChannel.tagline,
    }
    
    header = <DetailsHeader headerContent={ headerContent } />
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

  const handleDateChange = (e) => {
    setDate(e.target.value);
  }

  useEffect(() => {
    getChannelSchedule(channelId, date);
  }, [date]);

  let schedule = 'Laddar...';
  if (channelSchedule) {
    schedule = <div>
      <div className={style.scheduleTitle}>
        <h4>{ date }</h4>
        <div>
          <label htmlFor="date">Välj datum:</label>
          <input id="date" type="date" value={ date } onChange={handleDateChange} />
        </div>
      </div>
      {
        channelSchedule.map((episode, i) => (
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
    </div>
  }

  return ( 
    <div className={style.detailsPageWrapper}>
      { header }
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