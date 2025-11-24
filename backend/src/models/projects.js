const mongoose = require('mongoose')
const { Schema} = mongoose;

const projectSchema = new Schema({
    title: {type: String, maxlength: 100, default: 'project'}

}, {timestamps: true})

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;