const course = require('../models/course.js')
const Course = require('../models/course.js')

const { mutipleMongooseToObject } = require('../../util/mongoose.js')
class MeControllers {
    storedCourses(req, res, next) {

        let courseQuery = Course.find({})
        
        if(req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            })
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted({})])
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