'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const superagent = require('superagent');

const app = express();
const PORT = process.env.PORT || 3000;
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
app.use(cors());


app.get('/location', handleLocation);
app.get('/weather', handleWeather);


function handleLocation(req, res) {
  // const jsonArrayNew = require('./data/location.json');
  // const jsonObjectNew = jsonArrayNew[0];
  const queryResult = req.query.city;
  const url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${queryResult}&format=json`;

  superagent.get(url)
    .then(results => {
      res.send(new Location(queryResult, results.body[0]));

    })

}

function Location(cityObj, jsonArray) {
  this.search_query = cityObj;
  this.formatted_query = jsonArray.display_name;
  this.latitude = jsonArray.lat;
  this.longitude = jsonArray.lon;
}
function handleWeather(req, res) {
  // const jsonWeatherArray = require('./data/weather.json');
  const weatherObjName = req.query.search_query;

  const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weatherObjName}&key=${WEATHER_API_KEY}`;

  // const weatherArray = [];
  // console.log(jsonWeatherArray);
  // for (let i = 0; i < jsonWeatherArray.data.length; i++) {
  //   console.log('testing');
  //   weatherArray.push(new Weather(jsonWeatherArray.data[i]));
  // }

  superagent.get(weatherURL)
    .then(weatherResults => {
      const weatherArray = weatherResults.body.data.map(value => {
        return new Weather(value);
      });

      res.send(weatherArray);
    });
}
function Weather(weatherObj) {
  this.forecast = weatherObj.weather.description;
  this.time = weatherObj.datetime;
}









app.listen(PORT, () => console.log(`app is up on port http://localhost:${PORT}`));
