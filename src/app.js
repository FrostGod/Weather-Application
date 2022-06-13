const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const PublicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// handlebars config
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup public directory
app.use(express.static(PublicDirPath));

// does not reach
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Divesh'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        help_msg:"These are the help instructions" ,
        name: 'Divesh'
    });
});

app.get('/about', (req, res) => {
    // console.log('hello');
    res.render('about', {
        title: 'About',
        name: 'Divesh'
    });
});

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            err: "Please provide an address to get weather"
        });
    }
    const address = req.query.address;
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        console.log('Error', error);
        if(error){
            return res.send({
                err: error
            });
        }
        // console.log(data);
        forecast(latitude, longitude, (err, forecastdata) => {
            if(err){
                return res.send({
                    err: error
                });
            }
            res.send({
                address: address,
                location: location,
                forecast: forecastdata
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render("404", {
        error_msg: "Help article not found",
        title: '404',
        name: 'Divesh'
    });
});

app.get('*', (req, res) => {
    res.render("404", {
        error_msg: "Page not found",
        title: '404',
        name: 'Divesh'
    });
});

app.listen(3000, () => {
    console.log("server is up on port 3000");
});