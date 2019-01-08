const request = require('request');
const axios = require('axios');

let geocodeAddress = (address, callback) => {
    let ancodedAddress = encodeURIComponent(address);
    let apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${ancodedAddress}&key=AIzaSyDFT8qjPLvqOc_79YXTEU-t80otmYggKmc`;

    request({
        url: apiUrl,
        json: true
    }, (error, response, body) => {
        // console.log(JSON.stringify(body, undefined, 2));
        if (error) {
            // This error usually when something went wrong before request could be returned
            callback('Unable to connect to Google servers.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address.');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
}

let getWeather = (latitude, longitude, callback) => {
    let forecastUrl = `https://api.darksky.net/forecast/de5594390086dd45ea9b2fcc879b7a0e/${latitude},${longitude}`
    request({
        url: forecastUrl,
        json: true
    }, (error, response, body) => {
         if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch weather');
        }
    });
}

module.exports = {
    geocodeAddress,
    getWeather
}