// const CheapflightsClient = require("./cheapflights-client");
// const { xrapidapikey, xrapidapihost } = require("../../config");

// // module.exports =
// async function flights() {
//   try {
//     const flightsClient = new CheapflightsClient(xrapidapihost, xrapidapikey);
//     const data = await flightsClient.get();

//     return data.results;
//   } catch (error) {
//     console.log(error);
//   }
// }
// console.log(flights());

const { xrapidapikey, xrapidapihost } = require("../../config.js");
const args = process.argv.slice(3);
const [destination] = args;
let axios = require("axios").default;

let options = {
  method: "GET",
  url: "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/",
  params: { query: `${destination}` },
  headers: {
    "x-rapidapi-key": xrapidapikey,
    "x-rapidapi-host": xrapidapihost,
  },
};

axios
  .request(options)
  .then(function (response) {
    const places = response.data.Places;
    console.log(
      places.map((el) => {
        return el.CityId;
      })
    );
  })
  .catch(function (error) {
    console.error(error);
  });
