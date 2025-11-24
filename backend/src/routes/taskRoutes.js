const express = require('express');
const router = express.Router();
const Task = require('../models/tasks') 
const Project = require('../models/projects') 

// get all tasks
router.get('/', async(req,res) => {
    try {
        const tasks = await Task.find();
        if(!tasks || tasks.length == 0)
            return res.status(404).json({
                success: false,
                message: 'No Tasks Found'                
            })
        return res.status(200).json({
            success: true,
            data: tasks
        })    
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            error:' Internal Server Error'
        });        
    }
});

// get tasks by project
router.get('/project/:projectId', async(req,res) => {
    try {
        const { projectId } = req.params;
        const tasks = await Task.find({ projectId });
        if(!tasks || tasks.length == 0)
            return res.status(404).json({
                success: false,
                message: 'No Tasks Found for this project'                
            })
        return res.status(200).json({
            success: true,
            data: tasks
        })    
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            error:' Internal Server Error'
        });        
    }
});

// get task by id
router.get('/:id', async(req,res) => {
    try {
        const task = await Task.findById(req.params.id)
        if(!task)
            return res.status(404).json({
                success: false,
                message: 'Task Not Found'
            })
        return res.status(200).json({
            success: true,
            data: task
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            error:' Internal Server Error'
        });          
    }
});

// create new task
router.post('/', async(req,res) => {
    try {
        const{ title, dueDate, dueTime, priority, description, projectId } = req.body
        
        // Get or create default project
        let defaultProject = await Project.findOne({ title: "My Tasks" });
        if (!defaultProject) {
            defaultProject = new Project({ title: "My Tasks" });
            await defaultProject.save();
        }
        
        // Use provided projectId or default to "My Tasks" project
        const finalProjectId = projectId || defaultProject._id;
        
        const newTask = new Task({ 
            title, 
            dueDate, 
            dueTime, 
            priority, 
            description,
            projectId: finalProjectId
        });
        
        const savedTask = await newTask.save()
        return res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: newTask
        })
    } catch (error) {
        console.error(error.message) 
        res.status(500).json({
            error:' Internal Server Error'
        })       
    }
});

// update task
router.put('/:id', async(req,res) => {
    try {
        const{ title, dueDate, dueTime, priority, description, status, importance } = req.body
        const updateTask = await Task.findByIdAndUpdate(
            req.params.id,
            {title, dueDate, dueTime, priority, description, status, importance},
            {new: true, runValidators: true}
        )
        if(!updateTask)
            return res.status(404).json({
                success:false,
                message: 'Task Not Found'
            })
        return res.status(200).json({
            success:true,
            message: 'Task Updated successfully',
            data: updateTask
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            error:' Internal Server Error'
        });         
    }
})

// delete task
router.delete('/:id', async(req,res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id)
        if(!deleteTask)
            return res.status(404).json({
                success:false,
                message: 'Task Not Found'
            })
        return res.status(200).json({
            success: true,
            message: 'Task deleted successfully'
        })    
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            error:' Internal Server Error'
        });
    }
})

module.exports = router;