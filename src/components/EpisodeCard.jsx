import style from '../css/EpisodeCard.module.css';

const EpisodeCard = ({ episode }) => {
  return ( 
    <div className={style.episodeCardWrapper}>
      <div className={style.imgWrapper}>
        <img src={ episode.imageurl } alt={ episode.title } />
      </div>
      <div className={style.episodeInfo}>
        <h4>{ episode.title }</h4>
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