import { useContext, useState, useEffect } from 'react';
import ChannelCardSmall from '../components/ChannelCardSmall';
import ProgramCard from '../components/ProgramCard';
import EditForm from '../components/EditForm';
import { UserContext } from '../contexts/UserContext';
import style from '../css/UserPage.module.css';
import { useHistory } from 'react-router-dom';

const UserPage = () => {
  const { loggedInUser, userFavourites, logout, editUser, setEditUser } = useContext(UserContext);
  const history = useHistory()
  const [tab, setTab] = useState('channels');

  const checkLoggedIn = async () => {
    let result = await fetch('/api/v1/users/whoami');
    result = await result.json();
    if (!result) {
      history.push('/');
    }
  }

  useEffect(() => {
    checkLoggedIn();
    
    return () => {
      setEditUser(false);
    }
    // eslint-disable-next-line
  }, []);

  let welcomeMessage = 'Inte inloggad';
  if (loggedInUser) {
    welcomeMessage = 
      <div className={style.userInfo}>
        <div className={style.userBox}>
          <p className={style.loggedInAs}>Inloggad som:</p>
          <hr/>
          <h3 className={style.fullName}>{ loggedInUser.firstName } { loggedInUser.lastName }</h3>
          <p className={style.email}>{ loggedInUser.email }</p>
          <hr/>
          <div className={style.userBtns}>
            <button onClick={() => setEditUser(!editUser)}>Ändra uppgifter</button>
            <button onClick={() => logout()}>Logga ut</button>
          </div>
        </div>
      </div>
  }

  let channelList = 'Laddar...';
  if (userFavourites) {
    let sortedChannels = [...userFavourites.channels].sort((a, b) => (a.channel.name > b.channel.name) ? 1 : -1);
    channelList = 
      <div className={style.listWrapper}>
        { sortedChannels.length === 0 && <p>Du har inte favoritmarkerat några kanaler.</p>}
        {sortedChannels.map(channel => (
          <ChannelCardSmall key={channel.channel.id} channel={channel.channel} />
        ))}
      </div>
  }

  let programList = 'Laddar...';
  if (userFavourites) {
    let sortedPrograms = [...userFavourites.programs].sort((a, b) => (a.program.name > b.program.name) ? 1 : -1);
    programList = 
      <div className={style.listWrapper}>
        { sortedPrograms.length === 0 && <p>Du har inte favoritmarkerat några program.</p>}
        {sortedPrograms.map(program => (
          <ProgramCard key={program.program.id} program={program.program} />
        ))}
      </div>
  }

  const renderNoFavourites = (type) => {
    return (
      <div className={style.noFavouritesCard}>
        <p className={style.noFavMessage}>Inga { type } i din lista än...</p>
      </div>
    )
  }


  return ( 
    <div>
      <div className={style.userHeader}>
        { welcomeMessage }
        { userFavourites && 
          <div className={style.latestAdded}>
            <h4 className={style.latestAddedTitle}>Din senaste favorit-kanal:</h4>
            { userFavourites.channels.length ? <ChannelCardSmall channel={userFavourites.channels[userFavourites.channels.length - 1].channel}/> : renderNoFavourites('kanaler') }
            <h4 className={`${style.latestAddedTitle} ${style.middleTitle}`}>Ditt senaste favorit-program:</h4>
            { userFavourites.programs.length ? <ProgramCard program={userFavourites.programs[userFavourites.programs.length - 1].program}/> : renderNoFavourites('program')}
        </div>
        }
      </div>
      <div>
        { editUser && <EditForm user={loggedInUser} /> }
      </div>
      <h4 className={style.favouritesTitle}>Dina favoriter</h4>
      <div className={style.tabLinks}>
        <h5 onClick={() => setTab('channels')} className={`${tab !== 'channels' && style.notActive}`}>Kanaler</h5>
        <h5 onClick={() => setTab('programs')} className={`${tab !== 'programs' && style.notActive}`}>Program</h5>
      </div>
      <hr className={style.hrLine}/>
      <p className={style.favouritesInfo}>Klicka på kanal eller program för mer information</p>
      { tab === 'channels' ? channelList : programList }
    </div>
   );
}
 
export default UserPage;