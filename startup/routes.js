const express = require('express');
const tasks = require('../routes/tasks');
const user = require('../routes/user');
const project = require('../routes/project');
const auth = require('../routes/auth');


module.exports = function(app) {
  app.use(express.json());
  app.use('/api/tasks', tasks);
  app.use('/api/user', user);
  app.use('/api/project', project);
  app.use('/api/auth', auth);
//   app.use(error);
}