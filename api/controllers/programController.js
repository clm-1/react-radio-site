const fetch = require('node-fetch');
const json = 'format=json';
const paginationFalse = 'pagination=false';

const getAllCategories = async (req, res) => {
  let categories = await fetch(
    `http://api.sr.se/api/v2/programcategories?${json}&${paginationFalse}`);
  
  categories = await categories.json();
  res.json(categories);
}

const getAllProgramsByCategory = async (req, res) => {
  let programs = await fetch(
    `http://api.sr.se/api/v2/programs/index?${json}&${paginationFalse}&programcategoryid=${req.params.categoryId}`);
}

module.exports = {
  getAllCategories,
  getAllProgramsByChannel,
  getAllProgramsByCategory,
}