const mysql      = require('mysql');
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'movieuser',
  password : 'testingpass',
  database : 'movies'
});

db.connect(function(err) {
  if (err) {
    console.error(err);
    return;
  }
});

module.exports = {
  db
};
