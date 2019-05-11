const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('/index', (req, res) => {
    res.render('index', {
        
    })
})

app.get('home', (req, res) => {
    res.render('dashboard', {
        username:'Maplenix',
        sidebar1:'active'
    })
})


app.get('*', (req, res) => {
    res.render('dashboard', {
        username:'Maplenix',
        sidebar1:'active'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})