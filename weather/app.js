
const yargs = require('yargs');
const apis = require('./apis/apis');

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

apis.geocodeAddress(argv.address, (errorMessage, geoResults) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(geoResults.address);
        apis.getWeather(geoResults.latitude, geoResults.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
            }
        });
    }
});

// https://api.darksky.net/forecast/de5594390086dd45ea9b2fcc879b7a0e/