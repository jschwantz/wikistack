const express = require('express');
const router = express.Router();
const { Page, User } = require('../models/index');
const userPages = require('../views/userPages');
const userList = require('../views/userList');


module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const user = await User.findOne({
    where: {id: req.body.id}
  })
  const pages = await Page.findAll({
    where: {authorid: user.id}
  })

  res.send(userPages(user, pages));
})
