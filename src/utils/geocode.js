const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + 
    address+ ".json?access_token=pk.eyJ1IjoiZnJvc3Rnb2QiLCJhIjoiY2t6NDl1cGU5MDZiMTJ2bXQ5cDRoMGQ1ZyJ9.BK3p31KxIFHWDlA9y9ZZ6w&limit=1";
    request({ url: url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services', undefined);
        }else if(body.features.length === 0){
            callback('Unable to find location, try another search', undefined);
        }else{
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const location = body.features[0].place_name;
            callback(undefined, {
                latitude: latitude,
                longitude : longitude,
                location: location,
                name: "divesh"
            });
        }
    });
};

module.exports = geocode;