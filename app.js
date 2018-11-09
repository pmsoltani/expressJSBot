const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const base = 'https://api.telegram.org/';
const apiKey = '731598493:AAEpxlZNudMFhGnoVi7BUH3qBj555jJlmAc';
const url = base + 'bot' + apiKey;

// routes
app.get('/', (req, res) => res.send('Homepage'));
app.get('/getupdates', (req, res) => {
    const optionsGet = {
        url: url + '/getUpdates',
        method: 'GET',
        qs: {
        }
    };
    request(optionsGet, (error, response, body) => {
        if (!error & response.statusCode == 200) {
            console.log('Success!');
            var result = JSON.parse(body).result;
            console.log(`Type of message is: ${Object.prototype.toString.call(result)}`);
            console.log(`The last item is:`);
            console.log(result[result.length - 1]);
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

app.get('/setwebhook', (req, res) => {
    const optionsGet = {
        url: url + '/setWebhook',
        method: 'GET',
        qs: {
            'url': 'https://expressjsbot.herokuapp.com/webhook/1E32FFAAE6B296AA'
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
app.get('/delwebhook', (req, res) => {
    const optionsGet = {
        url: url + '/deleteWebhook',
        method: 'GET',
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
    const optionsGet = {
        url: url + '/getWebhookInfo',
        method: 'GET',
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
app.post('/webhook/1E32FFAAE6B296AA', (req, res) => {
    const result = req.body;
    console.log('-/-/-/-/-/-/-/-/-/-/-');
    console.log(result);
    console.log('-/-/-/-/-/-/-/-/-/-/-');
    // const chatID = result.chat.id;
    // const message = result.text;
    // const optionsGet = {
    //     url: url + '/sendMessage',
    //     method: 'GET',
    //     qs: {
    //         'chat_id': chatID,
    //         'text': message
    //     }
    // };
    // request(optionsGet, (error, response, body) => {
    //     if (!error & response.statusCode == 200) {
    //         console.log('Success!');
    //         var result = JSON.parse(body);
    //         res.send(result);
    //     } else if (response.statusCode != 200) {
    //         console.log(`Status code: ${response.statusCode}`);
    //         res.send('Failed :( - ${response.statusCode}');
    //     } else {
    //         console.log(`Error code: ${error.statusCode}`);
    //         res.send('Failed :( - ${error.statusCode}');
    //     }
    // });
});

// server
const serverIP = process.env.IP;
const serverPORT = process.env.PORT || 8000;
app.listen(serverPORT, serverIP, () => console.log(`Server is Running on ${serverPORT}`));