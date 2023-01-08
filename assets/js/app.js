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

function displayCurrentWeather(city) {
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  console.log(queryURL);

  fetch(queryURL, {
    method: 'GET', //GET is the default.
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
  })
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    cityEl.textContent = data['name'] + ' ' + dateString;
    tempEl.textContent = 'Temp: ' + data['main']['temp'] + ' °F';
    windEl.textContent = 'Wind: ' + data['wind']['speed'] + ' MPH';
    humidityEl.textContent = 'Humidity: ' + data['main']['humidity'] + ' %';
  });
  
}

searchButton.addEventListener('click', function(e) {
  e.preventDefault();
  
  var city = cityInput.value;

  // TODO: Add city to search history

  // Display city weather information
  displayCurrentWeather(city);
});