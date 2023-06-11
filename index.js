// Select the required elements from the webpage
const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const searchInput = document.querySelector(".search-box input");

// Add an event listener to the search button
search.addEventListener("click", searchWeather);
  // Define the API key and city name from the search input
  searchInput.addEventListener("keyup", function(event){
    if(event.key ==="Enter"){
      searchWeather();
    }
  });

function searchWeather(){
  const APIKey = "df4a073f388555fb425612942f197a44";
  const city = searchInput.value;

  // If the search input is empty, exit the function
  if (city === "") return;

  // Fetch the weather data from the API and parse the response as JSON
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      // If the city is not found, display a 404 error message
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      // Otherwise, hide the error message and display the weather data
      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      // Select the weather data elements from the webpage
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      // Set the weather image based on the weather condition
      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;
        case "Rain":
          image.src = "images/rain.png";
          break;
        case "Snow":
          image.src = "images/snow.png";
          break;
        case "Clouds":
          image.src = "images/cloud.png";
          break;
        case "Haze":
          image.src = "images/mist.png";
          break;
        default:
          image.src = "";
      }

      // Set the weather data elements based on the API response
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      // Display the weather data with a fade-in animation
      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
}
