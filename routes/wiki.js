const express = require('express');
const router = express.Router();
const { Page, User } = require('../models/index');
const addPage = require('../views/addPage');
const wikiPage = require('../views/wikipage');
const main = require('../views/main');

module.exports = router;

router.get('/', async (req, res, next) => {
  const pages = await Page.findAll();
  res.send(main(pages));
});

router.get('/add', async (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  let foundPage;
  let pageAuthor;
  try {
    foundPage = await Page.findOne({
      where: { slug: req.params.slug },
    });
    pageAuthor = await User.findOne({
      where: { id: foundPage.authorId}
    })
  } catch (error) {
    next(error);
  }

  res.send(wikiPage(foundPage, pageAuthor));
});

router.post('/', async (req, res, next) => {
  let user = await User.findOne({
    where: { name: req.body.name },
  });
  console.log(user)
  if (user.id === null) {
    user = new User({
      name: req.body.name,
      email: req.body.email
    });
    try {
      await user.save();
    } catch (error) {
      next(error);
    }
  }

  
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    authorId: user.id
  });

  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});
