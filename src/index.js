const express = require('express')
const path = require('path')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')

const db = require('./config/db')
const newRoute = require('./routes/news.js')
const homeRoute = require('./routes/home.js')
const courseRoute = require('./routes/courses.js')
const meRoute = require('./routes/me.js')
const sortMiddleware = require('./app/middleware/sortMiddleware')
const app = express()
const port = 3000

// connect db
db.connect()

// Use static folder
app.use(express.static(path.join(__dirname, 'public')))


app.use(express.urlencoded({
    extended: true,
}))

//HTTP logger
app.use(morgan('combined'))
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// custorm middeware
app.use(sortMiddleware)

//Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {

                const sortType = field === sort.column ? sort.type  : 'default'
                const icons = {
                    default: 'bi bi-arrow-down-up',
                    desc: 'bi bi-arrow-up',
                    asc: 'bi bi-arrow-down'
                }

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'

                }

                const icon = icons[sortType]
                const type = types[sort.type]
                return `
                <a href="?_sort&column=${field}&type=${type}">
                <i class="${icon}"></i>
                 </a>
                `
            },
        },
    }),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

app.use(express.json())

app.use(homeRoute)
app.use(newRoute)
app.use('/me', meRoute)
app.use('/courses',courseRoute)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})