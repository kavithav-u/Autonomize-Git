// backend/services/githubService.js
const axios = require('axios');

const fetchGitHubUser = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = { fetchGitHubUser };
