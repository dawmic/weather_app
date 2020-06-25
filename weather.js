const API_KEY = 'Xfk6kke6UgbtR0rNAtzboGUKGQhFZkIr';
let input_data = document.querySelector('input');
let locationCityCode;
let locationCityName;

const button = document.querySelector('button');
const temperature = document.querySelector('.temperature');

function getWeather() {
    fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationCityCode}?apikey=Xfk6kke6UgbtR0rNAtzboGUKGQhFZkIr`)
        .then(response => response.json())
        .then(data => {
            console.log(data.DailyForecasts[0].Temperature.Maximum.Value);


            let wynik = data.DailyForecasts[0].Temperature.Maximum.Value;
            temperature.textContent = Math.round((data.DailyForecasts[0].Temperature.Minimum.Value - 32) * 5 / 9) + ' stopni';


        })
}

button.addEventListener('click', getWeather);


let lokalizacja = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=Xfk6kke6UgbtR0rNAtzboGUKGQhFZkIr&q=${locationCityName}&alias=Wojew%C3%B3dztwo`;
fetch(lokalizacja)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        console.log(data[0].LocalizedName);
        console.log(data[0].Key);


    });

let test = document.querySelector('.test');
test.addEventListener('click', () => {
    console.log(input_data.value);
    locationCityName = input_data.value;
});



async function fetchAsync() {

    let response = await fetch('http://dataservice.accuweather.com/locations/v1/cities/search?apikey=Xfk6kke6UgbtR0rNAtzboGUKGQhFZkIr&q=lubaczów');
    let data = await response.json();

    console.log(data[0].Key);
    console.log(data);
}