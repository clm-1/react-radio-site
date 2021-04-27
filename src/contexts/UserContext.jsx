import { createContext, useEffect, useState, useContext } from 'react';
import { RadioDataContext } from './RadioDataContext';

export const UserContext = createContext();

const UserDataProvider = (props) => {
  const { getProgramById, getChannelById } = useContext(RadioDataContext);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userFavourites, setUserFavourites] = useState(null);

  const whoami = async () => {
    let result = await fetch('/api/v1/users/whoami');
    result = await result.json();
    setLoggedInUser(result);
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
    whoami();
    return result;
  }

  const logout = async () => {
    let result = await fetch('/api/v1/users/logout');
    result = await result.json();
    setLoggedInUser(null);
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
    if (result.success) {
      let userToLogin = {
        email: userToRegister.email,
        password: userToRegister.password
      }
      let loginResult = await login(userToLogin);
      if (loginResult.success) {
        console.log('login successful after registration')
      }
    }
    return result;
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
    whoami();
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
  }

  return ( 
    <UserContext.Provider value={values}>
      { props.children }
    </UserContext.Provider>
   );
}
 
export default UserDataProvider;