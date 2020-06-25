/*
function showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    alert("Latitude : " + latitude + " Longitude: " + longitude);
}

function errorHandler(err) {
    if (err.code == 1) {
        alert("Error: Access is denied!");
    } else if (err.code == 2) {
        alert("Error: Position is unavailable!");
    }
}

function getLocation() {

    if (navigator.geolocation) {

        // timeout at 60000 milliseconds (60 seconds)
        var options = { timeout: 60000 };
        navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
    } else {
        alert("Sorry, browser does not support geolocation!");
    }
}
*/

let x, y;

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

const gps = document.querySelector('.gpsLogo');
const gpsResult = document.querySelector('.gpsResult');

gps.addEventListener('click', () => {
    gpsResult.textContent = `${x} | ${y}`;
})


// GEO WEATHER


/*


window.addEventListener('load', fetchAsyncGeolocation);


async function fetchAsyncGeolocation() {

    let response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=Xfk6kke6UgbtR0rNAtzboGUKGQhFZkIr&q=${x}%2C${y}`);
    let data = await response.json();

    console.log(data.Key + ' TO JEST KOD MIASTA');

    city.textContent = data.EnglishName;
    country.textContent = data.Country.LocalizedName;
    locationCityCode = data.Key;

    fetchWeather();


}





*
/