let temperature;
const fetchData = async () => {
    try {
        const response = await window.api.get('https://api.open-meteo.com/v1/forecast?latitude=36.9741&longitude=-122.0308&current=temperature_2m,is_day,weather_code&temperature_unit=fahrenheit');
        temperature = response.current.temperature_2m;
        const isDay = response.current.is_day;
        const weatherCode = response.current.weather_code;

        const temperatureElements = document.getElementsByClassName('temperature');
        
        for (const element of temperatureElements) {
            element.textContent = `${temperature.toFixed(0)}`;
        }
        changeBackground(isDay);
        changeHead(weatherCode);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
fetchData();

function changeTemp(unit) {
    const temperatureElements = document.getElementsByClassName('temperature');
    let newTemp;

    if (unit === "°F") {
        newTemp = temperature;
    } else {
        newTemp = (temperature - 32) * (5/9);
    }

    for (const element of temperatureElements) {
        element.textContent = `${newTemp.toFixed(0)}`;
    }
}

function changeUnits() {
    console.log("urmom");
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
    const faceImage = document.getElementById("face");

    const mortyCodes = [0, 1, 2, 3, 45, 48];

    if (mortyCodes.includes(weatherCode)) {
        faceImage.src = "assets/morty.png";
    } else {
        faceImage.src = "assets/rick.png";
    }
}

