'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());


app.get('/location', handleLocation);
app.get('/weather', handleWeather);


function handleLocation(req, res){
  const jsonArraayNew = require('./data/location.json');
  res.send(new Location(jsonObjectNew));
}

function Location(jsonArray){
  this.search_query = '';
  this.formatted_query = jsonArray[0].display_name;
  this.latitude = '';
  this.longitude = '';
}
function handleWeather(req, res){
  // [{
  //   "forecast": "Partly cloudy until afternoon.",
  //   "time": "Mon Jan 01 2001"
  // }]
}



















app.listen(PORT, () => console.log(`app is up on port http://localhost:${PORT}`));
