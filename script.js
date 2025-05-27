const apikey='b85f3ee5bdc5dad45711fa73c4f36683';

function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    if(data.cod !==200){
        weatherDiv.innerHTML = `<p>Error: ${data.message}</p>`;
        return;
    }

    weatherDiv.innerHTML = `
        <h2>Weather in ${data.name}, ${data.sys.country}</h2>
        <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Feels Like: ${data.main.feels_like}°C</p>
        <p>Humidty: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function getWeatherByCity(){
    const city = document.getElementById('cityInput').value;
    if(!city){
        alert('Please Enter a city name.');
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(error => console.error('Error fetching weather data:', error));
}

function getWeatherByLocation() {
    if(!navigator.geolocation) {
        alert('Geolocation is not supported by your browser.');
        return; 
    }

    navigator.geolocation.getCurrentPosition(position => {
        const{ latitude, longitude } = position.coords;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));
    }, () => {
        alert('Unable to retrieve your location.');
    });
}