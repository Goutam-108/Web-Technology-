const apiKey = "8f61a2a6ae2d94467f8000e3cde72e65";

const result = document.getElementById("weatherResult");
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
    getWeather(cityInput.value);
});


cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        getWeather(cityInput.value);
    }
});

async function getWeather(city) {
    const cityName = city.trim();

    if (!cityName) {
        result.innerHTML = `<p class="msg">⚠️ Enter city name</p>`;
        return;
    }

    result.innerHTML = `<div class="spinner"></div>`;

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;

        const res = await fetch(url);

        if (!res.ok) {
            if (res.status === 404) throw new Error("City not found");
            if (res.status === 401) throw new Error("Invalid API Key");
            throw new Error("Error fetching data");
        }

        const data = await res.json();

        const icon = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        result.innerHTML = `
            <img src="${iconUrl}" class="weather-icon">
            <h2>${data.name}</h2>
            <h1>${Math.round(data.main.temp)}°C</h1>
            <p>${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind: ${(data.wind.speed * 3.6).toFixed(1)} km/h</p>
        `;

    } catch (err) {
        result.innerHTML = `<p class="msg">${err.message}</p>`;
    }
}

// Default city
window.onload = () => {
    getWeather("Mumbai");
};