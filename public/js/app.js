console.log("clien side js");

// fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + 
// "Boston" + ".json?access_token=pk.eyJ1IjoiZnJvc3Rnb2QiLCJhIjoiY2t6NDl1cGU5MDZiMTJ2bXQ5cDRoMGQ1ZyJ9.BK3p31KxIFHWDlA9y9ZZ6w&limit=1").then(
//     (err, body) => {
//         if(err){
//             console.log("error is" + err);
//         }else{
//             const latitude = body.features[0].center[1];
//             const longitude = body.features[0].center[0];
//             const location = body.features[0].place_name;
//             fetch("http://api.weatherstack.com/current?access_key=9dcdd654b6a3c66bc3b3b0d8003f7ee8&query="+ 
//             latitude + ',' + longitude + "&units=m").then((err, body)=> {
//                 console.log(body.current.temperature);
//             });
//         }
//     }
// );



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    console.log(location);
    messageOne.textContent = "Loading...";

    fetch("http://localhost:3000/weather?address=" + location).then((response) => {
    response.json().then((data)=> {
        if(data.err){
            messageOne.textContent = data.err;
            messageTwo.textContent = '';
            console.log(data.err);
        }else{
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
            console.log(data.location);
            console.log(data.forecast);
        }
    })
});

});
