const Task= require('../models/tasks')
module.exports = async function (req, res, next) {
    const {id}= req.params
  console.log(req.user, req.params)
  try {
    const tasks = await Task.findById(id)
    console.log(tasks, user)
    
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
}