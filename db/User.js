const conn = require('./conn');

const User = conn.define('user', {
  name: {
    type: conn.Sequelize.STRING
  }
}, {
  hooks: {
    beforeValidate: function(user){
      if(user.mentorId === ''){
        user.mentorId = null;
      }
    }
  }
});

User.destroyById = (id)=> {
  return User.destroy({
    where: {
      id: id 
    }
  });
};

User.updateUserFromRequestBody = (id, body)=> {
  return User.findById(id)
    .then( user => {
      Object.assign(user, body);
      return user.save();
    });
};

User.removeAward = function(userId, awardId){
  return conn.models.award.destroy({
    where: { id: awardId }
  })
  .then(()=> {
    return User.findById(userId, {
      include: [
        conn.models.award
      ]
    });
  })
  .then(user => {
    if(user.awards.length < 2){
      return User.update({ mentorId: null }, { where: { mentorId: userId }});
    }
  });
};

User.generateAward = function(userId){
  return conn.models.award.create({
    userId,
    text: require('faker').company.catchPhrase()
  });
};

User.findUsersViewModel = function(){
  return Promise.all([
    this.findAllWithRelations(),
    this.availableMentorsMap()
  ])
  .then(([ users, availableMentorsMap ])=> {
    return {
      users,
      availableMentorsMap
    };
  });
};


User.availableMentorsMap = function(){
  return User.findAll({
    include: [
      conn.models.award,
    ]
  })
  .then(( users ) => {
    const availableMentors = users.filter( user => user.awards.length >= 2);
    return users.reduce((map, user)=> {
      map[user.id] = availableMentors.filter( u => u.id !== user.id);
      return map;
    }, {});
  });
};

User.findAllWithRelations = function(){
  return User.findAll({
    order: [ ['name', 'ASC'] ],
    include: [
      conn.models.award,
      {
        model: User, as: 'mentees'
      },
      {
        model: User, as: 'mentor'
      }
    ]
  });
};


module.exports = User;
