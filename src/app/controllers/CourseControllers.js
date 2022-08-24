const { mongooseToObject } = require('../../util/mongoose')
const course = require('../models/course')

class CourseControllers {
    //Get show detail course
    show(req, res, next) {
        course.findOne({ slug: req.params.slug })
            .then((course) => 
                res.render('courses/show', {
                    course: mongooseToObject(course),
                }))
            .catch(next)
    }
}

module.exports = new CourseControllers()