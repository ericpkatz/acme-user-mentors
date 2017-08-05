const conn = require('./conn');

const validateMentor = (user) => {
  if(!user.mentorId){
    return;
  }
  return conn.models.award.findAll(
    {
      where: {
        userId: user.mentorId
      }
    }
  )
  .then( awards => {
    if(awards.length < 2)
      throw 'mentor must have two awards';
  });
};

const User = conn.define('user', {
  name: {
    type: conn.Sequelize.STRING
  }
}, {
  hooks: {
    beforeUpdate: function(user){
      return validateMentor(user);
    },
    beforeCreate: function(user){
      return validateMentor(user);
    }
  }
});

module.exports = User;
