const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cookieParser = require('cookie-parser')

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
const questsRouter = require('./routers/questRouter')
const statsSystemRouter = require('./routers/statsSystemRouter')
const skillsRouter = require('./routers/skillsRouter')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup public static directory to serve

app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(cookieParser())

app.use(userRouter)
app.use(questsRouter)
app.use(skillsRouter)
app.use(statsSystemRouter)
app.use(pagesRouter)




app.listen(port, () => {
    console.log('Server is up on port ' + port)
})