import { useState } from 'react';
import style from '../css/EpisodeCard.module.css';

const EpisodeCard = ({ episode }) => {
  const [moreInfo, setMoreInfo] = useState(false);

  let browserBtn = '';
  if (!episode.listenpodfile && episode.broadcast) {
    browserBtn = 
      <a href={episode.broadcast.broadcastfiles[0].url} target="_blank" rel="noreferrer"><p>Spela i webbläsaren</p></a>
  }

  let downloadBtn = '';
  if (episode.downloadpodfile) {
    downloadBtn = 
      <a href={episode.downloadpodfile.url} rel="noreferrer"><p>Ladda hem avsnitt</p></a>
  }

  let line = '';
  if (episode.downloadpodfile || episode.broadcast) {
    line = <hr></hr>
  }

  // <i className="far fa-play-circle"></i>

  return ( 
    <div className={style.episodeCardWrapper}>
      <div className={style.imgAndInfo}>
        <div className={style.imgWrapper}>
          <img src={ episode.imageurl } alt={ episode.title } />
        </div>
        <div className={style.episodeInfo}>
          <div className={style.titleRow}>
            <h4 className={style.title}>{ episode.title }</h4>
          </div>
          <hr/>
          <div className={style.midRow}>
            <p className={style.time}>
            {episode.publishdateutc && 
              new Date(Number(episode.publishdateutc.slice(6, 19)))
                    .toLocaleString()}
            </p>
            <div className={`${style.playWrapper} ${style.hideTopPlay}`}>
              { browserBtn }
              { downloadBtn }
            </div>
          </div>
          <div className={style.descDesktop}>
            <p>{ episode.description }</p>
          </div>
        </div>
      </div>
      <div onClick={() => setMoreInfo(!moreInfo)} className={style.bottomBar}><p>Läs mer / Spela</p></div>
      { moreInfo && 
        <div className={style.moreInfo}>
          <p>{ episode.description }</p>
          <div className={style.playWrapper}>
            { line }
            { browserBtn }
            { downloadBtn }
          </div>
        </div>
      }
    </div>
   );
}
 
export default EpisodeCard;