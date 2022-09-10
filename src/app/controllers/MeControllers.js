const course = require('../models/course.js')
const Course = require('../models/course.js')

const { mutipleMongooseToObject } = require('../../util/mongoose.js')
class MeControllers {
    storedCourses(req, res, next) {

        Promise.all([Course.find({}), Course.countDocumentsDeleted({})])
        .then(([courses, deleteCount]) => res.render('me/stored-courses', {
            deleteCount,
            courses: mutipleMongooseToObject(courses)
        })
        )
        .catch(next)
       
    }

    trashCourses(req, res, next) {
        Course.findDeleted({})
        .then((courses) => res.render('me/trash-courses', {
            courses: mutipleMongooseToObject(courses)
        })
        )
        .catch(next)
    }

}

module.exports = new MeControllers;