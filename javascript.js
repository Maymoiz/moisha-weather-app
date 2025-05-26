function updateWeather(response) {
    let temperature = document.querySelector("#app-temp");
    console.log(response.data);
    temperature.innerHTML = Math.round(response.data.temperature.current);
let icon =document.querySelector("#icon");
icon.innerHTML = `<img class="temp-icon"
        src="${response.data.condition.icon_url}" alt="${response.data.condition.description}" width="60" />`;

let city = document.querySelector("#app-city");
    console.log(response.data);
    let description = document.querySelector("#description");
    description.innerHTML = response.data.condition.description;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${Math.round(response.data.temperature.humidity)} %`;
    let wind = document.querySelector("#wind");
    wind.innerHTML = `${Math.round(response.data.wind.speed)}km/hr`;
    let dateElement = document.querySelector("#time");
    let dateInMilliseconds = response.data.time * 1000;
    dateElement.innerHTML = formatDate(dateInMilliseconds);
    getForecast(response.data.city);
    
}
function formatDate(date) {
    date = new Date(date);
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
return` ${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    const apiKey = "6b0de8c4f230fd2bf4t68daf5046oe9a";
    const apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
    console.log(apiUrl);

    axios.get(apiUrl)
        .then(updateWeather)
        .catch(error => console.error('Error fetching weather data:', error));
}
    

function searchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    let h1 = document.querySelector("#weather-city");
    h1.innerHTML = searchInput.value; 
    searchCity(searchInput.value); 
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; 
    return days[day];
}

function getForecast(city){
    let forecastApiKey = "6b0de8c4f230fd2bf4t68daf5046oe9a";
    let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${forecastApiKey}&unit=metric`;
console.log(forecastApiUrl);

axios.get(forecastApiUrl)
    .then(displayForecast)
    .catch(error => console.error('Error fetching forecast data:', error));
}

function displayForecast(response) {
    console.log(response.data);

let forecastHTML = "";

response.data.daily.forEach(function(day , index) {
    if (index < 5){
        forecastHTML = forecastHTML + 
           `<div>
                <span class="fore-day">${formatDay(day.time)}</span> <br> 
                <span>
                <img class="fore-icon"
                 src="${day.condition.icon_url}"/>
                </span><br> 
                <span class="fore-temp">
                    <span><b>${Math.round(day.temperature.maximum)}°</b></span>
                    <span>${Math.round(day.temperature.minimum)}°</span>
                </span>
            </div>`
        }
    });

    let forecast = document.querySelector("#forecast");
    forecast.innerHTML = forecastHTML;
}

        
searchCity("Pretoria");
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit); 
