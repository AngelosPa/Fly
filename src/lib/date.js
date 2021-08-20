const { xrapidapikey, xrapidapihost } = require("../../config.js");
const args = process.argv.slice(2);

let axios = require("axios").default;
// const flights = require("./flights");
// const destination = require("./destination");
// let airport = require("./flights");

const [place, date] = args;
//to get the dates
let options = {
  method: "GET",
  url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/GR/USD/en-US/BERL-sky/TYOA-sky/anytime`,
  params: { inboundpartialdate: `anytime` },
  headers: {
    "x-rapidapi-key": xrapidapikey,
    "x-rapidapi-host": xrapidapihost,
  },
};

axios
  .request(options)
  .then(function (response) {
    const datums = response.data.Quotes.map((el) => {
      return el.QuoteDateTime;
    });
    // console.log(datums.map((el) => el.replace(/T/, " at ")));
  })
  .catch(function (error) {
    console.error(error);
  });

//to get the airport name with city name as a parameter
let optionsforairport = {
  method: "GET",
  url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/`,
  params: { query: `${place}` },
  headers: {
    "x-rapidapi-key": xrapidapikey,
    "x-rapidapi-host": xrapidapihost,
  },
};
async function getAirportName() {
  await axios
    .request(optionsforairport)
    .then(function (response) {
      const Places = response.data.Places.map((el) => {
        return el.CityId;
      });
      console.log(Places[0]);
    })
    .catch(function (error) {
      console.error(error);
    });
}
getAirportName();

// let optionsforairport = {
//   method: "GET",
//   url: "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/",
//   params: { query: `${place}` },
//   headers: {
//     "x-rapidapi-key": xrapidapikey,
//     "x-rapidapi-host": xrapidapihost,
//   },
// };

// axios
//   .request(optionsforairport)
//   .then(function (response) {
//     const places = response.data.Places;
//     console.log(places[0].PlaceId);
//   })

//   .catch(function (error) {
//     console.error(error);
//   });
