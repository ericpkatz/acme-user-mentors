const Sequelize = require('sequelize');
const faker = require('faker');

const conn = require('./conn'); 

conn.authenticate()
  .catch( ex => console.log(ex));

const User = require('./User'); 
const Award = require('./Award'); 

User.belongsTo(User, { as: 'mentor' });
User.hasMany(User, { as: 'mentees', foreignKey: 'mentorId' });

User.hasMany(Award);
Award.belongsTo(User);

const models = {
  User,
  Award
};


const sync = ()=> conn.sync({force: true});


const seed = ()=> {
  const _seed = require('./seed');
  return _seed(models);
};

module.exports = {
  seed,
  sync,
  models 
};
