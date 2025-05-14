const fetchData = async () => {
    try {
        const response = await window.api.get('https://api.open-meteo.com/v1/forecast?latitude=36.9741&longitude=-122.0308&current=temperature_2m,is_day,weather_code&temperature_unit=fahrenheit');
        const temperature = response.current.temperature_2m;
        const isDay = response.current.is_day;
        const weatherCode = response.current.weather_code;

        const temperatureElement = document.getElementById("temperature");
        temperatureElement.textContent = `${temperature.toFixed(0)}`;

        changeBackground(isDay);
        changeHead(weatherCode);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
fetchData();

function changeTemp(unit) {
    let temp = document.getElementById("temperature").textContent;

    temp = parseFloat(temp);

    if (unit === "°F") {
        const fahrenheit = (temp * 9/5) + 32;
        document.getElementById("temperature").textContent = fahrenheit.toFixed(0);
    } else {
        const celsius = (temp - 32) * (5/9);
        document.getElementById("temperature").textContent = celsius.toFixed(0);
    }
}

function changeUnits() {
    const unit = document.getElementById("units").textContent;

    if (unit === "°F") {
        document.getElementById("units").textContent = "°C";
        changeTemp("°C");
    } else {
        document.getElementById("units").textContent = "°F";
        changeTemp("°F");
    }
}

function changeBackground(isDay) {
    if (isDay === 1) {
        document.body.style.backgroundImage = "url('assets/morning-background.png')"
    } else {
        document.body.style.backgroundImage = "url('assets/night-background.png')"
    }

    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
}

function changeHead(weatherCode) {
    if (weatherCode === (0 || 1 || 2 || 3 || 45 || 48)) {
        document.getElementsByClassName("face").backgroundImage = "url('assets/morty.png')"
    } else {
        document.getElementsByClassName("face").backgroundImage = "url('assets/rick.png')"
    }
} 
