import { useContext, useState } from 'react';
import ChannelCardSmall from '../components/ChannelCardSmall';
import ProgramCard from '../components/ProgramCard';
import UpdateForm from '../components/UpdateForm';
import { UserContext } from '../contexts/UserContext';
import style from '../css/UserPage.module.css';

const UserPage = () => {
  const { loggedInUser, userFavourites, logout } = useContext(UserContext);
  const [tab, setTab] = useState('channels');

  let welcomeMessage = 'Inte inloggad';
  if (loggedInUser) {
    welcomeMessage = 
      <div className={style.userHeader}>
        <div className={style.userInfo}>
          <h3 className={style.fullName}>{ loggedInUser.firstName } { loggedInUser.lastName }</h3>
          {/* <span>{ loggedInUser.email }</span> */}
        </div>
        <div className={style.userBtns}>
          <div>Ändra uppgifter</div>
          <div onClick={() => logout()}>Logga ut</div>
        </div>
      </div>
  }

  if (userFavourites) {
    console.log(userFavourites);
  }

  let channelList = 'Laddar...';
  if (userFavourites) {
    channelList = 
      <div className={style.listWrapper}>
        { userFavourites.channels.length === 0 && <p>Du har inte favoritmarkerat några kanaler.</p>}
        {userFavourites.channels.map(channel => (
          <ChannelCardSmall key={channel.channel.id} channel={channel.channel} />
        ))}
      </div>
  }

  let programList = 'Laddar...';
  if (userFavourites) {
    programList = 
      <div className={style.listWrapper}>
        { userFavourites.programs.length === 0 && <p>Du har inte favoritmarkerat några program.</p>}
        {userFavourites.programs.map(program => (
          <ProgramCard key={program.program.id} program={program.program} />
        ))}
      </div>
  }

  return ( 
    <div>
      { welcomeMessage }
      <div>
        <UpdateForm user={loggedInUser} />
      </div>
      <h4 className={style.favouritesTitle}>Dina favoriter</h4>
      <div className={style.tabLinks}>
        <h5 onClick={() => setTab('channels')} className={`${tab !== 'channels' && style.notActive}`}>Kanaler</h5>
        <h5 onClick={() => setTab('programs')} className={`${tab !== 'programs' && style.notActive}`}>Program</h5>
      </div>
      <hr className={style.hrLine}/>
      { tab === 'channels' ? channelList : programList }
    </div>
   );
}
 
export default UserPage;