import { useEffect, useState, useRef } from 'react';
import DetailsHeader from '../components/DetailsHeader';
import EpisodeCard from '../components/EpisodeCard';
import style from '../css/ProgramDetails.module.css'

const ProgramDetails = (props) => {
  const [program, setProgram] = useState(null);
  const [episodes, setEpisodes] = useState(null);
  const [allEpisodes, setAllEpisodes] = useState(null);
  const { programId } = props.match.params;
  const [tab, setTab] = useState('latest');
  const [allLoaded, setAllLoaded] = useState(false);
  let ref = useRef(false);


  const getProgramById = async (programId) => {
    let program = await fetch(`/api/v1/programs/${programId}`);
    program = await program.json();
    if (ref.current) {
      setProgram(program.program);
    }
  }

  const getAllEpisodesByProgam = async (programId) => {
    let toDate = new Date(Date.now()).toISOString().slice(0, 10);
    let fromDate = toDate.slice(0, 4) - 1 + toDate.slice(4, 10);
    let dateString = `&fromdate=${fromDate}&todate=${toDate}`;

    let episodes;
    const findEpisodes = async () => {
      episodes = await fetch(`/api/v1/episodes/${programId}${dateString}`);
      episodes = await episodes.json();

      if (episodes.episodes.length === 0) {
        toDate = toDate.slice(0, 4) - 1 + toDate.slice(4, 10);
        fromDate = toDate.slice(0, 4) - 1 + toDate.slice(4, 10);
        dateString = `&fromdate=${fromDate}&todate=${toDate}`;
        await findEpisodes();
      }
    }
    await findEpisodes();

    console.log(episodes.episodes);
    if (ref.current) {
      setEpisodes(episodes.episodes);
    } 
  }

  useEffect(() => {
    ref.current = true;
    console.log('mounted', ref)
    getProgramById(programId);
    getAllEpisodesByProgam(programId);
    getAllEpisodes();

    return () => {
      ref.current = false;
      console.log('unmounted', ref)
    }
    // eslint-disable-next-line
  }, []);

  const getAllEpisodes = async () => {
    let dateString = '';
    let episodes = await fetch(`/api/v1/episodes/${programId}${dateString}`)
    episodes = await episodes.json();
    if (ref.current) {
      console.log('mounted: setting state');
      setAllEpisodes(episodes.episodes);
    } else {
      console.log('unmounted: did not set state')
    }
  }

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
    episodeList = <div>
    {episodes.map(episode => (
      <EpisodeCard key={episode.id} episode={episode} />
    ))}
    </div>
    let latestEpisodesArray = [];
    let number = episodes.length > 5 ? 5 : episodes.length
    for (let i = 0; i < number; i++) {
      latestEpisodesArray.push(episodes[i]);
    }
    latestEpisodes = latestEpisodesArray.map(episode => (
      <EpisodeCard key={episode.id} episode={episode} />
    ))
  }

  const buttonClick = () => {
    setEpisodes(allEpisodes)
    setAllLoaded(true);
  }

  const renderButton = () => {
    if (allEpisodes && tab === 'all') {
      console.log('all', allEpisodes);
      console.log('episodes', episodes);
      if (allEpisodes.length > episodes.length) {
        return <button className={style.showEpisodesBtn} onClick={() => buttonClick()}>Visa alla avsnitt</button>;
      }
    }
  }

  return ( 
    <div className={style.detailsPageWrapper}>
      { header }
      <div className={style.tabLinks}>
        <h4 onClick={() => setTab('latest')} className={`${tab !== 'latest' && style.notActive}`}>
          Senaste avsnitten
        </h4>
        <h4 onClick={() =>  setTab('all')} className={`${tab !== 'all' && style.notActive}`}>
          Alla avsnitt
        </h4>
      </div>
      <hr className={style.hrLine}/>
      <div>
        { tab === 'latest' ? latestEpisodes : episodeList }
      </div>
      <div className={style.buttonWrapper}>
        { !allLoaded ? renderButton() : '' }
      </div>
    </div>
   );
}
 
export default ProgramDetails;