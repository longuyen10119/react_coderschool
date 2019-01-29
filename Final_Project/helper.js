(function () {
  'use strict';
}());
import {
  imageDangerous,
  imageGood,
  imageModerate,
  imageUnhealthy,
  imageUnhealthySensitive,
  imageVeryUnhealthy
} from './assets/images/index';



const apiKey = `aaa897a24675dc5f2e87ad004b1d62eec6a33bbf`;

// async function
export async function fetchAPIMap(region) {
  console.log(region);
  const getBoundingBox = [
    region.latitude - region.latitudeDelta / 2, // southLat - min lat
    region.longitude - region.longitudeDelta / 2, // westLng - min lng
    region.latitude + region.latitudeDelta / 2, // northLat - max lat
    region.longitude + region.longitudeDelta / 2, // eastLng - max lng
  ];

  const [lat1, lng1, lat2, lng2] = getBoundingBox;
  const response = await fetch(`https://api.waqi.info/map/bounds/?latlng=${lat1},${lng1},${lat2},${lng2}&token=${apiKey}`);
  const json = await response.json();
  return json;
}
export async function fetchAPI(coords) {
  const { latitude, longitude } = coords;
  const response = await fetch(`https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${apiKey}`);
  const aqi = await response.json();
  return aqi;

};
export async function parsingForMapScreen(data) {
  let markersInfo = [];
  for (let i of data.data) {
    let number, condition, color;
    let imgPath = '';
    let lat = i.lat;
    let lon = i.lon;
    if (i.aqi === '-') {
      number = 0;
    } else {
      number = parseInt(i.aqi);
    }
    switch (true) {
      case (number > 300):
        condition = 'Hazardous';
        color = '#7e0023';
        imgPath = imageDangerous;
        break;
      case (number > 200):
        condition = 'Very Unhealthy';
        color = '#660099';
        imgPath = imageVeryUnhealthy;
        break;
      case (number > 150):
        condition = 'Unhealthy';
        color = '#cc0033';
        imgPath = imageUnhealthy;
        break;
      case (number > 100):
        condition = 'Unhealthy for Sensitive Groups';
        color = '#ff9933';
        imgPath = imageUnhealthySensitive;
        break;
      case (number > 50):
        condition = 'Moderate';
        color = '#ffde33';
        imgPath = imageModerate;
        break;
      default:
        condition = 'Good';
        color = '#009966'
        imgPath = imageGood;
        break;
    };
    let aMarker = {
      aqi: number,
      condition,
      color,
      imgPath,
      lat,
      lon,
    }
    markersInfo.push(aMarker);
  }
  return markersInfo;
}
export async function parsingAqi(aqi) {
  console.log(aqi);
  const number = aqi.data.aqi;
  let condition = '';
  let imgPath = '';
  //Set color and condition
  switch (true) {
    case (number > 300):
      condition = 'Hazardous';
      color = '#7e0023';
      imgPath = imageDangerous;
      break;
    case (number > 200):
      condition = 'Very Unhealthy';
      color = '#660099';
      imgPath = imageVeryUnhealthy;
      break;
    case (number > 150):
      condition = 'Unhealthy';
      color = '#cc0033';
      imgPath = imageUnhealthy;
      break;
    case (number > 100):
      condition = 'Unhealthy for Sensitive Groups';
      color = '#ff9933';
      imgPath = imageUnhealthySensitive;
      break;
    case (number > 50):
      condition = 'Moderate';
      color = '#ffde33';
      imgPath = imageModerate;
      break;
    default:
      condition = 'Good';
      color = '#009966'
      imgPath = imageGood;
      break;
  };
  // Get the day of week
  const [date, time] = aqi.data.time.s.split(' ');
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  let dtr = new Date(date);
  let pm10, no2, o3;
  try {
    pm10 = (aqi.data.iaqi.pm10.v);
    no2 = (aqi.data.iaqi.no2.v);
    o3 = (aqi.data.iaqi.o3.v);
  }
  catch (error) {
    pm10 = ' ';
    no2 = '';
    o3 = ''
  }

  let aCard = {
    aqi: number,
    condition,
    time,
    dayOfWeek: weekday[dtr.getDay()],
    color,
    city: aqi.data.city,
    imgPath,
    pm10,
    o3,
    no2,
  }
  return aCard;
};