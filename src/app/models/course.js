const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator');

const Course = new Schema({
    name: { type: String, maxLength: 255 },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, required: true },
    level: { type: String },
    slug: { type: String, slug: 'name', unique: true },
},
{
    timestamps: true,
})
mongoose.plugin(slug);
module.exports = mongoose.model('Course', Course)