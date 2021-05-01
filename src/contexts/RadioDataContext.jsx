import { createContext, useState, useEffect } from 'react';

export const RadioDataContext = createContext();

const RadioDataProvider = (props) => {
  const [channels, setChannels] = useState(null);
  const [oneChannel, setOneChannel] = useState(null);
  const [channelSchedule, setChannelSchedule] = useState(null);
  const [categories, setCategories] = useState(null);
  const [categoryPrograms, setCategoryPrograms] = useState(null);
  const [programs, setPrograms] = useState(null);
  const [popularChannels, setPopularChannels] = useState(null);
  const [inFocus, setInFocus] = useState(null);
  const [popularChannelsIds] = useState([132, 163, 164, 701, 224, 226, 4540, 2576, 2755, 212, 210]);
  const [tab, setTab] = useState('popular');


  const getAllChannels = async () => {
    let channels = await fetch('/api/v1/channels');
    channels = await channels.json();
    setChannels(channels.channels)

    let temp = channels.channels.filter(channel => popularChannelsIds.includes(channel.id));
    setPopularChannels(temp);
  }

  const getAllCategories = async () => {
    let categories = await fetch('/api/v1/categories');
    categories = await categories.json();
    setCategories(categories.programcategories);
  }

  const getPrograms = async () => {
    let programs = await fetch('/api/v1/programs');
    programs = await programs.json();
    setPrograms(programs.programs);
  }

  const getProgramById = async (programId) => {
    let program = await fetch(`/api/v1/programs/${programId}`);
    program = await program.json();
    return program.program;
  }

  const getChannelById = async (channelId) => {
    let channel = await fetch(`/api/v1/channels/${channelId}`);
    channel = await channel.json();
    setOneChannel(channel.channel);
    return channel.channel;
  }

  const getAllProgramsByChannel = async (channelId) => {
    let programs = await fetch(`/api/v1/channels/${channelId}/programs`);
    programs = await programs.json();
    programs.programs.sort((a, b) => (a.name > b.name) ? 1 : -1);
    setPrograms(programs.programs);
  }

  const getChannelSchedule = async (channelId, date) => {
    let scheduleDate = date ? `?date=${date}` : ``;
    let schedule = await fetch(`/api/v1/channels/${channelId}/schedule${scheduleDate}`);
    schedule = await schedule.json();
    setChannelSchedule(schedule.schedule);
  }

  const getAllProgramsByCategory = async (categoryId) => {
    let categoryPrograms = await fetch(`/api/v1/categories/${categoryId}/programs`);
    categoryPrograms = await categoryPrograms.json();
    console.log(categoryPrograms);
    setCategoryPrograms(categoryPrograms.programs);
  }

  const setFocus = async () => {
    let focusProgramsIds = [1646, 407, 5177];
    let focusPrograms = [];
    for (let i = 0; i < focusProgramsIds.length; i++) {
      focusPrograms.push(await getProgramById(focusProgramsIds[i]));
    }
    setInFocus(focusPrograms);
  }

  useEffect(() => {
    getAllChannels();
    getAllCategories();
    setFocus();
    // eslint-disable-next-line
  }, []);
  
  const values = {
    channels,
    categories,
    popularChannels,
    programs,
    getPrograms,
    oneChannel,
    setOneChannel,
    getChannelById,
    getAllProgramsByChannel,
    getChannelSchedule,
    channelSchedule,
    setPrograms,
    getAllProgramsByCategory,
    categoryPrograms,
    setCategoryPrograms,
    tab,
    setTab,
    getProgramById,
    inFocus
  };

  return (
    <RadioDataContext.Provider value={values}>
      { props.children }
    </RadioDataContext.Provider>
  )
}

export default RadioDataProvider;