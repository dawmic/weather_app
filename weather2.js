const API_KEY = 'Xfk6kke6UgbtR0rNAtzboGUKGQhFZkIr';
const input_data = document.querySelector('input');
let locationCityCode, locationCityName, iconNumber, weatherDescription, x, y, resultTemp;
const button = document.querySelector('button');
const temperature = document.querySelector('.temperature');
const city = document.querySelector('.city');
const input = document.querySelector('input');
const country = document.querySelector('.country');
const icon = document.querySelector('.icon');
const description = document.querySelector('.description');
const gpsLogo = document.querySelector('.gpsLogo');
const searchBtn = document.querySelector('.search');

input.addEventListener('input', () => {

    locationCityName = input_data.value;
    console.log(locationCityName);
});

async function fetchLocation() {
    try {
        let response = await fetch("http://dataservice.accuweather.com/locations/v1/cities/search?apikey=Xfk6kke6UgbtR0rNAtzboGUKGQhFZkIr&q=" + locationCityName);
        let data = await response.json();
        const [weather, ...other] = data;
        //console.log(weather.Key);
        console.log(data);
        city.textContent = weather.EnglishName;
        country.textContent = weather.Country.LocalizedName;
        locationCityCode = weather.Key;
        fetchWeather();
    } catch (error) {
        console.error(error);
        city.textContent = 'no city name provided';

    }




}

async function fetchWeather() {
    try {
        let response = await fetch(`http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${locationCityCode}?apikey=Xfk6kke6UgbtR0rNAtzboGUKGQhFZkIr`);
        let data = await response.json();
        const [weather, ...other] = data;
        //console.log(data);
        resultTemp = Math.round((weather.Temperature.Value - 32) * 5 / 9);
        console.log(resultTemp);
        iconNumber = weather.WeatherIcon;
        temperature.textContent = resultTemp + ' ° C';
        icon.setAttribute('src', `icons/${iconNumber}.png`);
        description.textContent = weather.IconPhrase + ' | Precipitation ' + weather.PrecipitationProbability + '%';
    } catch (error) {
        console.error(error);
    }

}
searchBtn.addEventListener('click', fetchLocation);
input.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        fetchLocation();
    }
});
// Geolocation

function success(pos) {
    var crd = pos.coords;
    x = crd.latitude;
    y = crd.longitude;
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error);
//////////// end

async function fetchAsyncGeolocation() {
    try {
        let response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=Xfk6kke6UgbtR0rNAtzboGUKGQhFZkIr&q=${x}%2C${y}`);
        let data = await response.json();
        city.textContent = data.EnglishName;
        country.textContent = data.Country.LocalizedName;
        locationCityCode = data.Key;
        input.value = '';

        fetchWeather();
    } catch (err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        temperature.textContent = 'Geolocation did not get data';
    }

}

gpsLogo.addEventListener('click', fetchAsyncGeolocation);

temperature.addEventListener('click', () => {
    if (temperature.textContent.includes('C'))
        temperature.textContent = Math.round(resultTemp * 1.8 + 32) + '° F';
    else {
        temperature.textContent = resultTemp + '° C';
    }
});