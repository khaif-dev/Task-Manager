const express = require('express');
const router = express.Router();
const Project = require('../models/projects')

// get all projects
router.get('/', async(req,res) => {
    try {
        const projects = await Project.find();
        if(!projects || projects.length == 0)
            return res.status(404).json({
                success: false,
                message: 'No projects Found'                
            })
        return res.status(200).json({
            success: true,
            message: projects
        })    
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            error:' Internal Server Error'
        });        
    }
});

// Default
router.post('/default', async(req,res) => {
    try {
        let defaultProject = await Project.findOne({ title: "My Tasks" });
        if (!defaultProject) {
            defaultProject = new Project({ title: "My Tasks" });
            await defaultProject.save();
        }
        return res.status(200).json({
            success: true,
            message: 'Default project present',
            data: defaultProject
        })    
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            error:' Internal Server Error'
        });        
    }
});

// get Project by id
router.get('/:id', async(req,res) => {
    try {
        const project = await Project.findById(req.params.id)
        if(!project)
            return res.status(404).json({
                success: false,
                message: 'Project Not Found'
            })
        return res.status(200).json({
            success: true,
            data: project
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            error:' Internal Server Error'
        });         
    }
});

// create new Project
router.post('/', async(req,res) => {
    try {
        const{ name } = req.body
        // Accept 'name' from frontend but store as 'title' in database
        const newProject = new Project({title: name});
        const savedProject = await newProject.save()
        return res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: savedProject
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            error:' Internal Server Error'
        });          
    }
});

// update Project
router.put('/:id', async(req,res) => {
    try {
        const{ name } = req.body
        // Accept 'name' from frontend but store as 'title' in database
        const updateProject = await Project.findByIdAndUpdate(
            req.params.id,
            {title: name },
            {new: true, runValidators: true}
        )
        if(!updateProject)
            return res.status(404).json({
                success: false,
                message: 'Project Not Found'
            });
        return res.status(200).json({
            success: true,
            message: 'Project Updated successfully',
            data: updateProject
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            error:' Internal Server Error'
        });         
    }
})

// delete Project
router.delete('/:id', async(req,res) => {
    try {
        const deleteProject = await Project.findByIdAndDelete(req.params.id)
        if(!deleteProject)
            return res.status(404).json({
                success: false,
                message: 'Project Not Found'
            })
        return res.status(200).json({
            success: true,
            message: 'Project deleted successfully'
        })    
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            error:' Internal Server Error'
        }); 
    }
})

module.exports = router;