window.onload = function () {
  const cityInput = document.getElementById("cityInput");
  const searchBtn = document.getElementById("searchBtn");

  const cityName = document.getElementById("cityName");
  const countryOrRegion = document.getElementById("country");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const weatherIcon = document.getElementById("weatherIcon");

  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");
  const feelsLike = document.getElementById("feelsLike");

  const videoBg = document.getElementById("video-bg");

  //  Vid Change Func
  function changeVideo(weather) {
    // console.log(weather);

    weather = weather.toLowerCase();

    if (weather.includes("rain")) {
      videoBg.src = "videos/rain.mp4";
    } else if (
      weather.includes("cloud") ||
      weather.includes("mist") ||
      weather.includes("fog")
    ) {
      videoBg.src = "videos/cloudy.mp4";
    } else if (weather.includes("snow")) {
      videoBg.src = "videos/snow.mp4";
    } else {
      videoBg.src = "videos/sunny.mp4";
    }

    videoBg.play().catch(() => {});
  }

  //    Fetch Api Function
  async function fetchWeather(city) {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=b237dfc7533247e784c180834260906&q=${city}`,
    );

    const data = await response.json();
    // console.log(data);

    cityName.innerText = data.location.name;
    countryOrRegion.innerText = `${data.location.region}, ${data.location.country}`;

    temperature.innerText = data.current.temp_c + " °C";
    description.innerText = data.current.condition.text;

    humidity.innerText = data.current.humidity + "%";
    wind.innerText = data.current.wind_kph + " km/h";
    feelsLike.innerText = data.current.feelslike_c + " °C";

    weatherIcon.src = "https:" + data.current.condition.icon;

    changeVideo(data.current.condition.text);
  }

  // Search Btn Func
  searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city !== "") {
      fetchWeather(city);
    }
  });

  // Enter Key Func
  cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchBtn.click();
    }
  });

  fetchWeather("Karachi");
};
