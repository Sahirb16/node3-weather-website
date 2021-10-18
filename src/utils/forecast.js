const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b773867be82bc84a197c0814db40fa1b&query=${latitude},${longitude}&units=m`
    request({ url, json: true }, (error,  {body}) => {
        
        if (error) {
            callback('Unable to connect to weather service.',undefined);

        } else if (body.error) {
            callback('Unable to find location!',undefined);


        } else {
            const temperature = body.current.temperature;
            const feelsLike = body.current.feelslike;

            callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelsLike + ' degrees.');
        }
    })




}

module.exports = forecast