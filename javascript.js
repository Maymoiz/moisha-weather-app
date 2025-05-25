function searchSubmit(event){
    event.preventDefault();
let searchInput = document.querySelector("#search-input");
let h1 = document.querySelector("#weather-city");
h1.innerHTML = searchInput.value;

}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);