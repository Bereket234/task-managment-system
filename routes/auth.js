const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRjOGFkNDg5YmJiNmQ4NGNlZDFiMzMiLCJpYXQiOjE2OTIxNzUwNzF9.7nAdQ3n58Fmpuz-E5ZaqGJ6hfLT1Jzn25KJwzzrZTEs
router.post('/', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();
  res.send(token);
});



module.exports = router; 
