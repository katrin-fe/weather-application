function formatDate(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
minutes = `0${minutes}`;
}
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`
}

function showInformation(response) {
console.log(response);
let city = document.querySelector("#show-submitted-city").innerHTML = response.data.name;
let description = document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
let temperatureCelsius = document.querySelector("#show-celsius").innerHTML = `${Math.round(response.data.main.temp)}`;
let temperatureFahrenheit = document.querySelector("#show-fahrenheit").innerHTML = `${Math.round((response.data.main.temp * 9) / 5 + 32)}°F`;
let windSpeed = document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
let humidity = document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
let date = document.querySelector ("#current-day-and-time").innerHTML = formatDate(response.data.dt * 1000);
let icon = document.querySelector("#symbol");
icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function search (city) {
let apiKey = "535882172e596e21783881f2d1759f05";
let unit = "metric";
let apiUrlTemp = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`

axios.get(apiUrlTemp).then(showInformation);
}

function getApi(event) {
event.preventDefault();
let city = document.querySelector("#city-input");
search(city.value);
}

let citysubmit = document.querySelector("form");
citysubmit.addEventListener("submit", getApi);

function getCurrentCoordinates(position) {
let latitude = position.coords.latitude;
let longitude = position.coords.longitude;
let unit = "metric"
let apiKey = "535882172e596e21783881f2d1759f05";
let apiUrlCoord =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

axios.get(apiUrlCoord).then(showInformation);
}

function getCoordinates(event) {
event.preventDefault();
let currentCity = navigator.geolocation.getCurrentPosition(getCurrentCoordinates);
}

let citycurrentbutton = document.querySelector("#current-button");
citycurrentbutton.addEventListener("click", getCoordinates);

search("Zürich");


