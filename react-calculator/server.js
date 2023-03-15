const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(express.json());

const port = process.env.FRONTEND_PORT || 8080;
const subtractServiceUrl = process.env.SUBSTRACT_SERVICE_URL || "http://127.0.0.1:7000";
const addServiceUrl = process.env.ADD_SERVICE_URL || "http://127.0.0.1:6000";
const muliplyServiceUrl = process.env.MULTIPLY_SERVICE_URL || "http://127.0.0.1:5000";
const divideServiceUrl = process.env.DIVIDE_SERVICE_URL || "http://127.0.0.1:4000";

/**
The following routes forward requests (using pipe) from our React client to our other services. 
*/

app.post('/calculate/add', async (req, res) => {
  try {
      const appResponse = await axios.post(`${addServiceUrl}/add`, req.body);

      // Return expected string result to client
      return res.send(`${appResponse.data}`); 
  } catch (err) {
      console.log(err);
  }
});

app.post('/calculate/subtract', async (req, res) => {
  try {
      console.log("subtract app** 1")
      const appResponse = await axios.post(`${subtractServiceUrl}/subtract`, req.body);
      console.log("subtract app** 2")
      // Return expected string result to client
      return res.send(`${appResponse.data}`); 
  } catch (err) {
      console.log(err);
  }
});

app.post('/calculate/multiply', async (req, res) => {
  try {
      const appResponse = await axios.post(`${muliplyServiceUrl}/multiply`, req.body);

      // Return expected string result to client
      return res.send(`${appResponse.data}`); 
  } catch (err) {
      console.log(err);
  }
});

app.post('/calculate/divide', async (req, res) => {
  try {
      const appResponse = await axios.post(`${divideServiceUrl}/divide`, req.body);

      // Return expected string result to client
      return res.send(`${appResponse.data}`); 
  } catch (err) {
      console.log(err);
  }
});

app.get('/state', async (req, res) => {
  // not implemented
});

app.post('/persist', async (req, res) => {
  // not implemented
});

// Serve static files
app.use(express.static(path.join(__dirname, 'client/build')));

// For default home request route to React client
app.get('/', async function (_req, res) {
  try {
    return await res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  } catch (err) {
    console.log(err);
  }
});

app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}!`));
