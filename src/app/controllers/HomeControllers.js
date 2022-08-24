const course = require('../models/course.js')
const Course = require('../models/course.js')

const { mutipleMongooseToObject } = require('../../util/mongoose.js')

class HomeControllers {
    home(req, res, next) {
        Course.find({})
        .then(courses => 
            res.render('home', { courses: mutipleMongooseToObject(courses) })
        )
        .catch(next)
    }

    search(req, res) {
        res.render('search')
    }
}

module.exports = new HomeControllers;