const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine aand views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ujjwal Soni'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Ujjwal Soni'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Get Help',
        help_text: 'This is very helpful.',
        name: 'Ujjwal Soni'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {lat, long, place} = {}) => {
        
        if(error) {
            return res.send({
                error
            })
        }
        
        forecast(lat, long, (error, forecastdata) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastdata,
                location: place,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Ujjwal Soni',
        error: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Ujjwal Soni',
        error: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})