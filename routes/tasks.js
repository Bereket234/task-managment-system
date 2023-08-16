const auth = require('../middlewares/auth')
const owner = require('../middlewares/owner')
const express = require('express');
const router = express.Router();

const Task = require('../models/tasks')

router.get('/', auth, async (req, res) => {
    try {
      const tasks = await Task.find().populate('assignedTo', 'username').populate('project', 'name');
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  });

router.post('/', auth, async (req, res) => {
    try {
      const { title, description, dueDate, status, priority, labels, assignedTo, project } = req.body;
  
      const newTask = new Task({
        title,
        description,
        dueDate,
        status,
        priority,
        labels,
        assignedTo,
        project
      });
  
      await newTask.save();
  
      res.json(newTask);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.delete('/:id', auth, owner, async (req, res) => {
    try {
      const taskId = req.params.id;
  
      const deletedTask = await Task.findByIdAndDelete(taskId);
  
      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.json({ message: 'Task deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  });



  router.put('/:id', auth, owner, async (req, res) => { try {
      const taskId = req.params.id;
      const updatedData = req.body;
  
      const updatedTask = await Task.findByIdAndUpdate(taskId, updatedData, { new: true });
  
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.json(updatedTask);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  });
  
module.exports = router; 