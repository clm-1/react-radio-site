import { useEffect, useContext } from 'react';
import ProgramCard from '../components/ProgramCard';
import { RadioDataContext } from '../contexts/RadioDataContext';
import style from '../css/ChannelDetails.module.css';

const ChannelDetails = (props) => {
  const { getChannelById, getAllProgramsByChannel, oneChannel, programs } = useContext(RadioDataContext);
  const { channelId } = props.match.params;

  useEffect(() => {
    getChannelById(channelId);
    getAllProgramsByChannel(channelId);
  }, []);

  let content = 'Loading...';
  if (oneChannel) {
    console.log(oneChannel)
    console.log('prog:', programs)
    content = <div>
      <header>
        <div className={style.headerImgWrapper}>
          <img src={ oneChannel.image } alt=""/>
        </div>
        <div className={style.headerInfo}>
          <div className={style.titleRow}>
            <h3 className={style.title}>{ oneChannel.name }</h3>
            <h3 className={style.icon}>ICON</h3>
          </div>
          <hr/>
          <p className={style.description}>{ oneChannel.tagline }</p>
        </div>
      </header>
    </div>
  }

  let programList = 'Loading...';
  if (programs) {
    programList = programs.map(program => (
      <ProgramCard key={program.id} program={program} />
    ))
  }

  return ( 
    <div className={style.detailsPageWrapper}>
      { content }
      <div className={style.tabLinks}>
        <h4>Alla program</h4>
        <h4>Tablå</h4>
      </div>
      <hr/>
      <div className={style.listWrapper}>
        { programList }
      </div>
    </div>
   );
}
 
export default ChannelDetails;