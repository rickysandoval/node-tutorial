
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            alias: 'address',
            demand: true,
            desceribe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

let ancodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${ancodedAddress}&key=AIzaSyDFT8qjPLvqOc_79YXTEU-t80otmYggKmc`;

axios.get(geocodeUrl).then(response => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    }
    console.log(response.data.results[0].formatted_address);

    let lat = response.data.results[0].geometry.location.lat,
        lng = response.data.results[0].geometry.location.lng;
    let forecastUrl = `https://api.darksky.net/forecast/de5594390086dd45ea9b2fcc879b7a0e/${lat},${lng}`

    return axios.get(forecastUrl);
}).then(response => {
    let temperature = response.data.currently.temperature;
    let apparentTemperature = response.data.currently.apparentTemperature;
    
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch(e => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message);
    }
});
