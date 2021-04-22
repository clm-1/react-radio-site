import { createContext, useState, useEffect } from 'react';

export const RadioDataContext = createContext();

const RadioDataProvider = (props) => {
  const [channels, setChannels] = useState(null);
  const [popularChannelsIds, setPopularChannelsIds] = useState([132, 163, 164, 701, 224, 226, 4540, 2576, 2755, 212, 210]);
  const [popularChannels, setPopularChannels] = useState(null);
  const [categories, setCategories] = useState(null);
  const [programs, setPrograms] = useState(null);


  const getAllChannels = async () => {
    let channels = await fetch('/api/v1/channels');
    channels = await channels.json();
    console.log(channels.channels);
    setChannels(channels.channels)

    let temp = channels.channels.filter(channel => popularChannelsIds.includes(channel.id));
    setPopularChannels(temp);
  }

  const getAllCategories = async () => {
    let categories = await fetch('/api/v1/categories');
    categories = await categories.json();
    console.log(categories.programcategories);
    setCategories(categories.programcategories);
  }

  const getPrograms = async () => {
    let programs = await fetch('/api/v1/programs');
    programs = await programs.json();
    setPrograms(programs.programs);
  }

  useEffect(() => {
    getAllChannels();
    getAllCategories();
  }, []);
  
  const values = {
    channels,
    categories,
    popularChannels,
    programs,
    getPrograms,
  };

  return (
    <RadioDataContext.Provider value={values}>
      { props.children }
    </RadioDataContext.Provider>
  )
}

export default RadioDataProvider;