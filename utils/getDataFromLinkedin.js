require("dotenv").config();
const axios = require("axios");

// const options = {
//   method: "GET",
//   url: "https://linkedin-profile-data.p.rapidapi.com/linkedin-data",
//   params: { url: "https://www.linkedin.com/in/safeem/" },
//   headers: {
//     "X-RapidAPI-Key": process.env.RAPID_API_KEY,
//     "X-RapidAPI-Host": "linkedin-profile-data.p.rapidapi.com",
//   },
// };
// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

const getDataFromLinkedin = async (linkedin_url) => {
  const options = {
    method: "GET",
    url: "https://linkedin-profile-data.p.rapidapi.com/linkedin-data",
    params: { url: linkedin_url },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "linkedin-profile-data.p.rapidapi.com",
    },
  };
  const response = await axios.request(options);
  return response.data;
};

module.exports = getDataFromLinkedin;
