const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL, {
  logging: false
});

conn.authenticate()
  .catch( ex => console.log(ex));

module.exports = conn;
