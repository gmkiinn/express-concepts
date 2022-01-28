const express = require('express');

const router = express.Router();

// handling get request
router.get('/', (req, res) => {
  res.send('Welcome to Express application');
});

// handling form data
router.get('/loginform', (req, res) => {
  res.status(200).send(req.body);
});

// template engine
router.get('/home', (req, res) => {
  res.render('home', { title: 'home', name: 'mahesh' });
});

module.exports = router;
