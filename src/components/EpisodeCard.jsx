import style from '../css/EpisodeCard.module.css';

const EpisodeCard = ({ episode }) => {
  let playBtn = '';
  if (!episode.listenpodfile && episode.broadcast) {
    playBtn = 
      <a href={episode.broadcast.broadcastfiles[0].url} target="_blank" rel="noreferrer"><i className="far fa-play-circle"></i></a>
  }

  return ( 
    <div className={style.episodeCardWrapper}>
      {playBtn}
      <div className={style.imgWrapper}>
        <img src={ episode.imageurl } alt={ episode.title } />
      </div>
      <div className={style.episodeInfo}>
        <div className={style.titleRow}>
          <h4>{ episode.title }</h4>
        </div>
        <p className={style.time}>
        {episode.publishdateutc && 
          new Date(Number(episode.publishdateutc.slice(6, 19)))
                .toLocaleString()}
        </p>
        <p className={style.desc}>{ episode.description }</p>
      </div>
    </div>
   );
}
 
export default EpisodeCard;