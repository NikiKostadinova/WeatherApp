const apiKeyWeather = "90809f09fdfe9032b75c0a3f85ed0b77";
const apiUrlWeather = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


const searchForm = document.getElementById("search-form");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const card = document.querySelector(".card");

let localTime = 0;

async function checkWeather(city) {
    const response = await fetch(apiUrlWeather + city + `&appid=${apiKeyWeather}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";


        const timeZone = data.timezone;
        const nowInLocalTime = Date.now()  + 1000 * timeZone;
        const time = new Date(nowInLocalTime).toISOString().slice(11, 19);
        const timeArr = time.split(":");
        localTime = timeArr[0];
      
    }

}

let keyWordImage = "";
let page = 1;

const apiKeyImage = "J93NRAuhsVT4LLk2bwVmMkx5SbMknue1VakEfEQYsn0";
const apiUrlImage = `https://api.unsplash.com/search/photos?page=${page}&query=${keyWordImage}`;


async function searchImage() {   

    keyWordImage = searchBox.value;
    
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyWordImage}&client_id=${apiKeyImage}`;  
    const response = await fetch(url);
    const data = await response.json();    
    const results = data.results;
    const image = results[0].urls.full;

    if(localTime >= 6 && localTime <= 18){    
                  
        document.body.style.backgroundImage = `url(${image})`;
    }else{
        document.body.style.backgroundImage = "url(/images/pxfuel.jpg)";
    }
    searchBox.value = "";


}


searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    checkWeather(searchBox.value)
        .then(() => {
            searchImage();
        })
        .catch((error) => {
            console.error("Error checking weather:", error);
        });

    page = 1;
});