// Grab HTML Elements
var searchButton = document.getElementById('search-button');
var cityInput = document.getElementById('city-input');
var cityEl = document.getElementById('city');
var tempEl = document.getElementById('temp');
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');

var APIKey = 'c1d5715ddb2780f9e74e2c1c4120423b';

const date = new Date();
var dateString = date.toLocaleDateString();

function getCoordinates(city) {
  var geocodingAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + APIKey;
  fetch(geocodingAPI)
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var longitude = data[0]['lon'];
    var latitude = data[0]['lat'];
    console.log('Longitude: ' + longitude + ' | Latitude: ' + latitude);
    
    displayCurrentWeather(longitude, latitude);
    displayForecastWeather(longitude, latitude);
  });
}

function displayCurrentWeather(lon, lat) {
  var queryURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + APIKey;
  console.log(queryURL);

  fetch(queryURL)
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    // Display weather icon
    var weatherIconCode = data['weather'][0]['icon'];
    var weatherIconLink = 'http://openweathermap.org/img/w/' + weatherIconCode + '.png';
    var iconDescription = data['weather'][0]['description'];
    var iconImage = document.createElement('img');
    iconImage.src = weatherIconLink;
    iconImage.alt = iconDescription;

    cityEl.innerHTML = data['name'] + ' ' + dateString;
    cityEl.append(iconImage);
    tempEl.innerHTML = data['main']['temp'] + ' °F';
    windEl.innerHTML = data['wind']['speed'] + ' MPH';
    humidityEl.innerHTML = data['main']['humidity'] + ' %';
  });
  displayForecastWeather();
}

function displayForecastWeather(lon, lat) {
  var queryURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + APIKey;
  console.log(queryURL);

  fetch(queryURL)
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

}

// Event Listener
searchButton.addEventListener('click', function(e) {
  e.preventDefault();
  
  // Get user input
  var city = cityInput.value;

  getCoordinates(city);
});