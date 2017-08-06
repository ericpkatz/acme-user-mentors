const faker = require('faker');

module.exports = ({ User, Award })=> {
  let moe, larry, curly, award1, award2;
  return Promise.all([
    User.create({ name: 'moe' }),
    User.create({ name: 'larry' }),
    User.create({ name: 'curly' }),
    User.create({ name: 'shep' })
  ])
  .then( (result) => {
    [moe, larry, curly, shep] = result;
  })
  .then( ()=> {
    return Promise.all([
      Award.create({ text: faker.company.catchPhrase(), userId: moe.id}),
      Award.create({ text: faker.company.catchPhrase(), userId: moe.id}),
      Award.create({ text: faker.company.catchPhrase(), userId: shep.id}),
      Award.create({ text: faker.company.catchPhrase(), userId: shep.id})
    ]);
  })
  .then( ([ _award1, _award2])=> {
    award1 = _award1;
    award2 = _award2;
    curly.mentorId = moe.id;
    larry.mentorId = moe.id;
    return Promise.all([
      curly.save(),
      larry.save()
    ]);
  })
  .then( ([ curly, larry ]) => {
    const options = {
      include: [
        { model: User, as: 'mentor'},
        { model: User, as: 'mentees'},
        { model: Award }
      ]
    }
    return Promise.all([
      User.findById(moe.id, options),
      User.findById(larry.id, options),
      User.findById(curly.id, options),
    ]);
  });
};
