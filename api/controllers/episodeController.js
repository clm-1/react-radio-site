const fetch = require('node-fetch');
const json = 'format=json';
const paginationFalse = 'pagination=false';

const getAllEpisodesByProgram = async (req, res) => {
  let episodes = await fetch(
    `http://api.sr.se/api/v2/episodes/index?${json}&${paginationFalse}&programid=${req.params.programId}`);

  episodes = await episodes.json();
  res.json(episodes);
}

module.exports = {
  getAllEpisodesByProgram,
}