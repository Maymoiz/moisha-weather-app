function updateWeather(response){
    let temperature = document.querySelector("#app-temp")
    temperature.innerHTML = Math.round(response.data.temperature.current);
    let city = document.querySelector("#app-city")
    city.innerHTML = response.data.city;

}

function searchCity(city){
    apiKey = "6b0de8c4f230fd2bf4t68daf5046oe9a";
    apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit="metric"`;
    axios.get(apiUrl).then(updateWeather)
}


function searchSubmit(event){
    event.preventDefault();
let searchInput = document.querySelector("#search-input");
let h1 = document.querySelector("#weather-city");
h1.innerHTML = searchInput.value;
searchCity(searchInput.value);

}
searchCity("Pretoria");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);
