import { useContext, useEffect, useState } from 'react';
import DetailsHeader from '../components/DetailsHeader';
import EpisodeCard from '../components/EpisodeCard';
import { RadioDataContext } from '../contexts/RadioDataContext';
import style from '../css/ProgramDetails.module.css'

const ProgramDetails = (props) => {
  // const { getProgramById } = useContext(RadioDataContext);
  const [program, setProgram] = useState(null);
  const [episodes, setEpisodes] = useState(null);
  const { programId } = props.match.params;
  const [tab, setTab] = useState('latest');

  const getProgramById = async (programId) => {
    let program = await fetch(`/api/v1/programs/${programId}`);
    program = await program.json();
    setProgram(program.program);
  }

  // const getBroadcastsByProgram = async (programId) => {
  //   let broadcasts = await fetch(`/api/v1/programs/${programId}/broadcasts`);
  //   broadcasts = await broadcasts.json();
  //   console.log('BROADCASTS',broadcasts)
  // }

  const getAllEpisodesByProgam = async (programId) => {
    let episodes = await fetch(`/api/v1/episodes/${programId}`);
    episodes = await episodes.json();
    console.log(episodes.episodes);
    setEpisodes(episodes.episodes);
  }

  useEffect(() => {
    getProgramById(programId);
    getAllEpisodesByProgam(programId);
  }, []);

  let header = 'Laddar...';
  if (program) {
    const headerContent = {
      id: program.id,
      type: 'program',
      name: program.name,
      image: program.programimage,
      desc: program.description,
      broadcastInfo: program.broadcastinfo,
    }
    
    header = <DetailsHeader headerContent={ headerContent } />
  }

  let latestEpisodes = 'Laddar...';
  let episodeList = 'Laddar...';
  if (episodes) {
    episodeList = episodes.map(episode => (
      <EpisodeCard key={episode.id} episode={episode} />
    ))
    let latestEpisodesArray = [];
    let number = episodes.length > 5 ? 5 : episodes.length
    for (let i = 0; i < number; i++) {
      latestEpisodesArray.push(episodes[i]);
    }
    latestEpisodes = latestEpisodesArray.map(episode => (
      <EpisodeCard key={episode.id} episode={episode} />
    ))
  }

  return ( 
    <div className={style.detailsPageWrapper}>
      { header }
      <div className={style.tabLinks}>
        <h4 onClick={() => setTab('latest')} className={`${tab !== 'latest' && style.notActive}`}>
          Senaste avsnitten
        </h4>
        <h4 onClick={() => setTab('all')} className={`${tab !== 'all' && style.notActive}`}>
          Alla avsnitt
        </h4>
      </div>
      <hr className={style.hrLine}/>
      <div>
        { tab === 'latest' ? latestEpisodes : episodeList }
      </div>
    </div>
   );
}
 
export default ProgramDetails;