/*Global Variables*/
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=7b9bf49e1531f81b6aee17cd9f06f9a2';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
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
    weatherData (baseURL, generateZip, apiKey)
        .then( (data) => {
            postData('/addWeather', {date: newDate, temperature: data.main.temp, feelings: feelings});
        })
        .then(updateUI)
}

const weatherData = async (baseURL,generateZip,apiKey) => {
    const response = await fetch (baseURL + generateZip + '&units=metric' + apiKey)
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
}


const updateUI = async() => {
    const request = await fetch ('/all');
    try {
      const uiData = await request.json();
      document.getElementById('date').innerHTML = `Date: ${uiData.addInput.newDate}`;
      document.getElementById('temp').innerHTML = `Temperature: ${uiData.addInput.temperature}`;
      document.getElementById('content').innerHTML = `Feeling today: ${uiData.addInput.feelings}`;
    }catch (error) {
      console.log('error', error)
    }
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
    } catch (error) {
        console.log("error", error);
    }
};




