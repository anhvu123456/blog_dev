const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Course = new Schema({
    name: { type: String, maxLength: 255 },
    description: { type: String },
    image: { type: String },
})

module.exports = mongoose.model('course', Course)