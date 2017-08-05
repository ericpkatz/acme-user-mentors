const router = require('express').Router();


const models = require('../db').models;

router.get('/', (req, res, next)=> {
  models.User.findAll({
    include: [
      models.Award,
      {
        model: models.User, as: 'mentees'
      },
      {
        model: models.User, as: 'mentor'
      }
    ]
  })
  .then( users => {
    const mentors = users.filter( user => user.awards.length >= 2);
    res.render('users', { users, mentors });
  })
  .catch(next);
});

module.exports = router;
