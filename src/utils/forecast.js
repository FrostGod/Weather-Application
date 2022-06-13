const request = require('request');



const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=9dcdd654b6a3c66bc3b3b0d8003f7ee8&query="+ 
    latitude + ',' + longitude + "&units=m";
    request({ url: url, json: true }, (err, { body }) => {
    if(err){
        callback("Unable to connect", undefined);
    }else if(body.error){
        callback("Invalid latitude or longitude", undefined);
    }else{
        callback(undefined, "current temperature is " + body.current.temperature + " but  it feels like " + body.current.feelslike);
    }
    });
};

module.exports = forecast;