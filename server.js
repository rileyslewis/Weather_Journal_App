// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

const port = 3000;
// Setup Server
const server = app.listen(port, listening);
  function listening(){
    console.log(`Running Weather Journal App on localhost: ${port}`);
};


// GET route
app.get('/all', sendData);

function sendData (request, response) {
  console.log("sendData called")
  response.send(projectData);
};


app.post('/addWeather', addWeather);

function addWeather (request, response){
    const body = request.body;
    projectData.temperature = body.temperature;
    projectData.date = body.date;
    projectData.userResponse = body.userResponse;
    
}