const { xrapidapikey, xrapidapihost } = require("../../config.js");
const args = process.argv.slice(2);
const [date] = args;
let axios = require("axios").default;
const flights = require("./flights");
const destination = require("./destination");

let options = {
  method: "GET",
  url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/GR/USD/en-US/STOC-sky/TYOA-sky/anytime`,
  params: { inboundpartialdate: `${date}` },
  headers: {
    "x-rapidapi-key": xrapidapikey,
    "x-rapidapi-host": xrapidapihost,
  },
};

axios
  .request(options)
  .then(function (response) {
    const places = response.data.Quotes.map((el) => {
      return el.QuoteDateTime;
    });
    console.log(places.map((el) => el.replace(/T/, " at ")));
  })
  .catch(function (error) {
    console.error(error);
  });
