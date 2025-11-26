const mongoose = require('mongoose');
const { Schema} = mongoose;

const taskSchema = new Schema({
    title: {type: String, default: 'task', maxlength: 100},
    dueDate: {type: String, default: Date.now},
    dueTime: {type: String, default: Date.now},
    priority: {type: String, enum:['Low', 'Medium', 'High'], default:'Medium'},
    description: {type: String, maxlength: 250},
    status: {type: String, enum:['Active', 'Completed'], default: 'Active'},
    importance: {type: Boolean, default: false},
    projectId: {type: Schema.Types.ObjectId, ref: 'Project'}
}, {timestamps: true})

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;