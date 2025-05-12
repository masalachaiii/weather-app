const fetchData = async () => {
    try {
      const response = await window.api.get('https://api.open-meteo.com/v1/forecast?latitude=36.9741&longitude=-122.0308&current=temperature_2m,is_day,weather_code&temperature_unit=fahrenheit');
      console.log(response);
      const temperature = response.current.temperature_2m;
      console.log(temperature)
      const temperatureElement = document.getElementById("temperature");
      temperatureElement.textContent = `${temperature}`;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchData();

function changeTemp() {
    
}

function changeUnits() {
    const unit = document.getElementById("units").textContent;

    if (unit == "°F") {
        console.log("urmom")
        document.getElementById("units").textContent = "°C";
    } else {
        document.getElementById("units").textContent = "°F";
    }
}