/*Global Variables*/
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=7b9bf49e1531f81b6aee17cd9f06f9a2';

let d = new Date();
let newDate = d.getMonth() + 1 + '.'+ d.getDate() + '.' + d.getFullYear();


document.getElementById('generate').addEventListener('click', performAction);


function performAction(e){
    const generateZipCode = document.getElementById('zip').value;
    getData(baseURL + generateZipCode + '&units=metric' + apiKey)
    .then(
        function(weather) {
            const feelings = document.getElementById('feelings').value;
            return postData('/addWeather', {temperature: weather.main.temp, date: newDate, userResponse: feelings})
        }
    )
    .then(
        function(postData) {
            return getData('/all')
        }
    )
    .then(
        function(getRData) {
            document.getElementById('date').innerHTML = `Date: ${getRData.date}`;
            document.getElementById('temp').innerHTML = `Temperature: ${getRData.temperature}C`;
            document.getElementById('content').innerHTML = `Feeling Today: "${getRData.userResponse}"`;
        }
    )
}

// POST
const postData = async (url = '', data = {})=>{

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
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

// GET
const getData = async (url = '')=>{
    const response = await fetch(url);

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error", error);
    }
};