const { xrapidapikey, xrapidapihost } = require("../../config.js");
const args = process.argv.slice(2);

let axios = require("axios").default;
// const flights = require("./flights");
// const destination = require("./destination");
// let airport = require("./flights");

const [place, destina] = args;

let optionsDeparture = {
  method: "GET",
  url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/`,
  params: { query: `${place}` },
  headers: {
    "x-rapidapi-key": xrapidapikey,
    "x-rapidapi-host": xrapidapihost,
  },
};
let optionsDestination = {
  method: "GET",
  url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/`,
  params: { query: `${destina}` },
  headers: {
    "x-rapidapi-key": xrapidapikey,
    "x-rapidapi-host": xrapidapihost,
  },
};
function getTravelDate() {
  //here we are getting the departure airport id from users  first argument
  return axios.request(optionsDeparture).then(function (response) {
    const PlacesDeparture = response.data.Places.map((el) => {
      if (el.PlaceName.includes(optionsDeparture.params.query)) {
        return `${el.CityId}`;
      } else {
        return null;
      }
    });
    //console.log(PlacesDeparture);
    //here we are getting the Destination airport id from users second argument
    axios.request(optionsDestination).then(function (response) {
      const PlaceDestination = response.data.Places.map((el) => {
        if (el.PlaceName.includes(optionsDestination.params.query)) {
          return `${el.CityId}`;
        } else {
          return null;
        }
      });
      // console.log(PlaceDestination);
      //now that we have both departure and destination we can get the travel possible dates by assign the variable with the airport codes to the special data feed for the dates
      let options = {
        method: "GET",
        url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/GR/USD/en-US/${PlacesDeparture[0]}/${PlaceDestination[0]}/anytime`,
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
            return `There is a flight from ${place} to ${destina} on ${el.QuoteDateTime.replace(
              /T/,
              " at "
            )} for ${el.MinPrice}$`;
          });
          console.log(datums);
        })
        .catch(function (error) {
          console.error(error);
        });
    });
  });
}
getTravelDate();
