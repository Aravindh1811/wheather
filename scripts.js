const apiKey = '4a06f2448e69ad0400605687d1615cfa';  

// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData(city) {
const response = await
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
const data = await response.json();
return data;
}

// Function to extract required data from API response
function extractDataFromResponse(response) {
const labels = [];
const temperatures = [];

// Extracting data for the next 5 days

for (const forecast of response.list) {
labels.push(forecast.dt_txt);
temperatures.push(forecast.main.temp);
}

return { labels, temperatures };
}

// Function to render graph using Chart.js
function renderGraph(labels, temperatures) {
const ctx = document.getElementById('weatherChart').getContext('2d');
const weatherChart = new Chart(ctx, {
type: 'line',
data: {
labels: labels,
datasets: [{
label: 'Temperature ( C)',
data: temperatures,
backgroundColor: 'rgba(255, 99, 132, 0.2)',
borderColor: 'rgba(255, 99, 132, 1)',
borderWidth: 1
}]
},
options: {
scales: {

y: {
beginAtZero: true
}
}
}
});
}

// Event listener for form submission
document.getElementById('cityForm').addEventListener('submit', async function(event) {
event.preventDefault();
const city = document.getElementById('cityInput').value;
const weatherData = await fetchWeatherData(city);
const { labels, temperatures } = extractDataFromResponse(weatherData);
renderGraph(labels, temperatures);
});