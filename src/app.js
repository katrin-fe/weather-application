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

function formatDay (timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

return days[day];
}

function displayForecast(response) {
    console.log(response);
let forecast = response.data.daily;

let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;
forecast.forEach(function (forecastDay, index) {
if (index < 5) {
forecastHTML = forecastHTML + 
`
        <div class="col-2">
            <div class="weekday-forecast">${formatDay(forecastDay.dt)}</div>
            <img 
            src= "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt=""width="40"/>
            <div class="temperature-forecast">
                <span class="temperature-forecast-max"> ${Math.round(forecastDay.temp.max)}° </span>
                <span class="temperature-forecast-min"> ${Math.round(forecastDay.temp.min)}° </span>
            </div>
        </div>
`;
}
});

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function convertFahrenheit(event) {
event.preventDefault();
let temperatureElement = document.querySelector("#show-celsius");
let fahrenheitTemperature = (temperatureCelsius * 9) / 5 + 32;
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
temperatureCel.classList.add("active");
temperatureFahrenheit.classList.remove("active");
}

function convertCelsius(event) {
event.preventDefault();
let temperatureElement = document.querySelector("#show-celsius");
temperatureElement.innerHTML = Math.round(temperatureCelsius);
temperatureCel.classList.add("active");
temperatureFahrenheit.classList.remove("active");
}

function getForecast(coordinates) {
let apiKey = "535882172e596e21783881f2d1759f05";
let unit = "metric";
let apiUrl = `http://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
axios.get(apiUrl).then(displayForecast);
}

function showInformation(response) {
let city = document.querySelector("#show-submitted-city").innerHTML = response.data.name;
let description = document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
temperatureCelsius = document.querySelector("#show-celsius").innerHTML = `${Math.round(response.data.main.temp)}`;
let windSpeed = document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
let humidity = document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
let date = document.querySelector ("#current-day-and-time").innerHTML = formatDate(response.data.dt * 1000);
let icon = document.querySelector("#symbol");
icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

getForecast(response.data.coord);
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

let temperatureFahrenheit = document.querySelector("#show-fahrenheit");
temperatureFahrenheit.addEventListener("click", convertFahrenheit);

let temperatureCel = document.querySelector("#celsius-sign");
temperatureCel.addEventListener("click", convertCelsius);

let temperatureCelsius = null;

search("Zürich");


