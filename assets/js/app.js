// Grab HTML Elements
var searchButton = document.getElementById('search-button');
var cityInput = document.getElementById('city-input');
var cityEl = document.getElementById('city');
var tempEl = document.getElementById('temp');
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');
var forecastEl = document.getElementById('forecast-container');

var APIKey = 'c1d5715ddb2780f9e74e2c1c4120423b';

const date = new Date();
var dateString = date.toLocaleDateString();

function getCoordinates(city) {
  var geocodingAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + APIKey;
  fetch(geocodingAPI)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var longitude = data[0]['lon'];
    var latitude = data[0]['lat'];
    
    displayCurrentWeather(longitude, latitude);
    displayForecastWeather(longitude, latitude);
  });
}

function displayCurrentWeather(lon, lat) {
  var queryURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + APIKey;

  fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {

    // Display weather icon
    var weatherIconCode = data['weather'][0]['icon'];
    var weatherIconLink = 'http://openweathermap.org/img/w/' + weatherIconCode + '.png';
    var iconDescription = data['weather'][0]['description'];
    var iconImage = document.createElement('img');
    iconImage.src = weatherIconLink;
    iconImage.alt = iconDescription;

    cityEl.innerHTML = data['name'] + ' (' + dateString + ')';
    cityEl.append(iconImage);
    tempEl.innerHTML = 'Temp: ' + data['main']['temp'] + ' °F';
    windEl.innerHTML = 'Wind: ' + data['wind']['speed'] + ' MPH';
    humidityEl.innerHTML = 'Humidity: ' + data['main']['humidity'] + ' %';
  });
}

function displayForecastWeather(lon, lat) {
  var queryURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + APIKey;

  fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for (var x = 0; x < 5; x++) {
      var weatherData = data['list'][(x * 8) + 5];
      var weatherIconCode = weatherData['weather'][0]['icon'];
      var weatherIconLink = 'http://openweathermap.org/img/w/' + weatherIconCode + '.png';

      var forecast = document.createElement('div');
      var date = document.createElement('p');
      var icon = document.createElement('img');
      var iconDescription = weatherData['weather'][0]['description'];
      var temp = document.createElement('p');
      var wind = document.createElement('p');
      var humidity = document.createElement('p');
      
      // Set attributes and content
      forecast.className = 'forecast-tile';
      date.innerHTML = weatherData['dt_txt'];
      icon.src = weatherIconLink;
      icon.alt = iconDescription;
      temp.innerHTML = 'Temp: ' + weatherData['main']['temp'] + ' °F';
      wind.innerHTML = 'Wind: ' + weatherData['wind']['speed'] + ' MPH';
      humidity.innerHTML = 'Humidity: ' + weatherData['main']['humidity'] + ' %';

      // Add elements to tile and tile to HTML DOM
      forecast.append(date);
      forecast.append(icon);
      forecast.append(temp);
      forecast.append(wind);
      forecast.append(humidity);
      forecastEl.append(forecast);
    }
  });
}

// Event Listener
searchButton.addEventListener('click', function(e) {
  e.preventDefault();
  
  // Get user input
  var city = cityInput.value;

  getCoordinates(city);
});