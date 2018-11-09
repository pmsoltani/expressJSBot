const express = require('express');
const request = require('request');
const app = express();

const base = 'https://api.telegram.org/';
const apiKey = '731598493:AAEpxlZNudMFhGnoVi7BUH3qBj555jJlmAc';
const url = base + 'bot' + apiKey;

// routes
app.get('/', (req, res) => {
    const optionsGet = {
        url: url + '/getUpdates',
        method: 'GET',
        qs: {
            // 'getUpdates': ''
        }
    };
    request(optionsGet, (error, response, body) => {
        if (!error & response.statusCode == 200) {
            console.log('Success!');
            var result = JSON.parse(body);
            res.send(result);
        } else if (response.statusCode != 200) {
            console.log(`Status code: ${response.statusCode}`);
            res.send('Failed :( - ${response.statusCode}');
        } else {
            console.log(`Error code: ${error.statusCode}`);
            res.send('Failed :( - ${error.statusCode}');
        }
    });
});

app.get('/webhook', (req, res) => {

});

// server
const serverIP = process.env.IP;// || 'localhost';
const serverPORT = process.env.PORT;// || 5000;
app.listen(serverPORT, serverIP);