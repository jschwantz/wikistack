const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const PORT = 1337;
const layout = require('./views/layout');
const { db } = require('./models');

db.authenticate().
then(() => {
  console.log('connected to the database');
})

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})
app.use(morgan('dev'));

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));



app.get("/", (req, res) => {
    res.send(layout('HELLO'))
})