/*Global Variables*/
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=89001&APPID=7b9bf49e1531f81b6aee17cd9f06f9a2';
let apiKey = '7b9bf49e1531f81b6aee17cd9f06f9a2'
const userFeelings = document.getElementById('feelings').value;

document.getElementById('generate').addEventListener('click', performAction);
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


function performAction(e){
    e.preventDefault();

    const generateZip = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;
    if (generateZip.length == 0) {
        alert('Zip Code is missing. Please try again.');
        return
    }
    if (userResponse.length == 0) {
        alert("Mental State, feelings is missing. Please try again.");
        return
    }
    getData(baseURL+generateZip+apiKey)
    .then(
        function(weather) {
            const feelings = document.getElementById('feelings').value;
            return postData('/addWeather', {temperature: weather.main.temp, date: newDate, userResponse: feelings})
        }
    )
    .then(
        function(post) {
            return getData('/all')
        }
    )
    .then(
        function(get) {
            document.getElementById('date').innerHTML = get.date;
            document.getElementById('temp').innerHTML = get.temperature;
            document.getElementById('content').innerHTML = get.userResponse;
        }
    )
}


const postData = async (url = '', data = {}) => {
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error", error);
    }
};


const getData = async (url = '') => {

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error", error);
    }
};