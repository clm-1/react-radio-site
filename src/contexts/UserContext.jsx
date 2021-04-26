import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

const UserDataProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userFavourites, setUserFavourites] = useState(null);

  const getFavouritesByUserId = async (userId) => {
    let result = await fetch(`/api/v1/users/${userId}/favourites`);
    result = await result.json();
    const favourites = {
      channels: result.filter(item => item.type === 'channel'),
      programs: result.filter(item => item.type === 'program'),
      episodes: result.filter(item => item.type === 'episode')
    }
    setUserFavourites(favourites);
  }

  const whoami = async () => {
    let result = await fetch('/api/v1/users/whoami');
    result = await result.json();
    setLoggedInUser(result);
    getFavouritesByUserId(result.userId);
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

  useEffect(() => {
    whoami();
  }, [])

  const values = {
    register,
    login,
    whoami,
    loggedInUser,
    logout,
    userFavourites,
  }

  return ( 
    <UserContext.Provider value={values}>
      { props.children }
    </UserContext.Provider>
   );
}
 
export default UserDataProvider;