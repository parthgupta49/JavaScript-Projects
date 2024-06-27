const API_KEY = "9b0db5c02a6bea1fafc467bc6973a7d7";
let mydata;


async function getWeather() {
    errorContainer.classList.remove('active');
    let city = inputBox.value;
    inputBox.value = "";
    // let city = "Bangalore";
    console.log("getting");
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );
        console.log(response);
        if (response.status === 200){
            console.log("hello")
            const data = await response.json();
            data.main.temp = kelvinToCelcius(data.main.temp);
            showWeather(data);
            console.log(kelvinToCelcius(data.main.temp) + "C");
        }
        else{
            return "ERROR"
        }
    } catch (error) {

    }
}
function kelvinToCelcius(kelvin) {
    return (kelvin - 273.15).toFixed(2);
}

function showWeather(weatherData) {
    if (!weatherData) {
        return;
    }
    mydata = weatherData;
    cityName.innerText = weatherData.name;
    cityTemp.innerText = `${weatherData.main.temp} °C`;
    console.log(weatherData.weather[0].main);
    weatherStatus.textContent = weatherData.weather[0].main;

    clouds.textContent = weatherData.clouds.all + "%";
    windSpeed.textContent = weatherData.wind.speed + "m/s";
    humidity.textContent = weatherData.main.humidity + "%";

    countryIcon.src = `https://flagcdn.com/144x108/${weatherData?.sys?.country.toLowerCase()}.png`
    console.log("trying to put the icon")
    weatherIcon.src = `https://openweathermap.org/img/w/${weatherData?.weather?.[0]?.icon}.png`;
    console.log(weatherIcon.src)
}
const errorContainer = document.querySelector('.error');

const inputBox = document.querySelector("[data-inputBox]");
const searchIcon = document.querySelector("[data-searchIcon]");
const cityData = document.querySelector("#cityResults");
const cityName = document.querySelector("[data-cityName]");
const cityTemp = document.querySelector("[data-cityTemp]");
const weatherStatus = document.querySelector("[data-weatherStatus]");
const countryIcon = document.querySelector("[data-countryIcon]");

const weatherIcon = document.querySelector('[data-weatherIcon]');
const windSpeed = document.querySelector("[data-windSpeed]");
const humidity = document.querySelector("[data-humidity]");
const clouds = document.querySelector("[data-clouds]");

// const searchTab = document.querySelector('[data-searchTab]');
const searchWeatherContainer = document.querySelector(
    "[data-searchWeatherContainer]"
);

const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeatherButton]");
const grantLocationContainer = document.querySelector(
    "[data-grantLocationContainer]"
);

const loader = document.querySelector("[data-loader]");
const userInfoContainer = document.querySelector("[data-userInfoContainer]");
const grantLocationButton = document.querySelector(
    "[data-grantLocationButton]"
);

let currentTab = userTab;
currentTab.classList.add("current-tab");

userTab.addEventListener("click", () => {
    handleTabs(userTab);
});
getFromSessionStorage();

searchTab.addEventListener("click", makeSearchWeatherVisible);

function makeSearchWeatherVisible() {
    handleTabs(searchTab);
    // searchWeatherContainer.classList.add('active');
}

function handleTabs(clickedTab) {
    if (clickedTab !== currentTab) {
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

        // we know that the user has pressed on a different tab
        // but we dont know which he has pressed on, in order to know that we gotta check if the search container active class is there or not

        if (!searchWeatherContainer.classList.contains("active")) {
            // this means that we need to do it visible
            searchWeatherContainer.classList.add("active");
            loader.classList.remove('active');
            grantLocationContainer.classList.remove("active");
            userInfoContainer.classList.remove("active");
        } else {
            // we were previously on searchWeather container now we need to switch to the other tab
            // that is your weather tab
            searchWeatherContainer.classList.remove("active");
            userInfoContainer.classList.remove("active");
            errorContainer.classList.remove('active');
            getFromSessionStorage();
        }
    }
}

function getFromSessionStorage() {
    let localCoordinates = sessionStorage?.getItem("co-ordinates");

    if (!localCoordinates) {
        grantLocationContainer.classList.add("active");
    } else {
        loader.classList.add("active");
        fetchUserWeatherDetailsOfCoordinates(JSON.parse(localCoordinates));
    }
}

grantLocationButton.addEventListener("click", getLocation);

function getLocation() {
    // this will return user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("fetching location is not possible");
    }
}
function showPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    console.log("heelp");
    console.log(long);
    console.log(lat);
    let coordinates = {
        lon: long,
        lat: lat,
    };
    sessionStorage.setItem("co-ordinates", JSON.stringify(coordinates));
    grantLocationContainer.classList.remove("active");
    loader.classList.add('active');
    fetchUserWeatherDetailsOfCoordinates(coordinates);
}

async function fetchUserWeatherDetailsOfCoordinates(coordinates) {
    let { lon, lat } = coordinates;
    console.log("latitude : ", lat);
    console.log("longitude : ", lon);
    try {
        // api call based on coordinates
        console.log("fetching user details");
        let response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        let results = await response.json();
        console.log(response);
        
        loader.classList.remove("active");
        userInfoContainer.classList.add("active");
        console.log(results);
        showWeather(results);

    } catch (error) {
        console.log("error is : ");
    }
}
let myForm = document.getElementById("form-data");

myForm.addEventListener("submit", async (event) => {
    if (inputBox.value) {
        event.preventDefault();
        userInfoContainer.classList.remove('active');
        loader.classList.add("active");
        try {
            if(await getWeather() !== 'ERROR'){
                loader.classList.remove("active");
                userInfoContainer.classList.add("active");
                
            }
            else{
                console.log("caused error");
                loader.classList.remove('active');
                errorContainer.classList.add('active');
            }
        } catch (error) { 
            console.log("Form was not submitted")
        }

        // makeCityDataVisible();
    } else {
        alert("Enter a city");
        return;
    }
});

//
