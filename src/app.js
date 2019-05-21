const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

//Databse Connection
require('./db/mongoose')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Routers
const pagesRouter = require('./routers/pagesRouter')
const userRouter = require('./routers/userRouter')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup public static directory to serve

app.use(cors())

app.use(express.static(publicDirectoryPath))

app.use(express.json())

const User = require('./models/user')

app.post('/users/register', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()        
        res.status(201).send({ user })
           
    } catch (e) {
        res.status(400).send(e)
    }

})

app.use(userRouter)
app.use(pagesRouter)



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})