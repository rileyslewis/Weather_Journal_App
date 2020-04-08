const projectData = {};

const express = require('express');

const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.use(express.static('website'));

const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);
 function listening(){
    console.log(`Running Weather Journal App on localhost: ${port}`);
  };


// GET Route
app.get('/all', sendData);

function sendData (request, response) {
  response.send(projectData);
};

// Post Route
app.post('/addWeather', addWeather);

function addWeather (request, response){
    const body = request.body;
    projectData.temperature = body.temperature;
    projectData.date = body.date;
    projectData.userResponse = body.userResponse;
    console.log(projectData);
    // Check data
};