const express = require('express');
const router = express.Router();
const { Page } = require('../models/index');
const addPage = require('../views/addPage');

module.exports = router;

const slugGen = (title) => {
  let regex = /\W/g
  title.replace(' ', '_')
  title.replace(regex, )
}

router.get('/', async (req, res, next) => {
  const pages = await Page.findAll();
  res.send('');
})

router.get('/add', async (req, res, next) => {
  res.send(addPage());
})

router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  })

  try {
    await page.save();
    res.redirect('/');
  }
  catch (error){
    { next(error) }
  }
  
  res.json(req.body);
});
