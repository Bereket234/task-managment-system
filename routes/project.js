const auth= require('../middlewares/auth')
const express = require('express');
const router = express.Router();

const Project = require('../models/project')

router.get('/', auth, async (req, res) => {
    try {
      const projects = await Project.find().populate('owner', 'username').populate('collaborators', 'username');
      res.json(projects);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  });

router.post('/', auth, async (req, res) => {
  try {
    const { name, description, owner, collaborators, tasks } = req.body;

    const newProject = new Project({
      name,
      description,
      owner,
      collaborators,
      tasks
    });

    await newProject.save();

    res.json(newProject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update a project by ID
router.put('/projects/:id', auth, async (req, res) => {
    try {
      const projectId = req.params.id;
      const updatedData = req.body;
  
      const updatedProject = await Project.findByIdAndUpdate(projectId, updatedData, { new: true });
  
      if (!updatedProject) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      res.json(updatedProject);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update project' });
    }
  });

// Delete a project by ID
router.delete('/projects/:id', auth, async (req, res) => {
    try {
      const projectId = req.params.id;
  
      const deletedProject = await Project.findByIdAndDelete(projectId);
  
      if (!deletedProject) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      res.json({ message: 'Project deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete project' });
    }
  });
  

module.exports = router; 