const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const PORT = 1337;
const layout = require('./views/layout');
const { db, User, Page } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

db.authenticate().
then(() => {
  console.log('connected to the database');
})

const sync = async () => {
  await db.sync({force: true});
  app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})
}

sync();

app.use(morgan('dev'));

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

app.get("/", (req, res) => {
  res.redirect("/wiki")
})

app.get("/", (req, res) => {
    res.send(layout('HELLO'))
})
