const express = require('express');
const app = express();

const util = require('util');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
const cors = require('cors');
const {db} = require('./db');
db.query = util.promisify(db.query);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post('/movie', async(req, res) => {

});

app.delete('/movie/:id', (req, res) => {

});

app.put('/movie/:id', (req, res) => {

});

app.get('/movie/:id', (req, res) => {

});

app.get('/movies', async(req, res) => {
  const movies = await db.query( 'SELECT * FROM movie');
  return res.json({ 'movies': movies });
});

app.get('/search/main', (req, res) => {

});

app.listen(1400);
console.log('======== Server Started on port 1400 ======');
