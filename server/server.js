const express = require('express');
const app = express();

const util = require('util');
const bodyParser = require('body-parser');
const cors = require('cors');
const {db} = require('./db');
db.query = util.promisify(db.query);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post('/movie', async(req, res) => {
  const {title, genre, year, actors, rating}  = req.body;
  const sql = "INSERT INTO movie (title, genre, year, actors, rating) VALUES ?";
  const newValues =  [[title, genre, year, actors, rating]];
  const resultInsert = await db.query(sql, [newValues]);
  const sql2 = "SELECT * FROM movie where id =" + resultInsert.insertId;
  const resultMovie = await db.query(sql2);
  return res.json(resultMovie[0]);
});

app.delete('/movie/:id', (req, res) => {
  const { id }  = req.params;
  const sql = "DELETE FROM movie WHERE id = " + Number(id);
  db.query(sql, function (err, result) {
    if (err) throw err;
    if(result && result.affectedRows)return res.json({deleted:result.affectedRows });
  });
});

app.put('/movie/:id', (req, res) => {
  const { id }  = req.params;
  //Update query command and table
  let sql1 = `UPDATE movie `;
  // Operand to set
  let sql2 = `SET `;
  let i = 0;
  const numValues = Object.values(req.body).length;
  //Building the column + value part of the query
  for (const [key, val] of Object.entries(req.body)) {
    i++;
    if(Number.isInteger(val)){
     (i >= numValues)? sql2 += ` ${key} = ${Number(val)} ` : ` ${key} = ${Number(val)}, `
    } else {
      (i >= numValues)? sql2 += `${key} = '${val}' ` : sql2 += `${key} = '${val}', `
    }
  }
  //Last query part
  let sql3 = `WHERE id = ${Number(id)}`;
  // final query
  const finalSql = `${sql1}${sql2}${sql3}`;
  //console.log(finalSql);
  db.query(finalSql, function (err, result) {
    if (err) throw err;
    if(result && result.affectedRows)return res.json({updated:result.affectedRows });
  });
});

app.get('/movies', async(req, res) => {
  const movies = await db.query( 'SELECT * FROM movie');
  return res.json({ 'movies': movies });
});

app.get('/search', async (req, res) => {
  const sql1 = `SELECT * from movie `;
  const sql2= `WHERE`;
  let sql3 = ``;
  let i = 0;
  const numValues = Object.values(req.query).length;
  for (const [key, val] of Object.entries(req.query)) {
    i++;
    if(Number.isInteger(Number(val))){
      (i >= numValues)? sql3 += ` ${key} = ${Number(val)}` : ` ${key} = ${Number(val)} AND `;
    } else {
      if(i >= numValues){
        sql3 += ` LOWER(${key}) LIKE LOWER("%${val}%")`
      } else {
        sql3 +=` LOWER(${key}) LIKE LOWER("%${val}%") AND `;
      }
    }
  }
  const finalSql = `${sql1}${sql2}${sql3}`;
  console.log({finalSql});
  const movies = await db.query(finalSql);
  return res.json({ 'movies': movies });
});

app.listen(1400);
console.log('======== Server Started on port 1400 ======');

