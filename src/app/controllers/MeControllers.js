const course = require('../models/course.js')
const Course = require('../models/course.js')

const { mutipleMongooseToObject } = require('../../util/mongoose.js')
class MeControllers {
    storedCourses(req, res, next) {
        Course.find({})
        .then((courses) => res.render('me/stored-courses', {
            courses: mutipleMongooseToObject(courses)
        })
        )
        .catch(next)
        
    }

}

module.exports = new MeControllers;