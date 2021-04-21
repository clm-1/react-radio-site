import { createContext, useState, useEffect } from 'react';

export const RadioDataContext = createContext();

const RadioDataProvider = (props) => {
  const [channels, setChannels] = useState(null);
  const [categories, setCategories] = useState(null);

  const getAllChannels = async () => {
    let channels = await fetch('/api/v1/channels');
    channels = await channels.json();
    console.log(channels.channels);
    setChannels(channels.channels);
  }

  const getAllCategories = async () => {
    let categories = await fetch('/api/v1/categories');
    categories = await categories.json();
    console.log(categories.programcategories);
    setCategories(categories.programcategories);
  }

  useEffect(() => {
    getAllChannels();
    getAllCategories();
  }, []);
  
  const values = {
    channels,
    categories,
  };

  return (
    <RadioDataContext.Provider value={values}>
      { props.children }
    </RadioDataContext.Provider>
  )
}

export default RadioDataProvider;