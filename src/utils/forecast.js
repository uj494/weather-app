const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7e0c13b23716480167211638a4ab0d04&query='+lat+','+long

    request({ url, json: true }, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect weather service!')
        } else if(body.error) {
            callback('Unable to find location!', undefined)
        }  else {
            callback(undefined, body.current.weather_descriptions[0] + ' in ' + body.location.name + '. It is currently ' + body.current.temperature + ' degrees' + ' out. It feels like  ' + body.current.feelslike + ' degrees' + ' out. Humidity is '+body.current.humidity+'%.')
        }
    })
}

module.exports = forecast