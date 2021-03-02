'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());


app.get('/location', handleLocation);
app.get('/weather', handleWeather);


function handleLocation(req, res) {
  const jsonArrayNew = require('./data/location.json');
  const jsonObjectNew = jsonArrayNew[0];
  const queryResult = req.query.city;
  res.send(new Location(queryResult, jsonObjectNew));
}

function Location(cityObj, jsonArray) {
  this.search_query = cityObj;
  this.formatted_query = jsonArray.display_name;
  this.latitude = jsonArray.lat;
  this.longitude = jsonArray.lon;
}
function handleWeather(req, res) {
  const jsonWeatherArray = require('./data/weather.json');
  // const weatherObjLat = req.query.latitude;
  // const weatherObjLon = req.query.longitude;
  const weatherArray = [];
  console.log(jsonWeatherArray);
  for (let i = 0; i < jsonWeatherArray.data.length; i++) {
    console.log('testing');
    weatherArray.push(new Weather(jsonWeatherArray.data[i]));
  }
  res.send(weatherArray);
}
function Weather(weatherObj) {
  this.forecast = weatherObj.weather.description;
  this.time = weatherObj.datetime;
}








app.listen(PORT, () => console.log(`app is up on port http://localhost:${PORT}`));
