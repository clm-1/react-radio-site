import { createContext, useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RadioDataContext } from './RadioDataContext';

export const UserContext = createContext();

const UserDataProvider = (props) => {
  const { getProgramById, getChannelById } = useContext(RadioDataContext);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userFavourites, setUserFavourites] = useState(null);
  const [editUser, setEditUser] = useState(false);
  const [hideLatest, setHideLatest] = useState(false);
  const history = useHistory();

  // Check if the session has a logged in user
  const whoami = async (method) => {
    let result = await fetch('/api/v1/users/whoami');
    result = await result.json();
    if (method === 'set') {
      setLoggedInUser(result);
      return;
    }
    if (method === 'check' && !result) {
        history.push('/'); 
        return;
    }
  }

  const getFavouritesByUserId = async (userId) => {
    let result = await fetch(`/api/v1/users/${userId}/favourites`);
    result = await result.json();
   
    // Filter the result from the database, to separate channels and programs
    let channels = result.filter(item => item.type === 'channel');
    let programs = result.filter(item => item.type === 'program');

    // Loop through the arrays to fetch channels and programs from the API
    let fetchedChannels = [];
    let fetchedPrograms = [];
    for (let i = 0; i < channels.length; i++) {
      let item = await fetch(`/api/v1/channels/${channels[i].showId}`);
      item = await item.json();
      fetchedChannels.push(item);
    } 
    for (let i = 0; i < programs.length; i++) {
      let item = await fetch(`/api/v1/programs/${programs[i].showId}`);
      item = await item.json();
      fetchedPrograms.push(item);
    } 
    setUserFavourites({ channels: fetchedChannels, programs: fetchedPrograms });
  }

  // Login and set logged in user
  const login = async (userToLogin) => {
    let result = await fetch('/api/v1/users/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userToLogin),
    })
    result = await result.json();
    whoami('set');
    return result;
  }

  const logout = async () => {
    await fetch('/api/v1/users/logout');
    setLoggedInUser(null);
    setUserFavourites(null);
    history.push('/');
  }

  const register = async (userToRegister) => {
    let result = await fetch('/api/v1/users/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userToRegister)
    });
    result = await result.json();
    whoami('set');
    return result;
  }

  const editUserInfo = async (editedInfo) => {
    let result = await fetch(`/api/v1/users/${loggedInUser.userId}/edit`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(editedInfo),
    });
    result = await result.json();
    whoami('set');
    return result;
  }

  const removeFavourite = async (showId, type) => {
    if (loggedInUser) {
      let result = await fetch(`/api/v1/users/${loggedInUser.userId}/removefavourite?showId=${showId}&type=${type}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'aplication/json'
        }
      });
      result = await result.json();

      // Filter out the removed item from the userFavourites-array
      if (result.success) {
        let newList;
        if (type === 'program') {
          newList = {
            channels: userFavourites.channels,
            programs: userFavourites.programs.filter(item => item.program.id !== showId),
          }
        };
        if (type === 'channel') {
          newList = {
            channels: userFavourites.channels.filter(item => item.channel.id !== showId),
            programs: userFavourites.programs,
          }
        };
        setUserFavourites(newList);
      }
    }
  }

  const addFavourite = async (showId, type) => {
    if (loggedInUser) {
      let result = await fetch(`/api/v1/users/${loggedInUser.userId}/addfavourite`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ showId, type }),
      });      
      result = await result.json();

      // Get new program from API and add it to userFavourites-array
      if (type === 'program') {
        let program = await getProgramById(result.item.showId);
        const newList = {
          channels: userFavourites.channels,
          programs: [...userFavourites.programs, {program: program}]
        };
        setUserFavourites(newList);
      }
      if (type === 'channel') {
        let channel = await getChannelById(result.item.showId);
        const newList = {
          channels: [...userFavourites.channels, {channel: channel}],
          programs: userFavourites.programs,
        };
        setUserFavourites(newList);
      }
    }
  }

  // useEffect

  useEffect(() => {
    whoami('set');
    // eslint-disable-next-line
  }, [])

  // Get favourites for the logged in user
  useEffect(() => {
    loggedInUser && getFavouritesByUserId(loggedInUser.userId);
  }, [loggedInUser]);

  const values = {
    register,
    login,
    whoami,
    loggedInUser,
    logout,
    userFavourites,
    addFavourite,
    removeFavourite,
    editUserInfo,
    editUser,
    setEditUser,
    hideLatest,
    setHideLatest,
  }

  return ( 
    <UserContext.Provider value={values}>
      { props.children }
    </UserContext.Provider>
   );
}
 
export default UserDataProvider;