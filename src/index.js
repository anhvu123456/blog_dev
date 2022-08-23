const express = require('express')
const path = require('path')
const morgan = require('morgan')
const handlebars = require('express-handlebars')

const newRoute = require('./routes/news.js')
const homeRoute = require('./routes/home.js')
const app = express()
const port = 3000

// Use static folder
app.use(express.static(path.join(__dirname, 'public')))


app.use(express.urlencoded({
    extended: true,
}))

//HTTP logger
app.use(morgan('combined'))

//Template engine
app.engine('hbs', handlebars.engine
    (
        {
            extname: '.hbs'
        }
    )
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

app.use(express.json())

app.use(homeRoute)
app.use(newRoute)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})