const express = require('express');
const router = express.Router();
const { Page } = require('../models/index');
const addPage = require('../views/addPage');

module.exports = router;

router.get('/', async (req, res, next) => {
  const pages = await Page.findAll();
  res.send('');
})

router.get('/add', async (req, res, next) => {
  res.send(addPage());
})

router.post('/', async (req, res, next) => {
  res.send('');
})
