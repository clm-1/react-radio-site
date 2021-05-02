import { useEffect, useContext, useState } from 'react';
import { RadioDataContext } from '../contexts/RadioDataContext';
import ProgramCard from '../components/ProgramCard';
import style from '../css/ChannelDetails.module.css';
import DetailsHeader from '../components/DetailsHeader';

const ChannelDetails = (props) => {
  const { getChannelById, getAllProgramsByChannel, oneChannel, programs, getChannelSchedule, channelSchedule, setPrograms, setOneChannel } = useContext(RadioDataContext);
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
      setOneChannel(null);
    }
    // eslint-disable-next-line
  }, []);

  // Header will load with different data depending on if it's a channel or a program
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
        { programs.length === 0 && <p>Inga program listade för denna kanal.</p>}
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
    // eslint-disable-next-line
  }, [date]);

  let schedule = 'Laddar...';
  if (channelSchedule) {
    schedule = <div>
      <div className={style.scheduleDateRow}>
        <h4 className={style.dateTitle}>{ date }</h4>
        <div>
          <label htmlFor="date">Välj datum:</label>
          <input id="date" type="date" value={ date } onChange={handleDateChange} />
        </div>
      </div>
      { channelSchedule.length === 0 && <p>Ingen tablå tillgänlig för denna kanal.</p>}
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
        <h4 onClick={() => setTab('all')} className={`${tab !== 'all' && style.notActive}`}>Alla program</h4>
        <h4 onClick={() => setTab('schedule')} className={`${tab !== 'schedule' && style.notActive}`}>Tablå</h4>
      </div>
      <hr className={style.hrLine}/>
      { tab === 'all' ? programList : schedule }
    </div>
   );
}
 
export default ChannelDetails;