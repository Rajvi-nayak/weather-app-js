document.addEventListener('DOMContentLoaded', function () {
    const getWeatherBtn = document.getElementById('getWeather');
    const cityInput = document.getElementById('city');
    const weatherResult = document.getElementById('weatherResult');

    getWeatherBtn.addEventListener('click', function () {
        const city = cityInput.value.trim();

        if (city !== "") {
            fetch(`https://wttr.in/${city}?format=%C+%t+%h+%w+%P`)  // api call
                .then(response => {
                    if (!response.ok) {
                        throw new Error("City not found");
                    }
                    return response.text();
                })
                .then(data => {
                    const weatherDetails = data.split(' ');

                    // Update HTML content
                    document.getElementById('cityName').textContent = city;
                    document.getElementById('weatherCondition').textContent = 'Condition: ' + weatherDetails[0];
                    document.getElementById('temperature').textContent = 'Temperature: ' + weatherDetails[1];
                    document.getElementById('humidity').textContent = 'Humidity: ' + weatherDetails[2];
                    document.getElementById('windSpeed').textContent = 'Wind Speed: ' + weatherDetails[3];
                    document.getElementById('pressure').textContent = 'Pressure: ' + weatherDetails[4];

                    // Show weather result
                    weatherResult.classList.remove('d-none');

                    // Clear input
                    cityInput.value = '';
                })
                .catch(error => {
                    alert(error.message);
                    weatherResult.classList.add('d-none');
                });
        } else {
            alert("Please enter a city name.");
        }
    });
});
