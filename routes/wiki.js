const express = require('express');
const router = express.Router();
const { Page } = require('../models/index');
const addPage = require('../views/addPage');
const wikiPage = require('../views/wikipage');
const main = require('../views/main');

module.exports = router;

router.get('/', async (req, res, next) => {
  const pages = await Page.findAll();
  res.send(main(pages));
})

router.get('/add', async (req, res, next) => {
  res.send(addPage());
})

router.get('/:slug', async (req, res, next) => {
  let foundPage;

  try {
    foundPage = await Page.findOne({
      where: {slug: req.params.slug}
    });
  } catch (error) {
    next(error)
  }

  res.send(wikiPage(foundPage));
})

router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  })

  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  }
  catch (error){
     next(error)
  }
});
