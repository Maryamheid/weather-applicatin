function getnewWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  forecastHosted();
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "b3f08a8a98956b59954bfd90b602toe4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(getnewWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}
function forecastHosted(city) {
  let apikeys = "b3f08a8a98956b59954bfd90b602toe4";
  let apiurls = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikeys}`;
  axios.get(apiurls).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data);
  let dayyys = ["Wed", "Sun", "Fri", "Thu", "Sat"];
  let htmlForecast = "";

  dayyys.forEach(function (day) {
    htmlForecast =
      htmlForecast +
      `
      <div class="weather-forecast-day">
        <div class="forcast-weather-roz">${day}</div>
        <div class="forecast-emoji-weather">🌤️</div>
        <div class="forecast-weather-temps">
          <div class="forecast-weather-temp">
            <strong>15º</strong>
          </div>
          <div class="forecast-weather-temp">9º</div>
        </div>
      </div>
    `;
  });

  let elementForecast = document.querySelector("#forecast-id");
  elementForecast.innerHTML = htmlForecast;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Herat");
