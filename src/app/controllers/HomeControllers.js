const Course = require('../models/course.js')

class HomeControllers {
    home(req, res) {
        Course.find({}, function (err, course) {
            if(!err) {
                res.json(course)
            }else{
                res.status(500).json({err: "Error!!!"})
            }
        })
    }

    search(req, res) {
        res.render('search')
    }
}

module.exports = new HomeControllers;