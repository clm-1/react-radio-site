const fetch = require('node-fetch');
const json = 'format=json';
const paginationFalse = 'pagination=false';

const getAllEpisodesByProgram = async (req, res) => {
  let toDate = new Date(Date.now()).toISOString().slice(0, 10);
  console.log(toDate);
  let fromDate = toDate.slice(0, 4) - 1 + toDate.slice(4, 10);
  console.log(fromDate);
  // let fromDate = toDate.slice(0, 4) + '-01-01';
  let episodes;

  const findEpisodes = async () => {
    episodes = await fetch(
      `http://api.sr.se/api/v2/episodes/index?${json}&${paginationFalse}&programid=${req.params.programId}&fromdate=${fromDate}&todate=${toDate}`);
  
      episodes = await episodes.json();

      if (episodes.episodes.length === 0) {
        toDate = toDate.slice(0, 4) - 1 + toDate.slice(4, 10);
        fromDate = toDate.slice(0, 4) - 1 + toDate.slice(4, 10);
        console.log(toDate);
        await findEpisodes();
      }
  }
  await findEpisodes();

  res.json(episodes);
}

module.exports = {
  getAllEpisodesByProgram,
}