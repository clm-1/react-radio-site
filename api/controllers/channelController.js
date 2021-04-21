const fetch = require('node-fetch');
const json = 'format=json';
const paginationFalse = 'pagination=false';

const getAllChannels = async (req, res) => {
  let channels = await fetch(
    `http://api.sr.se/api/v2/channels?${json}&${paginationFalse}`);

  channels = await channels.json();
  res.json(channels);
}

const getChannelById = async (req, res) => {
  let channel = await fetch(
    `http://api.sr.se/api/v2/channels/${req.params.channelId}?${json}`);

  channel = await channel.json();
  res.json(channel);
}

const getChannelSchedule = async (req, res) => {
  let channelSchedule = await fetch(
    `http://api.sr.se/api/v2/scheduledepisodes?${json}&${paginationFalse}&channelId=${req.params.channelId}`);

  channelSchedule = await channelSchedule.json();
  res.json(channelSchedule);
}

const getAllProgramsByChannel = async (req, res) => {
  let programs = await fetch(
    `http://api.sr.se/api/v2/programs/index?${json}&${paginationFalse}&channelid=${req.params.channelId}`);

  programs = await programs.json();
  res.json(programs);
}

module.exports = {
  getAllChannels,
  getChannelById,
  getChannelSchedule,
  getAllProgramsByChannel,
}