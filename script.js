const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.querySelector(".weather-icon");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weatherBox = document.querySelector(".weather");

async function checkWeather(cityName) {
     const apiKey = "589556147f21918c42bb14483eb11b2e";
     const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

     try {
          const response = await fetch(url);
          if (!response.ok) {
               weatherBox.style.display = "none";
               alert("Wrong city name. Please try again!");
               return;
          }

          let weatherData = await response.json();
          temp.innerHTML = `${Math.round(weatherData.main.temp)}°C`;
          city.innerHTML = `${weatherData.name}, ${weatherData.sys.country}`;
          description.innerHTML = weatherData.weather[0].description;
          humidity.innerHTML = `${weatherData.main.humidity}%`;
          wind.innerHTML = `${weatherData.wind.speed} km/h`;

          const iconCode = weatherData.weather[0].icon;
          weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png?`;
          weatherBox.style.display = "block";
     } catch (error) {
          weatherBox.style.display = "none";
          weatherData=''
          alert("City not found! Please try again.");
     }
}

searchBtn.addEventListener("click", () => {
     const cityName = inputBox.value.trim();
     if (cityName !== "") {
          checkWeather(cityName);
          weatherBox.style.display = "block";
     } else {
          alert("Please enter a city name!");
     }
});
