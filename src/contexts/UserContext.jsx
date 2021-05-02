import { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export const UserContext = createContext();

const UserDataProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userFavourites, setUserFavourites] = useState(null);
  const [editUser, setEditUser] = useState(false);
  const [hideLatest, setHideLatest] = useState(false);
  const history = useHistory();

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
   
    let channels = result.filter(item => item.type === 'channel');
    let programs = result.filter(item => item.type === 'program');

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
    let result = await fetch('/api/v1/users/logout');
    result = await result.json();
    setLoggedInUser(null);
    setUserFavourites(null);
    history.push('/');
    console.log(result);
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
      console.log(result)
      getFavouritesByUserId(loggedInUser.userId);
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
      console.log(result);
      getFavouritesByUserId(loggedInUser.userId);
    }
  }

  // useEffect

  useEffect(() => {
    whoami('set');
    // eslint-disable-next-line
  }, [])

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