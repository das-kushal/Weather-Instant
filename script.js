'use strict';
var arr = [];
let weather = {
    apiKey: 'b9ff08adbe6f21750ddca7d892169d2a',
    fetchWeather: function (city) {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data))
    },
    displayWeather: function (data) {
        const { name } = data;
        const { temp, humidity } = data.main;
        const { icon, description } = data.weather[0];
        const { speed } = data.wind;
        if (description.includes('clear'))
            document.body.style.backgroundImage = 'url(./sun.jpg)';
        else if (description.includes('rain'))
            document.body.style.backgroundImage = 'url(./rain.jpg)';
        else if (description.includes('clouds'))
            document.body.style.backgroundImage = 'url(./clouds.avif)';
        else if (description.includes('haze')) { document.body.style.backgroundImage = 'url(./haze.avif)'; document.querySelector('.card').style.background = 'rgba(120, 120, 120, .2)' }
        else {
            document.querySelector('.card').style.background = 'rgba(120, 120, 120, .1)'
        }
        document.querySelector('.city').innerText = 'Weather in ' + name;
        document.querySelector('.temp').innerText = temp + ' °C';
        document.querySelector('.description').innerText = description;
        document.querySelector('.humidity').innerText = 'Humidity: ' + humidity + '%';
        document.querySelector('.wind').innerText = 'Wind Speed: ' + speed + ' km/hr';
        document.querySelector('.icon').src = 'https://openweathermap.org/img/wn/' + icon + '.png';
        document.querySelector('.weather').classList.remove('loader');
    },
    search: function () {

        this.fetchWeather(document.querySelector('.search-bar').value.toLowerCase());
        arr.push(document.querySelector('.search-bar').value.toLowerCase());
        if (arr.length > 5) arr.shift();
    }
};

document.querySelector('.search-btn').addEventListener('click', function () {
    weather.search();
});

document.querySelector('.search-bar').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') // to capture the enter key 
        weather.search();
});

weather.fetchWeather('Durgapur');