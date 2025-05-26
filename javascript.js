function updateWeather(response) {
    let temperature = document.querySelector("#app-temp");
    console.log(response.data);
    temperature.innerHTML = Math.round(response.data.temperature.current);
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

searchCity("Pretoria");
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit); 